import React from "react"
import { Card, CardBody, Button, Row, Col } from "reactstrap"
import notFoundImg from "../../../../assets/img/pages/404-error.svg"

class Error404 extends React.Component {
  render() {
    return (
      <Row className="m-0">
        <Col sm="12">
          <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
            <CardBody className="text-center">
              <img
                src={notFoundImg}
                alt="ErrorImg"
                className="img-fluid align-self-center mt-5 mt-md-0 error-notfound"
                style={{ 'max-width': '400px' }}
              />
              <h1 className="font-large-2 my-1">Ops! Página não encontrada</h1>
              <p className="pt-2 mb-0">
                A página que você procura não foi encontrada ou não está mais disponível.
              </p>
              <Button.Ripple
                tag="a"
                href="/"
                color="primary"
                size="lg"
                className="mt-2"
              >
                Voltar para o Início
              </Button.Ripple>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default Error404
