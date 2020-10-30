import api from './apiCommon';

const listarTodos = () => {
    return api.get("/professores");
};

const listarID = (id) => {
    return api.get(`/professores/${id}`);
};

const listarCPF = (cpf) => {
    return api.get(`/professores/cpf/${cpf}`);
};

const incluir = (data) => {
    return api.post(`/professores`, data);
};

const atualizar = (id, data) => {
    return api.put(`/professores/${id}`, data);
};

const deletar = (id) => {
    return api.delete(`/professores/${id}`);
};

export default {
    listarTodos,
    listarID,
    listarCPF,
    incluir,
    atualizar,
    deletar
};
