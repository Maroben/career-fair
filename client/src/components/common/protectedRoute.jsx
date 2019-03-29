import React from "react"
import { Route, Redirect } from "react-router-dom"

const ProtectedRoute = ({ path, component: Component, render, user, adminRequired, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!user || (adminRequired && !user.isAdmin)) {
					return <Redirect to={{ pathname: "/auth", state: { from: props.location } }} />
				}
				return Component ? <Component {...props} /> : render(props)
			}}
		/>
	)
}

export default ProtectedRoute
