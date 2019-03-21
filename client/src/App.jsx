import React, { Component } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { ToastContainer } from "react-toastify"
// import ReactGa from "react-ga"
import auth from "./services/authService"
import ProtectedRoute from "./components/common/protectedRoute"

import Logout from "./components/common/logout"
import Companies from "./components/companies"
import Company from "./components/company"
import Users from "./components/users"
import User from "./components/user"
import CompanyForm from "./components/forms/companyForm"
import UserForm from "./components/forms/userForm"
import AuthForm from "./components/forms/authForm"

import CssBaseline from "@material-ui/core/CssBaseline"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"

import NotFound from "./components/404"

import "react-toastify/dist/ReactToastify.css"
import "font-awesome/css/font-awesome.min.css"
import "./App.scss"

const theme = createMuiTheme({
	palette: {
		primary: { main: "#0065a3" },
		secondary: { main: "#c62828" }
	},
	typography: {
		useNextVariants: true
	}
})

// ReactGa.initialize("UA-136346978-1")
// ReactGA.pageview(window.location.pathname + window.location.search)

class App extends Component {
	state = {}

	componentDidMount() {
		const user = auth.getCurrentUser()
		this.setState({ user })
	}

	render() {
		const { user } = this.state

		return (
			<React.Fragment>
				<MuiThemeProvider theme={theme}>
					<CssBaseline />

					<ToastContainer />

					<Switch>
						<ProtectedRoute
							path="/companies/edit/:id"
							component={CompanyForm}
							user={user}
						/>
						<ProtectedRoute path="/companies/new" component={CompanyForm} user={user} />
						<Route path="/companies/:id" component={Company} />
						<Route path="/companies" render={(props) => <Companies {...props} />} />

						<ProtectedRoute path="/users/edit/:id" component={UserForm} user={user} />
						<ProtectedRoute path="/users/:id" component={User} user={user} />
						<Route path="/users/register" component={UserForm} />
						<ProtectedRoute path="/users" component={Users} user={user} />

						<Route path="/auth" component={AuthForm} />
						<Route path="/logout" component={Logout} />

						<Route path="/404/:id" component={NotFound} />
						<Redirect from="/" to="companies" exact />
						<Redirect to="/404/0" />
					</Switch>
				</MuiThemeProvider>
			</React.Fragment>
		)
	}
}

export default App
