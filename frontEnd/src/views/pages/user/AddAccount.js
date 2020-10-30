import React from "react"
import {
  Media,
  Row,
  Col,
  Button,
  Form,
  Input,
  Label,
  FormGroup,
  Table
} from "reactstrap"
import userImg from "../../../assets/img/portrait/small/avatar-s-18.jpg"
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check, Lock, Save, Trash, Edit2, Delete } from "react-feather"

class UserAccountTab extends React.Component {
  render() {
    return (
      <Row>
        <Col sm="12">
          <Media className="mb-2">
            <Media className="mr-2 my-25" left href="#">
              <Media
                className="users-avatar-shadow rounded"
                object
                src={userImg}
                alt="user profile image"
                height="120"
                width="120"
              />
            </Media>
            <Media className="mt-2" body>
              <Media className="font-medium-1 text-bold-600" tag="p" heading>
                Crystal Hamilton
              </Media>
              <div className="d-flex flex-wrap">
                <Button.Ripple className="mr-1" color="primary" outline><Edit2 size={15} className="mr-1" />
                  Editar
                </Button.Ripple>
                <Button.Ripple color="flat-danger"><Trash size={15} className="mr-1" />Remover</Button.Ripple>
              </div>
            </Media>
          </Media>
        </Col>
        <Col sm="12">
          <Form onSubmit={e => e.preventDefault()}>
            <Row>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="name">Nome</Label>
                  <Input
                    type="text"
                    id="name"
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="username">Usuário</Label>
                  <Input
                    type="text"
                    id="username"
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="status">Status</Label>
                  <Input type="select" name="status" id="status">
                    <option>Ativo</option>
                    <option>Desativado</option>
                  </Input>
                </FormGroup>
              </Col>

              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="role">Papel</Label>
                  <Input type="select" name="role" id="role">
                    <option>Usuário</option>
                    <option>Administrador</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
              </Col>
              <Col sm="12">
                <div className="permissions border px-2">
                  <div className="title pt-2 pb-0">
                    <Lock size={19} />
                    <span className="text-bold-500 font-medium-2 ml-50">
                      Permissions
                    </span>
                    <hr />
                  </div>
                  <Table borderless responsive>
                    <thead>
                      <tr>
                        <th>Módulo de Permissões</th>
                        <th>Ler</th>
                        <th>Editar</th>
                        <th>Criar</th>
                        <th>Deletar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Usuário</td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={true}
                          />
                        </td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={false}
                          />
                        </td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={false}
                          />
                        </td>
                        <td>
                          {" "}
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={true}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Artigos</td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={false}
                          />
                        </td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={true}
                          />
                        </td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={false}
                          />
                        </td>
                        <td>
                          {" "}
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={true}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Administrador</td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={true}
                          />
                        </td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={true}
                          />
                        </td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={false}
                          />
                        </td>
                        <td>
                          {" "}
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={false}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
              <Col
                className="d-flex justify-content-end flex-wrap mt-2"
                sm="12"
              >
                <Button.Ripple type="submit" className="mr-1" color="primary"><Save size={15} className="mr-1"/>
                  Salvar
                </Button.Ripple>
                <Button.Ripple type="reset" color="warning" outline ><Delete size={15} className="mr-1" />Limpar</Button.Ripple>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    )
  }
}
export default UserAccountTab
