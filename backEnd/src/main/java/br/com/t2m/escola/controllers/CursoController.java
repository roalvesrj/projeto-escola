package br.com.t2m.escola.controllers;

import br.com.t2m.escola.DTOs.CursoDTO;
import br.com.t2m.escola.services.CursoService;
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
@RequestMapping("/cursos")
@Api(tags = {"Curso"}, description = " API Rest Curso")
@CrossOrigin(origins = "*")
public class CursoController {

    private CursoService cursoService;

    public CursoController(CursoService cursoService) {
        this.cursoService = cursoService;
    }

    @GetMapping
    @ApiOperation(value = "Retorna uma página com  determinado número de cursos")
    public ResponseEntity<Page<CursoDTO>> getAll(Pageable p) {
        log.info("Buscando página de cursoDTO");
        try{
            return ResponseEntity.ok(cursoService.getAll(p));
        }catch (Exception e){
            log.error("Erro ao buscar página de cursoDTO");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(value = "/{id}")
    @ApiOperation(value = "Retorna um curso específico através do id")
    public ResponseEntity<CursoDTO> getById(@PathVariable String id) {
        log.info("Buscando um cursoDTO por id");
        try{
            Optional<CursoDTO> cursoDTOOptional = cursoService.findById(id);
            if (cursoDTOOptional.isPresent()) {
                log.info("CursoDTO encontrado com o id informado");
                return ResponseEntity.ok(cursoDTOOptional.get());
            }
            log.warn("CursoDTO não encontrado com o id informado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }catch (Exception e){
            log.error("Erro ao buscar um cursoDTO por id");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    @ApiOperation(value = "Adiciona um novo curso")
    public ResponseEntity<CursoDTO> create(@RequestBody @Valid CursoDTO dto) {
        log.info("Criando um cursoDTO");
        try{
            return ResponseEntity.ok(cursoService.create(dto));
        }catch (Exception e){
            log.error("Erro ao criar um cursoDTO");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping(value = "/{id}")
    @ApiOperation(value = "Modifica os valores de um curso")
    public ResponseEntity update(@RequestBody @Valid CursoDTO dto, @PathVariable String id) {
        log.info("Atualizando um cursoDTO");
        try {
            log.info("Buscando um cursoDTO no sistema");
            Optional<CursoDTO> cursoDTOOptional = cursoService.findById(id);
            if (cursoDTOOptional.isPresent()) {
                log.info("CursoDTO encontrado com o id informado");
                dto.setIdCurso(id);
                cursoService.update(dto);
                return ResponseEntity.ok().build();
            }
            log.warn("CursoDTO não encontrado com o id informado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }catch (Exception e){
            log.error("Erro ao atualizar um cursoDTO");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping(value = "/{id}")
    @ApiOperation(value = "Deleta um curso por id")
    public ResponseEntity delete(@PathVariable String id) {
        log.info("Tentando deletar um cursoDTO");
        try{
            log.info("Buscando um cursoDTO no sistema");
            Optional<CursoDTO> cursoDTOOptional = cursoService.findById(id);
            if (cursoDTOOptional.isPresent()) {
                log.info("CursoDTO encontrado com o id informado");
                cursoService.deleteById(id);
                return ResponseEntity.ok().build();
            }
            log.warn("CursoDTO não encontrado com o id informado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }catch (Exception e){
            log.error("Erro ao deletar um cursoDTO");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
