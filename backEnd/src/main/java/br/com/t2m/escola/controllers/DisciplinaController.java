package br.com.t2m.escola.controllers;

import br.com.t2m.escola.DTOs.DisciplinaDTO;
import br.com.t2m.escola.services.DisciplinaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/disciplinas")
@Api(tags = {"Disciplina"}, description = " API Rest Disciplina")
@CrossOrigin(origins = "*")
public class DisciplinaController {

    private DisciplinaService disciplinaService;

    public DisciplinaController(DisciplinaService disciplinaService) {
        this.disciplinaService = disciplinaService;
    }

    @GetMapping
    @ApiOperation(value = "Retorna uma página com determinado número de disciplinas")
    public ResponseEntity<Page<DisciplinaDTO>> getAll(Pageable p) {
        log.info("Buscando página de disciplinaDTO");
        try{
            return ResponseEntity.ok(disciplinaService.getAll(p));
        }catch (Exception e){
            log.error("Erro ao buscar uma página de disciplinaDTO");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(value = "/{id}")
    @ApiOperation(value = "Retorna uma unica disciplina por id")
    public ResponseEntity<DisciplinaDTO> getById(@PathVariable String id) {
        log.info("Buscando disciplinaDTO por id");
        try {
            log.info("Buscando disciplina DTO no sistema");
            Optional<DisciplinaDTO> optionalDisciplinaDTO = disciplinaService.findById(id);
            if (optionalDisciplinaDTO.isPresent()) {
                log.info("DisciplinaDTO encontrada com o id informado");
                return ResponseEntity.ok(optionalDisciplinaDTO.get());
            }
            log.warn("DisciplinaDTO não encontrada com o id informado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }catch (Exception e){
            log.error("Erro ao buscar um disciplinaDTO por id");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    @ApiOperation(value = "Adiciona uma nova disciplina")
    public ResponseEntity<DisciplinaDTO> create(@RequestBody @Valid DisciplinaDTO dto) {
        log.info("Criando uma disciplinaDTO");
        try{
            return ResponseEntity.ok(disciplinaService.create(dto));
        }catch (Exception e){
            log.error("Erro ao criar uma disciplinaDTO");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping(value = "/{id}")
    @ApiOperation(value = "Modifica os valores de uma disciplina")
    public ResponseEntity update(@RequestBody @Valid DisciplinaDTO dto, @PathVariable String id) {
        log.info("Atualizando disciplinaDTO");
        try{
            log.info("Buscando disciplinaDTO no sistema");
            Optional<DisciplinaDTO> optionalDisciplinaDTO = disciplinaService.findById(id);
            if (optionalDisciplinaDTO.isPresent()) {
                log.info("DisciplinaDTO encontrada com o id informado");
                dto.setIdDisciplina(id);
                disciplinaService.update(dto);
                return ResponseEntity.ok().build();
            }
            log.warn("DisciplinaDTO não encontrada com o id informado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }catch (Exception e) {
            log.error("Erro ao atualizar disciplinaDTO");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping(value = "/{id}")
    @ApiOperation(value = "Deleta uma disciplina por id")
    public ResponseEntity delete(@PathVariable String id) {
        log.info("Deletando disciplinaDTO");
        try{
            log.info("Buscando disciplinaDTO no sistema");
            Optional<DisciplinaDTO> optionalDisciplinaDTO = disciplinaService.findById(id);
            if (optionalDisciplinaDTO.isPresent()) {
                log.info("disciplinaDTO encontrada com o id informado");
                disciplinaService.deleteById(id);
                return ResponseEntity.ok().build();
            }
            log.warn("DisciplinaDTO não encontrada com o id informado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }catch (Exception e){
            log.error("Erro ao deletar disciplinaDTO");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
