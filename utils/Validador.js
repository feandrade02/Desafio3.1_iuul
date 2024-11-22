import { DateTime } from "luxon";

class Validador {

    valida_nome(nome) {
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

    valida_cpf(lista_cpfs, cpf) {
        // Verifica se o CPF tem 11 dígitos ou se todos são iguais
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
           return false;
       }
   
       // Calcula o primeiro dígito verificador (J)
       let soma = 0;
       for (let i = 0; i < 9; i++) {
           soma += parseInt(cpf.charAt(i)) * (10 - i);
       }
       let resto = soma % 11;
       let J = resto < 2 ? 0 : 11 - resto;
   
       // Verifica o primeiro dígito
       if (parseInt(cpf.charAt(9)) !== J) {
           return false;
       }
   
       // Calcula o segundo dígito verificador (K)
       soma = 0;
       for (let i = 0; i < 10; i++) {
           soma += parseInt(cpf.charAt(i)) * (11 - i);
       }
       resto = soma % 11;
       let K = resto < 2 ? 0 : 11 - resto;
   
       // Verifica o segundo dígito
       if (parseInt(cpf.charAt(10)) !== K) {
           return false;
       }
   
       // Verifica se o CPF já está cadastrado
       if (cpf in lista_cpfs) {
           console.log("Erro: CPF já cadastrado.\n")
           return false;
       }
   
       return true;
   }

   valida_data(data) {
        // Tenta criar um objeto DateTime a partir da string no formato "dd/MM/yyyy"
        const formato = "dd/MM/yyyy";
        const dataLuxon = DateTime.fromFormat(data, formato);

        // Verifica se a data é válida e está no formato correto
        return dataLuxon.isValid;
    }

    valida_idade(data_nasc) {
        // Formato esperado da data de nascimento
        const formato = "dd/MM/yyyy";
   
        // Tenta criar um objeto DateTime com a data fornecida
        const nascimento = DateTime.fromFormat(data_nasc, formato);
    
        // Verifica se a data é válida
        if (!nascimento.isValid) {
           console.log("Erro: Data de nascimento inválida. Use o formato DD/MM/AAAA.");
           return false;
        }
    
        // Obtém a data atual
        const hoje = DateTime.now();
    
        // Calcula a diferença em anos entre a data de nascimento e hoje
        const idade = hoje.diff(nascimento, "years").years;
    
        // Retorna true se a idade for maior ou igual a 13
        return idade >= 13;
   }
}