package br.com.t2m.escola.services;

import br.com.t2m.escola.DTOs.*;
import br.com.t2m.escola.models.Disciplina;
import br.com.t2m.escola.repositorys.DisciplinaRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@Service
public class DisciplinaService {

    private DisciplinaRepository disciplinaRepository;
    private DTOMapper dtoMapper;
    private ProfessorService professorService;
    private TurmaService turmaService;

    public DisciplinaService(DisciplinaRepository disciplinaRepository, DTOMapper dtoMapper,
                             ProfessorService professorService, TurmaService turmaService) {
        this.disciplinaRepository = disciplinaRepository;
        this.dtoMapper = dtoMapper;
        this.professorService = professorService;
        this.turmaService = turmaService;
    }

    public Page<DisciplinaDTO> getAll(Pageable p) {
        log.info("Buscando página de disciplinaDTO");
        try{
            Page<Disciplina> disciplinaPage = disciplinaRepository.findAll(p);
            Page<DisciplinaDTO> disciplinaDTOPage = dtoMapper.mapPage(disciplinaPage, DisciplinaDTO.class);
            disciplinaDTOPage.map(disciplinaDTO -> {
            if (disciplinaDTO.getMatriculaProfessor() != null) {
                log.info("Buscando professorDTO em disciplinaDTO por id");
                Optional<ProfessorDTO> professorDTO =
                        professorService.findById(disciplinaDTO.getMatriculaProfessor());
                if (professorDTO.isPresent()) {
                    log.info("ProfessorDTO encontrado em disciplinaDTO com sucesso !");
                    disciplinaDTO.setProfessor(professorDTO.get());
                }
            }
                if (disciplinaDTO.getTurmasIds() != null){
                    log.info("Buscando turmaDTO em disciplinaDTO");
                    disciplinaDTO.getTurmasIds().stream().forEach(idTurma -> {
                        Optional<TurmaDTO> turmaDTO = turmaService.findById(idTurma);
                    if (disciplinaDTO.getTurma() == null) {
                        disciplinaDTO.setTurma(new ArrayList<>());
                    }
                        log.info("turmaDTO encontrado em disciplinaDTO com sucesso !");
                        disciplinaDTO.getTurma().add(turmaDTO.get());
                });
                }
                return disciplinaDTO;
        });
            log.info("Página de disciplinaDTO encontrada com sucesso !");
            return disciplinaDTOPage;
        }catch (Exception e){
            log.error("Erro ao buscar página de disciplinaDTO");
            return Page.empty();
        }
    }

    public Optional<DisciplinaDTO> findById(String id) {
        log.info("Buscando disciplinaDTO por id");
        try{
            log.info("Buscando disciplinaDTO no sistema");
            Optional<Disciplina> disciplinaOptional = disciplinaRepository.findById(id);
            DisciplinaDTO disciplinaDTO = disciplinaOptional.get().transformaParaDisciplinaDTO();
                if (disciplinaOptional.get().getMatriculaProfessor() != null){
                    log.info("Buscando professorDTO em disciplina");
                    Optional<ProfessorDTO> professorDTO =
                            professorService.findById(disciplinaDTO.getMatriculaProfessor());
                    if(professorDTO.isPresent()){
                        log.info("ProfessorDTO encontrado com sucesso !");
                        disciplinaDTO.setProfessor(professorDTO.get());
                    }
                }
                log.info("Buscando turmaDTO em disciplina");
                if (disciplinaDTO.getTurmasIds() != null){
                    log.info("TurmaDTO encontrado com sucesso");
                    disciplinaDTO.getTurmasIds().stream().forEach(idTurma -> {
                        Optional<TurmaDTO> turmaDTO = turmaService.findById(idTurma);
                    if (disciplinaDTO.getTurma() == null) {
                        disciplinaDTO.setTurma(new ArrayList<>());
                    }
                        disciplinaDTO.getTurma().add(turmaDTO.get());
                });
                    return Optional.of(disciplinaDTO);
                }
                log.info("DisciplinaDTO por id encontrado com sucesso !");
                Disciplina disciplina = disciplinaOptional.get();
                return Optional.of(new DisciplinaDTO(disciplina));
            } catch (NoSuchElementException exception) {
                log.error("Erro ao buscar disciplinaDTO por id");
                return Optional.empty();
            }
    }

    public DisciplinaDTO create(DisciplinaDTO dto) {
        log.info("Tentando criar uma disciplinaDTO");
        Disciplina disciplina = dto.transformaParaDisciplina();
        Disciplina disciplinaPersistida = disciplinaRepository.save(disciplina);
        log.info("DisciplinaDTO criada com sucesso !");
        return new DisciplinaDTO(disciplinaPersistida);
    }

    public DisciplinaDTO update(DisciplinaDTO dto) {
        log.info("Tentando atualizar uma disciplinaDTO");
        Disciplina disciplina = dto.transformaParaDisciplina();
        Disciplina displinaPersistida = disciplinaRepository.save(disciplina);
        log.info("DisciplinaDTO atualizada com sucesso !");
        return new DisciplinaDTO(displinaPersistida);
    }

    public void deleteById(String id) {
        log.info("DisciplinaDTO deletado com sucesso !");
        disciplinaRepository.deleteById(id);
    }

}
