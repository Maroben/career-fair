import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

import SimpleHeader from "./headers/simpleHeader"
import { Typography, Button } from "@material-ui/core"

const styles = (theme) => ({
	container: {
		margin: theme.spacing(2)
	},
	smContainer: {
		marginBottom: theme.spacing()
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
		let activeStep
		if (this.state.subject === subject) {
			subject = "na"
			activeStep = 0
		} else {
			activeStep = 1
		}
		this.handleSubmit({ subject, employment, activeStep })
	}

	handleEmployment = (employment) => {
		const { subject } = this.state
		let activeStep
		if (this.state.employment === employment) {
			employment = "na"
			activeStep = 1
		} else {
			activeStep = 2
		}
		this.handleSubmit({ subject, employment, activeStep })
	}

	handleSubmit = (data) => {
		this.setState({
			submitVariant: data.subject === "na" || data.employment === "na" ? "text" : "contained",
			...data
		})
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
					<Typography variant="h5" align="center" className={classes.container}>
						Wegfinder für Studenten
					</Typography>

					<Typography variant="h6" align="center" className={classes.smContainer}>
						Studiengang
					</Typography>

					{subject !== "na"
						? this.renderButton("secondary", () => this.handleSubject(subject), subject)
						: subjects.map((sub) =>
								this.renderButton("default", () => this.handleSubject(sub), sub)
						  )}

					{activeStep > 0 && (
						<>
							<Typography variant="h6" align="center" className={classes.smContainer}>
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

				<div className={this.props.classes.submit}>
					<Button
						color="primary"
						variant={submitVariant}
						component={Link}
						to={{
							pathname: "/companies",
							query: {
								subject,
								employment
							}
						}}
					>
						Zu den Unternehmen
					</Button>
				</div>
			</>
		)
	}
}

Landing.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Landing)
