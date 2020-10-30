import React from "react"
import { Row, Col, Button, Form, Input, Label, FormGroup } from "reactstrap"
import { User, Save,Delete } from "react-feather"
import chroma from "chroma-js"

import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"


const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = data.color ? chroma(data.color) : "#7367f0"
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled && (isSelected ? data.color : "#7367f0")
      }
    }
  },
  multiValue: (styles, { data }) => {
    const color = data.color ? chroma(data.color) : "#7367f0"
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css()
    }
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color ? data.color : "#7367f0"
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color ? data.color : "#7367f0",
      color: "white"
    }
  })
}
class UserInfoTab extends React.Component {
  state = {
    dob: new Date("1995-05-22")
  }
  handledob = date => {
    this.setState({
      dob: date
    })
  }
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
            <Button.Ripple type="submit"className="mr-1" color="primary"><Save size={30} className="mr-1" />
              Salvar
            </Button.Ripple>
            <Button.Ripple ctype="reset" color="warning" outline className="mr-1"><Delete size={15} className="mr-1" />Limpar</Button.Ripple>
          </Col>
        </Row>
      </Form>
    )
  }
}
export default UserInfoTab
