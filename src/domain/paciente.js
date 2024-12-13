import { Model } from "sequelize";
import { DateTime } from "luxon";
import Result from "./result";
import ErroPaciente from "./erro-paciente";
import Validador from "../utils/Validador";

/**
 * Classe Paciente
 */

class Paciente extends Model {
    /**
     * Método fábrica para validação dos dados e criação do Paciente.
     * 
     * @param {string} nome
     * @param {string} cpf
     * @param {Date} data_nasc
     * @returns Paciente ou uma lista de erros, em caso de erro de validação
     */
    static of(nome, cpf, data_nasc) {
        const errors = [];

        // Validações
        if (!Validador.valida_cpf(cpf)) errors.push(ErroPaciente.CPF_INVALIDO);

        if (!Validador.valida_nome(nome)) errors.push(ErroPaciente.NOME_INVALIDO);

        if(!Validador.valida_data(data_nasc)) errors.push(ErroPaciente.DATA_INVALIDA);
        
        // Tenta criar um objeto DateTime a partir da string no formato "dd/MM/yyyy"
        const formato = "dd/MM/yyyy";
        const dataLuxon = DateTime.fromFormat(data_nasc, formato);
        data_nasc = dataLuxon.toFormat(formato); // Data de nascimento formatada

        // Calculo da idade do paciente
        const hoje = DateTime.now();
        const idade = Math.floor(hoje.diff(dataLuxon, "years").years);

        // Valida idade
        if (!Validador.valida_idade(idade)) errors.push(ErroPaciente.IDADE_INVALIDA);

        // utiliza o método estático build para construir o objeto mapeado para o BD
        return errors.length == 0
            ? Result.success(Paciente.build({ nome, cpf, data_nasc, idade }))
            : Result.failure(errors);
    }

    /**
     * Atribui consulta agendada ao respectivo paciente
     * 
     * @param {Consulta} consulta Consulta agendada
     * @returns true se a consulta pode ser atribuida ao paciente, ou false, se a consulta já está atribuída ou a consulta é inválida
     */
    async agenda(consulta) {
        if (!consulta) {
            console.log("\n Erro: Consulta inválida!\n");
            return false;
        }

        // Esse método é gerado pelo Sequelize com base no relacionamento Paciente/Consulta.
        // Ele vai inserir essa informação no BD.
        await this.addConsulta(consulta);

        return true;
    }
};

export default Paciente;