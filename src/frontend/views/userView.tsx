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
                                    company={company}
                                    info={info}
                                    isEditing={user.company.length > 0}
                                    onCompanyChange={() => handleCompanyChange()}
                                    onCancel={() => setCompanyEdit(false)}
                                />
                            </Card>
                        )}
                        {user.company && !companyEdit && (
                            <Card className={classes.card}>
                                <CardHeader
                                    className={classes.header}
                                    title={company.name}
                                    subheader={company.location}
                                />

                                <div className={classes.container}>
                                    <Typography color="textSecondary" variant="subtitle1">
                                        Info
                                    </Typography>
                                    <Typography variant="body1" color="textPrimary">
                                        {company.info}
                                    </Typography>
                                </div>
                                <div className={classes.container}>
                                    <Typography color="textSecondary" variant="subtitle1">
                                        Beschreibung
                                    </Typography>
                                    <Typography variant="body1" color="textPrimary">
                                        {company.description}
                                    </Typography>
                                </div>

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

                                {info.filterLabels.map((label: string) =>
                                    company[label].length === 0 ? null : (
                                        <div key={label} className={classes.container}>
                                            <Typography color="textSecondary" variant="subtitle1">
                                                {info[label].label}
                                            </Typography>
                                            <div>
                                                {company[label].map((item: string) => (
                                                    <Typography key={item} color="textPrimary">
                                                        {item}
                                                    </Typography>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                )}

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
