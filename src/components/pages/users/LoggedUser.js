import React from 'react'
import { connect } from "react-redux";

function LoggedUser(props) {

    function logOut(){
        sessionStorage.clear()
        window.location.reload()
    }

    return <div className='page bg-red-100'>
        <div className="flex w-full">
            <div className="my-auto mx-auto">
                <div className="text-center pb-6">
                    <div className="my-4">
                    You're logged in.
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => props.history.push('/change-password')}>
                        Change Password</button>
                </div>
                <div className="text-center pb-6">
                    <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => logOut()}>
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    </div>
}

function mapStateToProps(state) {
    let { userVerify } = state
    return {
        userVerify
    }
}

export default connect(mapStateToProps)(LoggedUser)

