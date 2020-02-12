import React from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"
import Joi from "@hapi/joi"

import { FormState } from "../../types/IForm"
import Form from "./forms"

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
    state = {
        data: {},
        errors: {},
        isSubmitable: false
    }

    doSubmit = () => {}

    schema = Joi.object({})

    render() {
        return <>CompanyForm</>
    }
}

export default withStyles(styles)(CompanyForm)
