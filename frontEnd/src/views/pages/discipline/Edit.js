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
import { Save, Delete } from "react-feather";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Schema from "./Schema";

import Breadcrumbs from "../../../components/BreadCrumb";
import Input from "../../../components/Field";
import formSelector from "../../../components/formSelector";

import "../../../assets/scss/pages/users.scss";

import professorService from "../../../services/professorService";
import classService from "../../../services/classService";
import disciplineService from "../../../services/disciplineService";

const DisciplineEdit = () => {
    let history = useHistory();
    const { params } = useRouteMatch();

    const [listaProfessor, setListaProfessor] = useState([]);
    const [listaTurmas, setListaTurmas] = useState([]);
    const [disciplina, setDisciplina] = useState([]);

    const [mensagem, setMensagem] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState("");

    // Funcao para reescrever o formato entregue do array
    function arrayReplace(dados) {
        let dataCourse = [];
        for (let i = 0; i < dados.length; i++) {
            dataCourse.splice(1, 0, { value: dados[i].idCurso, label: dados[i].nome })
        }
        return dataCourse;
    }

    // Recupera a lista de professores
    useEffect(() => {
        professorService.listarTodos()
            .then((response) => {
                setListaProfessor(arrayReplace(response.data.content));
            })
            .catch((error) => {
                setColor("danger");
                setMensagem("Ocorreu um erro ao carregar a lista de professores.");
                setIsOpen(true);
            });
    }, []);

    // Recupera a lista de turmas
    useEffect(() => {
        classService.listarTodos()
            .then((response) => {
                setListaTurmas(arrayReplace(response.data.content));
            })
            .catch((error) => {
                setColor("danger");
                setMensagem("Ocorreu um erro ao carregar a lista de turmas.");
                setIsOpen(true);
            });
    }, []);

    useEffect(() => {
        disciplineService.listarID(params.id)
            .then((response) => {
                setDisciplina(response.data);
            })
            .catch((error) => {
                setColor("danger");
                setMensagem("Erro ao recuperar os dados da API.");
                setIsOpen(true);
            });
    }, []);

    const handleSubmit = (values, { resetForm }) => {
        // alert(JSON.stringify(values, null, 2));
        disciplineService.atualizar(params.id, values)
            .then(response => {
                if (response.status === 200) {
                    setColor("success")
                    setMensagem("A disciplina " + values.nome + " foi atualizada com sucesso!")
                    setIsOpen(true);
                }

                Object.keys(values).forEach(key => (values[key] = ""));
                resetForm(values);
            })
            .catch((error) => {
                setColor("danger")
                setMensagem("Ocorreu um erro ao tentar atualizar a disciplina " + values.nome + ".")
                setIsOpen(true);
            })

        setTimeout(() => {
            setIsOpen(false);
            history.push("/disciplina/listar");
        }, 8000);
    };

    return (
        <Row>
            <Col sm="12">
                <Breadcrumbs
                    breadCrumbTitle="Editar Disciplina"
                    breadCrumbParent="Disciplinas"
                    breadCrumbActive="Editar"
                />
            </Col>
            <Col md="12">
                <Alert isOpen={isOpen} color={color}>{mensagem}</Alert>
            </Col>
            <Col sm="12">
                <Card>
                    <CardBody>
                        {!disciplina ? (
                            <Row>
                                <Col sm="12">Carregando...</Col>
                            </Row>
                        ) : (
                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        nome: disciplina.nome,
                                        matriculaProfessor: disciplina.matriculaProfessor,
                                        idTurma: disciplina.turmasIds,
                                        cargaHoraria: disciplina.cargaHoraria,
                                    }}
                                    validationSchema={Schema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ values, errors, touched, isValid, initialValues, resetForm, handleChange }) => {
                                        return (
                                            <Form>
                                                <Row>
                                                    <Col md="8" sm="12">
                                                        <h3 className="mb-1">
                                                            <span className="align-middle">Dados da Disciplina</span>
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
                                                            <Col md="6">
                                                                <Label for="matriculaProfessor">Professor</Label>
                                                                <Field
                                                                    component={formSelector}
                                                                    name="matriculaProfessor"
                                                                    id="matriculaProfessor"
                                                                    onChange={handleChange}
                                                                    options={listaProfessor}
                                                                    selected={values.matriculaProfessor}
                                                                    className={`form-control ${errors.matriculaProfessor && touched.matriculaProfessor && "is-invalid"}`}
                                                                />
                                                                <ErrorMessage name="matriculaProfessor" />
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Col md="6">
                                                                <Label for="idTurma">Turma</Label>
                                                                <Field
                                                                    component={formSelector}
                                                                    name="idTurma"
                                                                    id="idTurma"
                                                                    onChange={handleChange}
                                                                    options={listaTurmas}
                                                                    selected={values.idTurma}
                                                                    className={`form-control ${errors.idTurma && touched.idTurma && "is-invalid"}`}
                                                                />
                                                                <ErrorMessage name="idTurma" />
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup row>
                                                            <Col md="12">
                                                                <Label for="cargaHoraria" className="d-block">Carga Horária</Label>
                                                                <div role="group" aria-labelledby="my-radio-group">
                                                                    <div className="d-inline-block mr-1">
                                                                        <label>
                                                                            <Field type="radio" name="cargaHoraria" value="1" className={`${errors.cargaHoraria && touched.cargaHoraria && "is-invalid"}`} /> 1
                                                            </label>
                                                                    </div>
                                                                    <div className="d-inline-block mr-1">
                                                                        <label>
                                                                            <Field type="radio" name="cargaHoraria" value="2" className={`${errors.cargaHoraria && touched.cargaHoraria && "is-invalid"}`} /> 2
                                                            </label>
                                                                    </div>
                                                                    <div className="d-inline-block mr-1">
                                                                        <label>
                                                                            <Field type="radio" name="cargaHoraria" value="3" className={`${errors.cargaHoraria && touched.cargaHoraria && "is-invalid"}`} /> 3
                                                            </label>
                                                                    </div>
                                                                    <div className="d-inline-block mr-1">
                                                                        <label>
                                                                            <Field type="radio" name="cargaHoraria" value="4" className={`${errors.cargaHoraria && touched.cargaHoraria && "is-invalid"}`} /> 4
                                                            </label>
                                                                    </div>
                                                                    <div className="d-inline-block mr-1">
                                                                        <label>
                                                                            <Field type="radio" name="cargaHoraria" value="5" className={`${errors.cargaHoraria && touched.cargaHoraria && "is-invalid"}`} /> 5
                                                            </label>
                                                                    </div>
                                                                    <div className="d-inline-block mr-1">
                                                                        <label>
                                                                            <Field type="radio" name="cargaHoraria" value="6" className={`${errors.cargaHoraria && touched.cargaHoraria && "is-invalid"}`} /> 6
                                                            </label>
                                                                    </div>
                                                                    <div className="d-inline-block mr-1">
                                                                        <label>
                                                                            <Field type="radio" name="cargaHoraria" value="7" className={`${errors.cargaHoraria && touched.cargaHoraria && "is-invalid"}`} /> 7
                                                            </label>
                                                                    </div>
                                                                    <div className="d-inline-block mr-1">
                                                                        <label>
                                                                            <Field type="radio" name="cargaHoraria" value="8" className={`${errors.cargaHoraria && touched.cargaHoraria && "is-invalid"}`} /> 8
                                                            </label>
                                                                    </div>
                                                                </div>
                                                                <ErrorMessage name="cargaHoraria" />
                                                            </Col>
                                                        </FormGroup>

                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="d-flex justify-content-end flex-wrap" sm="12">
                                                        <Button.Ripple className="mr-1" color="primary" type="submit" disabled={!isValid}><Save size={15} className="mr-1" />
                                                            Salvar
                                                        </Button.Ripple>
                                                        <Button.Ripple color="warning" outline onClick={() => resetForm(initialValues)}><Delete size={15} className="mr-1" />
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

export default DisciplineEdit;
