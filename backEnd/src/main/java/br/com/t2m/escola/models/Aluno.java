package br.com.t2m.escola.models;

import br.com.t2m.escola.DTOs.AlunoDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Slf4j
@Document
public class Aluno extends Pessoa {

    @Id
    private String matricula;
    private String responsavel;
    private String nomeMae;
    private String nomePai;
    private String anoIngresso;
    private String anoConclusao;
    private String turno;
    private String status;
    private String idTurma;

    public Aluno() {
    }

    public AlunoDTO transformaParaAlunoDTO() {
        return new AlunoDTO(matricula, idTurma, responsavel, nomeMae, nomePai, anoIngresso, anoConclusao, turno, status,
                nome, rg, cpf, nomeSocial, defFuncional, dataNascimento, naturalidade, email, telefone, logradouro, cep,
                numero, complemento, bairro, cidade, estado, genero);
    }

    public Aluno(String matricula, String idTurma, String responsavel, String nomeMae, String nomePai,
                 String anoIngresso, String anoConclusao, String turno, String status, String nome, String rg,
                 String cpf, String nomeSocial, String defFuncional, String dataNascimento, String naturalidade,
                 String email, String telefone, String rua, String cep, String numero, String complemento,
                 String bairro, String cidade, String estado, String genero) {
        this.matricula = matricula;
        this.idTurma = idTurma;
        this.responsavel = responsavel;
        this.nomeMae = nomeMae;
        this.nomePai = nomePai;
        this.anoIngresso = anoIngresso;
        this.anoConclusao = anoConclusao;
        this.turno = turno;
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

    public String getIdTurma() {
        return idTurma;
    }

    public void setIdTurma(String idTurma) {
        this.idTurma = idTurma;
    }

    public String getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }

    public String getNomeMae() {
        return nomeMae;
    }

    public void setNomeMae(String nomeMae) {
        this.nomeMae = nomeMae;
    }

    public String getNomePai() {
        return nomePai;
    }

    public void setNomePai(String nomePai) {
        this.nomePai = nomePai;
    }

    public String getAnoIngresso() {
        return anoIngresso;
    }

    public void setAnoIngresso(String anoIngresso) {
        this.anoIngresso = anoIngresso;
    }

    public String getAnoConclusao() {
        return anoConclusao;
    }

    public void setAnoConclusao(String anoConclusao) {
        this.anoConclusao = anoConclusao;
    }

    public String getTurno() {
        return turno;
    }

    public void setTurno(String turno) {
        this.turno = turno;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
