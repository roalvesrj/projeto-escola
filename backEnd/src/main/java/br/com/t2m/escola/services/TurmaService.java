package br.com.t2m.escola.services;

import br.com.t2m.escola.DTOs.*;
import br.com.t2m.escola.models.Turma;
import br.com.t2m.escola.repositorys.TurmaRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@Service
public class TurmaService {

    private TurmaRepository turmaRepository;
    private DTOMapper dtoMapper;
    private CursoService cursoService;

    public TurmaService(TurmaRepository turmaRepository, DTOMapper dtoMapper, CursoService cursoService) {
        this.turmaRepository = turmaRepository;
        this.dtoMapper = dtoMapper;
        this.cursoService = cursoService;
    }

    public Page<TurmaDTO> getAll(Pageable p) {
        log.info("Buscando página de turmaDTO");
        try {

            Page<Turma> turmaPage = turmaRepository.findAll(p);
            Page<TurmaDTO> turmaDTOPage = dtoMapper.mapPage(turmaPage, TurmaDTO.class);
            turmaDTOPage.map(turmaDTO -> {
                log.info("Buscando curso dentro de turmaDTO");
            if (turmaDTO.getIdCurso() != null) {
                Optional<CursoDTO> cursoDTO = cursoService.findById(turmaDTO.getIdCurso());
                if (cursoDTO.isPresent()) {
                    log.info("CursoDTO encontrado dentro de turmaDTO");
                    turmaDTO.setCurso(cursoDTO.get());
                }
            }
                return turmaDTO;

        });
            log.info("Página de turmaDTO encontrada com sucesso !");
            return turmaDTOPage;
        }catch (Exception e){
            log.error("Erro ao buscar página de turmaDTO");
            return Page.empty();
        }
    }

    public Optional<TurmaDTO> findById(String id) {
        log.info("Buscando uma turmaDTO por id");
        try {
            Optional<Turma> turmaOptinal = turmaRepository.findById(id);
            log.info("Transformando turmaOptional em turmaDTO ");
            TurmaDTO turmaDTO = turmaOptinal.get().transformaParaTurmaDTO();
            if (turmaOptinal.get().getIdCurso() != null){
                log.info("Buscando curso por id");
                Optional<CursoDTO> cursoDTO = cursoService.findById(turmaOptinal.get().getIdCurso());
                if(cursoDTO.isPresent()){
                    log.info("Setando valores de curso dentro de turmaDTO");
                    turmaDTO.setCurso(cursoDTO.get());
                    return Optional.of(turmaDTO);
                }
            }
            log.info("Passando valores de turmaOptional para turma");
            Turma turma = turmaOptinal.get();
            log.info("Setando valores de turma em nova TurmaDTO");
            return Optional.of(new TurmaDTO(turma));
        } catch (NoSuchElementException exception) {
            log.error("Erro ao buscar uma turma por id");
            return Optional.empty();
        }
    }

    public TurmaDTO create(TurmaDTO dto) {
        log.info("Tentando criar turmaDTO");
        Turma turma = dto.transformaParaTurma();
        Turma turmaPersistida = turmaRepository.save(turma);
        log.info("turmaDTO criada com sucesso !");
        return new TurmaDTO(turmaPersistida);
    }

    public TurmaDTO update(TurmaDTO dto) {
        log.info("Tentando atualizar turmaDTO");
        Turma turma = dto.transformaParaTurma();
        Turma turmaPersistida = turmaRepository.save(turma);
        log.info("TurmaDTO atualizada com sucesso !");
        return new TurmaDTO(turmaPersistida);
    }

    public void deleteById(String id) {
        log.info("TurmaDTO deletada com sucesso !");
        turmaRepository.deleteById(id);
    }
}
