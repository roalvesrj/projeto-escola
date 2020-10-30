package br.com.t2m.escola.services;

import br.com.t2m.escola.DTOs.CursoDTO;
import br.com.t2m.escola.DTOs.DTOMapper;
import br.com.t2m.escola.DTOs.TurmaDTO;
import br.com.t2m.escola.models.Curso;
import br.com.t2m.escola.repositorys.CursoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.NoSuchElementException;
import java.util.Optional;

import static com.sun.xml.internal.ws.spi.db.BindingContextFactory.LOGGER;

@Slf4j
@Service
public class CursoService {

    private CursoRepository cursoRepository;
    private DTOMapper dtoMapper;

    public CursoService(CursoRepository cursoRepository, DTOMapper dtoMapper) {
        this.cursoRepository = cursoRepository;
        this.dtoMapper = dtoMapper;
    }

    public Page<CursoDTO> getAll(Pageable p) {
        log.info("Buscando página de cursoDTO");
        try{
            Page<Curso> cursoPage = cursoRepository.findAll(p);
            Page<CursoDTO> cursoDTOPage = dtoMapper.mapPage(cursoPage, CursoDTO.class);
            log.info("Página de cursoDTO encontrada com sucesso !");
            return cursoDTOPage;
        } catch (Exception e) {
            log.error("Erro ao buscar página de cursoDTO");
            return Page.empty();
        }
    }

    public Optional<CursoDTO> findById(String id) {
        log.info("Tentando encontrar cursoDTO por id");
        try {
            Optional<Curso> optionalCurso = cursoRepository.findById(id);
            Curso curso = optionalCurso.get();
            log.info("CursoDTO encontrado com sucesso !");
            return Optional.of(new CursoDTO(curso));
        } catch (NoSuchElementException exception) {
            log.error("Erro ao buscar cursoDTO por id");
            return Optional.empty();
        }
    }

    public CursoDTO create(CursoDTO dto) {
        log.info("Tentando criar um cursoDTO");
            Curso curso = dto.transformaParaCurso();
            Curso cursoPersistido = cursoRepository.save(curso);
            log.info("CursoDTO criado com sucesso !");
            return new CursoDTO(cursoPersistido);

    }

    public CursoDTO update(CursoDTO dto) {
        log.info("Tentando atualizar um cursoDTO");
        Curso curso = dto.AtualizaParaCurso();
        Curso cursoPersistido = cursoRepository.save(curso);
        log.info("CursoDTO atualizado com sucesso !");
        return new CursoDTO(cursoPersistido);
    }

    public void deleteById(String id) {
        log.info("CursoDTO deletado com sucesso !");
        cursoRepository.deleteById(id);
    }
}
