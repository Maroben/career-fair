import React from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"
import Joi, { ObjectSchema } from "@hapi/joi"
import { toast } from "react-toastify"

import { FormState } from "../../types/IForm"
import Form from "./forms"
import { updateUser, register } from "../../services/userService"
import authService from "../../services/authService"
import { IUser } from "../../../persistence/models/UserModel"

const styles = (theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing()
        },
        buttonBox: {
            display: "flex",
            justifyContent: "flex-end",
            marginTop: theme.spacing(2)
        },
        button: {
            margin: theme.spacing(2),
            marginLeft: 0
        },
        cardAction: {
            marginTop: theme.spacing(),
            justifyContent: "flex-end",
            padding: 0
        },
        info: {
            margin: theme.spacing()
        },
        list: {
            margin: theme.spacing(2)
        }
    })

interface Props extends WithStyles<typeof styles> {
    user: IUser
    onUpdateUser: () => void
}

class RegisterForm extends Form<Props, FormState> {
    state = {
        data: {
            email: "",
            password: "",
            confirmPassword: ""
        },
        errors: {},
        isSubmitable: false
    }

    componentDidMount = () => {
        const { user } = this.props
        if (!user) return
        let data = {
            email: user.email,
            password: "",
            confirmPassword: ""
        }
        this.setState({ data })
    }

    doSubmit = async () => {
        try {
            const { email, password } = this.state.data
            const { user } = this.props
            const response = user
                ? await updateUser(user._id, { email, password } as IUser)
                : await register(email, password)
            authService.loginWithJwt(response.headers["x-auth-token"])

            if (user) {
                this.props.onUpdateUser()
                toast.info("Update Erfolgreich", { autoClose: 2500 })
            } else {
                window.location.pathname = "/account"
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const { errors } = this.state
                errors["email"] = ex.response.data
                this.setState({ errors })
            }
        }
    }

    joiSchema = {
        email: Joi.string()
            .min(6)
            .max(255)
            .required()
            .email({ tlds: { allow: false } })
            .label("Email"),
        password: Joi.string()
            .min(5)
            .max(20)
            .required()
            .label("Passwort"),
        confirmPassword: Joi.string()
            .min(5)
            .max(255)
            .required()
            .label("ConfirmPassword")
    }

    objectSchema = Joi.object(this.joiSchema)

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value }
        const objectSchema: ObjectSchema = Joi.object({ [name]: this.joiSchema[name] })
        const { error } = objectSchema.validate(obj)

        if (name == "confirmPassword" && value != this.state.data.password) {
            return "Not the Same"
        }

        return error ? error.details[0].message : null
    }

    render() {
        const { classes } = this.props

        return (
            <form onSubmit={this.handleSubmit}>
                {this.renderInput("email", "Email")}
                {this.renderInput("password", "Passwort", "password")}
                {this.renderInput("confirmPassword", "Passwort bestätigen", "password")}
                <div className={classes.buttonBox}>
                    {this.renderSecondaryAction("Login", "/account/login", classes)}
                    {this.renderSubmit("Registrieren", classes)}
                </div>
            </form>
        )
    }
}

export default withStyles(styles)(RegisterForm)
