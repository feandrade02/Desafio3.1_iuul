/**
 * Define as propriedades da classe Paciente e o mapeamento dessas propriedade para a tabela do BD
 *
 * @param {Paciente} Paciente Classe qe será modelada
 * @param {Sequelize} sequelize Instância do Sequelize
 * @param {Sequelize.DataTypes} DataTypes Tipos de dados do Sequelize
 */
const createModelPaciente = (Paciente, sequelize, DataTypes) => {
    Paciente.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            nome: { type: DataTypes.STRING(100), allowNull: false },
            cpf: { type: DataTypes.STRING(11), allowNull: false },
            data_nasc: { type: DataTypes.DATEONLY, allowNull: false },
            idade: { type: DataTypes.INTEGER, allowNull: false },
        },
        {
            sequelize,
            indexes: [{ unique: true, fields: ["cpf"] }],
        }
    );
};

export default createModelPaciente;