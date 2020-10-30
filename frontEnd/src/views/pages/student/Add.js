import React, { useState, useEffect } from "react";
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
import { User, Save, Delete, MapPin, Phone, Book } from "react-feather";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Schema from "./Schema";

import Breadcrumbs from "../../../components/BreadCrumb";
import formSelector from "../../../components/formSelector";

import "../../../assets/scss/pages/users.scss";

import "../../../assets/scss/pages/users.scss";

import classService from "../../../services/classService";
import studentService from "../../../services/studentService";

const genderSelector = [
    { value: "Feminino", label: "Feminino" },
    { value: "Masculino", label: "Masculino" },
    { value: "Outros", label: "Outros" }
];

const shiftSelector = [
    { value: "Matutino", label: "Matutino" },
    { value: "Vespertino", label: "Vespertino" },
    { value: "Noturno", label: "Noturno" },
    { value: "Integral", label: "Integral" }
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

const statusSelector = [
    { value: "Pré-matriculado", label: "Pré-matriculado" },
    { value: "Matriculado", label: "Matriculado" },
    { value: "Cancelado", label: "Cancelado" },
    { value: "Suspenso", label: "Suspenso" },
    { value: "Transferido", label: "Transferido" },
    { value: "Formado", label: "Formado" }
];

const StudentAdd = () => {
    const [aluno, setAluno] = useState([]);
    const [listaTurmas, setListaTurmas] = useState([]);

    const [mensagem, setMensagem] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState("");

    // Recupera a lista de turmas
    useEffect(() => {
        classService.listarTodos()
            .then((response) => {
                setListaTurmas(response.data.content);
            })
            .catch((error) => {
                setColor("danger");
                setMensagem("Ocorreu um erro ao carregar a lista de turmas.");
                setIsOpen(true);
            });
    }, []);

    function onBlurCPF(ev) {
        const { value } = ev.target;
        const cpf = value?.replace(/[^0-9]/g, "");

        if (cpf?.length !== 11) {
            return;
        }

        studentService.listarCPF(cpf)
            .then((response) => {
                if (response.status === 200) {
                    alert("CPF já cadastrado!");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

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

    const onSubmit = (values, { resetForm }) => {
        // alert(JSON.stringify(values, null, 2));
        studentService.incluir(values)
            .then(response => {
                Object.keys(values).forEach(key => (values[key] = ""));
                resetForm(values);

                if (response.status === 200) {
                    setColor("success")
                    setMensagem("O professor " + values.nome + " foi adicionado com sucesso!")
                    setIsOpen(true);
                }
            })
            .catch((error) => {
                setColor("danger")
                setMensagem("Ocorreu um erro ao tentar adicionar o professor " + values.nome + ".")
                setIsOpen(true);
            })

        setTimeout(() => {
            setIsOpen(false);
        }, 8000);
    }

    return (
        <Row>
            <Col sm="12">
                <Breadcrumbs
                    breadCrumbTitle="Adicionar Aluno"
                    breadCrumbParent="Alunos"
                    breadCrumbActive="Adicionar"
                />
            </Col>
            <Col md="12">
                <Alert isOpen={isOpen} color={color}>{mensagem}</Alert>
            </Col>
            <Col sm="12">
                <Card>
                    <CardBody>
                        <Formik
                            validationSchema={Schema}
                            onSubmit={onSubmit}
                            validateOnMount
                            initialValues={{
                                nome: '',
                                nomeSocial: '',
                                cpf: '',
                                rg: '',
                                genero: '',
                                dataNascimento: '',
                                naturalidade: '',
                                nacionalidade: '',
                                defFuncional: '',
                                telefone: '',
                                email: '',
                                cep: '',
                                logradouro: '',
                                numero: '',
                                complemento: '',
                                bairro: '',
                                cidade: '',
                                estado: '',
                                matricula: '',
                                responsavel: '',
                                nomeMae: '',
                                nomePai: '',
                                anoIngresso: '',
                                anoConclusao: '',
                                turno: '',
                                status: '',
                                idTurma: ''
                            }}
                        >
                            {({ values, errors, touched, isValid, initialValues, resetForm, handleChange, setFieldValue }) => (
                                <Form>
                                    <Row>
                                        <Col md="6" sm="12">
                                            <h3 className="mb-1">
                                                <User className="mr-50" size={25} />
                                                <span className="align-middle">Dados Pessoais</span>
                                            </h3>

                                            <FormGroup row>
                                                <Col md="12">
                                                    <Label for="nome">Nome</Label>
                                                    <Field
                                                        type="text"
                                                        name="nome"
                                                        id="nome"
                                                        className={`form-control ${errors.nome && touched.nome && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="nome" />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col md="12">
                                                    <Label for="nomeMae">Nome da mãe</Label>
                                                    <Field
                                                        type="text"
                                                        name="nomeMae"
                                                        id="nomeMae"
                                                        className={`form-control ${errors.nomeMae && touched.nomeMae && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="nomeMae" />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col md="12">
                                                    <Label for="nomePai">Nome do Pai</Label>
                                                    <Field
                                                        type="text"
                                                        name="nomePai"
                                                        id="nomePai"
                                                        className={`form-control ${errors.nomePai && touched.nomePai && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="nomePai" />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col md="12">
                                                    <Label for="responsavel">Nome do Responsável</Label>
                                                    <Field
                                                        type="text"
                                                        name="responsavel"
                                                        id="responsavel"
                                                        className={`form-control ${errors.responsavel && touched.responsavel && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="responsavel" />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup row>
                                                <Col md="12">
                                                    <Label for="nomeSocial">Nome Social</Label>
                                                    <Field
                                                        type="text"
                                                        name="nomeSocial"
                                                        id="nomeSocial"
                                                        className={`form-control ${errors.nomeSocial && touched.nomeSocial && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="nomeSocial" />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup row>
                                                <Col md="6">
                                                    <Label for="cpf">CPF</Label>
                                                    <Field
                                                        type="number"
                                                        name="cpf"
                                                        id="cpf"
                                                        className={`form-control ${errors.cpf && touched.cpf && "is-invalid"}`}
                                                        onBlur={(ev) => onBlurCPF(ev)}
                                                    />
                                                    <span className="text-muted">Somente números.</span>
                                                    <ErrorMessage name="cpf" />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup row>
                                                <Col md="6">
                                                    <Label for="rg">RG</Label>
                                                    <Field
                                                        type="number"
                                                        name="rg"
                                                        id="rg"
                                                        className={`form-control ${errors.rg && touched.rg && "is-invalid"}`}
                                                    />
                                                    <span className="text-muted">Somente números.</span>
                                                    <ErrorMessage name="rg" />
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
                                                    <Label for="dataNascimento">Data de Nascimento</Label>
                                                    <Field
                                                        type="date"
                                                        name="dataNascimento"
                                                        id="dataNascimento"
                                                        className={`form-control ${errors.dataNascimento && touched.dataNascimento && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="dataNascimento" />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup row>
                                                <Col md="6">
                                                    <Label for="naturalidade">Naturalidade</Label>
                                                    <Field
                                                        type="text"
                                                        name="naturalidade"
                                                        id="naturalidade"
                                                        className={`form-control ${errors.naturalidade && touched.naturalidade && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="naturalidade" />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup row>
                                                <Col md="6">
                                                    <Label for="nacionalidade">Nacionalidade</Label>
                                                    <Field
                                                        type="text"
                                                        name="nacionalidade"
                                                        id="nacionalidade"
                                                        className={`form-control ${errors.nacionalidade && touched.nacionalidade && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="nacionalidade" />
                                                </Col>

                                            </FormGroup>

                                            <FormGroup row>
                                                <Col md="12">
                                                    <Label for="defFuncional" className="d-block">Diversidade Funcional</Label>
                                                    <div role="group" aria-labelledby="my-radio-group">
                                                        <div className="d-inline-block mr-1">
                                                            <label>
                                                                <Field type="radio" name="defFuncional" value="Sim" className={`${errors.estado && touched.estado && "is-invalid"}`} /> Sim
                                                                                                                        </label>
                                                        </div>
                                                        <div className="d-inline-block mr-1">
                                                            <label>
                                                                <Field type="radio" name="defFuncional" value="Não" className={`${errors.estado && touched.estado && "is-invalid"}`} /> Não
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
                                                    <Label for="cep">CEP</Label>
                                                    <Field
                                                        type="number"
                                                        name="cep"
                                                        id="cep"
                                                        className={`form-control ${errors.cep && touched.cep && "is-invalid"}`}
                                                        onBlur={(ev) => onBlurCEP(ev, setFieldValue)}
                                                    />
                                                    <span className="text-muted">Somente números.</span>
                                                    <ErrorMessage name="cep" />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup row>
                                                <Col md="12">
                                                    <Label for="logradouro">Logradouro</Label>
                                                    <Field
                                                        type="text"
                                                        name="logradouro"
                                                        id="logradouro"
                                                        className={`form-control ${errors.logradouro && touched.logradouro && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="logradouro" />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup row>
                                                <Col md="4">
                                                    <Label for="numero">Número</Label>
                                                    <Field
                                                        type="number"
                                                        name="numero"
                                                        id="numero"
                                                        className={`form-control ${errors.numero && touched.numero && "is-invalid"}`}
                                                    />
                                                    <span className="text-muted">Somente números.</span>
                                                    <ErrorMessage name="numero" />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup row>
                                                <Col md="12">
                                                    <Label for="complemento">Complemento</Label>
                                                    <Field
                                                        type="text"
                                                        name="complemento"
                                                        id="complemento"
                                                        className={`form-control ${errors.complemento && touched.complemento && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="complemento" />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup row>
                                                <Col md="6">
                                                    <Label for="bairro">Bairro</Label>
                                                    <Field
                                                        type="text"
                                                        name="bairro"
                                                        id="bairro"
                                                        className={`form-control ${errors.bairro && touched.bairro && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="bairro" />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup row>
                                                <Col md="6">
                                                    <Label for="cidade">Cidade</Label>
                                                    <Field
                                                        type="text"
                                                        name="cidade"
                                                        id="cidade"
                                                        className={`form-control ${errors.cidade && touched.cidade && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="cidade" />
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
                                                    <Label for="telefone">Telefone</Label>
                                                    <Field
                                                        type="number"
                                                        name="telefone"
                                                        id="telefone"
                                                        className={`form-control ${errors.telefone && touched.telefone && "is-invalid"}`}
                                                    />
                                                    <span className="text-muted">Somente números.</span>
                                                    <ErrorMessage name="telefone" />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup row>
                                                <Col md="12">
                                                    <Label for="email">E-mail</Label>
                                                    <Field
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        className={`form-control ${errors.email && touched.email && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="email" />
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row className="mt-2">
                                        <Col md="6" sm="12">
                                            <h3 className="mb-2">
                                                <Book className="mr-50" size={25} />
                                                <span className="align-middle">Dados Escolares</span>
                                            </h3>
                                            <FormGroup row>
                                                <Col md="4">
                                                    <Label for="anoIngresso">Ano de Ingresso</Label>
                                                    <Field
                                                        type="text"
                                                        name="anoIngresso"
                                                        id="anoIngresso"
                                                        className={`form-control ${errors.anoIngresso && touched.anoIngresso && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="anoIngresso" />
                                                </Col>

                                                <Col md="4">
                                                    <Label for="anoConclusao">Ano de Conclusão</Label>
                                                    <Field
                                                        type="text"
                                                        name="anoConclusao"
                                                        id="anoConclusao"
                                                        className={`form-control ${errors.anoConclusao && touched.anoConclusao && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="anoConclusao" />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col md="6">
                                                    <Label for="turno">Turno</Label>
                                                    <Field
                                                        component={formSelector}
                                                        name="turno"
                                                        id="turno"
                                                        onChange={handleChange}
                                                        options={shiftSelector}
                                                        selected={values.turno}
                                                        className={`form-control ${errors.turno && touched.turno && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="turno" />
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
                                                        options={statusSelector}
                                                        selected={values.status}
                                                        className={`form-control ${errors.status && touched.status && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="status" />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col md="4">
                                                    <Label for="idTurma">ID Turma</Label>
                                                    <Field
                                                        component={formSelector}
                                                        name="idTurma"
                                                        id="idTurma"
                                                        onChange={handleChange}
                                                        options={listaTurmas}
                                                        selected={values.idTurma}
                                                        className={`form-control ${errors.idTurma && touched.idTurma && "is-invalid"}`}
                                                    />
                                                </Col>
                                            </FormGroup>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="d-flex justify-content-end flex-wrap" sm="12">
                                            <Button.Ripple className="mr-1" color="primary" type="submit" disabled={!isValid}><Save size={15} className="mr-1" />
                      Salvar
                      </Button.Ripple>
                                            <Button.Ripple color="warning" type="reset" outline><Delete size={15} className="mr-1" />
                      Limpar
                      </Button.Ripple>
                                        </Col>
                                    </Row>
                                </Form>
                            )}
                        </Formik>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default StudentAdd;
