import React, { Component } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import CssBaseline from "@material-ui/core/CssBaseline"

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { createStyles } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import UserController from "./controller/userController"
import CompaniesController from "./controller/companiesController"
import NotFoundView from "./views/notfoundView"
import "react-toastify/dist/ReactToastify.css"

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
                    <ToastContainer />
                    <Switch>
                        <Route path="/account" render={() => <UserController />} />
                        <Route path="/companies" render={() => <CompaniesController />} />
                        <Route path="/404" component={NotFoundView} />

                        <Redirect exact path="/" to="/companies/welcome" />
                        <Redirect to="/404" />
                    </Switch>
                </MuiThemeProvider>
            </>
        )
    }
}

export default withStyles(styles)(App)
