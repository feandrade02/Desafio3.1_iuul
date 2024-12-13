import { DateTime } from "luxon";
import Validador from "../utils/Validador.js";
import Consulta from "../domain/consulta.js";
import promptSync from "prompt-sync";

export default class Agenda {
    constructor() {
        this.consultas = []; // Lista de consultas
        this.prompt = promptSync();
        this.validador = new Validador();
    }

    agendarConsulta(cadastro) {

        const cpf = this.prompt("CPF: ");
        if (!this.validador.valida_cpf(cpf)) {
            return;
        }

        if (!this.validador.consulta_cpf_nao_cadastrado(cadastro.pacientes.map(p => p.cpf), cpf)) {
            return;
        }

        const data = this.prompt("Data da consulta: ");
        // Validações iniciais
        if (!this.validador.valida_data(data)) {
            return;
        }

        const horaInicio = this.prompt("Hora inicial: ");
        if (!this.validador.validaHorario(horaInicio)) {
            return;
        }

        const horaFim = this.prompt("Hora final: ");
        if (!this.validador.validaHorario(horaFim)){
            return;
        }

        const horaInicialLuxon = DateTime.fromFormat(horaInicio, "HHmm");
        const horaFinalLuxon = DateTime.fromFormat(horaFim, "HHmm");

        if (horaFinalLuxon <= horaInicialLuxon) {
            console.log("\nErro: O horário final deve ser maior que o inicial.\n");
            return;
        }

        // Verifica sobreposição de horários
        if (this.temConflito(data, horaInicio, horaFim)) {
            console.log("\nErro: Já existe uma consulta agendada nesse horário.\n");
            return;
        }

        // Verifica se o paciente já possui uma consulta futura
        if (this.temConsultaFutura(cpf)) {
            console.log("\nErro: O paciente já possui um agendamento futuro.\n");
            return;
        }

        let pacienteSelecionado = null;

        for (const paciente of cadastro.pacientes) {
            if (paciente.cpf === cpf) {
                pacienteSelecionado = paciente;
                break;
            }
        }

        // Adiciona a consulta
        this.consultas.push(new Consulta(pacienteSelecionado, data, horaInicio, horaFim));

        console.log("Agendamento realizado com sucesso!\n");
        return;
    }

    cancelarConsulta(cadastro) {

        const cpf = this.prompt("CPF: ");
        if (!this.validador.valida_cpf(cpf)) {
            return;
        }

        if (!this.validador.consulta_cpf_nao_cadastrado(cadastro.pacientes.map(p => p.cpf), cpf)) {
            return;
        }

        const data = this.prompt("Data da consulta: ");
        // Validações iniciais
        if (!this.validador.valida_data(data)) {
            return;
        }

        const horaInicio = this.prompt("Hora inicial: ");
        if (!this.validador.validaHorario(horaInicio)) {
            return;
        }

        // Verifica se a consulta existe
        const index = this.consultas.findIndex(
            consulta => consulta.cpf === cpf && consulta.data === data && consulta.horaInicio === horaInicio
        );

        if (index === -1) {
            console.log("Erro: Agendamento não encontrado.\n");
            return false;
        }

        // Verifica se a consulta é futura
        const consulta = this.consultas[index];
        const agora = DateTime.now();
        const dataConsulta = DateTime.fromFormat(consulta.data, "dd/MM/yyyy").set({
            hour: parseInt(consulta.horaInicio.slice(0, 2)),
            minute: parseInt(consulta.horaInicio.slice(2)),
        });

        if (dataConsulta <= agora) {
            console.log("Erro: Não é possível cancelar uma consulta passada.\n");
            return false;
        }

        // Remove a consulta
        this.consultas.splice(index, 1);
        console.log("Consulta cancelada com sucesso!\n");
        return true;
    }

    listarConsultas() {
        
        const opcao = this.prompt("Apresentar a agenda T-Toda ou P-Período: ");
        if (!this.validador.valida_opcao_listagem_agenda(opcao)) {
            return;
        }

        let consultasFiltradas = this.consultas;

        if (opcao === "P") {
            const dataInicial = this.prompt("Data inicial: ");
            
            if (!this.validador.valida_data(dataInicial)) return;

            const dataFinal = this.prompt("Data final: ");

            if (!this.validador.valida_data(dataFinal)) return;

            const inicio = DateTime.fromFormat(dataInicial, "dd/MM/yyyy");
            const fim = DateTime.fromFormat(dataFinal, "dd/MM/yyyy");

            consultasFiltradas = this.consultas.filter(consulta => {
                const dataConsulta = DateTime.fromFormat(consulta.data_consulta, "dd/MM/yyyy");
                if (!(dataConsulta >= inicio && dataConsulta <= fim)) return false;
            });
        }

        console.log("\n-------------------------------------------------------------");
        console.log("   Data    H.Ini H.Fim Tempo Nome                   Dt.Nasc.");
        console.log("-------------------------------------------------------------");

        consultasFiltradas
            .sort((a, b) => {
                const dataA = a.data_consulta.toMillis();
                const dataB = b.data_consulta.toMillis();
                if (!(dataA - dataB || a.hora_inicial - b.hora_inicial)) return false;
            })
            .forEach(consulta => {
                console.log(
                    `${consulta.data_consulta} ${consulta.hora_inicial} ${consulta.hora_final} ${consulta.tempo} ${consulta.paciente.nome}                   ${consulta.paciente.data_nasc}`
                );
            });
        console.log("-------------------------------------------------------------");
    }

    temConflito(data, horaInicio, horaFim) {
        return this.consultas.some(consulta => {
            if (consulta.data !== data) return false;

            const inicioNova = DateTime.fromFormat(horaInicio, "HHmm");
            const fimNova = DateTime.fromFormat(horaFim, "HHmm");
            const inicioExistente = DateTime.fromFormat(consulta.horaInicio, "HHmm");
            const fimExistente = DateTime.fromFormat(consulta.horaFim, "HHmm");

            return (inicioNova < fimExistente && fimNova > inicioExistente);
        });
    }

    temConsultaFutura(cpf) {
        const agora = DateTime.now();
        return this.consultas.some(consulta => {
            const dataConsulta = DateTime.fromFormat(consulta.data, "dd/MM/yyyy").set({
                hour: parseInt(consulta.horaInicio.slice(0, 2)),
                minute: parseInt(consulta.horaInicio.slice(2)),
            });

            return consulta.cpf === cpf && dataConsulta > agora;
        });
    }
}