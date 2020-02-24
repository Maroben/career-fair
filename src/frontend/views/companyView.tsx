import React, { Component } from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import { info } from "../types/IInfo"
import ICompany from "../../persistence/interfaces/ICompany"
import companyService from "../services/companyService"
import StandardHeader from "../components/headers/standardHeader"

import { Typography } from "@material-ui/core"

const styles = (theme: Theme) =>
    createStyles({
        container: {
            margin: theme.spacing(2)
        },
        mb: {
            marginBottom: theme.spacing(2)
        }
    })

interface Props extends WithStyles<typeof styles> {
    match: { params: { id: string } }
    companies: Array<ICompany>
}

type State = {
    company: ICompany
}

class CompanyView extends Component<Props, State> {
    state = {
        company: null
    }

    async componentDidMount() {
        const { companies } = this.props
        const _id = this.props.match.params.id
        let company: ICompany

        if (companies.length > 0) {
            company = companies.find((c) => c._id == _id)
        } else {
            company = await companyService.getCompany(_id)
        }

        this.setState({ company })
    }

    render() {
        const { classes } = this.props
        const { company } = this.state
        return (
            <>
                {company ? (
                    <>
                        <StandardHeader title={company.name} />

                        <div className={classes.container}>
                            <Typography variant="h5" color="textPrimary">
                                {company.location}
                            </Typography>
                        </div>
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
                    </>
                ) : (
                    <>
                        <StandardHeader title={"Unternehmen"} />
                        <Typography variant="body1" color="textPrimary" className={classes.mb}>
                            Laden
                        </Typography>
                    </>
                )}
            </>
        )
    }
}

export default withStyles(styles)(CompanyView)
