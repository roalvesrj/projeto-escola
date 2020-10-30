import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Button,
  Label
} from "reactstrap"
import { history } from "../../../history"
import resetImg from "../../../assets/img/pages/reset-password.png"
import "../../../assets/scss/pages/authentication.scss"

class ResetPassword extends React.Component {
  render() {
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-5"
              >
                <img className="px-5 mx-2" src={resetImg} alt="resetImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2 py-50">
                  <CardHeader className="pb-1 pt-1">
                    <CardTitle>
                      <h4 className="mb-0">Redefinir senha</h4>
                    </CardTitle>
                  </CardHeader>
                  <p className="px-2 auth-title">
                  Digite seu endereço de e-mail e nova senha para continuar.
                  </p>
                  <CardBody className="pt-1">
                    <Form>
                      <FormGroup className="form-label-group">
                        <Input type="email" placeholder="Email" required />
                        <Label>Email</Label>
                      </FormGroup>
                      <FormGroup className="form-label-group">
                        <Input
                          type="password"
                          placeholder="Password"
                          required
                        />
                        <Label>Senha</Label>
                      </FormGroup>
                      <FormGroup className="form-label-group">
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          required
                        />
                        <Label>Confirmar senha</Label>
                      </FormGroup>
                      <div className="d-flex justify-content-between flex-wrap flex-sm-row flex-column">
                        <Button.Ripple
                          block
                          className="btn-block"
                          color="primary"
                          outline
                          onClick={e => {
                            e.preventDefault()
                            history.push("/pages/login")
                          }}
                        >
                          Voltar para o Login
                        </Button.Ripple>
                        <Button.Ripple
                          block
                          color="primary"
                          type="submit"
                          className="btn-block mt-1 mt-sm-0"
                          onClick={e => e.preventDefault()}
                        >
                          Redefinir
                        </Button.Ripple>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default ResetPassword
