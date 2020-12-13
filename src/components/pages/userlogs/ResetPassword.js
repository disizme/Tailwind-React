import React, { Component } from 'react';
import { connect } from "react-redux";
import resetPassword from '../../../actions/user_logs/reset_password';
import Store from '../../../Store';

let dataFormat = { newPassword: "", newPassword2: "" }

class ResetPass extends Component {
    state = {
        data: { ...dataFormat },
        error: { ...dataFormat },
        touched: { newPassword: false, newPassword2: false },
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
        if (data.newPassword && data.newPassword === data.newPassword2) {
            let {token} = this.props.match.params
            Store.dispatch(resetPassword(data, token))
        }else{
            let error = {...this.state.error}
            error.newPassword = true
            error.newPassword2 = true
            this.setState({ error })
        }

    }

    componentDidUpdate(prevProps) {
        let { resetPassword } = this.props;

        if (resetPassword !== prevProps.resetPassword) {
            let { success, } = resetPassword;
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
                <h2 className="text-center">Reset Password</h2>
                    <form onSubmit={(e) => this.onSubmit(e)} className="shadow-md rounded p-4">
                        <div className="px-4 pb-4">
                            <label htmlFor="newPassword" className="text-sm block pb-2">New Password</label>
                            <input type="password" 
                                name="newPassword" value={data.newPassword}
                                className={`border-b ${error.newPassword && touched.newPassword ? 'border-red-500' : 'border-gray-500'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-900`} 
                                placeholder="Password"
                                title="Password must contain at least an uppercase,a lowercase and a digit"
                                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{0,}$"
                                onChange={e => this.onChange(e)} />
                        </div>
                        <div className="px-4 pb-4">
                            <label htmlFor="newPassword2" className="text-sm block pb-2">Re-type Password</label>
                            <input type="password" 
                                name="newPassword2" value={data.newPassword2} 
                                className={`border-b ${error.newPassword2 && touched.newPassword2 ? 'border-red-500' : 'border-gray-500'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-900`} 
                                placeholder="Password"
                                title="Password must contain at least an uppercase,a lowercase and a digit"
                                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{0,}$"
                                onChange={e => this.onChange(e)} />
                        </div>
                        <div className="text-center py-8">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                            type="submit">
                                Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let { resetPassword } = state
    return {
        resetPassword
    }
}

export default connect(mapStateToProps)(ResetPass)

