export const errorHandler = (error) => {
    if (error.toString() === "Error: Network Error" || !error.response) {
        return {
            type: "error",
            data: "Network Error. Please check your internet connection."
        }
    } else {
        if (error.response.data && error.response.data.error) {
            let msg = error.response.data.error
            return {
                type: "error",
                data: msg
            }
        } else {
            let code = error.response.status
            let msg = ""
            switch (code){
                case 401:
                    msg = 'Unauthorised or Invalid User credentials.'
                    break;
                case 408: 
                    msg = 'Request Timeout. Please reload the page'
                    break;
                case 422:
                    msg = 'Validation Error'
                    break;
                case 403:
                    msg = 'Invalid Request'
                    break;
                case 500:
                    if(error.response.config.method === 'post'){
                        msg = 'Invalid User credentials. Please provide correct information'
                        break;
                    }else {
                        msg = 'Server is down. Please try again in a few minutes.'
                        break;
                    }   
                case 502: 
                    msg = 'Bad Gateway'
                    break;
                case 503:
                    msg = "Service Unavailable. Please try again in a few minutes." 
                    break;
                case 504: 
                    msg = "Gateway Timeout. Please try again in a few minutes." 
                    break;   
                default: 
                    msg = "Something Went Wrong!"
                    break;
            }
            return {
                type: "error",
                data: msg
            }
        }

    }
}
