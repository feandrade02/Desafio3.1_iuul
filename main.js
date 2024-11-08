//Arquivo com script de obtenção e validação de dados

function valida_nome(nome) {
    if (typeof nome !== 'string' || nome.length < 5) {
        console.log("O nome deve ter pelo menos 5 caracteres.\n");
        return false
    }
    if (!/^[A-Za-z\s]+$/.test(nome)) {
        console.log("O nome deve conter apenas letras.\n");
        return false
    }

    return true
}

function valida_cpf(cpf) {
    
}