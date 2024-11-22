import { DateTime } from "luxon";
import Validador from "../utils/Validador.js";
import Consulta from "../models/Consulta.js";
import promptSync from "prompt-sync";

export default class Agenda {
    constructor() {
        this.consultas = []; // Lista de consultas
        this.prompt = promptSync();
        this.validador = new Validador();
    }

    agendarConsulta(cadastro) {

        const cpf = this.prompt("CPF: ");
        if (!this.validador.valida_cpf(cadastro.pacientes.map(p => p.cpf), cpf)) {
            console.log("Erro: paciente não cadastrado.\n");
            return;
        }

        const data = this.prompt("Data da consulta: ");
        // Validações iniciais
        if (!this.validador.valida_data(data)) {
            console.log("Erro: Data inválida. Use o formato DD/MM/AAAA.\n");
            return;
        }

        const horaInicio = this.prompt("Hora inicial: ");
        if (!this.validaHorario(horaInicio)) {
            console.log("Erro: Horário inválido. Use o formato HHMM com intervalos de 15 minutos.\n");
            return;
        }

        const horaFim = this.prompt("Hora final: ");
        if (!this.validaHorario(horaFim)){
            console.log("Erro: Horário inválido. Use o formato HHMM com intervalos de 15 minutos.\n");
            return;
        }

        const horaInicialLuxon = DateTime.fromFormat(horaInicio, "HHmm");
        const horaFinalLuxon = DateTime.fromFormat(horaFim, "HHmm");

        if (horaFinalLuxon <= horaInicialLuxon) {
            console.log("Erro: O horário final deve ser maior que o inicial.\n");
            return;
        }

        // Verifica sobreposição de horários
        if (this.temConflito(data, horaInicio, horaFim)) {
            console.log("Erro: Já existe uma consulta agendada nesse horário.\n");
            return;
        }

        // Verifica se o paciente já possui uma consulta futura
        if (this.temConsultaFutura(cpf)) {
            console.log("Erro: O paciente já possui um agendamento futuro.\n");
            return;
        }

        // Adiciona a consulta
        this.consultas.push(new Consulta(cpf, data, horaInicio, horaFim));

        console.log("Agendamento realizado com sucesso!\n");
        return;
    }

    cancelarConsulta(cadastro) {

        const cpf = this.prompt("CPF: ");
        if (!this.validador.valida_cpf(cadastro.pacientes.map(p => p.cpf), cpf)) {
            console.log("Erro: paciente não cadastrado.\n");
            return;
        }

        const data = this.prompt("Data da consulta: ");
        // Validações iniciais
        if (!this.validador.valida_data(data)) {
            console.log("Erro: Data inválida. Use o formato DD/MM/AAAA.\n");
            return;
        }

        const horaInicio = this.prompt("Hora inicial: ");
        if (!this.validaHorario(horaInicio)) {
            console.log("Erro: Horário inválido. Use o formato HHMM com intervalos de 15 minutos.\n");
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

    listarConsultas(opcao = "T", dataInicial = null, dataFinal = null) {
        let consultasFiltradas = this.consultas;

        if (opcao === "P" && dataInicial && dataFinal) {
            const inicio = DateTime.fromFormat(dataInicial, "dd/MM/yyyy");
            const fim = DateTime.fromFormat(dataFinal, "dd/MM/yyyy");

            consultasFiltradas = this.consultas.filter(consulta => {
                const dataConsulta = DateTime.fromFormat(consulta.data, "dd/MM/yyyy");
                if (!(dataConsulta >= inicio && dataConsulta <= fim)) return false;
            });
        }

        console.log("Listagem de Consultas:");
        consultasFiltradas
            .sort((a, b) => {
                const dataA = DateTime.fromFormat(a.data, "dd/MM/yyyy").toMillis();
                const dataB = DateTime.fromFormat(b.data, "dd/MM/yyyy").toMillis();
                if (!(dataA - dataB || a.horaInicio - b.horaInicio)) return false;
            })
            .forEach(consulta => {
                console.log(
                    `CPF: ${consulta.cpf}, Data: ${consulta.data}, Horário: ${consulta.horaInicio} - ${consulta.horaFim}`
                );
            });
    }

    validaHorario(horario) {
        return /^[0-1][0-9][0-5][0-9]$/.test(horario) && parseInt(horario.slice(0, 2)) >= 8 && parseInt(horario.slice(0, 2)) < 19;
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