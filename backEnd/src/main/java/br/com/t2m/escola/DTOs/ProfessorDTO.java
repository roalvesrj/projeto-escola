package br.com.t2m.escola.DTOs;

import br.com.t2m.escola.models.Pessoa;
import br.com.t2m.escola.models.Professor;

import javax.validation.constraints.NotBlank;

public class ProfessorDTO extends Pessoa {

    private String matricula;
    @NotBlank(message = "O campor 'status' não pode ser vazio ou nulo")
    private String status;

    public ProfessorDTO(Professor professor) {
        this.matricula = professor.getMatricula();
        this.status = professor.getStatus();
        super.nome = professor.getNome();
        super.rg = professor.getRg();
        super.cpf = professor.getCpf();
        super.nomeSocial = professor.getNomeSocial();
        super.defFuncional = professor.getDefFuncional();
        super.dataNascimento = professor.getDataNascimento();
        super.naturalidade = professor.getNaturalidade();
        super.email = professor.getEmail();
        super.telefone = professor.getTelefone();
        super.logradouro = professor.getLogradouro();
        super.cep = professor.getCep();
        super.numero = professor.getNumero();
        super.complemento = professor.getComplemento();
        super.bairro = professor.getBairro();
        super.cidade = professor.getCidade();
        super.estado = professor.getEstado();
        super.genero = professor.getGenero();

    }

    public ProfessorDTO(String matricula, String status, String nome, String rg, String cpf, String nomeSocial,
                        String defFuncional, String dataNascimento, String naturalidade, String email, String telefone,
                        String rua, String cep, String numero, String complemento, String bairro, String cidade,
                        String estado, String genero) {
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

    public ProfessorDTO() {
    }

    public Professor transformaParaProfessor() {
        return new Professor(matricula, status, nome, rg, cpf, nomeSocial, defFuncional, dataNascimento, naturalidade,
                email, telefone, logradouro, cep, numero, complemento, bairro, cidade, estado, genero);
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
