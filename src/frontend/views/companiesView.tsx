import React, { useState } from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import IInfo from "../types/IInfo"
import Filter from "../types/IFilter"
import ICompany from "../../persistence/interfaces/ICompany"

import SearchHeader from "../components/headers/searchHeader"
import CompanyCard from "../components/cards/companyCard"
import FilterDrawer from "../components/drawers/filterDrawer"

import { Chip, Paper, Typography, Button } from "@material-ui/core"

const styles = (theme: Theme) =>
    createStyles({
        container: {
            margin: theme.spacing(2)
        },
        chips: {
            marginBottom: theme.spacing(2)
        },
        chip: {
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(1)
        },
        fab: {
            position: "fixed",
            bottom: theme.spacing(2),
            right: theme.spacing(2)
        },
        emptyMessage: {
            ...theme.mixins.gutters(),
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            margin: theme.spacing(2)
        },
        button: {
            marginTop: theme.spacing()
        }
    })

interface Props extends WithStyles<typeof styles> {
    info: IInfo
    filter: Filter
    companies: Array<ICompany>
    onFilterChange: (filter: Filter) => void
}

const CompaniesView = ({ classes, info, filter, companies, onFilterChange }: Props) => {
    const [drawer, setDrawer] = useState(false)

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        filter.query = event.target.value
        onFilterChange(filter)
    }

    const removeFilter = (label: string, item: string) => {
        const index: number = filter[label].indexOf(item)
        filter[label].splice(index, 1)
        onFilterChange(filter)
    }

    const removeQuery = () => {
        onFilterChange({ ...filter, query: "" })
    }

    const resetFilters = () => {
        onFilterChange({ subjects: [], employmentTypes: [], query: "" })
    }

    return (
        <>
            <SearchHeader
                title={"HSR Stellenbörse"}
                query={filter.query}
                onSearch={(event) => handleSearch(event)}
                onFilterSelect={() => setDrawer(!drawer)}
            />

            <FilterDrawer
                drawer={drawer}
                setDrawer={setDrawer}
                filter={filter}
                info={info}
                onFilterChange={onFilterChange}
            />

            <main className={classes.container}>
                <div className={classes.chips}>
                    {filter.query && (
                        <Chip
                            label={filter.query}
                            variant={"default"}
                            className={classes.chip}
                            onDelete={() => removeQuery()}
                        />
                    )}
                    {info.filterLabels.map((label: string) => (
                        <React.Fragment key={label}>
                            {filter[label].map((item: string) => (
                                <Chip
                                    key={item}
                                    label={item}
                                    variant={"default"}
                                    className={classes.chip}
                                    onDelete={() => removeFilter(label, item)}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </div>

                {companies && companies.length > 0 ? (
                    companies.map((company: ICompany) => (
                        <CompanyCard key={company.name} company={company} info={info} />
                    ))
                ) : (
                    <Paper className={classes.emptyMessage} elevation={1}>
                        <Typography variant="body1">
                            Es wurden keine Unternehmen gefunden
                        </Typography>
                        <Button color="primary" className={classes.button} onClick={resetFilters}>
                            Reset Filters
                        </Button>
                    </Paper>
                )}
            </main>
        </>
    )
}

export default withStyles(styles)(CompaniesView)
