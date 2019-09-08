import React, { Component } from "react"
import { toast } from "react-toastify"
import Joi from "joi-browser"
import { Link } from "react-router-dom"

import InputComponent from "../common/input"

import { Button, Typography } from "@material-ui/core"

class Form extends Component {
	state = {
		data: {},
		errors: {},
		isSubmitable: false
	}

	validate = () => {
		const options = { abortEarly: false }
		const { error } = Joi.validate(this.state.data, this.schema, options)
		if (!error) return {}

		const errors = {}
		for (var item of error.details) {
			errors[item] = item.message
		}
		return errors
	}

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value }
		const schema = { [name]: this.schema[name] }

		const { error } = Joi.validate(obj, schema)
		return error ? error.details[0].message : null
	}

	handleSubmit = (event) => {
		event.preventDefault()
		const errors = this.validate()

		this.setState({ errors: errors })
		if (!errors) {
			toast.error("Some form fields have errors")
			return false
		}

		this.doSubmit()
	}

	handleChange = ({ target }) => {
		const { name, value } = target

		const errors = { ...this.state.errors }
		const errorMessage = this.validateProperty(target)
		errorMessage ? (errors[name] = errorMessage) : delete errors[name]

		const data = { ...this.state.data }
		data[name] = value

		this.setState({ data, errors })
	}

	renderInput = (name, label, type = "text", multiline = false) => {
		const { data, errors } = this.state

		return (
			<InputComponent
				type={type}
				name={name}
				value={data[name]}
				label={label}
				multiline={multiline}
				placeholder={label}
				error={errors[name]}
				onChange={this.handleChange}
			/>
		)
	}

	renderSubmit = (label, classes) => {
		return (
			<Button type="submit" variant="contained" color="primary" className={classes.button}>
				{label}
			</Button>
		)
	}

	renderCancel = (label, classes, onClick) => {
		return (
			<Button color="primary" className={classes.button} onClick={onClick}>
				{label}
			</Button>
		)
	}

	renderSecondaryAction = (label, path, classes) => {
		return (
			<Button
				variant="text"
				color="primary"
				className={classes.button}
				component={Link}
				to={path}
			>
				{label}
			</Button>
		)
	}

	renderButtonList = (name, label, items, classes) => {
		return (
			<div className={classes.buttonList}>
				<Typography variant="h6">{label}</Typography>
				{items.map((item) => (
					<Button key={item} variant="outlined" className={classes.button}>
						{item}
					</Button>
				))}
			</div>
		)
	}
}

export default Form
