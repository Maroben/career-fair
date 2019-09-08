import React, { Component } from "react"
import { PropTypes } from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Switch, Route } from "react-router-dom"

import SimpleHeader from "./headers/simpleHeader"
import AccountView from "./views/accountView"

import LoginForm from "./forms2/loginForm"
import RegisterForm from "./forms2/registerForm"

import authService from "../services/authService"
import ProtectedRoute from "./common/protectedRoute"

import global from "./../utils/global"
const styles = (theme) => ({
	container: {
		margin: theme.spacing(2)
	}
})

class Account extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: null,
			company: null,
			filterLabels: [
				["subjects", "Studiengänge"],
				["employments", "Anstellungsart"],
				["tags", "Kategorien"]
			]
		}
	}

	async componentDidMount() {
		const user = await authService.getCurrentUser()
		await this.setState({ user })
		global.subjects = "new"
		console.log(global)
	}

	render() {
		const { classes } = this.props
		const { user, company, filterLabels } = this.state
		return (
			<>
				<SimpleHeader title="Account" user={user} />

				<div className={classes.container}>
					<Switch>
						<Route path="/account/login" component={LoginForm} />
						<Route path="/account/register" component={RegisterForm} />
						<ProtectedRoute
							path="/account"
							render={(props) => (
								<AccountView
									{...props}
									user={user}
									company={company}
									filterLabels={filterLabels}
								/>
							)}
						/>
					</Switch>
				</div>
			</>
		)
	}
}

Account.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Account)
