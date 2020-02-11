import React, { Component } from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import Info from "../types/IInfo"
import { ICompany } from "../../persistence/models/CompanyModel"
import companyService from "../services/companyService"
import SimpleHeader from "../components/headers/simpleHeader"

import { Typography } from "@material-ui/core"

const styles = (theme: Theme) =>
    createStyles({
        detail: {
            margin: theme.spacing(2)
        },
        mb: {
            marginBottom: theme.spacing(2)
        }
    })

interface Props extends WithStyles<typeof styles> {
    match: { params: { id: string } }
    info: Info
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
            company && (
                <>
                    <SimpleHeader title={company.name} />

                    <div className={classes.detail}>
                        <Typography variant="h5" className={classes.mb}>
                            {company.location}
                        </Typography>
                        <Typography variant="body1" color="textPrimary" className={classes.mb}>
                            {company.info}
                        </Typography>
                        <Typography variant="body1" color="textPrimary" className={classes.mb}>
                            {company.description}
                        </Typography>
                    </div>
                </>
            )
        )
    }
}

export default withStyles(styles)(CompanyView)
