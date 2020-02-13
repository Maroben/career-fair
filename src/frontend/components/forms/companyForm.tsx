import React from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"
import { toast } from "react-toastify"

import { companySchema, companyObjectSchema } from "../../../persistence/joiSchemas/companySchema"
import ICompany from "../../../persistence/interfaces/ICompany"
import IUser from "../../../persistence/interfaces/IUser"
import ILinks from "../../../persistence/interfaces/ILinks"

import { FormState } from "../../types/IForm"
import Form from "./forms"
import authService from "../../services/authService"
import companyService from "../../services/companyService"
import { addUserCompany, removeUserCompany } from "../../services/userService"

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
    isEditing: boolean
    onUpdateCompany: () => void
    onChange: () => void
}

class CompanyForm extends Form<Props, FormState> {
    joiSchema = companySchema
    objectSchema = companyObjectSchema

    state = {
        data: {
            name: "",
            info: "",
            description: ""
            // subjects: [],
            // employments: [],
            // tags: [],
            // links: ILinks
        },
        errors: {},
        isSubmitable: false
    }

    componentDidMount() {
        let { data } = this.state
        if (this.props.isEditing) {
            data = { ...this.props.user.company }
            this.setState({ data })
        }
    }

    doSubmit = async () => {
        const { data } = this.state
        const { isEditing, user } = this.props

        try {
            if (isEditing) {
                await companyService.updateCompany(this.props.user.company._id, data)
            } else {
                const { data: company } = await companyService.createCompany(data)
                console.log(company)
                await addUserCompany(user, company)
            }
            this.props.onChange()
            this.props.onUpdateCompany()

            toast.info("Erfolgreich", { autoClose: 2500 })
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const { errors } = this.state
                errors["name"] = ex.response.data
                toast.error(errors["name"])
                this.setState({ errors })
            }
        }
    }

    render() {
        const { classes, isEditing, onUpdateCompany } = this.props

        return (
            <form onSubmit={this.handleSubmit}>
                {this.renderInput("name", "Name")}
                {this.renderInput("info", "Info", "text", true)}
                {this.renderInput("description", "Beschreibung", "text", true)}

                <div className={classes.buttonBox}>
                    {this.renderCancel("Abbrechen", onUpdateCompany, classes)}
                    {!isEditing && this.renderSubmit("Erstellen", classes)}
                    {isEditing && this.renderSubmit("Updaten", classes)}
                </div>
            </form>
        )
    }
}

export default withStyles(styles)(CompanyForm)
