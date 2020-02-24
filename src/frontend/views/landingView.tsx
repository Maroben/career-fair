import React, { Component } from "react"
import { createStyles, Theme, PropTypes } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"
import { Typography, Button } from "@material-ui/core"
import { Link } from "react-router-dom"

import { info } from "../types/IInfo"
import { Material } from "../types/Material"
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
    onContinue: (subject: string, employmentType: string) => void
}

type State = {
    activeStep: number
    subject: string
    employmentType: string
    submitVariant: Material["variant"]
}

class LandingView extends Component<Props, State> {
    state = {
        activeStep: 0,
        subject: "",
        employmentType: "",
        submitVariant: "text" as Material["variant"]
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
            submitVariant: subject.length && employmentType.length ? "contained" : "text",
            activeStep,
            subject,
            employmentType
        } as State)
    }

    renderButton = (color: PropTypes.Color, onClick: () => void, label: string) => {
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
        const { subjects, employmentTypes } = info.filters
        const { activeStep, subject, employmentType, submitVariant } = this.state

        return (
            <>
                <SimpleHeader title={"HSR Stellenbörse - 22. April 2020"} />

                <div className={classes.container}>
                    <Typography variant="h5" align="center" className={classes.container}>
                        Wegfinder für Studenten
                    </Typography>

                    <Typography variant="h6" align="center" className={classes.smContainer}>
                        {subjects.label}
                    </Typography>

                    {subject.length
                        ? this.renderButton("secondary", () => this.handleSubject(subject), subject)
                        : subjects.items.map((sub: string) =>
                              this.renderButton("default", () => this.handleSubject(sub), sub)
                          )}

                    {activeStep > 0 && (
                        <>
                            <Typography variant="h6" align="center" className={classes.smContainer}>
                                {employmentTypes.label}
                            </Typography>

                            {employmentType.length
                                ? this.renderButton(
                                      "secondary",
                                      () => this.handleEmployment(employmentType),
                                      employmentType
                                  )
                                : employmentTypes.items.map((emp: string) =>
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
                        key="submit"
                        onClick={() => this.props.onContinue(subject, employmentType)}
                        color="primary"
                        variant={submitVariant}
                        className={this.props.classes.button}
                        component={Link}
                        to={"/companies"}
                    >
                        {"Zu den Unternehmen"}
                    </Button>
                </div>
            </>
        )
    }
}

export default withStyles(styles)(LandingView)
