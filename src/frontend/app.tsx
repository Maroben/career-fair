import React, { Component } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import CssBaseline from "@material-ui/core/CssBaseline"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { createStyles } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import CompaniesController from "./controller/companiesController"

import LandingView from "./views/landingView"
import NotFoundView from "./views/notfoundView"

import Info from "./types/IInfo"
import Filter from "./types/IFilter"

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
    filter: Filter
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
        },
        filter: {
            subjects: [],
            employmentTypes: [],
            query: ""
        }
    }

    handleContinue = (subject: string, employmentType: string) => {
        const { filter } = this.state
        filter.subjects = [subject]
        filter.employmentTypes = [employmentType]
        this.setState({ filter })
    }

    handleFilter = (filter: Filter) => {
        this.setState({ filter })
    }

    render() {
        const { info, filter } = this.state
        return (
            <>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <Switch>
                        <Route path="/404" component={NotFoundView} />
                        <Route
                            path="/companies"
                            render={() => (
                                <CompaniesController
                                    info={info}
                                    filter={filter}
                                    onFilterChange={this.handleFilter}
                                />
                            )}
                        />
                        <Route
                            path="/"
                            exact
                            render={() => (
                                <LandingView info={info} onContinue={this.handleContinue} />
                            )}
                        />

                        <Redirect to="/404" />
                    </Switch>
                </MuiThemeProvider>
            </>
        )
    }
}

export default withStyles(styles)(App)
