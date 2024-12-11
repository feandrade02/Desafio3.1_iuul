import { Model } from "sequelize";
import Result from "./result";

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

        //implementa validações

        //utiliza o método estático build para construir o objeto mapeado para o BD
        return errors.length == 0
            ? Result.success(Paciente.build({ nome, cpf, data_nasc }))
            : Result.failure(errors);
    }

    //podem ser colocados serviços aqui, ou tentar implementar nas classes de serviço
}

export default Paciente;