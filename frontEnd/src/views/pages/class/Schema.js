import * as Yup from "yup";

export default Yup.object().shape({
  nome: Yup.string()
    .required("Preenchimento obrigatório.")
    .min(2, 'Mínimo de 2 caracteres.')
    .max(100, 'Máximo de 100 caracteres.'),
  ano: Yup.string()
    .required("Preenchimento obrigatório.")
    .min(4, 'Mínimo de 4 caracteres.')
    .max(4, 'Máximo de 4 caracteres.'),
  semestre: Yup.string()
    .required("Preenchimento obrigatório."),
  minimoInscricao: Yup.string()
    .required("Preenchimento obrigatório.")
    .min(2, 'Mínimo de 2 caracteres.')
    .max(2, 'Máximo de 2 caracteres.'),
  maximoInscricao: Yup.string()
    .required("Preenchimento obrigatório.")
    .min(2, 'Mínimo de 2 caracteres.')
    .max(2, 'Máximo de 2 caracteres.'),
})
