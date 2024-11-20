import { DateTime } from "luxon";
import Validador from "./utils/Validador.js";
import Consulta from "./models/Consulta.js";

class Agenda {
    constructor() {
        this.consultas = []; // Lista de consultas
    }

    agendarConsulta(cpf, data, horaInicio, horaFim) {
        // Validações iniciais
        if (!Validador.valida_data(data)) {
            console.log("Data inválida. Use o formato DD/MM/AAAA.");
            return false;
        }
        if (!this.validaHorario(horaInicio) || !this.validaHorario(horaFim)) {
            console.log("Horário inválido. Use o formato HHMM com intervalos de 15 minutos.");
            return false;
        }

        const horaInicialLuxon = DateTime.fromFormat(horaInicio, "HHmm");
        const horaFinalLuxon = DateTime.fromFormat(horaFim, "HHmm");

        if (horaFinalLuxon <= horaInicialLuxon) {
            console.log("O horário final deve ser maior que o inicial.");
            return false;
        }

        // Verifica sobreposição de horários
        if (this.temConflito(data, horaInicio, horaFim)) {
            console.log("Conflito de horários com outro agendamento.");
            return false;
        }

        // Verifica se o paciente já possui uma consulta futura
        if (this.temConsultaFutura(cpf)) {
            console.log("Paciente já possui um agendamento futuro.");
            return false;
        }

        // Adiciona a consulta
        this.consultas.push(new Consulta(cpf, data, horaInicio, horaFim));

        console.log("Consulta agendada com sucesso!");
        return true;
    }

    cancelarConsulta(cpf, data, horaInicio) {
        // Verifica se a consulta existe
        const index = this.consultas.findIndex(
            consulta => consulta.cpf === cpf && consulta.data === data && consulta.horaInicio === horaInicio
        );

        if (index === -1) {
            console.log("Consulta não encontrada.");
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
            console.log("Não é possível cancelar uma consulta passada.");
            return false;
        }

        // Remove a consulta
        this.consultas.splice(index, 1);
        console.log("Consulta cancelada com sucesso!");
        return true;
    }
}