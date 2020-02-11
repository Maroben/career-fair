import React from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

const styles = (theme: Theme) =>
    createStyles({
        main: {
            margin: theme.spacing(2)
        }
    })

interface Props extends WithStyles<typeof styles> {}

const ExComponent = ({ classes }: Props) => {
    return (
        <>
            <div className={classes.main}></div>
        </>
    )
}

export default withStyles(styles)(ExComponent)
