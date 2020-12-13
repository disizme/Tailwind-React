import React, {Component} from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import NotificationBar from '../../common/messages/NotificationBar';
import FullPageLoader from '../../common/loader/FullPageLoader';
// import Store from '../../Store';

const Login = React.lazy(() => import('../pages/userlogs/Login'));
const SignUp = React.lazy(() => import('../pages/userlogs/SignUp'));
const UserVerification = React.lazy(() => import('../pages/userlogs/UserVerification'));
const UpdatePass = React.lazy(() => import('../pages/userlogs/UpdatePassword'));
const ResetPass = React.lazy(() => import('../pages/userlogs/ResetPassword'));

const LoggedUser = React.lazy(() => import('../pages/users/LoggedUser'));

class Routes extends Component {
  state = {
    logged: sessionStorage.getItem("user") === "1"
  }

  componentDidUpdate(prevProps){
    if(this.props.getLoginRequest !== prevProps.getLoginRequest){
      if(this.props.getLoginRequest.success){
        this.setState({
          logged: sessionStorage.getItem("user") === "1"
        })
      }
    }
  }
  render() {
    const { logged } = this.state
    return (
        <div>
          {
            logged ? 
            <React.Suspense fallback={<div className="page bg-red-100" />}>
                <Switch>
                    <Route exact path="/" render={(props) => <LoggedUser {...props} />} />
                    <Route exact path="/change-password" name="Change Password" render={(props) => <UpdatePass {...props} />} />
                    <Redirect to="/" />
                </Switch>
            </React.Suspense>
            : <React.Suspense fallback={<div className="page bg-red-100" />}>
            <Switch>
                <Route exact path="/login" render={(props) => <Login {...props} />} />
                <Route exact path="/api/v1/auth/verify/:token" render={(props) => <UserVerification {...props} />} />
                <Route exact path="/sign-up" name="Sign Up Page" render={(props) => <SignUp {...props} />} />
                <Route exact path="/change-password" name="Change Password" render={(props) => <UpdatePass {...props} />} />
                <Route exact path="/api/v1/auth/reset-password/:token" name="Reset Password" render={(props) => <ResetPass {...props} />} />
                <Redirect to="/login" />
            </Switch>
        </React.Suspense>
          }
            
            <NotificationBar />
            <FullPageLoader />
        </div>
    );
  }
}


function mapStateToProps(state) {
  let { getLoginRequest } = { ...state }
  return {
    getLoginRequest
  }
}

export default withRouter(connect(mapStateToProps)(Routes));
