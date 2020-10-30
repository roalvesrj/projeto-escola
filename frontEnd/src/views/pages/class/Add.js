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
import { Users, Save, Delete } from "react-feather";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Schema from "./Schema";

import Breadcrumbs from "../../../components/BreadCrumb";
import semesterSelector from "../../../components/semesterSelector";

import "../../../assets/scss/pages/users.scss";

import courseService from "../../../services/courseService";
import classService from "../../../services/classService";

const ClassAdd = () => {
    const [listaCursos, setListaCursos] = useState([]);

    const [mensagem, setMensagem] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState("");

    // Recupera a lista de cursos
    useEffect(() => {
        courseService.listarTodos()
            .then((response) => {
                setListaCursos(response.data.content);
            })
            .catch((error) => {
                setColor("danger");
                setMensagem("Ocorreu um erro ao carregar a lista de cursos.");
                setIsOpen(true);
            });
    }, []);

    const onSubmit = (values, { resetForm }) => {
        classService.incluir(values)
            .then(response => {
                Object.keys(values).forEach(key => (values[key] = ""));
                resetForm(values);

                if (response.status === 200) {
                    setColor("success")
                    setMensagem("A turma " + values.nome + " foi adicionada com sucesso!")
                    setIsOpen(true);
                }
            })
            .catch((error) => {
                setColor("danger")
                setMensagem("Ocorreu um erro ao tentar adicionar a turma " + values.nome + ".")
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
                        <Formik
                            validationSchema={Schema}
                            onSubmit={onSubmit}
                            validateOnMount
                            initialValues={{
                                idCurso: null,
                                nome: "",
                                ano: "",
                                semestre: null,
                                minimoInscricao: "",
                                maximoInscricao: "",
                            }}
                        >
                            {({ initialValues, errors, touched, isValid, resetForm, setFieldValue }) => (
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
                                                        component="select"
                                                        name="idCurso"
                                                        id="idCurso"
                                                        className={`form-control ${errors.idCurso && touched.idCurso && "is-invalid"}`}
                                                    >
                                                        <option value={null}>- Selecione -</option>
                                                        {listaCursos.map((l, index) => (
                                                            <option key={index} value={l.idCurso}>{l.nome}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage name="idCurso" />
                                                </Col>
                                            </FormGroup>
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
                                                <Col md="6">
                                                    <Label for="ano">Ano</Label>
                                                    <Field
                                                        type="text"
                                                        name="ano"
                                                        id="ano"
                                                        className={`form-control ${errors.ano && touched.ano && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="ano" />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup row>
                                                <Col md="6">
                                                    <Label for="semestre">Semestre</Label>
                                                    <Field
                                                        component={semesterSelector}
                                                        name="semestre"
                                                        id="semestre"
                                                        className={`form-control ${errors.semestre && touched.semestre && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="semestre" />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col md="6">
                                                    <Label for="minimoInscricao">Mínimo de Inscrição</Label>
                                                    <Field
                                                        type="number"
                                                        name="minimoInscricao"
                                                        id="minimoInscricao"
                                                        className={`form-control ${errors.minimoInscricao && touched.minimoInscricao && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="minimoInscricao" />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col md="6">
                                                    <Label for="maximoInscricao">Máximo de Inscrição</Label>
                                                    <Field
                                                        type="text"
                                                        name="maximoInscricao"
                                                        id="maximoInscricao"
                                                        className={`form-control ${errors.maximoInscricao && touched.maximoInscricao && "is-invalid"}`}
                                                    />
                                                    <ErrorMessage name="maximoInscricao" />
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
                            )}
                        </Formik>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default ClassAdd;
