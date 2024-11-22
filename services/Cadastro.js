import Validador from "../utils/Validador.js";
import Paciente from "../models/Paciente.js";
import promptSync from "prompt-sync";

export default class Cadastro {
    constructor() {
        this.pacientes = []; // Lista de pacientes
        this.prompt = promptSync();
        this.validador = new Validador();
    }

    adicionarPaciente() {

        const cpf = this.prompt("CPF: ");
        const nome = this.prompt("Nome: ");
        const dataNascimento = this.prompt("Data de nascimento: ");

        // Valida CPF
        if (!this.validador.valida_cpf(this.pacientes.map(p => p.cpf), cpf)) {
            console.log("Erro: CPF inválido.\n");
            return;
        }

        // Valida nome
        if (!this.validador.valida_nome(nome)) {
            return;
        }

        // Valida data de nascimento
        if (!this.validador.valida_data(dataNascimento)) {
            console.log("Erro: Data de nascimento inválida. Use o formato DD/MM/AAAA.\n");
            return;
        }

        if (!this.validador.valida_idade(dataNascimento)) {
            console.log("Erro: O paciente deve ter pelo menos 13 anos.\n");
            return;
        }

        // Adiciona paciente à lista
        this.pacientes.push(new Paciente(cpf, nome, dataNascimento));

        console.log("Paciente cadastrado com sucesso!\n");
        return;
    }

    excluirPaciente(agenda) {

        const cpf = this.prompt("CPF: ");

        // Verifica se o paciente existe
        const index = this.pacientes.findIndex(paciente => paciente.cpf === cpf);
        if (index === -1) {
            console.log("Erro: Paciente não cadastrado.\n");
            return false;
        }

        // Verifica se o paciente tem consultas futuras
        if (agenda.temConsultaFutura(cpf)) {
            console.log("Erro: o paciente está agendado.\n");
            return false;
        }

        // Remove o paciente
        this.pacientes.splice(index, 1);
        console.log("Paciente excluído com sucesso!\n");
        return true;
    }

    listarPacientes(ordenacao = "cpf", agenda) {
        // Ordena os pacientes por CPF ou nome
        const pacientesOrdenados = [...this.pacientes].sort((a, b) => {
            if (ordenacao === "nome") {
                return a.nome.localeCompare(b.nome);
            }
            return a.cpf.localeCompare(b.cpf);
        });

        // Exibe os pacientes
        console.log("Lista de Pacientes:");
        pacientesOrdenados.forEach(paciente => {
            console.log(`CPF: ${paciente.cpf}, Nome: ${paciente.nome}, Data de Nascimento: ${paciente.dataNascimento}`);

            // Verifica se o paciente tem uma consulta futura
            const consultaFutura = agenda.consultas.find(consulta => consulta.cpf === paciente.cpf);
            if (consultaFutura) {
                console.log(`  Agendado para: ${consultaFutura.data} das ${consultaFutura.horaInicio} às ${consultaFutura.horaFim}`);
            }
        });
    }
}