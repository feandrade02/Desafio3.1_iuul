import Menu from './utils/Menu.js';
import Cadastro from './services/Cadastro.js';
import Agenda from './services/Agenda.js';

class App {
    constructor() {
    }

    iniciar() {
        let continuar = true;

        while (continuar) {
            const opcao = Menu.menuPrincipal();

            switch (opcao) {
                case 1:
                    this.gerenciarPacientes();
                    break;
                case 2:
                    this.gerenciarAgenda();
                    break;
                case 3:
                    continuar = false;
                    console.log("\nPrograma encerrado.");
                    break;
                default:
                    console.log("\nErro: Opção inválida. Tente novamente.\n");
            }
        }
    }

    gerenciarPacientes() {
        let continuar = true;

        while (continuar) {
            const opcao = Menu.menuPacientes();

            switch (opcao) {
                case 1:
                    Cadastro.cadastrarPaciente();
                    break;
                case 2:
                    Cadastro.excluirPaciente();
                    break;
                case 3:
                    Cadastro.listarPacientes();
                    break;
                case 4:
                    Cadastro.listarPacientes(true);
                    break;
                case 5:
                    continuar = false;
                    break;
                default:
                    console.log("\nErro: Opção inválida. Tente novamente.\n");
            }
        }
    }

    gerenciarAgenda() {
        let continuar = true;

        while (continuar) {
            const opcao = Menu.menuAgenda();

            switch (opcao) {
                case 1:
                    Agenda.agendarConsulta();
                    break;
                case 2:
                    Agenda.cancelarConsulta();
                    break;
                case 3:
                    Agenda.listarConsultas();
                    break;
                case 4:
                    continuar = false;
                    break;
                default:
                    console.log("\nErro: Opção inválida. Tente novamente.\n");
            }
        }
    }
}

// Instancia e inicia o programa
const app = new App();
app.iniciar();