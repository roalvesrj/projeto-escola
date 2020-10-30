import React from "react"
import { Row, Col, Button, Form, Input, Label, FormGroup } from "reactstrap"

import { User, Save,Delete } from "react-feather"

import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"


class UserInfoTab extends React.Component {

  render() {
    return (
      <Form onSubmit={e => e.preventDefault()}>
        <Row className="mt-1">
          <Col className="mt-1" md="6" sm="12">
            <h5 className="mb-1">
              <User className="mr-50" size={16} />
              <span className="align-middle">Senha</span>
            </h5>

            <FormGroup>
              <Label for="senha">Senha</Label>
              <Input
                type="password"
                id="senha"
              />
            </FormGroup>

            <FormGroup>
              <Label for="contactnumber">Confirmar senha</Label>
              <Input
                type="password"
                id="confirmarSenha"
              />
            </FormGroup>

          </Col>
          <Col className="d-flex justify-content-end flex-wrap" sm="12">
            <Button.Ripple className="mr-1" type="submit"color="primary"><Save size={15} className="mr-1" />
              Salvar
            </Button.Ripple>
            <Button.Ripple type="reset" color="warning" outline className="mr-1"><Delete size={15} className="mr-1" />Limpar</Button.Ripple>
          </Col>
        </Row>
      </Form>
    )
  }
}
export default UserInfoTab
