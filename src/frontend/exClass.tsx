import React, { Component } from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

const styles = (theme: Theme) =>
    createStyles({
        main: {
            margin: theme.spacing(2)
        }
    })

interface Props extends WithStyles<typeof styles> {}
type State = {}

class ExClass extends Component<Props, State> {
    render() {
        return <></>
    }
}

export default withStyles(styles)(ExClass)
