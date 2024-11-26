import { DateTime } from "luxon";

export default class Validador {

    valida_nome(nome) {
        if (typeof nome !== 'string' || nome.length < 5) {
            console.log("\nErro: O nome deve ter pelo menos 5 caracteres.\n");
            return false
        }
        if (!/^[A-Za-z\s]+$/.test(nome)) {
            console.log("\nErro: O nome deve conter apenas letras.\n");
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
           console.log("\nErro: CPF já cadastrado.\n")
           return false;
       }
   
       return true;
   }

   valida_data(data) {
    
        const formato = "dd/MM/yyyy";
        const dataLuxon = DateTime.fromFormat(data, formato);

        if (!dataLuxon.isValid) {
            console.log("\nErro: Data inválida. Use o formato DD/MM/AAAA.");
            return false;
        }
        return true;
    }

    valida_idade(idade) {
        if (idade < 13) {
            console.log("\nErro: paciente deve ter pelo menos 13 anos.")
            return false;
        }

        return true;
   }
}