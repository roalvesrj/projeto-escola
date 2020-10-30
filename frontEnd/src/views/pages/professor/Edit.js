import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import {
    Alert,
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    Button,
    Label
} from "reactstrap";
import { User, MapPin, Phone, Save, Delete, Book } from "react-feather";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Schema from "./Schema";

import Breadcrumbs from "../../../components/BreadCrumb";
import Input from "../../../components/Field";
import formSelector from "../../../components/formSelector";

import "../../../assets/scss/pages/users.scss";

import professorService from "../../../services/professorService";

const statusProfessorSelector = [
    { value: "Ativo", label: "Ativo" },
    { value: "Inativo", label: "Inativo" },
    { value: "Suspenso", label: "Suspenso" },
    { value: "Transferido", label: "Transferido" }
];

const genderSelector = [
    { value: "Feminino", label: "Feminino" },
    { value: "Masculino", label: "Masculino" },
    { value: "Outros", label: "Outros" }
];

const ufSelector = [
    { value: "AC", label: "Acre" },
    { value: "AL", label: "Alagoas" },
    { value: "AP", label: "Amapá" },
    { value: "AM", label: "Amazonas" },
    { value: "BA", label: "Bahia" },
    { value: "CE", label: "Ceará" },
    { value: "DF", label: "Distrito Federal" },
    { value: "ES", label: "Espírito Santo" },
    { value: "GO", label: "Goiás" },
    { value: "MA", label: "Maranhão" },
    { value: "MT", label: "Mato Grosso" },
    { value: "MS", label: "Mato Grosso do Sul" },
    { value: "MG", label: "Minas Gerais" },
    { value: "PA", label: "Pará" },
    { value: "PB", label: "Paraíba" },
    { value: "PR", label: "Paraná" },
    { value: "PE", label: "Pernambuco" },
    { value: "PI", label: "Piauí" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "RN", label: "Rio Grande do Norte" },
    { value: "RS", label: "Rio Grande do Sul" },
    { value: "RO", label: "Rondônia" },
    { value: "RR", label: "Roraima" },
    { value: "SC", label: "Santa Catarina" },
    { value: "SP", label: "São Paulo" },
    { value: "SE", label: "Sergipe" },
    { value: "TO", label: "Tocantins" }
];

