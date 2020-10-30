import React, { useState, useEffect, useCallback } from "react";
import { useRouteMatch } from "react-router-dom";
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

import shiftSelector from "../../../components/shiftSelector";
import statusSelector from "../../../components/statusSelector";
import genderSelector from "../../../components/genderSelector";

import "../../../assets/scss/pages/users.scss";

import classService from "../../../services/classService";
import studentService from "../../../services/studentService";

const StudentEdit = () => {
  const setFieldValue = useCallback();
  const { params } = useRouteMatch();
  const [studentData, setStudentData] = useState([]);

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

  // useEffect(() => {
  //     studentService.listarID(params.id)
  //         .then((response) => {
  //             setStudentData(response.data);
  //             console.log(response.data);
  //         })
  //         .catch((error) => {
  //             setColor("danger");
  //             setMensagem("Erro ao recuperar os dados da API.");
  //             setIsOpen(true);
  //         });
  // }, []);

  // const loadValues = (data, setFieldValue) => {
  //     const fields = [
  //         "nome",
  //         "nomeSocial",
  //         "cpf",
  //         "rg",
  //         "genero",
  //         "dataNascimento",
  //         "naturalidade",
  //         "nacionalidade",
  //         "defFuncional",
  //         "telefone",
  //         "email",
  //         "cep",
  //         "logradouro",
  //         "numero",
  //         "complemento",
  //         "bairro",
  //         "cidade",
  //         "estado",
  //         "matricula",
  //         "responsavel",
  //         "nomeMae",
  //         "nomePai",
  //         "anoIngresso",
  //         "anoConclusao",
  //         "turno",
  //         "status",
  //         "idTurma"
  //     ];

  //     fields.forEach(field => setFieldValue(field, data[field], false));
  // }

  const onSubmit = (values, actions) => {
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <Row>
      <Col sm="12">
        <Breadcrumbs
          breadCrumbTitle="Editar aluno"
          breadCrumbParent="Alunos"
          breadCrumbActive="Editar"
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
                nome: studentData.nome,
                nomeSocial: studentData.nomeSocial,
                cpf: studentData.cpf,
                rg: studentData.rg,
                genero: studentData.genero,
                dataNascimento: studentData.dataNascimento,
                naturalidade: studentData.naturalidade,
                nacionalidade: studentData.nacionalidade,
                defFuncional: studentData.defFuncional,
                telefone: studentData.telefone,
                email: studentData.email,
                cep: studentData.cep,
                logradouro: studentData.logradouro,
                numero: studentData.numero,
                complemento: studentData.complemento,
                bairro: studentData.bairro,
                cidade: studentData.cidade,
                estado: studentData.estado,
                matricula: studentData.matricula,
                responsavel: studentData.responsavel,
                nomeMae: studentData.nomeMae,
                nomePai: studentData.nomePai,
                anoIngresso: studentData.anoIngresso,
                anoConclusao: studentData.anoConclusao,
                turno: studentData.turno,
                status: studentData.status,
                idTurma: studentData.idTurma
              }}
            >
              {({ errors, touched, isValid, setFieldValue }) => {

                // useEffect(() => {
                //     // userService.getById(id)
                //     // .then(user => {
                //     //     const fields = ['title', 'firstName', 'lastName', 'email', 'role'];
                //     //     fields.forEach(field => setFieldValue(field, user[field], false));
                //     //     setUser(user);
                //     studentService.listarID(params.id)
                //         .then(response => {
                //             const fields = [
                //                 "nome",
                //                 "nomeSocial",
                //                 "cpf",
                //                 "rg",
                //                 "genero",
                //                 "dataNascimento",
                //                 "naturalidade",
                //                 "nacionalidade",
                //                 "defFuncional",
                //                 "telefone",
                //                 "email",
                //                 "cep",
                //                 "logradouro",
                //                 "numero",
                //                 "complemento",
                //                 "bairro",
                //                 "cidade",
                //                 "estado",
                //                 "matricula",
                //                 "responsavel",
                //                 "nomeMae",
                //                 "nomePai",
                //                 "anoIngresso",
                //                 "anoConclusao",
                //                 "turno",
                //                 "status",
                //                 "idTurma"
                //             ];

                //             fields.forEach(field => setFieldValue(field, response.data[field], false));
                //             setStudentData(response.data);
                //             console.log(response.data);
                //         })
                //         .catch((error) => {
                //             setColor("danger");
                //             setMensagem("Erro ao recuperar os dados da API.");
                //             setIsOpen(true);
                //         });
                // }, []);
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
                          <Col md="6">
                            <Label for="cpf">CPF</Label>
                            <Field
                              type="number"
                              name="cpf"
                              id="cpf"
                              disabled="disabled"
                              className={`form-control ${errors.cpf && touched.cpf && "is-invalid"}`}
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
                              component={genderSelector}
                              name="genero"
                              id="genero"
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
                                  <Field type="radio" name="defFuncional" value="Sim" className={`${errors.defFuncional && touched.defFuncional && "is-invalid"}`} /> Sim
                                                                                                                      </label>
                              </div>
                              <div className="d-inline-block mr-1">
                                <label>
                                  <Field type="radio" name="defFuncional" value="Não" className={`${errors.defFuncional && touched.defFuncional && "is-invalid"}`} /> Não
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
                              component="select"
                              name="estado"
                              id="estado"
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
                            <Label for="matricula">Matrícula</Label>
                            <Field
                              type="text"
                              name="matricula"
                              id="matricula"
                              disabled="disabled"
                              className={`form-control ${errors.matricula && touched.matricula && "is-invalid"}`}
                            />
                          </Col>
                        </FormGroup>

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
                              component={shiftSelector}
                              name="turno"
                              id="turno"
                              className={`form-control ${errors.turno && touched.turno && "is-invalid"}`}
                            />
                            <ErrorMessage name="turno" />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="6">
                            <Label for="status">Status</Label>
                            <Field
                              component={statusSelector}
                              name="status"
                              id="status"
                              className={`form-control ${errors.status && touched.status && "is-invalid"}`}
                            />
                            <ErrorMessage name="status" />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="4">
                            <Label for="idTurma">ID Turma</Label>
                            <Field
                              type="number"
                              name="idTurma"
                              id="idTurma"
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
                );
              }}
            </Formik>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default StudentEdit;
