package br.com.t2m.escola.models;

import br.com.t2m.escola.DTOs.TurmaDTO;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Turma {

    @Id
    private String idTurma;
    private String nome;
    private String ano;
    private String semestre;
    private String minimoInscricao;
    private String maximoInscricao;
    private String idCurso;

    public Turma() {
    }

    public TurmaDTO transformaParaTurmaDTO() {
        return new TurmaDTO(idTurma, nome, ano, semestre, minimoInscricao, maximoInscricao, idCurso);
    }

    public Turma(String idTurma, String nome, String ano, String semestre, String minimoInscricao,
                 String maximoInscricao, String cursosIds) {
        this.idTurma = idTurma;
        this.nome = nome;
        this.ano = ano;
        this.semestre = semestre;
        this.minimoInscricao = minimoInscricao;
        this.maximoInscricao = maximoInscricao;
        this.idCurso = cursosIds;
    }

    public String getIdCurso() {
        return idCurso;
    }

    public void setIdCurso(String idCurso) {
        this.idCurso = idCurso;
    }

    public String getIdTurma() {
        return idTurma;
    }

    public void setIdTurma(String idTurma) {
        this.idTurma = idTurma;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
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
