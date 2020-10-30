import React, { useState } from "react";
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

import courseService from "../../../services/courseService";


const CourseAdd = () => {
    const [mensagem, setMensagem] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState("");

    const onSubmit = (values) => {
        courseService.incluir(values)
            .then((response) => {
                if (response.status === 200) {
                    setColor("success")
                    setMensagem("Curso " + values.nome + " criado com sucesso!")
                    setIsOpen(true);
                }
            })
            .catch((error) => {
                setColor("danger")
                setMensagem("Erro ao cadastrar o curso.")
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
                    breadCrumbTitle="Adicionar Curso"
                    breadCrumbParent="Cursos"
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
                                nome: ""
                            }}
                        >
                            {({ initialValues, errors, touched, isValid, resetForm, setFieldValue }) => (
                                <Form>
                                    <Row>
                                        <Col md="8" sm="12">
                                            <h3 className="mb-1">
                                                <span className="align-middle">Dados do Curso</span>
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

export default CourseAdd;
