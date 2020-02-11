import React from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import Info from "../types/IInfo"
import Filter from "../types/IFilter"
import { ICompany } from "../../persistence/models/CompanyModel"

import SearchHeader from "../components/headers/searchHeader"
import CompanyCard from "../components/cards/companyCard"

const styles = (theme: Theme) =>
    createStyles({
        container: {
            margin: theme.spacing(2)
        },
        fab: {
            position: "fixed",
            bottom: theme.spacing(2),
            right: theme.spacing(2)
        }
    })

interface Props extends WithStyles<typeof styles> {
    info: Info
    filter: Filter
    companies: Array<ICompany>
    onFilterChange: (filter: Filter) => void
}

const CompaniesView = ({ classes, filter, companies, onFilterChange }: Props) => {
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        filter.query = event.target.value
        onFilterChange(filter)
    }

    return (
        <>
            <SearchHeader
                title={"HSR Stellenbörse"}
                query={filter.query}
                onSearch={(event) => handleSearch(event)}
                onFilterSelect={() => console.log("filter clicked")}
            />

            <main className={classes.container}>
                {companies &&
                    companies.map((company: ICompany) => (
                        <CompanyCard key={company.name} company={company} />
                    ))}
            </main>
        </>
    )
}

export default withStyles(styles)(CompaniesView)
