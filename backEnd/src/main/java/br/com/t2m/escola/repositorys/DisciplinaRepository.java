package br.com.t2m.escola.repositorys;

import br.com.t2m.escola.models.Disciplina;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DisciplinaRepository extends MongoRepository<Disciplina, String> {

}
