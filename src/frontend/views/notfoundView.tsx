import React from "react"
import { createStyles } from "@material-ui/core"
import { WithStyles, withStyles, Theme } from "@material-ui/core/styles"

import { Link } from "react-router-dom"

import SimpleHeader from "../components/headers/simpleHeader"

import { Paper, Typography, Button } from "@material-ui/core"

const styles = (theme: Theme) =>
    createStyles({
        main: {
            margin: theme.spacing(2)
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: "center"
        },
        message: {
            marginBottom: theme.spacing(2)
        }
    })

interface Props extends WithStyles<typeof styles> {}

const NotFoundView = ({ classes }: Props) => {
    return (
        <>
            <SimpleHeader title={"404"} />

            <div className={classes.main}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" color="textPrimary" className={classes.message}>
                        Die Seite wurde leider nicht gefunden.
                    </Typography>
                    <Typography variant="h5" color="textPrimary" className={classes.message}>
                        ¯\_(ツ)_/¯
                    </Typography>
                    <Button variant="contained" color="primary" component={Link} to={"/"}>
                        Zur Startseite
                    </Button>
                </Paper>
            </div>
        </>
    )
}

export default withStyles(styles)(NotFoundView)
