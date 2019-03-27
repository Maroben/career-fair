import React, { Component } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import _ from "lodash"
import Joi from "joi-browser"

import InputComponent from "../common/input"
import CheckboxList from "../lists/checkboxList"

import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Collapse from "@material-ui/core/Collapse"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"

import Button from "@material-ui/core/Button"

class Form extends Component {
	state = {
		data: {},
		errors: {},
		linksIsOpen: false
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

	validateProperty = ({ name, value }, extraAttr) => {
		let obj = { [name]: value }
		let schema = { [name]: this.schema[name] }

		if (extraAttr) {
			obj = { [extraAttr]: { [name]: value } }
			schema = { [extraAttr]: this.schema[extraAttr] }
		}

		const { error } = Joi.validate(obj, schema)
		return error ? error.details[0].message : null
	}

	handleToggle = () => {
		const linksIsOpen = !this.state.linksIsOpen
		this.setState({ linksIsOpen })
	}

	getFirstUpperCase = (name) => {
		if (name.length > 0) {
			return `${name.charAt(0).toUpperCase()}${name.slice(1)}`
		}
		return ""
	}

	getUriExample = (name) => {
		if (name.length > 0) {
			return `https://www.${name}.com/`
		}
		return "https://www.example.com/"
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

	handleChange = (event, extraAttr) => {
		const input = event.target
		const errors = { ...this.state.errors }
		const errorMessage = this.validateProperty(input, extraAttr)

		if (errorMessage) {
			if (extraAttr) errors[extraAttr][input.name] = errorMessage
			else errors[input.name] = errorMessage
		} else {
			if (extraAttr) delete errors[extraAttr][input.name]
			else delete errors[input.name]
		}

		const data = { ...this.state.data }
		if (extraAttr) data[extraAttr][input.name] = input.value
		else data[input.name] = input.value

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

	renderLink(classes) {
		const { data, errors, linksIsOpen } = this.state
		const keys = Object.keys(data.links)

		return (
			<React.Fragment>
				<ListItem button onClick={this.handleToggle} className={classes.container}>
					<ListItemText primary={"Links"} />
					{linksIsOpen ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={linksIsOpen} timeout="auto" unmountOnExit>
					{keys.map((key) => (
						<InputComponent
							key={key}
							type={"text"}
							name={key}
							value={data.links[key]}
							label={this.getFirstUpperCase(key)}
							multiline={false}
							placeholder={this.getUriExample(key)}
							error={errors.links[key]}
							onChange={(event) => this.handleChange(event, "links")}
						/>
					))}
				</Collapse>
			</React.Fragment>
		)
	}

	renderCheckbox(label, items) {
		const activeItems = this.state.data[label[0]]

		return (
			<CheckboxList
				items={items}
				activeItems={activeItems}
				noMax={true}
				labels={label}
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
