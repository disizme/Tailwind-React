import React, { useState } from "react";
import forgotPass from "../../../actions/user_logs/forgot_password";
import Store from "../../../Store";

export default function ForgottenPassword(props) {
    const [email, setEmail] = useState("")

    function onChange(e) {
        setEmail(e.target.value)
    }

    function onSend(e){
        Store.dispatch(forgotPass(email))
        props.onClose()
    }

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative my-6 mx-auto w-full max-w-sm">
                    <div className="border-0 p-6 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="text-center">
                            Reset Password
                        </div>
                        <div className="pt-2 pb-4">
                            <input type="email" 
                                name="email" value={email}
                                className="border-b border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-900 " 
                                placeholder="Email Address"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                onChange={e => onChange(e)} />
                        </div>
                <div className="pt-8">
                <button
                        className="float-right bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={(e) => onSend(e)}>
                        Send Mail
                  </button>
                    <button className="float-right border border-gray-500 py-2 px-4 rounded mx-2"
                        type="button"
                        onClick={() => props.onClose()} >
                        Close
                    </button>
                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
