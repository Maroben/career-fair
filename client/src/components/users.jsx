import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import { getUsers, deleteUser } from "../services/userService"

import User from "./user"
import { toast } from "react-toastify"

const styles = (theme) => ({
	button: {
		margin: theme.spacing()
	},
	header: {
		margin: theme.spacing(2)
	}
})

class Users extends Component {
	state = {
		users: [],
		userComponent: (user) => (
			<User user={user} onEdit={this.handleEdit} onDelete={this.handleDelete} />
		)
	}

	async componentDidMount() {
		const users = await getUsers()
		this.setState({ users })
	}

	handleDelete = async (id) => {
		const users = this.state.users
		const deleted = users.filter((user) => user._id !== id)
		this.setState({ users: deleted })

		await deleteUser(id)
			.then((res) => {
				toast.info("User deleted", { autoClose: 1500 })
			})
			.catch((error) => {
				toast.error("An unexpected Error occurred!")
				this.setState({ users })
			})
	}

	render() {
		return (
			<main>
				<h2>Benutzer</h2>
				<Link to="/users/register" className="button button-primary">
					Neuen Benutzer hinzufügen
				</Link>
				{/* <List items={users} itemComponent={userComponent} /> */}
			</main>
		)
	}
}

Users.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Users)
