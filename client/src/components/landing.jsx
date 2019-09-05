import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"

import SimpleHeader from "./headers/simpleHeader"
import { Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"

const styles = (theme) => ({
	container: {
		margin: theme.spacing(2)
	},
	title: {
		marginBottom: theme.spacing(2)
	},
	subtitle: {
		marginBottom: theme.spacing()
	},
	personaBox: {
		display: "flex",
		justifyContent: "space-between",
		marginBottom: theme.spacing(2)
	},
	persona: {
		width: "47%"
	},
	button: {
		width: "100%",
		marginBottom: theme.spacing()
	},
	submit: {
		display: "flex",
		justifyContent: "flex-end",
		margin: theme.spacing()
	}
})

class Landing extends Component {
	state = {
		activeStep: -1,
		persona: "na",
		subject: "na",
		employment: "na",
		submitVariant: "text"
	}

	handleReset = () => {
		this.setState({
			activeStep: -1,
			persona: "na",
			subject: "na",
			employment: "na",
			submitVariant: "text"
		})
	}

	handlePersona = (persona) => {
		const { subject, employment } = this.state
		if (this.state.persona === persona) {
			this.handleReset()
		} else {
			this.setState({ persona, activeStep: 0 })
			this.handleSubmit({ persona, subject, employment })
		}
	}

	getButtonColor = (persona) => {
		return this.state.persona === persona ? "secondary" : "default"
	}

	handleSubject = (subject) => {
		const { persona, employment } = this.state
		if (this.state.subject === subject) {
			subject = "na"
			this.setState({
				subject,
				activeStep: 0
			})
		} else {
			this.setState({
				subject,
				activeStep: 1
			})
		}
		this.handleSubmit({ persona, subject, employment })
	}

	handleEmployment = (employment) => {
		const { persona, subject } = this.state
		if (this.state.employment === employment) {
			employment = "na"
			this.setState({
				employment,
				activeStep: 1
			})
		} else {
			this.setState({
				employment: employment,
				activeStep: 2
			})
		}
		this.handleSubmit({ persona, subject, employment })
	}

	handleSubmit = ({ persona, subject, employment }) => {
		if (persona === "na" || subject === "na" || employment === "na") {
			this.setState({ submitVariant: "text" })
		} else {
			this.setState({ submitVariant: "contained" })
		}
	}

	renderPersonaButton = (persona, label) => {
		return (
			<Button
				onClick={() => this.handlePersona(persona)}
				color={this.getButtonColor(persona)}
				variant="contained"
				className={this.props.classes.persona}
			>
				{label}
			</Button>
		)
	}

	renderButton = (color, onClick, label) => {
		return (
			<Button
				key={label}
				onClick={onClick}
				color={color}
				variant="contained"
				className={this.props.classes.button}
			>
				{label}
			</Button>
		)
	}

	renderSubmitButton = (submitVariant, label) => {
		return (
			<div className={this.props.classes.submit}>
				<Button color="primary" variant={submitVariant}>
					{label}
				</Button>
			</div>
		)
	}

	render() {
		const { classes } = this.props
		const { submitVariant, activeStep, persona, subject, employment } = this.state

		const subjects = [
			"Bauingenieurwesen",
			"Elektrotechnik",
			"Ernerbare Energien & Umwelttechnik",
			"Informatik",
			"Landschaftsarchitektur",
			"Raumplanung",
			"Wirtschaftsingenieurwesen"
		]

		const employments = ["Vollzeit", "Praktikum", "Training", "Teilzeit"]

		return (
			<>
				<SimpleHeader title="HSR Stellenbörse" />

				<div className={classes.container}>
					<Typography variant="h5" align="center" className={classes.title}>
						Wegfinder für
					</Typography>

					<div className={classes.personaBox}>
						{this.renderPersonaButton("student", "Studenten")}
						{this.renderPersonaButton("company", "Unternehmen")}
					</div>

					{activeStep >= 0 && (
						<>
							{persona === "student" ? (
								<>
									<Typography
										variant="h6"
										align="center"
										className={classes.subtitle}
									>
										Studiengang
									</Typography>
									{subject !== "na"
										? this.renderButton(
												"secondary",
												() => this.handleSubject(subject),
												subject
										  )
										: subjects.map((sub) =>
												this.renderButton(
													"default",
													() => this.handleSubject(sub),
													sub
												)
										  )}
								</>
							) : (
								<>
									<Typography variant="h6" className={classes.description}>
										Login
									</Typography>
								</>
							)}
						</>
					)}

					{activeStep >= 1 && (
						<>
							{persona === "student" ? (
								<>
									<Typography
										variant="h6"
										align="center"
										className={classes.description}
									>
										Anstellungsart
									</Typography>
									{employment !== "na"
										? this.renderButton(
												"secondary",
												() => this.handleEmployment(employment),
												employment
										  )
										: employments.map((emp) =>
												this.renderButton(
													"default",
													() => this.handleEmployment(emp),
													emp
												)
										  )}
								</>
							) : (
								<>
									<Typography variant="h6" className={classes.description}>
										Registrieren
									</Typography>
								</>
							)}
						</>
					)}
				</div>
				{persona != "company" &&
					this.renderSubmitButton(submitVariant, "Zu den Unternehmen")}
			</>
		)
	}
}

Landing.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Landing)
