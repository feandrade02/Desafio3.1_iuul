import promptSync from "prompt-sync";

export default class Menu {
    constructor() {
        this.prompt = promptSync(); // Inicializa o módulo de entrada no console
    }

    static menuPrincipal() {
        console.log("\nMenu Principal\n1-Cadastro de pacientes\n2-Agenda\n3-Fim\n");
        const opcao = this.prompt("Escolha uma opção: ");
        return this.validarOpcao(opcao, [1, 2, 3]);
    }

    static menuPacientes() {
        console.log("\nMenu do Cadastro de Pacientes\n1-Cadastrar novo paciente\n2-Excluir paciente\n3-Listar pacientes (ordenado por CPF)\n4-Listar pacientes (ordenado por nome)\n5-Voltar p/ menu principal\n");
        const opcao = this.prompt("Escolha uma opção: ");
        return this.validarOpcao(opcao, [1, 2, 3, 4, 5]);
    }

    static menuAgenda() {
        console.log("\nAgenda\n1-Agendar consulta\n2-Cancelar agendamento\n3-Listar agenda\n4-Voltar p/ menu principal\n");
        const opcao = this.prompt("Escolha uma opção: ");
        return this.validarOpcao(opcao, [1, 2, 3, 4]);
    }

    static validarOpcao(opcao, opcoesValidas) {
        const opcaoNumerica = parseInt(opcao, 10);
        if (!opcoesValidas.includes(opcaoNumerica)) {
            console.log("Opção inválida. Tente novamente.\n");
            return null; // Retorna null para indicar uma entrada inválida
        }
        return opcaoNumerica;
    }
}