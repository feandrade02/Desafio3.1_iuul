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
}

const repositorioConsulta = new RepositorioConsulta();

export default repositorioConsulta;