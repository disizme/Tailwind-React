import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import userSignup from '../../../actions/user_logs/user_register';
import Store from '../../../Store';

let dataFormat = { email: "", password: "" }

class SignUp extends Component {
    state = {
        data: { ...dataFormat },
        error: { ...dataFormat },
        touched: { email: false, password: false },
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
            Store.dispatch(userSignup(data))
        }

    }

    componentDidUpdate(prevProps) {
        let { getSignUpRequest } = this.props;

        if (getSignUpRequest !== prevProps.getSignUpRequest) {
            let { success, } = getSignUpRequest;
            if (success) {
                this.props.history.push('/')
            }
        }
    }

    render() {
        const { data, error, touched } = this.state
        return (
            <div className='page bg-red-100'>
                <div className="w-full max-w-sm bg-white m-auto pt-6" >
                <h2 className="text-center">Sign Up</h2>
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
                        <div className="text-center py-8">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                            type="submit">
                                Sign Up</button>
                        </div>
                        <div className="text-center">
                            <small>
                                Already have an account?&nbsp;
                                <Link to="/"><b>Sign In</b></Link>
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let { getSignUpRequest } = state
    return {
        getSignUpRequest
    }
}

export default connect(mapStateToProps)(SignUp)

