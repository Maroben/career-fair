import { Component } from "react"
import authService from "../services/authService"

class LogoutComponent extends Component {
    componentDidMount() {
        authService.logout()
        window.location.pathname = "/"
    }

    render() {
        return null
    }
}

export default LogoutComponent
