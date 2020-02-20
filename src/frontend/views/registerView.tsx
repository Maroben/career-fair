import React from "react"
import { createStyles } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import StandardHeader from "../components/headers/standardHeader"
import RegisterForm from "../components/forms/registerForm"

const styles = createStyles({})

interface Props extends WithStyles<typeof styles> {}

const RegisterView = (props: Props) => {
    return (
        <>
            <StandardHeader title={"Registrierung"} />

            <RegisterForm />
        </>
    )
}

export default withStyles(styles)(RegisterView)
