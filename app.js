import { Menu } from './utils/Menu.js';
import { Cadastro } from './services/Cadastro.js';
import { Agenda } from './services/Agenda.js';

class App {
    constructor() {
        this.cadastro = new Cadastro();
        this.agenda = new Agenda();
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
                    console.log("Programa encerrado.");
                    break;
                default:
                    console.log("Opção inválida. Tente novamente.");
            }
        }
    }

    gerenciarPacientes() {
        let continuar = true;

        while (continuar) {
            const opcao = Menu.menuPacientes();

            switch (opcao) {
                case 1:
                    this.cadastro.adicionarPaciente();
                    break;
                case 2:
                    this.cadastro.excluirPaciente();
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
                    console.log("Opção inválida. Tente novamente.");
            }
        }
    }

    gerenciarAgenda() {
        let continuar = true;

        while (continuar) {
            const opcao = Menu.menuAgenda();

            switch (opcao) {
                case 1:
                    this.agenda.agendarConsulta();
                    break;
                case 2:
                    this.agenda.cancelarConsulta();
                    break;
                case 3:
                    this.agenda.listarConsultas();
                    break;
                case 4:
                    continuar = false;
                    break;
                default:
                    console.log("Opção inválida. Tente novamente.");
            }
        }
    }
}

// Instancia e inicia o programa
const app = new App();
app.iniciar();