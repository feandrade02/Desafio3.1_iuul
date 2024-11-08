class Paciente {
    #nome;
    #cpf;
    #data_nasc;

    constructor(nome, cpf, data_nasc) {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#data_nasc = data_nasc;
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

    set muda_nome(nome_novo) {
        this.#nome = nome_novo;
    }

    set muda_cpf(cpf_novo) {
        this.#cpf = cpf_novo;
    }

    set muda_data_nasc(data_nasc_novo) {
        this.#data_nasc = data_nasc_novo;
    }
}