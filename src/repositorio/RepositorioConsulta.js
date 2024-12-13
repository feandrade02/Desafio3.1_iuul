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
        return await Consulta.findAll();
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
            where: {
                data_consulta: {
                    [Op.between]: [dataInicial, dataFinal],
                },
            },
            order: [["data_consulta", "ASC"]], // Ordena as consultas por data
        });
    }
}

const repositorioConsulta = new RepositorioConsulta();

export default repositorioConsulta;