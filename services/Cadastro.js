import Validador from "./utils/Validador.js";
import Paciente from "./models/Paciente.js";

export default class Cadastro {
    constructor() {
        this.pacientes = []; // Lista de pacientes
    }

    adicionarPaciente(cpf, nome, dataNascimento) {
        // Valida CPF
        if (!Validador.valida_cpf(this.pacientes.map(p => p.cpf), cpf)) {
            console.log("CPF inválido ou já cadastrado.\n");
            return false;
        }

        // Valida nome
        if (!Validador.valida_nome(nome)) {
            return false;
        }

        // Valida data de nascimento
        if (!Validador.valida_data(dataNascimento) || !Validador.valida_idade(dataNascimento)) {
            console.log("Data de nascimento inválida ou paciente tem menos de 13 anos.\n");
            return false;
        }

        // Adiciona paciente à lista
        this.pacientes.push(new Paciente(cpf, nome, dataNascimento));

        console.log("Paciente cadastrado com sucesso!\n");
        return true;
    }

    excluirPaciente(cpf, agenda) {
        // Verifica se o paciente existe
        const index = this.pacientes.findIndex(paciente => paciente.cpf === cpf);
        if (index === -1) {
            console.log("Paciente não encontrado.\n");
            return false;
        }

        // Verifica se o paciente tem consultas futuras
        if (agenda.temConsultaFutura(cpf)) {
            console.log("Não é possível excluir o paciente, pois ele possui consultas futuras agendadas.\n");
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