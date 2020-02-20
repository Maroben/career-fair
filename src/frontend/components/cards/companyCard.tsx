import React from "react"
import { Link } from "react-router-dom"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import ICompany from "../../../persistence/interfaces/ICompany"
import IInfo from "../../types/IInfo"

import { Card, CardHeader, CardContent, CardActionArea } from "@material-ui/core"
import { Typography } from "@material-ui/core"

const styles = (theme: Theme) =>
    createStyles({
        card: {
            minWidth: 300,
            marginBottom: theme.spacing(2)
        },
        header: {
            paddingBottom: 0
        },
        pos: {
            marginBottom: theme.spacing()
        },
        chips: {
            display: "flex",
            justifyContent: "start",
            flexWrap: "wrap"
        },
        chip: {
            paddingRight: 8
        }
    })

interface Props extends WithStyles<typeof styles> {
    company: ICompany
    info: IInfo
}

const CompanyCard = ({ classes, company, info }: Props) => {
    return (
        <>
            {company && (
                <Card className={classes.card}>
                    <CardActionArea to={`companies/${company._id}`} component={Link}>
                        <CardHeader
                            className={classes.header}
                            title={company.name}
                            subheader={company.location}
                        />

                        <CardContent>
                            <Typography className={classes.pos} color="textPrimary">
                                {company.info}
                            </Typography>

                            <div className={classes.chips}>
                                {info.filterLabels.map((label: string) => (
                                    <div key={label} className={classes.chips}>
                                        {company[label].map((item: string) => (
                                            <div key={item} className={classes.chip}>
                                                <Typography color="textSecondary">
                                                    {item}
                                                </Typography>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </CardActionArea>
                </Card>
            )}
        </>
    )
}

export default withStyles(styles)(CompanyCard)