const ProfessorEdit = () => {
    let history = useHistory();
    const { params } = useRouteMatch();

    const [professor, setProfessor] = useState([]);

    const [mensagem, setMensagem] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState("");

    function onBlurCEP(ev, setFieldValue) {
        const { value } = ev.target;
        const cep = value?.replace(/[^0-9]/g, '');

        if (cep?.length !== 8) {
            return;
        }

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((res) => res.json())
            .then((data) => {
                if (data.erro === true) {
                    alert("O CEP " + cep + " é inválido.");
                    setColor("warning");
                    setMensagem("O CEP " + cep + " é inválido.");
                    setIsOpen(true);
                }

                setFieldValue("logradouro", data.logradouro);
                setFieldValue("bairro", data.bairro);
                setFieldValue("cidade", data.localidade);
                setFieldValue("estado", data.uf);
            })
    };

    // Recupera a lista de professores
    useEffect(() => {
        professorService.listarID(params.id)
            .then((response) => {
                setProfessor(response.data);
            })
            .catch((error) => {
                setColor("danger");
                setMensagem("Erro ao recuperar os dados da API.");
                setIsOpen(true);
            });
    }, []);



    const handleSubmit = (values, { resetForm }) => {
        // alert(JSON.stringify(values, null, 2));
        professorService.atualizar(params.id, values)
            .then(response => {
                if (response.status === 200) {
                    setColor("success")
                    setMensagem("O professor " + values.nome + " foi atualizado com sucesso!")
                    setIsOpen(true);
                }

                Object.keys(values).forEach(key => (values[key] = ""));
                resetForm(values);
            })
            .catch((error) => {
                setColor("danger")
                setMensagem("Ocorreu um erro ao tentar atualizar o professor " + values.nome + ".")
                setIsOpen(true);
            })

        setTimeout(() => {
            setIsOpen(false);
            history.push("/professor/listar");
        }, 8000);
    };

    return (
        <Row>
            <Col sm="12">
                <Breadcrumbs
                    breadCrumbTitle="Editar professor"
                    breadCrumbParent="Professores"
                    breadCrumbActive="Editar"
                />
            </Col>
            <Col md="12">
                <Alert isOpen={isOpen} color={color}>{mensagem}</Alert>
            </Col>
            <Col sm="12">
                <Card>
                    <CardBody>
                        {!professor ? (
                            <Row>
                                <Col sm="12">Carregando...</Col>
                            </Row>
                        ) : (
                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        nome: professor.nome,
                                        nomeSocial: professor.nomeSocial,
                                        cpf: professor.cpf,
                                        rg: professor.rg,
                                        genero: professor.genero,
                                        dataNascimento: professor.dataNascimento,
                                        naturalidade: professor.naturalidade,
                                        nacionalidade: professor.nacionalidade,
                                        defFuncional: professor.defFuncional,
                                        telefone: professor.telefone,
                                        email: professor.email,
                                        cep: professor.cep,
                                        logradouro: professor.logradouro,
                                        numero: professor.numero,
                                        complemento: professor.complemento,
                                        bairro: professor.bairro,
                                        cidade: professor.cidade,
                                        estado: professor.estado,
                                        matricula: professor.matricula,
                                        status: professor.status,
                                    }}
                                    validationSchema={Schema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ values, errors, touched, isValid, initialValues, resetForm, handleChange, setFieldValue }) => {
                                        return (
                                            <Form>
                                                <Row>
                                                    <Col md="6" sm="12">
                                                        <h3 className="mb-1">
                                                            <User className="mr-50" size={25} />
                                                            <span className="align-middle">Dados Pessoais</span>
                                                        </h3>

                                                        <FormGroup row>
                                                            <Col md="12">
                                                                <Input
                                                                    type="text"
                                                                    name="nome"
                                                                    id="nome"
                                                                    label="Nome"
                                                                    onChange={handleChange}
                                                                    value={values.nome}
                                                                />
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Col md="12">
                                                                <Input
                                                                    type="text"
                                                                    name="nomeSocial"
                                                                    id="nomeSocial"
                                                                    label="Nome Social"
                                                                    onChange={handleChange}
                                                                    value={values.nomeSocial}
                                                                />
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Col md="6">
                                                                <Input
                                                                    type="number"
                                                                    name="cpf"
                                                                    id="cpf"
                                                                    label="CPF"
                                                                    disabled="disabled"
                                                                    onChange={handleChange}
                                                                    value={values.cpf}
                                                                />
                                                                <span className="text-muted">Somente números.</span>
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup row>
                                                            <Col md="6">
                                                                <Input
                                                                    type="number"
                                                                    name="rg"
                                                                    id="rg"
                                                                    label="RG"
                                                                    onChange={handleChange}
                                                                    value={values.rg}
                                                                />
                                                                <span className="text-muted">Somente números.</span>
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup row>
                                                            <Col md="6">
                                                                <Label for="genero">Gênero</Label>
                                                                <Field
                                                                    component={formSelector}
                                                                    name="genero"
                                                                    id="genero"
                                                                    onChange={handleChange}
                                                                    options={genderSelector}
                                                                    selected={values.genero}
                                                                    className={`form-control ${errors.genero && touched.genero && "is-invalid"}`}
                                                                />
                                                                <ErrorMessage name="genero" />
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup row>
                                                            <Col md="6">
                                                                <Input
                                                                    type="date"
                                                                    name="dataNascimento"
                                                                    id="dataNascimento"
                                                                    label="Data de Nascimento"
                                                                    onChange={handleChange}
                                                                    value={values.dataNascimento}
                                                                />
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup row>
                                                            <Col md="6">
                                                                <Input
                                                                    type="text"
                                                                    name="naturalidade"
                                                                    id="naturalidade"
                                                                    label="Naturalidade"
                                                                    onChange={handleChange}
                                                                    value={values.naturalidade}
                                                                />
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup row>
                                                            <Col md="6">
                                                                <Input
                                                                    type="text"
                                                                    name="nacionalidade"
                                                                    id="nacionalidade"
                                                                    label="Nacionalidade"
                                                                    onChange={handleChange}
                                                                    value={values.nacionalidade}
                                                                />
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup row>
                                                            <Col md="12">
                                                                <Label for="defFuncional" className="d-block">Diversidade Funcional</Label>
                                                                <div role="group" aria-labelledby="my-radio-group">
                                                                    <div className="d-inline-block mr-1">
                                                                        <label>
                                                                            <Field type="radio" name="defFuncional" value="Sim" className={`${errors.defFuncional && touched.defFuncional && "is-invalid"}`} />
                                                                            Sim
                                                                        </label>
                                                                    </div>
                                                                    <div className="d-inline-block mr-1">
                                                                        <label>
                                                                            <Field type="radio" name="defFuncional" value="Não" className={`${errors.defFuncional && touched.defFuncional && "is-invalid"}`} />
                                                                            Não
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <ErrorMessage name="defFuncional" />
                                                            </Col>
                                                        </FormGroup>
                                                    </Col>

                                                    <Col md="6" sm="12">
                                                        <h3 className="mb-1">
                                                            <MapPin className="mr-50" size={25} />
                                                            <span className="align-middle">Endereço</span>
                                                        </h3>
                                                        <FormGroup row>
                                                            <Col md="6">
                                                                <Input
                                                                    type="number"
                                                                    name="cep"
                                                                    id="cep"
                                                                    label="CEP"
                                                                    onChange={handleChange}
                                                                    value={values.cep}
                                                                    onBlur={(ev) => onBlurCEP(ev, setFieldValue)}
                                                                />
                                                                <span className="text-muted">Somente números.</span>
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup row>
                                                            <Col md="12">
                                                                <Input
                                                                    type="text"
                                                                    name="logradouro"
                                                                    id="logradouro"
                                                                    label="Logradouro"
                                                                    onChange={handleChange}
                                                                    value={values.logradouro}
                                                                />
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup row>
                                                            <Col md="4">
                                                                <Input
                                                                    type="number"
                                                                    name="numero"
                                                                    id="numero"
                                                                    label="Número"
                                                                    onChange={handleChange}
                                                                    value={values.numero}
                                                                />
                                                                <span className="text-muted">Somente números.</span>
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup row>
                                                            <Col md="12">
                                                                <Input
                                                                    type="text"
                                                                    name="complemento"
                                                                    id="complemento"
                                                                    label="Complemento"
                                                                    onChange={handleChange}
                                                                    value={values.complemento}
                                                                />
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup row>
                                                            <Col md="6">
                                                                <Input
                                                                    type="text"
                                                                    name="bairro"
                                                                    id="bairro"
                                                                    label="Bairro"
                                                                    onChange={handleChange}
                                                                    value={values.bairro}
                                                                />
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup row>
                                                            <Col md="6">
                                                                <Input
                                                                    type="text"
                                                                    name="cidade"
                                                                    id="cidade"
                                                                    label="Cidade"
                                                                    onChange={handleChange}
                                                                    value={values.cidade}
                                                                />
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup row>
                                                            <Col md="6">
                                                                <Label for="estado">Estado</Label>
                                                                <Field
                                                                    component={formSelector}
                                                                    name="estado"
                                                                    id="estado"
                                                                    onChange={handleChange}
                                                                    options={ufSelector}
                                                                    selected={values.estado}
                                                                    className={`form-control ${errors.estado && touched.estado && "is-invalid"}`}
                                                                />
                                                                <ErrorMessage name="estado" />
                                                            </Col>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>

                                                <hr />

                                                <Row className="mt-2">
                                                    <Col md="6">
                                                        <h3 className="mb-2">
                                                            <Phone className="mr-50" size={25} />
                                                            <span className="align-middle">Contato</span>
                                                        </h3>

                                                        <FormGroup row>
                                                            <Col md="6">
                                                                <Input
                                                                    type="number"
                                                                    name="telefone"
                                                                    id="telefone"
                                                                    label="Telefone"
                                                                    onChange={handleChange}
                                                                    value={values.telefone}
                                                                />
                                                                <span className="text-muted">Somente números.</span>
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup row>
                                                            <Col md="12">
                                                                <Input
                                                                    type="email"
                                                                    name="email"
                                                                    id="email"
                                                                    label="E-mail"
                                                                    onChange={handleChange}
                                                                    value={values.email}
                                                                />
                                                            </Col>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <hr />
                                                <Row className="mt-2">
                                                    <Col md="6" sm="12">
                                                        <h3 className="mb-2">
                                                            <Book className="mr-50" size={25} />
                                                            <span className="align-middle">Dados Profissionais</span>
                                                        </h3>
                                                        <FormGroup row>
                                                            <Col md="4">
                                                                <Input
                                                                    type="text"
                                                                    name="matricula"
                                                                    id="matricula"
                                                                    label="Matrícula"
                                                                    disabled="disabled"
                                                                    onChange={handleChange}
                                                                    value={values.matricula}
                                                                />
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Col md="6">
                                                                <Label for="status">Status</Label>
                                                                <Field
                                                                    component={formSelector}
                                                                    name="status"
                                                                    id="status"
                                                                    onChange={handleChange}
                                                                    options={statusProfessorSelector}
                                                                    selected={values.status}
                                                                    className={`form-control ${errors.status && touched.status && "is-invalid"}`}
                                                                />
                                                                <ErrorMessage name="status" />
                                                            </Col>
                                                        </FormGroup>

                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="d-flex justify-content-end flex-wrap" sm="12">
                                                        <Button.Ripple className="mr-1" color="primary" type="submit" disabled={!isValid}><Save size={15} className="mr-1" />
                                                            Salvar
                                                        </Button.Ripple>
                                                        <Button.Ripple color="warning" type="reset" outline onClick={() => resetForm(initialValues)}><Delete size={15} className="mr-1" />
                                                            Limpar
                                                        </Button.Ripple>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        );
                                    }}
                                </Formik>
                            )
                        }
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default ProfessorEdit;
