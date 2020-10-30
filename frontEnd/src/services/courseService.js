import api from './apiCommon';

const listarTodos = () => {
    return api.get("/cursos");
};

const listarID = (id) => {
    return api.get(`/cursos/${id}`);
};

const incluir = (data) => {
    return api.post(`/cursos`, data);
};

const atualizar = (id, data) => {
    return api.put(`/cursos/${id}`, data);
};

const deletar = (id) => {
    return api.delete(`/cursos/${id}`);
};

export default {
    listarTodos,
    listarID,
    incluir,
    atualizar,
    deletar
};
