export default class Menu {

    static menuPrincipal(prompt) {
        console.log("\nMenu Principal\n1-Cadastro de pacientes\n2-Agenda\n3-Fim\n");
        const opcao = prompt("Escolha uma opção: ");
        return this.converteOpcao(opcao);
    }

    static menuPacientes(prompt) {
        console.log("\nMenu do Cadastro de Pacientes\n1-Cadastrar novo paciente\n2-Excluir paciente\n3-Listar pacientes (ordenado por CPF)\n4-Listar pacientes (ordenado por nome)\n5-Voltar p/ menu principal\n");
        const opcao = prompt("Escolha uma opção: ");
        return this.converteOpcao(opcao);
    }

    static menuAgenda(prompt) {
        console.log("\nAgenda\n1-Agendar consulta\n2-Cancelar agendamento\n3-Listar agenda\n4-Voltar p/ menu principal\n");
        const opcao = prompt("Escolha uma opção: ");
        return this.converteOpcao(opcao);
    }

    static converteOpcao(opcao) {
        const opcaoNumerica = parseInt(opcao, 10);
        return opcaoNumerica;
    }
}