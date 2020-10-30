package br.com.t2m.escola.repositorys;

import br.com.t2m.escola.models.Turma;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TurmaRepository extends MongoRepository<Turma, String> {
}
