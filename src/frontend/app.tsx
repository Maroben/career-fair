import React, { Component } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import CssBaseline from "@material-ui/core/CssBaseline"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { createStyles } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import Landing from "./view/landing"
import Companies from "./view/companies"
import NotFound from "./view/notfound"
import Info from "./types/IInfo"

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
            subjects: [
                "Informatik",
                "Raumplanung",
                "Elektrotechnik",
                "Bauingenieurwesen",
                "Landschaftsarchitektur",
                "Wirtschaftsingenieurwesen",
                "Ernerbare Energien & Umwelttechnik"
            ],
            employmentTypes: ["Vollzeit", "Praktikum", "Training", "Teilzeit"],
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
    handleContinue = (subject: string, employmentType: string) => {}

    render() {
        const { info } = this.state
        return (
            <>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <Switch>
                        <Route path="/404" component={NotFound} />
                        <Route path="/companies" render={() => <Companies info={info} />} />
                        <Route
                            path="/"
                            exact
                            render={() => <Landing info={info} onContinue={this.handleContinue} />}
                        />

                        <Redirect to="/404" />
                    </Switch>
                </MuiThemeProvider>
            </>
        )
    }
}

export default withStyles(styles)(App)
