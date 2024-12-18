import { DateTime } from "luxon";
import promptSync from "prompt-sync";

import Consulta from "../domain/consulta.js";
import Validador from "../utils/Validador.js";
import repositorioConsulta from "../repositorio/RepositorioConsulta.js";

export default class Agenda {
    constructor() {
        this.prompt = promptSync();
    }

    static async agendarConsulta() {

        const cpf = this.prompt("CPF: ");
        if (!Validador.valida_cpf(cpf)) return;

        // Verifica se o paciente está cadastrado
        if (!Validador.pacienteCadastrado(cpf)) {
            console.log("\nErro: Paciente não cadastrado.\n");
            return;
        }

        const data = this.prompt("Data da consulta: ");
        if (!Validador.valida_data(data)) return;

        const horaInicio = this.prompt("Hora inicial: ");
        if (!Validador.validaHorario(horaInicio)) return;

        const horaFim = this.prompt("Hora final: ");
        if (!Validador.validaHorario(horaFim)) return;

        const horaInicialLuxon = DateTime.fromFormat(horaInicio, "HHmm");
        const horaFinalLuxon = DateTime.fromFormat(horaFim, "HHmm");

        if (horaFinalLuxon <= horaInicialLuxon) {
            console.log("\nErro: O horário final deve ser maior que o inicial.\n");
            return;
        }

        // Verifica sobreposição de horários
        if (await repositorioConsulta.temConflito(data, horaInicio, horaFim) !== null) {
            console.log("\nErro: Já existe uma consulta agendada nesse horário.\n");
            return;
        }

        // Verifica se o paciente já possui uma consulta futura
        if (await Validador.ConsultaFutura(cpf) !== null) {
            console.log("\nErro: O paciente já possui um agendamento futuro.\n");
            return;
        }

        // Cria e salva a consulta
        const consulta = Consulta.of(data, horaInicio, horaFim);
        await repositorioConsulta.salva(consulta);
        
        // Relaciona o paciente à consulta
        await paciente.agenda(consulta);

        console.log("Agendamento realizado com sucesso!\n");
        return;
    }

    static async cancelarConsulta() {

        const cpf = this.prompt("CPF: ");
        if (!Validador.valida_cpf(cpf)) return;

        // Verifica se o paciente está cadastrado
        if (!Validador.pacienteCadastrado(cpf)) {
            console.log("\nErro: Paciente não cadastrado.\n");
            return;
        }

        const data = this.prompt("Data da consulta: ");
        if (!Validador.valida_data(data)) return;

        const horaInicio = this.prompt("Hora inicial: ");
        if (!Validador.validaHorario(horaInicio)) return;

        // Recupera a consulta correspondente
        const consulta = await repositorioConsulta.buscaConsultaPorHorario(cpf, data, horaInicio);
        if (!consulta) {
            console.log("\nErro: Consulta não encontrada.\n");
            return;
        }

        // Verifica se a consulta é futura
        const agora = DateTime.now();
        const dataConsulta = DateTime.fromFormat(data, "dd/MM/yyyy").set({
            hour: parseInt(consulta.hora_inicial.slice(0, 2)),
            minute: parseInt(consulta.hora_inicial.slice(2)),
        });

        if (dataConsulta <= agora) {
            console.log("\nErro: Não é possível cancelar uma consulta passada.\n");
            return;
        }

        // Remove a consulta
        await repositorioConsulta.remove(consulta);

        console.log("Consulta cancelada com sucesso!\n");
        return;
    }

    static async listarConsultas() {
        
        const opcao = this.prompt("Apresentar a agenda T-Toda ou P-Período: ").toUpperCase();
        if (!Validador.valida_opcao_listagem_agenda(opcao)) return;

        let consultas = [];

        if (opcao === "T") {
            // Recupera todas as consultas
            consultas = await repositorioConsulta.buscaTodos();
        } else {
            // Solicita o período
            const dataInicial = this.prompt("Data inicial (dd/MM/yyyy): ");
            if (!Validador.valida_data(dataInicial)) return;

            const dataFinal = this.prompt("Data final (dd/MM/yyyy): ");
            if (!Validador.valida_data(dataFinal)) return;

            const inicio = DateTime.fromFormat(dataInicial, "dd/MM/yyyy");
            const fim = DateTime.fromFormat(dataFinal, "dd/MM/yyyy");

            // Recupera as consultas no período
            consultas = await repositorioConsulta.buscaPorPeriodo(inicio, fim);
        }

        if (consultas.length === 0) {
            console.log("\nErro: Nenhuma consulta encontrada.\n");
            return;
        }
    
        // Exibe as consultas formatadas
        console.log("\n-------------------------------------------------------------");
        console.log("   Data    H.Ini H.Fim Tempo Nome                   Dt.Nasc.");
        console.log("-------------------------------------------------------------");

        consultas.forEach(consulta => {
            console.log(
                `${consulta.data_consulta.padEnd(10)} ${consulta.hora_inicial.padEnd(6)} ${consulta.hora_final.padEnd(6)} ${consulta.tempo.padEnd(6)} ${consulta.paciente.nome.padEnd(20)} ${consulta.paciente.data_nasc}`
            );
        });

        console.log("-------------------------------------------------------------");
    }
}