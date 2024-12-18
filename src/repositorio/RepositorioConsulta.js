import Consulta from "../domain/consulta";

/**
 * Repositório de Consultas
 */
class RepositorioConsulta {
    /**
     * Salva uma consulta no repositório (insert ou update)
     * 
     * @param {Consulta} consulta
     */
    async salva(consulta) {
        if (consulta !== null) await consulta.save();
    }

    /**
     * Remove uma consulta do repositório
     * 
     * @param {Consulta} consulta
     */
    async remove(consulta) {
        if (consulta !== null) await consulta.destroy();
    }

    /**
     * Recupera todas as consultas do repositório
     * 
     * @returns Lista de consultas
     */
    async buscaTodos() {
        return await Consulta.findAll({
            include: {
                model: Paciente,
                as: "paciente",
            },
        });
    }

    /**
     * 
     * @param {String} cpf 
     * @returns Lista de consultas do paciente especificado
     */
    async buscaComPaciente(cpf) {
        return await Consulta.findAll({
            include: [
                {
                    model: Paciente,
                    as: "pacientes",
                    where: { cpf },
                    required: true,
                },
            ],
        });
    }

    /**
     * Busca uma consulta por CPF, data e hora inicial.
     *
     * @param {String} cpf - CPF do paciente.
     * @param {String} data - Data da consulta no formato "dd/MM/yyyy".
     * @param {String} horaInicio - Hora inicial no formato "HHmm".
     * @returns {Consulta|null} - A consulta encontrada ou null se não existir.
     */
    async buscaConsultaPorHorario(cpf, data, horaInicio) {
        const dataConsulta = DateTime.fromFormat(data, "dd/MM/yyyy").toISODate();
        const hora = horaInicio.slice(0, 2) + ":" + horaInicio.slice(2);

        return await Consulta.findOne({
            include: [
                {
                    model: Paciente,
                    as: "paciente",
                    where: { cpf },
                    required: true,
                },
            ],
            where: {
                data_consulta: dataConsulta,
                hora_inicio: hora,
            },
        });
    }

    /**
     * Recupera consultas dentro de um período de tempo fornecido
     * 
     * @param {Date} dataInicial Data inicial do período
     * @param {Date} dataFinal Data final do período
     * @returns Lista de consultas no período especificado
     */
    async buscaPorPeriodo(dataInicial, dataFinal) {
        return await Consulta.findAll({
            include: {
                model: Paciente,
                as: "paciente",
            },
            where: {
                data_consulta: {
                    [Op.between]: [dataInicial, dataFinal],
                },
            },
            order: [["data_consulta", "ASC"]], // Ordena as consultas por data em ordem crescente (ASC, do inglês ascendent)
        });
    }

    /**
     * Verifica se há conflito de horários para uma nova consulta
     * 
     * @param {String} data Data da consulta no formato "yyyy-MM-dd"
     * @param {String} horaInicio Hora inicial no formato "HHmm"
     * @param {String} horaFim Hora final no formato "HHmm"
     * @returns {Promise<Consulta|null>} Retorna a consulta conflitante, se houver; caso contrário, null
     */
    async temConflito(data, horaInicio, horaFim) {
        const inicioNova = `${data}T${horaInicio.substring(0, 2)}:${horaInicio.substring(2, 4)}:00`;
        const fimNova = `${data}T${horaFim.substring(0, 2)}:${horaFim.substring(2, 4)}:00`;

        const consultaConflitante = await Consulta.findOne({
            where: {
                data_consulta: data,
                [Op.or]: [
                    {
                        hora_inicio: {
                            [Op.between]: [inicioNova, fimNova],
                        },
                    },
                    {
                        hora_fim: {
                            [Op.between]: [inicioNova, fimNova],
                        },
                    },
                    {
                        [Op.and]: [
                            { hora_inicio: { [Op.lte]: inicioNova } },
                            { hora_fim: { [Op.gte]: fimNova } },
                        ],
                    },
                ],
            },
        });

        return consultaConflitante;
    }
}

const repositorioConsulta = new RepositorioConsulta();

export default repositorioConsulta;