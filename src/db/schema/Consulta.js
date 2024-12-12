/**
 * Define as propriedades da classe Consulta e o mapeamento dessas propriedade para a tabela do BD
 *
 * @param {Consulta} Consulta Classe qe será modelada
 * @param {Sequelize} sequelize Instância do Sequelize
 * @param {Sequelize.DataTypes} DataTypes Tipos de dados do Sequelize
 */
const createModelConsulta = (Consulta, sequelize, DataTypes) => {
    Consulta.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            data_consulta: { type: DataTypes.DATEONLY, allowNull: false },
            hora_inicial: { type: DataTypes.STRING(5), allowNull: false },
            hora_final: { type: DataTypes.STRING(5), allowNull: false },
        },
        {
            sequelize,
            indexes: [{ fields: ["hora_inicial", "hora_final"] }],
        }
    );
};

export default createModelConsulta;