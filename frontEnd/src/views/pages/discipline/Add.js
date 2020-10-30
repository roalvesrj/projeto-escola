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
import { Save, Delete } from "react-feather";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Schema from "./Schema";

import Breadcrumbs from "../../../components/BreadCrumb";

import "../../../assets/scss/pages/users.scss";

import classService from "../../../services/classService";
import professorService from "../../../services/professorService";
import disciplineService from "../../../services/disciplineService";


const DisciplineAdd = () => {
    const [listaTurmas, setListaTurmas] = useState([]);
    const [listaProfessores, setListaProfessores] = useState([]);

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

    // Recupera a lista de professores
    useEffect(() => {
        professorService.listarTodos()
            .then((response) => {
                setListaProfessores(response.data.content);
            })
            .catch((error) => {
                setColor("danger");
                setMensagem("Ocorreu um erro ao carregar a lista de professores.");
                setIsOpen(true);
            });
    }, []);

    const onSubmit = (values, { resetForm }) => {
        // alert(JSON.stringify(values, null, 2));
        disciplineService.incluir(values)
            .then(response => {
                Object.keys(values).forEach(key => (values[key] = ""));
                resetForm(values);

                if (response.status === 200) {
                    setColor("success")
                    setMensagem("A disciplina " + values.nome + " foi adicionada com sucesso!")
                    setIsOpen(true);
                }
            })
            .catch((error) => {
                setColor("danger")
                setMensagem("Ocorreu um erro ao tentar adicionar a disciplina " + values.nome + ".")
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
                    breadCrumbTitle="Adicionar Disciplina"
                    breadCrumbParent="Disciplinas"
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
                                nome: "",
                                matriculaProfessor: "",
                                idTurma: "",
                                cargaHoraria: "",
                            }}
                        >
                            {({ initialValues, errors, touched, isValid, resetForm, setFieldValue }) => (
                                <Form>
                                    <Row>
                                        <Col md="8" sm="12">
                                            <h3 className="mb-1">
                                                <span className="align-middle">Dados da Disciplina</span>
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
                                                <Col md="6">
                                                    <Label for="matriculaProfessor">Professor</Label>
                                                    <Field
                                                        component="select"
                                                        name="matriculaProfessor"
                                                        id="matriculaProfessor"
                                                        className={`form-control ${errors.matriculaProfessor && touched.matriculaProfessor && "is-invalid"}`}
                                                    >
                                                        <option value={null}>- Selecione -</option>
                                                        {listaProfessores.map((l, index) => (
                                                            <option key={index} value={l.matricula}>{l.nome}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage name="matriculaProfessor" />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col md="6">
                                                    <Label for="idTurma">Turma</Label>
                                                    <Field
                                                        component="select"
                                                        name="idTurma"
                                                        id="idTurma"
                                                        className={`form-control ${errors.idTurma && touched.idTurma && "is-invalid"}`}
                                                    >
                                                        <option value={null}>- Selecione -</option>
                                                        {listaTurmas.map((l, index) => (
                                                            <option key={index} value={l.matricula}>{l.nome}</option>
                                                        ))}
                                                    </Field>
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

export default DisciplineAdd;
