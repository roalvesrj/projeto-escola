package br.com.t2m.escola.DTOs;

import br.com.t2m.escola.models.Disciplina;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

public class DisciplinaDTO {

    private String idDisciplina;
    @NotBlank(message = "O campo 'nome' não pode ser vazio ou nulo")
    private String nome;
    @NotBlank(message = "O campo 'cargaHoraria' não pode ser vazio ou nulo")
    private String cargaHoraria;
    @NotBlank(message = "O campo 'matriculaProfessor' não pode ser vazio ou nulo")
    private String matriculaProfessor;
    private ProfessorDTO professor;
    private List<String> turmasIds;
    private List<TurmaDTO> turma;

    public DisciplinaDTO() {
    }

    public DisciplinaDTO(Disciplina disciplina) {
        this.idDisciplina = disciplina.getIdDisciplina();
        this.nome = disciplina.getNome();
        this.cargaHoraria = disciplina.getCargaHoraria();
        this.matriculaProfessor = disciplina.getMatriculaProfessor();
        this.professor = new ProfessorDTO();
        this.turmasIds = disciplina.getTurmasIds();
        this.turma = new ArrayList<>();
    }

    public DisciplinaDTO(String idDisciplina, String nome, String cargaHoraria, String matriculaProfessor,
                      List<String> turmasIds) {
        this.idDisciplina = idDisciplina;
        this.nome = nome;
        this.cargaHoraria = cargaHoraria;
        this.matriculaProfessor = matriculaProfessor;
        this.turmasIds = turmasIds;

    }

    public Disciplina transformaParaDisciplina() {
        return new Disciplina(idDisciplina, nome, cargaHoraria, matriculaProfessor, turmasIds);
    }

    public List<String> getTurmasIds() {
        return turmasIds;
    }

    public void setTurmasIds(List<String> turmasIds) {
        this.turmasIds = turmasIds;
    }

    public List<TurmaDTO> getTurma() {
        return turma;
    }

    public void setTurma(List<TurmaDTO> turma) {
        this.turma = turma;
    }

    public ProfessorDTO getProfessor() {
        return professor;
    }

    public void setProfessor(ProfessorDTO professor) {
        this.professor = professor;
    }

    public String getIdDisciplina() {
        return idDisciplina;
    }

    public void setIdDisciplina(String idDisciplina) {
        this.idDisciplina = idDisciplina;
    }

    public String getMatriculaProfessor() {
        return matriculaProfessor;
    }

    public void setMatriculaProfessor(String matriculaProfessor) {
        this.matriculaProfessor = matriculaProfessor;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCargaHoraria() {
        return cargaHoraria;
    }

    public void setCargaHoraria(String cargaHoraria) {
        this.cargaHoraria = cargaHoraria;
    }
}   
     
