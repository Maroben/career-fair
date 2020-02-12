import React, { Component } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import CssBaseline from "@material-ui/core/CssBaseline"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { createStyles } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import CompaniesController from "./controller/companiesController"
import NotFoundView from "./views/notfoundView"

const theme = createMuiTheme({
    palette: {
        primary: { main: "#0065a3" },
        secondary: { main: "#c62828" }
    }
})

const styles = () => createStyles({})

interface Props extends WithStyles<typeof styles> {}

type State = {}

class App extends Component<Props, State> {
    render() {
        return (
            <>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <Switch>
                        <Route path="/404" component={NotFoundView} />
                        <Route path="/" component={CompaniesController} />
                        <Redirect to="/404" />
                    </Switch>
                </MuiThemeProvider>
            </>
        )
    }
}

export default withStyles(styles)(App)
