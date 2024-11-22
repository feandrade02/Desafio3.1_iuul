import promptSync from "prompt-sync";

export default class Menu {
    constructor() {
        this.prompt = promptSync(); // Inicializa o módulo de entrada no console
    }

    menuPrincipal() {
        console.log("\nMenu Principal\n1-Cadastro de pacientes\n2-Agenda\n3-Fim\n");
        const opcao = this.prompt("Escolha uma opção: ");
        return this.validarOpcao(opcao, [1, 2, 3]);
    }

    menuPacientes() {
        console.log("\nMenu do Cadastro de Pacientes\n1-Cadastrar novo paciente\n2-Excluir paciente\n3-Listar pacientes (ordenado por CPF)\n4-Listar pacientes (ordenado por nome)\n5-Voltar p/ menu principal\n");
        const opcao = this.prompt("Escolha uma opção: ");
        return this.validarOpcao(opcao, [1, 2, 3, 4, 5]);
    }

    menuAgenda() {
        console.log("\nAgenda\n1-Agendar consulta\n2-Cancelar agendamento\n3-Listar agenda\n4-Voltar p/ menu principal\n");
        const opcao = this.prompt("Escolha uma opção: ");
        return this.validarOpcao(opcao, [1, 2, 3, 4]);
    }

    solicitarTexto(mensagem) {
        const entrada = this.prompt(`${mensagem}: `).trim();
        return entrada;
    }

    solicitarNumero(mensagem) {
        const entrada = this.prompt(`${mensagem}: `).trim();
        if (!/^\d+$/.test(entrada)) {
            console.log("Entrada inválida. Digite apenas números.\n");
            return this.solicitarNumero(mensagem);
        }
        return entrada;
    }

    solicitarData(mensagem) {
        const entrada = this.prompt(`${mensagem} (DD/MM/AAAA): `).trim();
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(entrada)) {
            console.log("Data inválida. Use o formato DD/MM/AAAA.\n");
            return this.solicitarData(mensagem);
        }
        return entrada;
    }

    validarOpcao(opcao, opcoesValidas) {
        const opcaoNumerica = parseInt(opcao, 10);
        if (!opcoesValidas.includes(opcaoNumerica)) {
            console.log("Opção inválida. Tente novamente.\n");
            return null; // Retorna null para indicar uma entrada inválida
        }
        return opcaoNumerica;
    }
}