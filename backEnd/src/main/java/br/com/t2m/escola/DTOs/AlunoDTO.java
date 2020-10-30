package br.com.t2m.escola.DTOs;

import br.com.t2m.escola.models.Aluno;
import br.com.t2m.escola.models.Pessoa;

import javax.validation.constraints.NotBlank;

public class AlunoDTO extends Pessoa {

    private String matricula;
    private String idTurma;
    @NotBlank(message = "O campo 'responsavel' não pode ser vazio ou nulo")
    private String responsavel;
    @NotBlank(message = "O campo 'nomeMae' não pode ser vazio ou nulo")
    private String nomeMae;
    @NotBlank(message = "O campo 'nomePai' não pode ser vazio ou nulo")
    private String nomePai;
    @NotBlank(message = "O campo 'anoIngresso' não pode ser vazio ou nulo")
    private String anoIngresso;
    private String anoConclusao;
    @NotBlank(message = "O campo 'turno' não pode ser vazio ou nulo")
    private String turno;
    @NotBlank(message = "O campo 'status' não pode ser vazio ou nulo")
    private String status;
    private TurmaDTO turma;

    public AlunoDTO(Aluno aluno) {
        this.matricula = aluno.getMatricula();
        this.idTurma = aluno.getIdTurma();
        this.responsavel = aluno.getResponsavel();
        this.nomeMae = aluno.getNomeMae();
        this.nomePai = aluno.getNomePai();
        this.anoIngresso = aluno.getAnoIngresso();
        this.anoConclusao = aluno.getAnoConclusao();
        this.turno = aluno.getTurno();
        this.status = aluno.getStatus();
        super.nome = aluno.getNome();
        super.rg = aluno.getRg();
        super.cpf = aluno.getCpf();
        super.nomeSocial = aluno.getNomeSocial();
        super.defFuncional = aluno.getDefFuncional();
        super.dataNascimento = aluno.getDataNascimento();
        super.naturalidade = aluno.getNaturalidade();
        super.email = aluno.getEmail();
        super.telefone = aluno.getTelefone();
        super.logradouro = aluno.getLogradouro();
        super.cep = aluno.getCep();
        super.numero = aluno.getNumero();
        super.complemento = aluno.getComplemento();
        super.bairro = aluno.getBairro();
        super.cidade = aluno.getCidade();
        super.estado = aluno.getEstado();
        super.genero = aluno.getGenero();
        this.turma = new TurmaDTO();
    }

    public AlunoDTO() {
    }

    public AlunoDTO(String matricula, String idTurma, String responsavel, String nomeMae, String nomePai,
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

    public Aluno transformaParaAluno() {
        return new Aluno(matricula, idTurma, responsavel, nomeMae, nomePai, anoIngresso, anoConclusao, turno, status,
                nome, rg, cpf, nomeSocial, defFuncional, dataNascimento, naturalidade, email, telefone, logradouro, cep,
                numero, complemento, bairro, cidade, estado, genero);
    }

    public TurmaDTO getTurma() {
        return turma;
    }

    public void setTurma(TurmaDTO turma) {
        this.turma = turma;
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
