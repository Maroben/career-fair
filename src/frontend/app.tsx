import React, { Component } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import CssBaseline from "@material-ui/core/CssBaseline"

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { createStyles } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import Info from "./types/IInfo"
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

type State = {
    info: Info
}

class App extends Component<Props, State> {
    state = {
        info: {
            filterLabels: ["subjects", "employmentTypes"],
            subjects: {
                label: "Studiengänge",
                items: [
                    "Informatik",
                    "Raumplanung",
                    "Elektrotechnik",
                    "Bauingenieurwesen",
                    "Landschaftsarchitektur",
                    "Wirtschaftsingenieurwesen",
                    "Ernerbare Energien & Umwelttechnik"
                ]
            },
            employmentTypes: {
                label: "Anstellungsarten",
                items: ["Vollzeit", "Praktikum", "Training", "Teilzeit"]
            },
            links: {
                homepage: "",
                linkedin: "",
                xing: "",
                facebook: "",
                instagram: "",
                twitter: "",
                youtube: ""
            }
        }
    }
    render() {
        const { info } = this.state
        return (
            <>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <ToastContainer />
                    <Switch>
                        <Route path="/account" render={() => <UserController info={info} />} />
                        <Route
                            path="/companies"
                            render={() => <CompaniesController info={info} />}
                        />
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
