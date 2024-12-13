/**
 * Classe que representa os erros de validação do Paciente
 */
class ErroPaciente {
    static get CPF_INVALIDO() {
        return 1;
    }
    static get NOME_INVALIDO() {
        return 2;
    }
    static get DATA_INVALIDA() {
        return 3;
    }
    static get IDADE_INVALIDA() {
        return 4;
    }
}

export default ErroPaciente;
