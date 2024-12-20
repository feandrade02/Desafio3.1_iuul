import promptSync from 'prompt-sync';

import Menu from './utils/Menu.js';
import Cadastro from './services/Cadastro.js';
import Agenda from './services/Agenda.js';
import db from "./db/db.js"

class App {

    iniciar(prompt) {
        let continuar = true;

        while (continuar) {
            const opcao = Menu.menuPrincipal(prompt);

            switch (opcao) {
                case 1:
                    this.gerenciarPacientes(prompt);
                    break;
                case 2:
                    this.gerenciarAgenda(prompt);
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

    gerenciarPacientes(prompt) {
        let continuar = true;

        while (continuar) {
            const opcao = Menu.menuPacientes(prompt);

            switch (opcao) {
                case 1:
                    Cadastro.cadastrarPaciente(prompt);
                    break;
                case 2:
                    Cadastro.excluirPaciente(prompt);
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

    gerenciarAgenda(prompt) {
        let continuar = true;

        while (continuar) {
            const opcao = Menu.menuAgenda(prompt);

            switch (opcao) {
                case 1:
                    Agenda.agendarConsulta(prompt);
                    break;
                case 2:
                    Agenda.cancelarConsulta(prompt);
                    break;
                case 3:
                    Agenda.listarConsultas(prompt);
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

const prompt = promptSync();

const initialized = await db.init();

if (!initialized) {
    console.log("Problemas na conexão com o BD (fora do ar?)");
    process.exit(1);
}

// Executar esse comando SOMENTE a primeira vez para criar as tabelas
// await db.sequelize.sync({ force: true });

app.iniciar(prompt);