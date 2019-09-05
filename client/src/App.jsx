import React, { Component } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import Landing from "./components/landing"
import Companies from "./components/companies"
import NotFound from "./components/404"
import AuthForm from "./components/forms/authForm"
import Logout from "./components/common/logout"

import CssBaseline from "@material-ui/core/CssBaseline"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import "react-toastify/dist/ReactToastify.css"
import "font-awesome/css/font-awesome.min.css"

const theme = createMuiTheme({
	palette: {
		primary: { main: "#0065a3" },
		secondary: { main: "#c62828" }
	},
	typography: {
		useNextVariants: true
	}
})

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<MuiThemeProvider theme={theme}>
					<CssBaseline />
					<ToastContainer />
					<Switch>
						<Route path="/companies" render={(props) => <Companies {...props} />} />
						<Route path="/auth" component={AuthForm} />
						<Route path="/logout" component={Logout} />
						<Route path="/404" component={NotFound} />
						<Route path="/" exact component={Landing} />

						<Redirect to="/404" />
					</Switch>
				</MuiThemeProvider>
			</React.Fragment>
		)
	}
}

export default App
