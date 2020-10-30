import api from './apiCommon';

const listarTodos = () => {
    return api.get("/alunos");
};

const listarID = (id) => {
    return api.get(`/alunos/${id}`);
};

const incluir = (data) => {
    return api.post(`/alunos`, data);
};

const atualizar = (id, data) => {
    return api.put(`/alunos/${id}`, data);
};

const deletar = (id) => {
    return api.delete(`/alunos/${id}`);
};

export default {
    listarTodos,
    listarID,
    incluir,
    atualizar,
    deletar
};
