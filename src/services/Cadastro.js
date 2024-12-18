import promptSync from "prompt-sync";
import { DateTime } from "luxon";

import Paciente from "../domain/paciente.js";
import Validador from "../utils/Validador.js";
import repositorioPaciente from "../repositorio/RepositorioPaciente.js";

export default class Cadastro {
    constructor() {
        this.prompt = promptSync();
    }

    static async cadastrarPaciente() {
        // solicita entrada dos dados
        const cpf = this.prompt("CPF: ");
        if (!Validador.valida_cpf(cpf)) return;

        const nome = this.prompt("Nome: ");
        if (!Validador.valida_nome(nome)) return;

        const dataNascimento = this.prompt("Data de nascimento: ");
        if (!Validador.valida_data(dataNascimento)) return;

        // tenta criar objeto em memória
        const result = Paciente.of(cpf, nome, dataNascimento);

        // verifica se o paciente foi criado
        if (result.isSuccess) {
            // paciente criado
            // verifica se esse paciente já está cadastrado
            if (await Validador.pacienteCadastrado(result.value.cpf)) {
                console.log("\nErro: Paciente já foi cadastrado.\n");
                return;
            }
            else {
                await repositorioPaciente.salva(result.value);
                console.log("Paciente cadastrado com sucesso!\n");
                return;
            }
        }
        return;
    }

    static async excluirPaciente() {
        // solicita cpf
        const cpf = this.prompt("CPF: ");
        if (!Validador.valida_cpf(cpf)) return;

        // Verifica se o paciente existe
        if (!Validador.pacienteCadastrado(cpf)) {
            console.log("\nErro: Paciente não cadastrado.\n");
            return;
        }

        // Verifica se o paciente tem consultas futuras
        if (await Validador.ConsultaFutura(cpf) !== null) {
            console.log("\nErro: o paciente está agendado.\n");
            return;
        }

        // Remove o paciente
        await repositorioPaciente.remove(paciente)
        console.log("Paciente excluído com sucesso!\n");
        return;
    }

    static async listarPacientes(porNome = false) {
        // Determinar ordenação
        const pacientesOrdenados = porNome
            ? await repositorioPaciente.buscaOrdenadosPorNome()
            : await repositorioPaciente.buscaOrdenadosPorCPF();

        // Exibe o cabeçalho da tabela
        console.log("\n------------------------------------------------------------");
        console.log("CPF         Nome                              Dt.Nasc. Idade");
        console.log("------------------------------------------------------------");
        
        for (const paciente of pacientesOrdenados) {
            // Exibe as informações do paciente
            console.log(`${paciente.cpf} ${paciente.nome.padEnd(35)} ${paciente.data_nasc}  ${paciente.idade}`);
    
            // Verifica se o paciente tem uma consulta futura
            const consultaFutura = await Validador.ConsultaFutura(paciente.cpf);
            if (consultaFutura !== null) {
                console.log(`            Agendado para: ${consultaFutura.data_consulta}`);
                console.log(`            ${consultaFutura.hora_inicial} às ${consultaFutura.hora_final}`);
            }
        }
        
        // Exibe o rodapé da tabela
        console.log("------------------------------------------------------------");
        return;
    }
}