import React from "react"
import { Link } from "react-router-dom"
import { createStyles } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import SimpleHeader from "../components/headers/simpleHeader"
import LoginForm from "../components/forms/loginForm"

const styles = createStyles({})

interface Props extends WithStyles<typeof styles> {}

const LoginView = ({ classes }: Props) => {
    return (
        <>
            <SimpleHeader title={"Anmeldung"} />

            <LoginForm />
        </>
    )
}

export default withStyles(styles)(LoginView)
