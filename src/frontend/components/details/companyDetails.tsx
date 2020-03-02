import React from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import ICompany from "../../../persistence/interfaces/ICompany"

import { Card, CardHeader, CardContent, CardActions } from "@material-ui/core"
import { Typography, Button } from "@material-ui/core"
import authService from "../../services/authService"
import { info } from "../../types/IInfo"

const styles = (theme: Theme) =>
    createStyles({
        card: {
            minWidth: 300,
            marginBottom: theme.spacing(2)
        },
        cardAction: {
            margin: theme.spacing(),
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
    onRemoveCompany: () => void
    onCompanyEdit: () => void
}

const CompanyDetails = ({ classes, company, onRemoveCompany, onCompanyEdit }: Props) => {
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

                        {Object.keys(info.links).map((link) => {
                            return company.links[link].length > 0 ? null : (
                                <div key={link}>{company.links[link]}</div>
                            )
                        })}

                        {/* <div className={classes.items}>
                            {linkKeys.map((key) =>
                                company.links[key].length === 0 ? null : (
                                    <Link key={key} href={company.links[key]} target={"_blank"}>
                                        {company.links[key]}
                                    </Link>
                                )
                            )}
                        </div> */}

                        {Object.keys(info.filters).map((label: string) =>
                            company[label].length === 0 ? null : (
                                <div key={label} className={classes.container}>
                                    <Typography color="textSecondary" variant="subtitle1">
                                        {info.filters[label].label}
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

                    <CardActions className={classes.cardAction}>
                        <Button color="secondary" onClick={onRemoveCompany}>
                            löschen
                        </Button>
                        <Button variant="text" color="primary" onClick={onCompanyEdit}>
                            bearbeiten
                        </Button>
                    </CardActions>
                </Card>
            )}
        </>
    )
}

export default withStyles(styles)(CompanyDetails)
