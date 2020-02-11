import axios from "axios"
import config from "config"
import { toast } from "react-toastify"

// axios.defaults.baseURL = config.get("endpoint")
axios.defaults.baseURL = "http://localhost:3800/api"

axios.interceptors.response.use(null, (error) => {
    const expectedError =
        error.response && error.response.status >= 400 && error.response.status < 500

    if (!expectedError) {
        toast.error("An unexpected error occurrred.")
    }

    if (error.response.status === 404) {
        window.location.replace("/404")
    }

    return Promise.reject(error)
})

const setJwt = (jwt: string) => {
    axios.defaults.headers.common["x-auth-token"] = jwt
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
}
