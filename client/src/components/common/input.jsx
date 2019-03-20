import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"

import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"

const styles = (theme) => ({
	formControl: {
		width: "-webkit-fill-available",
		margin: theme.spacing.unit * 2,
		marginBottom: 0
	},
	label: {
		width: "max-content"
	}
})

const InputComponent = (props) => {
	const { classes, name, label, error, ...rest } = props

	return (
		<FormControl className={classes.formControl} error={!!error}>
			<InputLabel htmlFor={name} className={classes.label}>
				{error ? error : label}
			</InputLabel>
			<Input {...rest} id={name} name={name} className={classes.textField} />
		</FormControl>
	)
}

InputComponent.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(InputComponent)
