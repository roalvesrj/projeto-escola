package br.com.t2m.escola.repositorys;

import br.com.t2m.escola.models.Curso;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CursoRepository extends MongoRepository<Curso, String> {
    @Override
    List<Curso> findAll();

    Optional<Curso> findById(String s);
}
