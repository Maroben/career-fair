import React from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import ICompany from "../../../persistence/interfaces/ICompany"
import IInfo from "../../types/IInfo"

import { Card, CardHeader, CardContent, CardActions } from "@material-ui/core"
import { Typography, Button } from "@material-ui/core"
import authService from "../../services/authService"

const styles = (theme: Theme) =>
    createStyles({
        card: {
            minWidth: 300,
            marginBottom: theme.spacing(2)
        },
        cardAction: {
            justifyContent: "flex-end"
        },
        container: {
            marginBottom: theme.spacing(2)
        },
        header: {
            paddingBottom: 0
        }
    })

interface Props extends WithStyles<typeof styles> {
    company: ICompany
    info: IInfo
    onRemoveCompany: () => void
    onCompanyEdit: () => void
}

const CompanyDetails = ({ classes, company, info, onRemoveCompany, onCompanyEdit }: Props) => {
    const storedUser = authService.getCurrentUser()
    const editAuth = storedUser?.company == company._id

    return (
        <>
            {company && (
                <Card className={classes.card}>
                    <CardHeader
                        className={classes.header}
                        title={company.name}
                        subheader={company.location}
                    />

                    <CardContent>
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
                    </CardContent>
                    {editAuth && (
                        <CardActions className={classes.cardAction}>
                            <Button color="secondary" onClick={onRemoveCompany}>
                                löschen
                            </Button>
                            <Button variant="contained" color="primary" onClick={onCompanyEdit}>
                                bearbeiten
                            </Button>
                        </CardActions>
                    )}
                </Card>
            )}
        </>
    )
}

export default withStyles(styles)(CompanyDetails)
