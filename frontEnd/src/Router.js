import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "./components/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";

const analyticsDashboard = lazy(() => import("./views/dashboard/ecommerce/EcommerceDashboard"))

const search = lazy(() => import("./views/pages/search/Search"))
const accountSettings = lazy(() => import("./views/pages/account-settings/AccountSettings"))

const error404 = lazy(() => import("./views/pages/misc/error/404"))
const error500 = lazy(() => import("./views/pages/misc/error/500"))
const authorized = lazy(() => import("./views/pages/misc/NotAuthorized"))
const maintenance = lazy(() => import("./views/pages/misc/Maintenance"))

const Login = lazy(() => import("./views/pages/authentication/login/Login"))
const forgotPassword = lazy(() => import("./views/pages/authentication/ForgotPassword"))
const resetPassword = lazy(() => import("./views/pages/authentication/ResetPassword"))

const courseList = lazy(() => import("./views/pages/course/List"));
const courseAdd = lazy(() => import("./views/pages/course/Add"));
const courseEdit = lazy(() => import("./views/pages/course/Edit"));

const classList = lazy(() => import("./views/pages/class/List"));
const classAdd = lazy(() => import("./views/pages/class/Add"));
const classEdit = lazy(() => import("./views/pages/class/Edit"));


const disciplineList = lazy(() => import("./views/pages/discipline/List"));
const disciplineAdd = lazy(() => import("./views/pages/discipline/Add"));
const disciplineEdit = lazy(() => import("./views/pages/discipline/Edit"));

const professorList = lazy(() => import("./views/pages/professor/List"));
const professorAdd = lazy(() => import("./views/pages/professor/Add"));
const professorEdit = lazy(() => import("./views/pages/professor/Edit"));

const studentList = lazy(() => import("./views/pages/student/List"));
const studentAdd = lazy(() => import("./views/pages/student/Add"));
const studentEdit = lazy(() => import("./views/pages/student/Edit"));

const userList = lazy(() => import("./views/pages/user/List"));
const userAdd = lazy(() => import("./views/pages/user/Add"));
const userEdit = lazy(() => import("./views/pages/user/Edit"));

// Set Layout and Component Using App Route
const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <ContextLayout.Consumer>
          {context => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                  ? context.horizontalLayout
                  : context.VerticalLayout
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            )
          }}
        </ContextLayout.Consumer>
      )
    }}
  />
);
const mapStateToProps = state => {
  return {
    user: state.auth.login.userRole
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={analyticsDashboard} />

          <AppRoute path="/pages/search" component={search} />
          <AppRoute path="/pages/account-settings" component={accountSettings} />

          <AppRoute path="/misc/error/404" component={error404} fullLayout />
          <AppRoute path="/pages/login" component={Login} fullLayout />
          <AppRoute path="/pages/forgot-password" component={forgotPassword} fullLayout />

          <AppRoute path="/pages/reset-password" component={resetPassword} fullLayout />
          <AppRoute path="/misc/error/500" component={error500} fullLayout />
          <AppRoute path="/misc/not-authorized" component={authorized} fullLayout />
          <AppRoute path="/misc/maintenance" component={maintenance} fullLayout />

          <AppRoute path="/curso" exact component={() => <Redirect to="/curso/listar" />} />
          <AppRoute path="/curso/listar" component={courseList} />
          <AppRoute path="/curso/adicionar" component={courseAdd} />
          <AppRoute path="/curso/editar/:id" component={courseEdit} />

          <AppRoute path="/turma" exact component={() => <Redirect to="/turma/listar" />} />
          <AppRoute path="/turma/listar" component={classList} />
          <AppRoute path="/turma/adicionar" component={classAdd} />
          <AppRoute path="/turma/editar/:id" component={classEdit} />

          <AppRoute path="/disciplina" exact component={() => <Redirect to="/disciplina/listar" />} />
          <AppRoute path="/disciplina/listar" component={disciplineList} />
          <AppRoute path="/disciplina/adicionar" component={disciplineAdd} />
          <AppRoute path="/disciplina/editar/:id" component={disciplineEdit} />

          <AppRoute path="/professor" exact component={() => <Redirect to="/professor/listar" />} />
          <AppRoute path="/professor/listar" component={professorList} />
          <AppRoute path="/professor/adicionar" component={professorAdd} />
          <AppRoute path="/professor/editar/:id" component={professorEdit} />

          <AppRoute path="/aluno" exact component={() => <Redirect to="/aluno/listar" />} />
          <AppRoute path="/aluno/listar" component={studentList} />
          <AppRoute path="/aluno/adicionar" component={studentAdd} />
          <AppRoute path="/aluno/editar/:id" component={studentEdit} />

          <AppRoute path="/usuario" exact component={() => <Redirect to="/usuario/listar" />} />
          <AppRoute path="/usuario/listar" component={userList} />
          <AppRoute path="/usuario/adicionar" component={userAdd} />
          <AppRoute path="/usuario/editar/:id" component={userEdit} />

          <AppRoute component={error404} fullLayout />
        </Switch>
      </Router>
    );
  };
};

export default AppRouter;
