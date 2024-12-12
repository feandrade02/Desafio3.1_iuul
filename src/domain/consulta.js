import { DateTime } from "luxon";

export default class Consulta {
    #paciente;
    #data_consulta;
    #hora_inicial;
    #hora_final;
    #tempo;

    constructor(paciente, data_consulta, hora_inicial, hora_final) {
        this.#paciente = paciente;
        this.#data_consulta = this.formata_data(data_consulta);
        this.#hora_inicial = this.formata_hora(hora_inicial);
        this.#hora_final = this.formata_hora(hora_final);
        this.#tempo = this.calcula_tempo();
    }

    formata_data(data) {
        const dataLuxon = DateTime.fromFormat(data, "dd/MM/yyyy");
        return dataLuxon.toFormat("dd/MM/yyyy");
    }

    formata_hora(hora) {
        const horaLuxon = DateTime.fromFormat(hora, "HHmm");
        return horaLuxon.toFormat("HH:mm");
    }

    calcula_tempo() {
        const horaInicialLuxon = DateTime.fromFormat(this.#hora_inicial, "HHmm");
        const horaFinalLuxon = DateTime.fromFormat(this.#hora_final, "HHmm");

        // Calcula a diferença entre as horas
        const tempo = Math.floor(horaFinalLuxon.diff(horaInicialLuxon, "minutes").minutes);

        const horas = tempo / 60; // Converte minutos totais em horas inteiras
        const minutos = tempo % 60; // Resto dos minutos

        const tempoString = `${horas.toString().padStart(2, "0")}${minutos.toString().padStart(2, "0")}`;

        return this.formata_hora(tempoString);
    }

    get paciente() {
        return this.#paciente;
    }

    get data_consulta() {
        return this.#data_consulta;
    }

    get hora_inicial() {
        return this.#hora_inicial;
    }

    get hora_final() {
        return this.#hora_final;
    }

    get tempo() {
        return this.#tempo;
    }

    set muda_cpf_paciente(novo_paciente) {
        this.#paciente = novo_paciente;
    }

    set muda_data_consulta(nova_data) {
        this.#data_consulta = this.formata_data(nova_data);
    }

    set muda_hora_inicial(nova_hora_inicial) {
        this.#hora_inicial = this.formata_hora(nova_hora_inicial);
    }

    set muda_hora_final(nova_hora_final) {
        this.#hora_final = this.formata_hora(nova_hora_final);
    }
}