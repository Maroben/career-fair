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
		activeStep: 0,
		subject: "na",
		employment: "na",
		submitVariant: "text"
	}

	handleReset = () => {
		this.setState({
			activeStep: 0,
			subject: "na",
			employment: "na",
			submitVariant: "text"
		})
	}

	getButtonColor = (persona) => {
		return this.state.persona === persona ? "secondary" : "default"
	}

	handleSubject = (subject) => {
		const { employment } = this.state
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
		this.handleSubmit({ subject, employment })
	}

	handleEmployment = (employment) => {
		const { subject } = this.state
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
		this.handleSubmit({ subject, employment })
	}

	handleSubmit = ({ subject, employment }) => {
		if (subject === "na" || employment === "na") {
			this.setState({ submitVariant: "text" })
		} else {
			this.setState({ submitVariant: "contained" })
		}
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
		const { submitVariant, activeStep, subject, employment } = this.state

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
				<SimpleHeader title="HSR Stellenbörse - 22. April 2020" />

				<div className={classes.container}>
					<Typography variant="h5" align="center" className={classes.title}>
						Wegfinder für Studenten
					</Typography>

					<Typography variant="h6" align="center" className={classes.subtitle}>
						Studiengang
					</Typography>

					{subject !== "na"
						? this.renderButton("secondary", () => this.handleSubject(subject), subject)
						: subjects.map((sub) =>
								this.renderButton("default", () => this.handleSubject(sub), sub)
						  )}

					{activeStep > 0 && (
						<>
							<Typography variant="h6" align="center" className={classes.description}>
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
					)}
				</div>

				{this.renderSubmitButton(submitVariant, "Zu den Unternehmen")}
			</>
		)
	}
}

Landing.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Landing)
