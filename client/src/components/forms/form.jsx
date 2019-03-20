import React, { Component } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import _ from "lodash"
import Joi from "joi-browser"

import InputComponent from "../common/input"
import CheckboxList from "../lists/checkboxList"

import Button from "@material-ui/core/Button"

class Form extends Component {
	state = {
		data: {},
		errors: {}
	}

	validate = () => {
		const options = { abortEarly: false }
		const { error } = Joi.validate(this.state.data, this.schema, options)
		if (!error) return null

		const errors = {}
		for (let item of error.details) {
			errors[item.path[0]] = item.message
		}
		return errors
	}

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value }
		// we are a using the sub-schema of the inheriting class here.
		const schema = { [name]: this.schema[name] }
		const { error } = Joi.validate(obj, schema)
		return error ? error.details[0].message : null
	}

	handleSubmit = async (event) => {
		event.preventDefault() // keeps it from a full page refresh
		const errors = this.validate()
		this.setState({ errors: errors || {} }) // errors cannot be 'null'
		if (errors) {
			toast.error("Some form fields have errors ¯\\_(ツ)_/¯")
			return
		}

		this.doSubmit()
	}

	handleChange = (event) => {
		const input = event.target
		const errors = { ...this.state.errors }
		const errorMessage = this.validateProperty(input)

		if (errorMessage) errors[input.name] = errorMessage
		else delete errors[input.name]

		const data = { ...this.state.data }
		data[input.name] = input.value

		this.setState({ data, errors })
	}

	handleCheckboxSelect = (label, item) => {
		const data = { ...this.state.data }
		data[label] = _.xor(this.state.data[label], [item])
		this.setState({ data })
	}

	renderInput(name, label, type = "text", multiline = false) {
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

	renderCheckbox(name, label, items) {
		const activeItems = this.state.data[name]

		return (
			<CheckboxList
				items={items}
				activeItems={activeItems}
				labels={[name, label]}
				onSelect={this.handleCheckboxSelect}
			/>
		)
	}

	renderPrimaryButton(label, type, classes) {
		return (
			<Button type={type} variant="contained" color="primary" className={classes.button}>
				{label}
			</Button>
		)
	}

	renderSecondaryButton(label, type, path, classes) {
		return (
			<Button type={type} className={classes.button} component={Link} to={path}>
				{label}
			</Button>
		)
	}
}

export default Form
