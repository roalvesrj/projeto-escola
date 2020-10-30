import * as Yup from "yup";

export default Yup.object().shape({
  nome: Yup.string()
    .required("Preenchimento obrigatório.")
    .min(2, 'Mínimo de 2 caracteres.')
    .max(100, 'Máximo de 100 caracteres.'),

})
