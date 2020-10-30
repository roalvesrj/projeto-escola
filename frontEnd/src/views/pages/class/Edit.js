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
import { Users, Save, Delete } from "react-feather";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Schema from "./Schema";

import Breadcrumbs from "../../../components/BreadCrumb";
import Input from "../../../components/Field";
import formSelector from "../../../components/formSelector";

import "../../../assets/scss/pages/users.scss";

import courseService from "../../../services/courseService";
import classService from "../../../services/classService";

const semesterSelector = [
    { value: "Primeiro", label: "Primeiro" },
    { value: "Segundo", label: "Segundo" },
];

const ClassEdit = () => {
    let history = useHistory();
    const { params } = useRouteMatch();

    const [listaCursos, setListaCursos] = useState([]);
    const [turma, setTurma] = useState([]);

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

    // Recupera a lista de cursos
    useEffect(() => {
        courseService.listarTodos()
            .then((response) => {
                setListaCursos(arrayReplace(response.data.content));
            })
            .catch((error) => {
                setColor("danger");
                setMensagem("Ocorreu um erro ao carregar a lista de cursos.");
                setIsOpen(true);
            });
    }, []);

    useEffect(() => {
        classService.listarID(params.id)
            .then((response) => {
                setTurma(response.data);
            })
            .catch((error) => {
                setColor("danger");
                setMensagem("Erro ao recuperar os dados da API.");
                setIsOpen(true);
            });
    }, []);

    const handleSubmit = (values, { resetForm }) => {
        classService.atualizar(params.id, values)
            .then(response => {
                if (response.status === 200) {
                    setColor("success")
                    setMensagem("A turma " + values.nome + " foi atualizada com sucesso!")
                    setIsOpen(true);
                }

                Object.keys(values).forEach(key => (values[key] = ""));
                resetForm(values);
            })
            .catch((error) => {
                setColor("danger")
                setMensagem("Ocorreu um erro ao tentar atualizar a turma " + values.nome + ".")
                setIsOpen(true);
            })

        setTimeout(() => {
            setIsOpen(false);
            history.push("/turma/listar");
        }, 8000);
    };

    return (
        <Row>
            <Col sm="12">
                <Breadcrumbs
                    breadCrumbTitle="Adicionar Turma"
                    breadCrumbParent="Turmas"
                    breadCrumbActive="Adicionar"
                />
            </Col>
            <Col md="12">
                <Alert isOpen={isOpen} color={color}>{mensagem}</Alert>
            </Col>
            <Col sm="12">
                <Card>
                    <CardBody>
                        {!turma ? (
                            <Row>
                                <Col sm="12">Carregando...</Col>
                            </Row>
                        ) : (
                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        idCurso: turma.idCurso,
                                        nome: turma.nome,
                                        ano: turma.ano,
                                        semestre: turma.semestre,
                                        minimoInscricao: turma.minimoInscricao,
                                        maximoInscricao: turma.maximoInscricao
                                    }}
                                    validationSchema={Schema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ values, errors, touched, isValid, initialValues, setFieldValue, resetForm, handleChange }) => {
                                        return (
                                            <Form>
                                                <Row>
                                                    <Col md="6" sm="12">
                                                        <h3 className="mb-1">
                                                            <Users className="mr-50" size={25} />
                                                            <span className="align-middle">Dados de Turma</span>
                                                        </h3>
                                                        <FormGroup row>
                                                            <Col md="6">
                                                                <Label for="idCurso">Curso</Label>
                                                                <Field
                                                                    component={formSelector}
                                                                    name="idCurso"
                                                                    id="idCurso"
                                                                    onChange={handleChange}
                                                                    options={listaCursos}
                                                                    selected={values.idCurso}
                                                                    className={`form-control ${errors.idCurso && touched.idCurso && "is-invalid"}`}
                                                                />
                                                                <ErrorMessage name="idCurso" />
                                                            </Col>
                                                        </FormGroup>
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
                                                                <Input
                                                                    type="text"
                                                                    name="ano"
                                                                    id="ano"
                                                                    label="Ano"
                                                                    onChange={handleChange}
                                                                    value={values.ano}
                                                                />
                                                            </Col>
                                                        </FormGroup>

                                                        <FormGroup row>
                                                            <Col md="6">
                                                                <Label for="semestre">Semestre</Label>
                                                                <Field
                                                                    component={formSelector}
                                                                    name="semestre"
                                                                    id="semestre"
                                                                    onChange={handleChange}
                                                                    options={semesterSelector}
                                                                    selected={values.semestre}
                                                                    className={`form-control ${errors.semestre && touched.semestre && "is-invalid"}`}
                                                                />
                                                                <ErrorMessage name="semestre" />
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Col md="6">
                                                                <Input
                                                                    type="number"
                                                                    name="minimoInscricao"
                                                                    id="minimoInscricao"
                                                                    label="Mínimo de Inscrição"
                                                                    onChange={handleChange}
                                                                    value={values.minimoInscricao}
                                                                />
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Col md="6">
                                                                <Input
                                                                    type="text"
                                                                    name="maximoInscricao"
                                                                    id="maximoInscricao"
                                                                    label="Máximo de Inscrição"
                                                                    onChange={handleChange}
                                                                    value={values.maximoInscricao}
                                                                />
                                                            </Col>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="d-flex justify-content-end flex-wrap" sm="12">
                                                        <Button.Ripple className="mr-1" color="primary" type="submit"><Save size={15} className="mr-1" />
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

export default ClassEdit;
