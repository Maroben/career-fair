import React from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"
import { toast } from "react-toastify"

import { companySchema, companyObjectSchema } from "../../../persistence/joiSchemas/companySchema"
import ICompany from "../../../persistence/interfaces/ICompany"
import IUser from "../../../persistence/interfaces/IUser"
import ILinks from "../../../persistence/interfaces/ILinks"

import { FormState } from "../../types/IForm"
import IInfo from "../../types/IInfo"
import Form from "./forms"

import companyService from "../../services/companyService"
import { addUserCompany } from "../../services/userService"

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
    company: ICompany
    info: IInfo
    isEditing: boolean
    onCompanyChange: () => void
    onCancel: () => void
}

class CompanyForm extends Form<Props, FormState> {
    joiSchema = companySchema
    objectSchema = companyObjectSchema

    state = {
        data: {
            name: "",
            info: "",
            description: "",
            subjects: [],
            employmentTypes: []
            // tags: [],
            // links: ILinks
        },
        errors: {},
        isSubmitable: false
    }

    componentDidMount() {
        let { data } = this.state
        if (this.props.isEditing) {
            const { company } = this.props
            data = {
                name: company.name,
                info: company.info,
                description: company.description,
                subjects: company.subjects,
                employmentTypes: company.employmentTypes
            }
            this.setState({ data })
        }
    }

    doSubmit = async () => {
        const { data } = this.state
        const { isEditing, user } = this.props
        try {
            if (isEditing) {
                await companyService.updateCompany(this.props.company._id, data as ICompany)
            } else {
                const company = await companyService.createCompany(data as ICompany)
                await addUserCompany(user, company)
            }
            this.props.onCompanyChange()
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
        const { classes, info, isEditing, onCancel } = this.props

        return (
            <form onSubmit={this.handleSubmit}>
                {this.renderInput("name", "Name")}
                {this.renderInput("info", "Info", "text", true)}
                {this.renderInput("description", "Beschreibung", "text", true)}

                {info.filterLabels.map((label) => (
                    <div key={label}>
                        {this.renderCheckboxList(info[label].label, label, info[label].items)}
                    </div>
                ))}

                <div className={classes.buttonBox}>
                    {this.renderCancel("Abbrechen", onCancel, classes)}
                    {!isEditing && this.renderSubmit("Erstellen", classes)}
                    {isEditing && this.renderSubmit("Updaten", classes)}
                </div>
            </form>
        )
    }
}

export default withStyles(styles)(CompanyForm)
