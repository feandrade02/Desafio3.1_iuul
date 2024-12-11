import { Model } from "sequelize";
import Result from "./result";

/**
 * Classe Consulta
 */

class Consulta extends Model {
    /**
     * Método fábrica para validação de dados e criação da Consulta
     * 
     * @param {Paciente} paciente
     * @param {Date} data_consulta
     * @param {string} hora_inicial
     * @param {string} hora_final
     * @returns Consulta ou lista de erros, em caso de erro de validação
     */
    static of(paciente, data_consulta, hora_inicial, hora_final) {
        const errors = [];

        //implementa validações

        //utiliza o método estático build para construir o objeto mapeado para o BD
        return errors.length == 0
            ? Result.success(Consulta.build({ paciente, data_consulta, hora_inicial, hora_final }))
            : Result.failure(errors);
    }

    //podem ser colocados serviços aqui, ou tentar implementar nas classes de serviço
}

export default Consulta;