import * as Yup from "yup";

export default Yup.object().shape({
  nome: Yup.string()
    .required("Preenchimento obrigatório.")
    .min(2, 'Mínimo de 2 caracteres.')
    .max(100, 'Máximo de 100 caracteres.'),
  nomeSocial: Yup.string()
    .notRequired(),
  cpf: Yup.string()
    .required("Preenchimento obrigatório.")
    .min(11, "Mínimo de 11 caracteres.")
    .max(11, "Máximo de 11 caracteres."),
  rg: Yup.string()
    .notRequired()
    .min(9, "Mínimo de 9 caracteres.")
    .max(9, "Máximo de 9 caracteres."),
  genero: Yup.string()
    .required("Preenchimento obrigatório."),
  dataNascimento: Yup.date()
    .required("Preenchimento obrigatório."),
  naturalidade: Yup.string()
    .required("Preenchimento obrigatório."),
  nacionalidade: Yup.string()
    .required("Preenchimento obrigatório."),
  defFuncional: Yup.string()
    .required("Preenchimento obrigatório."),
  cep: Yup.string()
    .required("Preenchimento obrigatório.")
    .min(8, "Mínimo de 8 caracteres."),
  logradouro: Yup.string()
    .required("Preenchimento obrigatório."),
  bairro: Yup.string()
    .required("Preenchimento obrigatório."),
  cidade: Yup.string()
    .required("Preenchimento obrigatório."),
  estado: Yup.string()
    .required("Preenchimento obrigatório."),
  telefone: Yup.string()
    .min(10, "Mínimo de 10 caracteres.")
    .max(11, "Máximo de 11 caracteres.")
    .required("Preenchimento obrigatório."),
  email: Yup.string()
    .email("Digite um e-mail válido.")
    .required("Preenchimento obrigatório."),
  nomeMae: Yup.string()
    .required("Preenchimento obrigatório.")
    .min(2, 'Mínimo de 2 caracteres.')
    .max(100, 'Máximo de 100 caracteres.'),
  nomePai: Yup.string()
    .required("Preenchimento obrigatório.")
    .min(2, 'Mínimo de 2 caracteres.')
    .max(100, 'Máximo de 100 caracteres.'),
  responsavel: Yup.string()
    .min(2, 'Mínimo de 2 caracteres.')
    .max(100, 'Máximo de 100 caracteres.'),
  anoIngresso: Yup.number()
    .required("Preenchimento obrigatório."),
  anoConclusao: Yup.number()
    .notRequired(),
  turno: Yup.string()
    .required("Preenchimento obrigatório."),
  status: Yup.string()
    .required("Preenchimento obrigatório."),
  idTurma: Yup.string()
    .required("Preenchimento obrigatório."),
})

