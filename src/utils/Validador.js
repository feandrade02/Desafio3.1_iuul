import { DateTime } from "luxon";

export default class Validador {

    static valida_nome(nome) {
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

    static valida_cpf(cpf) {
        // Verifica se o CPF tem 11 dígitos ou se todos são iguais
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            console.log("\nErro: CPF inválido.\n");
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
        console.log("\nErro: CPF inválido.\n");
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
        console.log("\nErro: CPF inválido.\n");
        return false;
       }
   
       return true;
   }

   static consulta_cpf_cadastrado(lista_cpfs, cpf) {
    // Verifica se o CPF já está cadastrado
    if (lista_cpfs.includes(cpf)) {
        console.log("\nErro: CPF já cadastrado.\n")
        return false;
    }
    return true;
   }

   static consulta_cpf_nao_cadastrado(lista_cpfs, cpf) {
    // Verifica se o CPF não está cadastrado
    if (!lista_cpfs.includes(cpf)) {
        console.log("\nErro: CPF não cadastrado.\n")
        return false;
    }
    return true;
   }

   static valida_data(data) {
    
        const formato = "dd/MM/yyyy";
        const dataLuxon = DateTime.fromFormat(data, formato);

        if (!dataLuxon.isValid) {
            console.log("\nErro: Data inválida. Use o formato DD/MM/AAAA.");
            return false;
        }
        return true;
    }

    static valida_idade(idade) {
        if (idade < 13) {
            console.log("\nErro: paciente deve ter pelo menos 13 anos.")
            return false;
        }

        return true;
   }

    static validaHorario(horario) {
        if (!(/^[0-1][0-9][0-5][0-9]$/.test(horario) && parseInt(horario.slice(0, 2)) >= 8 && parseInt(horario.slice(0, 2)) < 19)) {
            console.log("\nErro: Horário inválido. Use o formato HHMM com intervalos de 15 minutos.\n")
            return false;
        };
        return true;
    }

    static valida_opcao_listagem_agenda(opcao) {
        if (opcao != "P" && opcao != "T") {
            console.log("\nErro: opção inválida.\n");
            return false;
        }
        return true;
    }
}