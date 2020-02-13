import React, { useState } from "react"
import { createStyles } from "@material-ui/core"
import { WithStyles, withStyles, Theme } from "@material-ui/core/styles"

import { Card, CardHeader, CardActions, Button, Typography } from "@material-ui/core"

import SimpleHeader from "../components/headers/simpleHeader"
import IUser from "../../persistence/interfaces/IUser"
import ICompany from "../../persistence/interfaces/ICompany"
import RegisterForm from "../components/forms/registerForm"
import CompanyForm from "../components/forms/companyForm"

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
    onChange: () => void
    onRemoveCompany: () => void
}

const UserView = ({ classes, user, onChange, onRemoveCompany }: Props) => {
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

                        {!user.company && !companyEdit && (
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
                                    isEditing={user.company != null}
                                    onCompanyChange={() => handleCompanyChange()}
                                    onCancel={() => setCompanyEdit(false)}
                                />
                            </Card>
                        )}
                        {user.company && !companyEdit && (
                            <Card className={classes.card}>
                                <CardHeader
                                    className={classes.header}
                                    title={user.company.name}
                                    subheader={user.company.location}
                                />

                                <Typography
                                    variant="body1"
                                    color="textPrimary"
                                    className={classes.container}
                                >
                                    {user.company.info}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textPrimary"
                                    className={classes.container}
                                >
                                    {user.company.description}
                                </Typography>

                                {/* <div className={classes.items}>
                                    {linkKeys.map((key) =>
                                        company.links[key].length === 0 ? null : (
                                            <Link
                                                key={key}
                                                href={company.links[key]}
                                                target={"_blank"}
                                            >
                                                {company.links[key]}
                                            </Link>
                                        )
                                    )}
                                </div> */}

                                {/* {filterLabels.map((labels) =>
                                    company[labels[0]].length === 0 ? null : (
                                        <div key={labels[0]}>
                                            <Typography color="textPrimary" variant="subtitle1">
                                                {labels[1]}
                                            </Typography>
                                            <div className={classes.items}>
                                                {company[labels[0]].map((filter) => (
                                                    <Typography
                                                        key={filter}
                                                        color="textSecondary"
                                                        className={classes.item}
                                                    >
                                                        {filter}
                                                    </Typography>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                )} */}

                                <CardActions className={classes.cardAction}>
                                    <Button color="secondary" onClick={onRemoveCompany}>
                                        löschen
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setCompanyEdit(true)}
                                    >
                                        bearbeiten
                                    </Button>
                                </CardActions>
                            </Card>
                        )}
                    </>
                )}
            </main>
        </>
    )
}

export default withStyles(styles)(UserView)
