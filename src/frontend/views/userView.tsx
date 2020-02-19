import React, { useState } from "react"
import { createStyles } from "@material-ui/core"
import { WithStyles, withStyles, Theme } from "@material-ui/core/styles"

import { Card, CardHeader, CardActions, Button, Typography } from "@material-ui/core"

import IInfo from "../types/IInfo"
import IUser from "../../persistence/interfaces/IUser"
import ICompany from "../../persistence/interfaces/ICompany"
import SimpleHeader from "../components/headers/simpleHeader"
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
        mainAction: {
            width: "100%"
        }
    })

interface Props extends WithStyles<typeof styles> {
    user: IUser
    company: ICompany
    info: IInfo
    onChange: () => void
    onRemoveCompany: () => void
}

const UserView = ({ classes, user, company, info, onChange, onRemoveCompany }: Props) => {
    const [userEdit, setUserEdit] = useState(false)
    const [companyEdit, setCompanyEdit] = useState(false)

    const handleCompanyChange = () => {
        setCompanyEdit(false)
        onChange()
    }

    return (
        <>
            <SimpleHeader title="Account" />

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
                                            variant="contained"
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
                                className={classes.mainAction}
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
                                    info={info}
                                    isEditing={user.company.length > 0}
                                    onCompanyChange={() => handleCompanyChange()}
                                    onCancel={() => setCompanyEdit(false)}
                                />
                            </Card>
                        )}
                        {company && !companyEdit && (
                            <CompanyDetails
                                company={company}
                                info={info}
                                onRemoveCompany={onRemoveCompany}
                                onCompanyEdit={() => setCompanyEdit(true)}
                            />
                        )}
                    </>
                )}
            </main>
        </>
    )
}

export default withStyles(styles)(UserView)
