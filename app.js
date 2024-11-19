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
            const opcao = Menu.exibirMenuPrincipal();

            switch (opcao) {
                case 1:
                    this.gerenciarPacientes();
                    break;
                case 2:
                    this.gerenciarAgenda();
                    break;
                case 0:
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
            const opcao = Menu.exibirMenuPacientes();

            switch (opcao) {
                case 1:
                    this.cadastro.adicionarPaciente();
                    break;
                case 2:
                    this.cadastro.listarPacientes();
                    break;
                case 3:
                    this.cadastro.excluirPaciente();
                    break;
                case 0:
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
            const opcao = Menu.exibirMenuAgenda();

            switch (opcao) {
                case 1:
                    this.agenda.agendarConsulta();
                    break;
                case 2:
                    this.agenda.listarConsultas();
                    break;
                case 3:
                    this.agenda.cancelarConsulta();
                    break;
                case 0:
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