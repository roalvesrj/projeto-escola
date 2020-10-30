import React from "react"
import {
  Card,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap"
import classnames from "classnames"
import { User, Lock } from "react-feather"
import AccountTab from "./EditAccount"
import InfoTab from "./EditPassword"
import Breadcrumbs from "../../../components/BreadCrumb";
import "../../../assets/scss/pages/users.scss"
class UserEdit extends React.Component {
  state = {
    activeTab: "1"
  }

  toggle = tab => {
    this.setState({
      activeTab: tab
    })
  }
  render() {
    return (
      <Row>
        <Col sm="12">
          <Breadcrumbs
            breadCrumbTitle="Editar usuário"
            breadCrumbParent="Usuários"
            breadCrumbActive="Editar"
          />
        </Col>
        <Col sm="12">
          <Card>
            <CardBody className="pt-2">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggle("1")
                    }}
                  >
                    <User size={16} />
                    <span className="align-middle ml-50">Conta</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggle("2")
                    }}
                  >
                    <Lock size={16} />
                    <span className="align-middle ml-50">Senha</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <AccountTab />
                </TabPane>
                <TabPane tabId="2">
                  <InfoTab />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default UserEdit
