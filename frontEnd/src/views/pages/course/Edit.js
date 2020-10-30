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
import { Formik, Form } from "formik";
import Schema from "./Schema";

import Breadcrumbs from "../../../components/BreadCrumb";
import Input from "../../../components/Field";

import "../../../assets/scss/pages/users.scss";

import courseService from "../../../services/courseService";

const CourseAdd = () => {
    let history = useHistory();
    const { params } = useRouteMatch();

    const [curso, setCurso] = useState([]);

    const [mensagem, setMensagem] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState("");

    useEffect(() => {
        courseService.listarID(params.id)
            .then((response) => {
                setCurso(response.data);
            })
            .catch((error) => {
                setColor("danger");
                setMensagem("Erro ao recuperar os dados da API.");
                setIsOpen(true);
            });
    }, []);

    const handleSubmit = (values, { resetForm }) => {
        // alert(JSON.stringify(values, null, 2));
        courseService.atualizar(params.id, values)
            .then(response => {
                if (response.status === 200) {
                    setColor("success")
                    setMensagem("O curso " + values.nome + " foi atualizado com sucesso!")
                    setIsOpen(true);
                }

                Object.keys(values).forEach(key => (values[key] = ""));
                resetForm(values);
            })
            .catch((error) => {
                setColor("danger")
                setMensagem("Ocorreu um erro ao tentar atualizar o curso " + values.nome + ".")
                setIsOpen(true);
            })

        setTimeout(() => {
            setIsOpen(false);
            history.push("/curso/listar");
        }, 8000);
    };

    return (
        <Row>
            <Col sm="12">
                <Breadcrumbs
                    breadCrumbTitle="Editar Curso"
                    breadCrumbParent="Cursos"
                    breadCrumbActive="Editar"
                />
            </Col>
            <Col md="12">
                <Alert isOpen={isOpen} color={color}>{mensagem}</Alert>
            </Col>
            <Col sm="12">
                <Card>
                    <CardBody>
                        {!curso ? (
                            <Row>
                                <Col sm="12">Carregando...</Col>
                            </Row>
                        ) : (
                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        nome: curso.nome
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
                                                            <span className="align-middle">Dados do Curso</span>
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
        </Row >
    );
};

export default CourseAdd;
