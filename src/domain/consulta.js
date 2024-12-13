import { Model } from "sequelize";
import Result from "./result";
import Validador from "../utils/Validador";
import ErroConsulta from "./erro-consulta";

/**
 * Classe Consulta
 */

class Consulta extends Model {
    /**
     * Método fábrica para validação de dados e criação da Consulta
     * 
     * @param {Date} data_consulta
     * @param {string} hora_inicial
     * @param {string} hora_final
     * @returns Consulta ou lista de erros, em caso de erro de validação
     */
    static of(data_consulta, hora_inicial, hora_final) {
        const errors = [];

        //implementa validações
        if (!Validador.valida_data(data_consulta)) errors.push(ErroConsulta.DATA_INVALIDA);
        if (!Validador.validaHorario(hora_inicial)) errors.push(ErroConsulta.HORA_INVALIDA);
        if (!Validador.validaHorario(hora_final)) errors.push(ErroConsulta.HORA_INVALIDA);

        //utiliza o método estático build para construir o objeto mapeado para o BD
        return errors.length == 0
            ? Result.success(Consulta.build({ data_consulta, hora_inicial, hora_final }))
            : Result.failure(errors);
    }

    
}

export default Consulta;