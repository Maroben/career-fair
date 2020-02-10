import React, { Component } from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"
import { Typography, Button } from "@material-ui/core"
import PropTypes from "prop-types"

import Info from "../types/IInfo"
import SimpleHeader from "../components/headers/simpleHeader"

const styles = (theme: Theme) =>
    createStyles({
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

interface Props extends WithStyles<typeof styles> {
    info: Info
    onContinue: (subject: string, employmentType: string) => void
}

type State = {
    activeStep: number
    subject: string
    employmentType: string
    submitVariant: string
}

class Companies extends Component<Props, State> {
    state = {
        activeStep: 0,
        subject: "",
        employmentType: "",
        submitVariant: "text"
    }

    handleReset = () => {
        this.setState({
            activeStep: 0,
            subject: "",
            employmentType: "",
            submitVariant: "text"
        })
    }

    handleSubject = (subject: string) => {
        const { employmentType } = this.state
        let activeStep = 1
        if (this.state.subject === subject) {
            subject = ""
            activeStep = 0
        }
        this.updateSelection(subject, employmentType, activeStep)
    }

    handleEmployment = (empType: string) => {
        const { subject } = this.state
        let activeStep = 2
        if (this.state.employmentType === empType) {
            empType = ""
            activeStep = 1
        }
        this.updateSelection(subject, empType, activeStep)
    }

    updateSelection = (subject: string, employmentType: string, activeStep: number) => {
        this.setState({
            submitVariant: subject.length || employmentType.length ? "contained" : "text",
            activeStep,
            subject,
            employmentType
        } as State)
    }

    renderButton = (color: string, onClick: () => void, label: string) => {
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
        const { activeStep, subject, employmentType, submitVariant } = this.state

        return (
            <>
                <SimpleHeader title={"HSR Stellenbörse - 22. April 2020"} />

                <div className={classes.container}>
                    <Typography variant="h5" align="center" className={classes.container}>
                        Wegfinder für Studenten
                    </Typography>

                    <Typography variant="h6" align="center" className={classes.smContainer}>
                        Studiengang
                    </Typography>

                    {subject.length
                        ? this.renderButton("secondary", () => this.handleSubject(subject), subject)
                        : this.props.info.subjects.map((sub: string) =>
                              this.renderButton("default", () => this.handleSubject(sub), sub)
                          )}

                    {activeStep > 0 && (
                        <>
                            <Typography variant="h6" align="center" className={classes.smContainer}>
                                Anstellungsart
                            </Typography>

                            {employmentType.length
                                ? this.renderButton(
                                      "secondary",
                                      () => this.handleEmployment(employmentType),
                                      employmentType
                                  )
                                : this.props.info.employmentTypes.map((emp: string) =>
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
                    {this.renderButton(
                        "primary",
                        this.props.onContinue(subject, employmentType),
                        "Zu den Unternehmen"
                    )}
                </div>
            </>
        )
    }
}

export default withStyles(styles)(Companies)
