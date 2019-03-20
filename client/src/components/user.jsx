import React from "react"
import { Link } from "react-router-dom"

const User = ({ user, onDelete }) => {
	return (
		<React.Fragment>
			<div>{user.name}</div>
			<div>{user.email}</div>
			<div>{user.isAdmin}</div>
			<Link to={`/users/${user._id}`} className={"button button-primary fa fa-edit"} />
			<button
				onClick={() => onDelete(user._id)}
				className={"button button-destructive fa fa-trash"}
			/>
		</React.Fragment>
	)
}

export default User
