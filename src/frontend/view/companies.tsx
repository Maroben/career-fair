import React, { Component } from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import SimpleHeader from "../components/headers/simpleHeader"
import Info from "../types/IInfo"

const styles = (theme: Theme) =>
    createStyles({
        main: {
            margin: theme.spacing(2)
        }
    })

interface Props extends WithStyles<typeof styles> {
    info: Info
}

type State = {}

class Companies extends Component<Props, State> {
    render() {
        return (
            <>
                <SimpleHeader title={"Unternehmen"} />
            </>
        )
    }
}

export default withStyles(styles)(Companies)
