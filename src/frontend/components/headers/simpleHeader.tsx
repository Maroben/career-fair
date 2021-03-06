import React from "react"
import { createStyles } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"
import auth from "../../services/authService"

import { AppBar, Toolbar, Typography, Icon, IconButton } from "@material-ui/core"

const styles = createStyles({
    header: {
        width: "100%"
    },
    title: {
        display: "block",
        width: "100%"
    }
})

interface Props extends WithStyles<typeof styles> {
    title: string
}

const SimpleHeader = ({ classes, title }: Props) => {
    const user = auth.getCurrentUser()

    return (
        <AppBar position="static" className={classes.header}>
            <Toolbar>
                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default withStyles(styles)(SimpleHeader)
