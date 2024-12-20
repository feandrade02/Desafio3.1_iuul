import { Model } from "sequelize";
import Result from "./result.js";
import Validador from "../utils/Validador.js";
import ErroConsulta from "./erro-consulta.js";

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
        if (!Validador.valida_ordem_horarios(hora_inicial, hora_final)) errors.push(ErroConsulta.ORDEM_INVALIDA);

        // Tenta criar um objeto DateTime a partir da string no formato "dd/MM/yyyy"
        const formato = "dd/MM/yyyy";
        const dataLuxon = DateTime.fromFormat(data_consulta, formato);
        data_consulta = dataLuxon.toISODate(); // Data da consulta formatada em ISO

        //utiliza o método estático build para construir o objeto mapeado para o BD
        return errors.length == 0
            ? Result.success(Consulta.build({ data_consulta, hora_inicial, hora_final }))
            : Result.failure(errors);
    }

    
}

export default Consulta;