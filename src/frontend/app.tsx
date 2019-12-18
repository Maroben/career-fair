import React, { Component } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import CssBaseline from "@material-ui/core/CssBaseline"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"

import Companies from "./view/companies"
import NotFound from "./view/notfound"

const theme = createMuiTheme({
    palette: {
        primary: { main: "#0065a3" },
        secondary: { main: "#c62828" }
    }
})

class App extends Component {
    render() {
        return (
            <>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <Switch>
                        <Route path="/404" component={NotFound} />
                        <Route path="/" exact component={Companies} />

                        <Redirect to="/404" />
                    </Switch>
                </MuiThemeProvider>
            </>
        )
    }
}

export default App
