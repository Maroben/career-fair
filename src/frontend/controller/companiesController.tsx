import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import Filter from "../types/IFilter"

import companyService from "../services/companyService"

import LandingView from "../views/landingView"
import CompaniesView from "../views/companiesView"
import CompanyView from "../views/companyView"
import ICompany from "../../persistence/interfaces/ICompany"
import { filterCompanies } from "../services/filterService"

const styles = (theme: Theme) =>
    createStyles({
        main: {
            margin: theme.spacing(2)
        }
    })

interface Props extends WithStyles<typeof styles> {}

type State = {
    filter: Filter
    companies: ICompany[]
    displayedCompanies: ICompany[]
}

class CompaniesController extends Component<Props, State> {
    state = {
        filter: {
            subjects: [],
            employmentTypes: [],
            query: ""
        },
        companies: [],
        displayedCompanies: []
    }

    async componentDidMount() {
        const companies: Array<ICompany> = await companyService.getCompanies()
        this.setState({ companies, displayedCompanies: companies })
    }

    handleContinue = (subject: string, employmentType: string) => {
        const { filter } = this.state
        filter.subjects = subject.length > 0 ? [subject] : []
        filter.employmentTypes = employmentType.length > 0 ? [employmentType] : []
        this.setState({ filter })
    }

    handleFilter = (filter: Filter) => {
        const { companies } = this.state
        const displayedCompanies = filterCompanies(filter, companies)
        this.setState({ filter, displayedCompanies })
    }

    render() {
        const { filter, companies, displayedCompanies } = this.state

        return (
            <>
                <Switch>
                    <Route
                        path="/companies/welcome"
                        render={() => <LandingView onContinue={this.handleContinue} />}
                    />
                    <Route
                        path="/companies/:id"
                        render={(props) => <CompanyView {...props} companies={companies} />}
                    />
                    <Route
                        path="/companies"
                        render={() => (
                            <CompaniesView
                                filter={filter}
                                companies={displayedCompanies}
                                onFilterChange={this.handleFilter}
                            />
                        )}
                    />
                </Switch>
            </>
        )
    }
}

export default withStyles(styles)(CompaniesController)
