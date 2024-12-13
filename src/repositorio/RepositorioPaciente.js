import Paciente from "../domain/paciente";

/**
 * Repositório de Pacientes
 */
class RepositorioPaciente {
    /**
     * Salva um paciente no repositório (insert ou update)
     * 
     * @param {Paciente} paciente
     */
    async salva(paciente) {
        if (paciente !== null) await paciente.save();
    }

    /**
     * Remove um paciente do repositório
     * 
     * @param {Paciente} paciente
     */
    async remove(paciente) {
        if (paciente !== null) await paciente.destroy(); 
    }

    /**
     * Recupera paciente pelo CPF
     * 
     * @param {string} cpf
     * @returns Paciente ou null, caso não exista
     */
    async buscaPorCPF(cpf) {
        return await Paciente.findOne({ where: { cpf } });
    }

    /**
     * Recupera todos os pacientes
     * 
     * @returns Lista de pacientes
     */
    async buscaTodos() {
        return await Paciente.findAll();
    }
}

const repositorioPaciente = new RepositorioPaciente();

export default repositorioPaciente;