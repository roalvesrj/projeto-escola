package br.com.t2m.escola.DTOs;

import br.com.t2m.escola.models.Turma;

import javax.validation.constraints.NotBlank;

public class TurmaDTO {

    private String idTurma;
    @NotBlank(message = "O campo 'nome' não pode ser vazio ou nulo")
    private String nome;
    @NotBlank(message = "O campo 'ano' não pode ser vazio ou nulo")
    private String ano;
    @NotBlank(message = "O campo 'semestre não pode ser vazio ou nulo")
    private String semestre;
    @NotBlank(message = "O campo 'minimoInscricao' não pode ser vazio ou nulo")
    private String minimoInscricao;
    @NotBlank(message = "O campo 'maximoInscricao' não pode ser vazio ou nulo")
    private String maximoInscricao;
    private String idCurso;
    private CursoDTO curso;

    public TurmaDTO() {
    }

    public Turma transformaParaTurma() {
        return new Turma(idTurma, nome, ano, semestre, minimoInscricao, maximoInscricao, idCurso);
    }

    public TurmaDTO(String idTurma, String nome, String ano, String semestre, String minimoInscricao,
                 String maximoInscricao, String cursosIds) {
        this.idTurma = idTurma;
        this.nome = nome;
        this.ano = ano;
        this.semestre = semestre;
        this.minimoInscricao = minimoInscricao;
        this.maximoInscricao = maximoInscricao;
        this.idCurso = cursosIds;
    }

    public TurmaDTO(Turma turma) {
        this.idTurma = turma.getIdTurma();
        this.nome = turma.getNome();
        this.ano = turma.getAno();
        this.semestre = turma.getSemestre();
        this.minimoInscricao = turma.getMinimoInscricao();
        this.maximoInscricao = turma.getMaximoInscricao();
        this.idCurso = turma.getIdCurso();
        this.curso = new CursoDTO();
    }

    public String getIdCurso() {
        return idCurso;
    }

    public void setIdCurso(String idCurso) {
        this.idCurso = idCurso;
    }


    public CursoDTO getCurso() {
        return curso;
    }

    public void setCurso(CursoDTO curso) {
        this.curso = curso;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getIdTurma() {
        return idTurma;
    }

    public void setIdTurma(String idTurma) {
        this.idTurma = idTurma;
    }

    public String getAno() {
        return ano;
    }

    public void setAno(String ano) {
        this.ano = ano;
    }

    public String getSemestre() {
        return semestre;
    }

    public void setSemestre(String semestre) {
        this.semestre = semestre;
    }

    public String getMinimoInscricao() {
        return minimoInscricao;
    }

    public void setMinimoInscricao(String minimoInscricao) {
        this.minimoInscricao = minimoInscricao;
    }

    public String getMaximoInscricao() {
        return maximoInscricao;
    }

    public void setMaximoInscricao(String maximoInscricao) {
        this.maximoInscricao = maximoInscricao;
    }
}
