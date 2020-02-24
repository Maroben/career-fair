import React, { useState } from "react"
import { Link } from "react-router-dom"
import { createStyles } from "@material-ui/core"
import { WithStyles, withStyles, Theme } from "@material-ui/core/styles"

import { Card, CardHeader, CardActions, Button, Typography, Icon } from "@material-ui/core"

import IUser from "../../persistence/interfaces/IUser"
import ICompany from "../../persistence/interfaces/ICompany"
import StandardHeader from "../components/headers/standardHeader"
import RegisterForm from "../components/forms/registerForm"
import CompanyForm from "../components/forms/companyForm"
import CompanyDetails from "../components/details/companyDetails"

const styles = (theme: Theme) =>
    createStyles({
        container: {
            margin: theme.spacing(2)
        },
        card: {
            marginBottom: theme.spacing(2),
            padding: theme.spacing()
        },
        header: {
            paddingBottom: 0
        },
        cardAction: {
            justifyContent: "flex-end"
        },
        button: {
            width: "100%"
        },
        pr: {
            paddingRight: theme.spacing(4)
        }
    })

interface Props extends WithStyles<typeof styles> {
    user: IUser
    company: ICompany
    onChange: () => void
    onRemoveCompany: () => void
}

const UserView = ({ classes, user, company, onChange, onRemoveCompany }: Props) => {
    const [userEdit, setUserEdit] = useState(false)
    const [companyEdit, setCompanyEdit] = useState(false)

    const handleCompanyChange = () => {
        setCompanyEdit(false)
        onChange()
    }

    return (
        <>
            <StandardHeader title="Account" />

            <main className={classes.container}>
                {user && (
                    <>
                        <Card className={classes.card}>
                            <CardHeader className={classes.header} title={"Benutzer"} />

                            {userEdit ? (
                                <RegisterForm user={user} onUpdateUser={() => setUserEdit(false)} />
                            ) : (
                                <>
                                    <Typography className={classes.container} color="textPrimary">
                                        {user.email}
                                    </Typography>

                                    <CardActions className={classes.cardAction}>
                                        <Button
                                            variant="text"
                                            color="primary"
                                            onClick={() => setUserEdit(true)}
                                        >
                                            bearbeiten
                                        </Button>
                                    </CardActions>
                                </>
                            )}
                        </Card>

                        {!company && !companyEdit && (
                            <Button
                                color="primary"
                                variant="contained"
                                className={classes.button}
                                onClick={() => setCompanyEdit(true)}
                            >
                                Unternehmen hinzufügen
                            </Button>
                        )}

                        {companyEdit && (
                            <Card className={classes.card}>
                                <CardHeader className={classes.header} title={"Unternehmen"} />
                                <CompanyForm
                                    user={user}
                                    company={company}
                                    isEditing={user.company.length > 0}
                                    onCompanyChange={() => handleCompanyChange()}
                                    onCancel={() => setCompanyEdit(false)}
                                />
                            </Card>
                        )}
                        {company && !companyEdit && (
                            <CompanyDetails
                                company={company}
                                onRemoveCompany={onRemoveCompany}
                                onCompanyEdit={() => setCompanyEdit(true)}
                            />
                        )}

                        <Button
                            color="primary"
                            className={classes.button}
                            component={Link}
                            to={"/account/logout"}
                        >
                            <Icon className={`fas fa-sign-out-alt ${classes.pr}`} />
                            Abmelden
                        </Button>
                    </>
                )}
            </main>
        </>
    )
}

export default withStyles(styles)(UserView)
