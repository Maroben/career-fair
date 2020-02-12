import React from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"
import Joi from "@hapi/joi"

import { FormState } from "../../types/IForm"
import Form from "./forms"
import authService from "../../services/authService"

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

interface Props extends WithStyles<typeof styles> {}

class LoginForm extends Form<Props, FormState> {
    state = {
        data: {
            email: "",
            password: ""
        },
        errors: {},
        isSubmitable: false
    }

    doSubmit = async () => {
        try {
            const { email, password } = this.state.data
            await authService.login(email, password)
            window.location.pathname = "/account"
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
            .label("Passwort")
    }

    objectSchema = Joi.object(this.joiSchema)

    render() {
        const { classes } = this.props

        return (
            <form onSubmit={this.handleSubmit}>
                {this.renderInput("email", "Email")}
                {this.renderInput("password", "Passwort", "password")}
                <div className={classes.buttonBox}>
                    {this.renderSecondaryAction("Registrieren", "/account/register", classes)}
                    {this.renderSubmit("Login", classes)}
                </div>
            </form>
        )
    }
}

export default withStyles(styles)(LoginForm)
