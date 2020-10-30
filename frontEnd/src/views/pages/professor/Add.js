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
// import Schema from "./Schema";

import Breadcrumbs from "../../../components/BreadCrumb";
import genderSelector from "../../../components/genderSelector";
import ufSelector from "../../../components/ufSelector";
import statusProfessorSelector from "../../../components/statusProfessorSelector";

import "../../../assets/scss/pages/users.scss";

import professorService from "../../../services/professorService";

const ProfessorAdd = () => {
  const [mensagem, setMensagem] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState("");

  function onBlurCPF(ev) {
    const { value } = ev.target;
    const cpf = value?.replace(/[^0-9]/g, "");

    if (cpf?.length !== 11) {
      return;
    }

    professorService.listarCPF(cpf)
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

  const onSubmit = (values, actions) => {
    console.log('SUBMIT', values);

    alert(JSON.stringify(values, null, 2));
  }

  return (
    <Row>
      <Col sm="12">
        <Breadcrumbs
          breadCrumbTitle="Adicionar professor"
          breadCrumbParent="Professores"
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
              // validationSchema={Schema}
              onSubmit={onSubmit}
              validateOnMount
              initialValues={{
                nome: "",
                nomeSocial: "",
                cpf: "",
                rg: "",
                genero: "",
                dataNascimento: "",
                naturalidade: "",
                nacionalidade: "",
                defFuncional: "",
                telefone: "",
                email: "",
                cep: "",
                logradouro: "",
                numero: "",
                complemento: "",
                bairro: "",
                cidade: "",
                estado: ""
              }}
            >
              {({ errors, touched, isValid, setFieldValue }) => (
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
                            component={ufSelector}
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
                        <span className="align-middle">Dados Profissionais</span>
                      </h3>
                      <FormGroup row>
                        <Col md="4">
                          <Label for="matricula">Matrícula</Label>
                          <Field
                            type="text"
                            name="matricula"
                            id="matricula"
                            disabled="disbaled"
                            className={`form-control ${errors.matricula && touched.matricula && "is-invalid"}`}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="6">
                          <Label for="status">Status</Label>
                          <Field
                            component={statusProfessorSelector}
                            name="status"
                            id="status"
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

export default ProfessorAdd;
