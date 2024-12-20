import { DateTime } from "luxon";
import repositorioConsulta from "../repositorio/RepositorioConsulta.js";

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

    static valida_ordem_horarios(horaInicio, horaFinal) {
        if (horaFinal <= horaInicio) {
            console.log("\nErro: O horário final deve ser maior que o inicial.\n");
            return false;
        }
        return true;
    }

    static async ConsultaFutura(cpf) {
        // Obter a data de hoje como um objeto Luxon
        const hoje = DateTime.now();

        // Buscar todas as consultas incluindo o paciente associado
        const consultas = await repositorioConsulta.buscaComPaciente(cpf);

        // Filtrar consulta futura
        const consultaFutura = consultas.find((consulta) => {
            // Converter a data da consulta para um objeto Luxon
            const dataConsulta = DateTime.fromFormat(consulta.data_consulta, "dd/MM/yyyy");

            // Verificar se a consulta está no futuro
            return dataConsulta > hoje;
        });

        // Retornar consulta futura, caso exista, ou então retornar null
        return consultaFutura || null;
    }
}