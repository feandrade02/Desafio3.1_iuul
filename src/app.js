import Menu from './utils/Menu.js';
import Cadastro from './services/Cadastro.js';
import Agenda from './services/Agenda.js';

class App {
    constructor() {
        this.cadastro = new Cadastro();
        this.agenda = new Agenda();
        this.menu = new Menu();
    }

    iniciar() {
        let continuar = true;

        while (continuar) {
            const opcao = this.menu.menuPrincipal();

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
            const opcao = this.menu.menuPacientes();

            switch (opcao) {
                case 1:
                    this.cadastro.adicionarPaciente();
                    break;
                case 2:
                    this.cadastro.excluirPaciente(this.agenda);
                    break;
                case 3:
                    this.cadastro.listarPacientes("cpf", this.agenda);
                    break;
                case 4:
                    this.cadastro.listarPacientes("nome", this.agenda);
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
            const opcao = this.menu.menuAgenda();

            switch (opcao) {
                case 1:
                    this.agenda.agendarConsulta(this.cadastro);
                    break;
                case 2:
                    this.agenda.cancelarConsulta(this.cadastro);
                    break;
                case 3:
                    this.agenda.listarConsultas();
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