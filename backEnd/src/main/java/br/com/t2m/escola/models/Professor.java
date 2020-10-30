package br.com.t2m.escola.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Professor extends Pessoa {

    @Id
    private String matricula;
    private String status;

    public Professor() {
    }

    public Professor(String matricula, String status, String nome, String rg, String cpf, String nomeSocial,
                     String defFuncional, String dataNascimento, String naturalidade,
                     String email, String telefone, String rua, String cep, String numero, String complemento,
                     String bairro, String cidade, String estado, String genero) {
        this.matricula = matricula;
        this.status = status;
        super.nome = nome;
        super.rg = rg;
        super.cpf = cpf;
        super.nomeSocial = nomeSocial;
        super.defFuncional = defFuncional;
        super.dataNascimento = dataNascimento;
        super.naturalidade = naturalidade;
        super.email = email;
        super.telefone = telefone;
        super.logradouro = rua;
        super.cep = cep;
        super.numero = numero;
        super.complemento = complemento;
        super.bairro = bairro;
        super.cidade = cidade;
        super.estado = estado;
        super.genero = genero;

    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
