class Consulta {
    #cpf_paciente;
    #data_consulta;
    #hora_inicial;
    #hora_final;

    constructor(cpf_paciente, data_consulta, hora_inicial, hora_final) {
        this.#cpf_paciente = cpf_paciente;
        this.#data_consulta = data_consulta;
        this.hora_inicial = hora_inicial;
        this.#hora_final = hora_final;
    }

    get cpf_paciente() {
        return this.#cpf_paciente;
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

    set muda_cpf_paciente(novo_cpf) {
        this.#cpf_paciente = novo_cpf;
    }

    set muda_data_consulta(nova_data) {
        this.#data_consulta = nova_data;
    }

    set muda_hora_inicial(nova_hora_inicial) {
        this.#hora_inicial = nova_hora_inicial;
    }

    set muda_hora_final(nova_hora_final) {
        this.#hora_final = nova_hora_final;
    }
}