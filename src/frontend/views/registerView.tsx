import React from "react"
import { Link } from "react-router-dom"
import { createStyles } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import SimpleHeader from "../components/headers/simpleHeader"
import RegisterForm from "../components/forms/registerForm"

const styles = createStyles({})

interface Props extends WithStyles<typeof styles> {}

const RegisterView = ({ classes }: Props) => {
    return (
        <>
            <SimpleHeader title={"Registrierung"} />

            <RegisterForm />
        </>
    )
}

export default withStyles(styles)(RegisterView)
