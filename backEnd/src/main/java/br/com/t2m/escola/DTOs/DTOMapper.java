package br.com.t2m.escola.DTOs;

import br.com.t2m.escola.models.Curso;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;

@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
@Component
public class DTOMapper {

    private ModelMapper modelMapper;

    public DTOMapper() {
        PropertyMap<Curso, CursoDTO> skipModifiedFieldsMap = new PropertyMap<Curso, CursoDTO>() {
            protected void configure() {
            }
        };
        modelMapper = new ModelMapper();
        modelMapper.addMappings(skipModifiedFieldsMap);
    }

    public Object map(Object obj, Type tipo) {
        return modelMapper.map(obj, tipo);
    }

    public <S, D> Page<D> mapPage(Page<S> page, Class<D> tipoClasse) {
        Page<Object> pageObj = page.map(e -> modelMapper.map(e, tipoClasse));
        Type tipo = new TypeToken<Page<D>>() {
        }.getType();
        return modelMapper.map(pageObj, tipo);
    }


    public ModelMapper getModelMapper() {
        return modelMapper;
    }

    public void setModelMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }


}
