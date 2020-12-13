import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { fetchLogin } from '../../../actions/user_logs/user_login';
import Store from '../../../Store';
import ForgottenPassword from './Forgot-password';

let dataFormat = { email: "", password: "" }

class Login extends Component {
    state = {
        data: { ...dataFormat },
        error: { ...dataFormat },
        touched: { email: false, password: false },
        forgotten: false
    }

    onChange(e) {
        let { name } = e.target;
        let { value } = e.target;
        let data = { ...this.state.data };
        let error = { ...this.state.error };
        let touched = { ...this.state.touched }
        data[name] = value;
        touched[name] = true
        error[name] = '';
        this.setState({ data, error, touched });
    }

    onSubmit(e) {
        let { data } = { ...this.state }
        e.preventDefault()
        if (data.email && data.password) {
            Store.dispatch(fetchLogin(data))
        }

    }

    componentDidUpdate(prevProps) {
        let { getLoginRequest } = this.props;

        if (getLoginRequest !== prevProps.getLoginRequest) {
            let { success, } = getLoginRequest;
            if (success) {
                sessionStorage.setItem("user", 1)
            }
        }
    }

    toggleModal = () => {
        this.setState({
            forgotten: !this.state.forgotten
        })
    }

    render() {
        const { data, error, touched } = this.state
        return (
            <div className='page bg-red-100'>
                <div className="w-full max-w-sm bg-white m-auto pt-6" >
                    <h2 className="text-center">Sign In</h2>
                    <form onSubmit={(e) => this.onSubmit(e)} className="shadow-md rounded p-4">
                        <div className="px-4 pb-4">
                            <label htmlFor="email" className="text-sm block pb-2">Email</label>
                            <input type="email" 
                                name="email" value={data.email}
                                className={`border-b ${error.email && touched.email ? 'border-red-500' : 'border-gray-500'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-900`} 
                                placeholder="Email Address"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                onChange={e => this.onChange(e)} />
                        </div>
                        <div className="px-4 pb-4">
                            <label htmlFor="password" className="text-sm block pb-2">Password</label>
                            <input type="password" 
                                name="password" value={data.password} 
                                className={`border-b ${error.password && touched.password ? 'border-red-500' : 'border-gray-500'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-900`} 
                                placeholder="Password"
                                title="Password must contain at least an uppercase,a lowercase and a digit"
                                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{0,}$"
                                onChange={e => this.onChange(e)} />
                        </div>
                        <div className="px-4 pb-4">
                            <small>
                                <label className="text-gray-500">
                                <input type="checkbox"/>
                                    &nbsp;&nbsp;Remember me</label>
                                <div className="float-right cursor-pointer" onClick={() => this.toggleModal()}>
                                    Forgot password?
                                </div>
                            </small>
                        </div>
                        <div className="text-center pb-6">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                            type="submit">
                                Sign In</button>
                        </div>
                        <div className="text-center pb-6">
                            <small>
                            Or Login With<br/>
                            </small>
                            <div>
                            <button className="bg-blue-900 hover:bg-blue-700 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline mx-1" 
                            type="button">
                                F</button>
                                <button className="bg-red-700 hover:bg-red-500 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline mx-1" 
                            type="button">
                                G</button>
                            </div>
                        </div>
                        <div className="text-center">
                            <small>
                                Don't have an account?&nbsp;
                                <Link to="/sign-up"><b>Sign Up</b></Link>
                            </small>
                        </div>
                    </form>
                </div>
                {this.state.forgotten && <ForgottenPassword onClose={this.toggleModal} />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    let { getLoginRequest } = state
    return {
        getLoginRequest
    }
}

export default connect(mapStateToProps)(Login)

