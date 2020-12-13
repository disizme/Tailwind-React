import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { verifyUser } from '../../../actions/user_logs/user_verify';
import Store from '../../../Store'

function UserVerification(props){
    useEffect(() => {
        let { token } = props.match.params
        Store.dispatch(verifyUser(token))
    }, [])

    useEffect(() => {
        if(props.userVerify.success || props.userVerify.error){
            props.history.push('/')
        }
    }, [props.userVerify])

    return <div className='page bg-red-100'>
        <div className="flex w-full">
            <div className="my-auto mx-auto">
            Verifying User
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

export default connect(mapStateToProps)(UserVerification)

