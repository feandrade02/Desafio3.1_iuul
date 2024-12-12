import { Sequelize } from "sequelize";
import Paciente from "../domain/paciente.js"; 
import Consulta from "../domain/consulta.js"
import dbConfig from "./Config.js";
import createModelPaciente from "./schema/Paciente.js";
import createModelConsulta from "./schema/Consulta.js";

/**
 * Classe responsável pelo acesso ao BD e criação dos modelos e relacionamentos
 */
class Db {
    /**
     * Objeto que dá acesso às funcionalidades do Sequelize
     */
    #sequelize;

    /**
     * Inicializa o BD
     *
     * @returns True, se o BD está acessivel, ou False, caso contrário
     */
    async init() {
        this.#sequelize = new Sequelize(
            dbConfig.database,
            dbConfig.username,
            dbConfig.password,
            {
                host: dbConfig.host,
                dialect: dbConfig.dialect,
                logging: false,
            }
        );

        try {
            await this.#sequelize.authenticate();
        } catch (error) {
            return false;
        }

        // Cria os modelos (tabelas)
        createModelPaciente(Paciente, this.#sequelize, Sequelize.DataTypes);
        createModelConsulta(Consulta, this.#sequelize, Sequelize.DataTypes);

        // Cria os relacionamentos
        Paciente.hasMany(Consulta, {
          foreignKey: {
            allowNull: false,
          },
          through: "PacienteConsulta",
          as: "consultas",
        });
        Consulta.belongsTo(Paciente, { through: "PacienteConsulta", as: "pacientes" });

        return true;
    }

    get sequelize() {
        return this.#sequelize;
    }
}

const db = new Db();

export default db;
