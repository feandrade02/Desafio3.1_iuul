/**
 * Classe que representa os erros de validação da Consulta
 */
class ErroConsulta {
    static get DATA_INVALIDA() {
        return 1;
    }
    static get HORA_INVALIDA() {
        return 2;
    }
}

export default ErroConsulta;
