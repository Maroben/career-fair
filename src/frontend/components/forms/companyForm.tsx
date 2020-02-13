import React from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import { companySchema, companyObjectSchema } from "../../../persistence/joiSchemas/companySchema"

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

class CompanyForm extends Form<Props, FormState> {
    joiSchema = companySchema
    objectSchema = companyObjectSchema

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

export default withStyles(styles)(CompanyForm)
