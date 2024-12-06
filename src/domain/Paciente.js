import { DateTime } from "luxon";

export default class Paciente {
    #nome;
    #cpf;
    #data_nasc;
    #idade;

    constructor(nome, cpf, data_nasc) {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#data_nasc = this.formata_data(data_nasc);
        this.#idade = this.calcula_idade(data_nasc);
    }
    
    calcula_idade(data_nasc) {
        // Formato esperado da data de nascimento
        const formato = "dd/MM/yyyy";
   
        // Tenta criar um objeto DateTime com a data fornecida
        const nascimento = DateTime.fromFormat(data_nasc, formato);
    
        // Obtém a data atual
        const hoje = DateTime.now();

        return Math.floor(hoje.diff(nascimento, "years").years);
    }

    formata_data(data) {
        // Tenta criar um objeto DateTime a partir da string no formato "dd/MM/yyyy"
        const formato = "dd/MM/yyyy";
        const dataLuxon = DateTime.fromFormat(data, formato);
        return dataLuxon.toFormat(formato);
    }

    get nome() {
        return this.#nome;
    }

    get cpf() {
        return this.#cpf;
    }

    get data_nasc() {
        return this.#data_nasc;
    }

    get idade() {
        return this.#idade;
    }

    set muda_nome(nome_novo) {
        this.#nome = nome_novo;
    }

    set muda_cpf(cpf_novo) {
        this.#cpf = cpf_novo;
    }

    set muda_data_nasc(data_nasc_novo) {
        this.#data_nasc = this.formata_data(data_nasc_novo);
        this.#idade = this.calcula_idade(data_nasc_novo);
    }
}