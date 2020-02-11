import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import Info from "../types/IInfo"
import Filter from "../types/IFilter"

import companyService from "../services/companyService"

import CompaniesView from "../views/companiesView"
import CompanyView from "../views/companyView"
import { ICompany } from "../../persistence/models/CompanyModel"

const styles = (theme: Theme) =>
    createStyles({
        main: {
            margin: theme.spacing(2)
        }
    })

interface Props extends WithStyles<typeof styles> {
    info: Info
    filter: Filter
    onFilterChange: (filter: Filter) => void
}

type State = {
    companies: Array<ICompany>
}

class CompaniesController extends Component<Props, State> {
    state = {
        companies: []
    }

    async componentDidMount() {
        const companies: Array<ICompany> = await companyService.getCompanies()
        this.setState({ companies })
    }

    render() {
        const { info, filter, onFilterChange } = this.props
        const { companies } = this.state

        return (
            <>
                <Switch>
                    <Route
                        path="/companies/:id"
                        render={(props) => (
                            <CompanyView {...props} info={info} companies={companies} />
                        )}
                    />
                    <Route
                        path="/companies"
                        render={() => (
                            <CompaniesView
                                info={info}
                                filter={filter}
                                companies={companies}
                                onFilterChange={onFilterChange}
                            />
                        )}
                    />
                </Switch>
            </>
        )
    }
}

export default withStyles(styles)(CompaniesController)
