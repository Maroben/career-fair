import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import Info from "../types/IInfo"
import Filter from "../types/IFilter"

import companyService from "../services/companyService"

import LandingView from "../views/landingView"
import CompaniesView from "../views/companiesView"
import CompanyView from "../views/companyView"
import { ICompany } from "../../persistence/models/CompanyModel"
import { filterCompanies } from "../services/filterService"

const styles = (theme: Theme) =>
    createStyles({
        main: {
            margin: theme.spacing(2)
        }
    })

interface Props extends WithStyles<typeof styles> {}

type State = {
    info: Info
    filter: Filter
    companies: ICompany[]
    displayedCompanies: ICompany[]
}

class CompaniesController extends Component<Props, State> {
    state = {
        info: {
            filterLabels: ["subjects", "employmentTypes"],
            subjects: {
                label: "Studiengänge",
                items: [
                    "Informatik",
                    "Raumplanung",
                    "Elektrotechnik",
                    "Bauingenieurwesen",
                    "Landschaftsarchitektur",
                    "Wirtschaftsingenieurwesen",
                    "Ernerbare Energien & Umwelttechnik"
                ]
            },
            employmentTypes: {
                label: "Anstellungsarten",
                items: ["Vollzeit", "Praktikum", "Training", "Teilzeit"]
            },
            links: {
                homepage: "",
                linkedin: "",
                xing: "",
                facebook: "",
                instagram: "",
                twitter: "",
                youtube: ""
            }
        },
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
        filter.subjects = [subject]
        filter.employmentTypes = [employmentType]
        this.setState({ filter })
    }

    handleFilter = (filter: Filter) => {
        const { companies, info } = this.state
        const displayedCompanies = filterCompanies(filter, info, companies)
        this.setState({ filter, displayedCompanies })
    }

    render() {
        const { info, filter, companies, displayedCompanies } = this.state

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
                                companies={displayedCompanies}
                                onFilterChange={this.handleFilter}
                            />
                        )}
                    />
                    <Route
                        path="/"
                        exact
                        render={() => <LandingView info={info} onContinue={this.handleContinue} />}
                    />
                </Switch>
            </>
        )
    }
}

export default withStyles(styles)(CompaniesController)
