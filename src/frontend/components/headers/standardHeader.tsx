import React from "react"
import { Link } from "react-router-dom"
import { createStyles } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"
import auth from "../../services/authService"

import { AppBar, Toolbar, Typography, Icon, IconButton } from "@material-ui/core"
import HomeIcon from "@material-ui/icons/Home"
import AccountIcon from "@material-ui/icons/Person"

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

const StandardHeader = ({ classes, title }: Props) => {
    const user = auth.getCurrentUser()

    return (
        <AppBar position="static" className={classes.header}>
            <Toolbar>
                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                    {title}
                </Typography>
                {user && (
                    <IconButton edge="end" color="inherit" component={Link} to={"/account"}>
                        <AccountIcon />
                    </IconButton>
                )}
                <IconButton edge="end" color="inherit" component={Link} to={"/companies"}>
                    <HomeIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default withStyles(styles)(StandardHeader)
