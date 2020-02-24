import React, { useState } from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import { info } from "../../types/IInfo"
import Filter from "../../types/IFilter"
import CheckboxList from "../lists/checkboxList"

import { Hidden, Drawer, Button } from "@material-ui/core"

const drawerWidth = 300

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: drawerWidth
        },
        drawer: {
            [theme.breakpoints.up("md")]: {
                width: drawerWidth,
                flexShrink: 0
            }
        },
        button: {
            margin: theme.spacing()
        },
        desktop: {
            [theme.breakpoints.up("md")]: {
                display: "none"
            }
        }
    })

interface Props extends WithStyles<typeof styles> {
    drawer: boolean
    setDrawer: (state: boolean) => void
    filter: Filter
    onFilterChange: (filter: Filter) => void
}

const FilterDrawer = ({ classes, drawer, setDrawer, filter, onFilterChange }: Props) => {
    const resetCheckboxes = () => {
        onFilterChange({
            ...filter,
            subjects: [],
            employmentTypes: []
        })
    }

    const drawerBox = (
        <div className={classes.root}>
            {Object.keys(info.filters).map((label) => (
                <CheckboxList
                    key={label}
                    filter={filter}
                    label={label}
                    onFilterChange={onFilterChange}
                />
            ))}

            <Button className={classes.button} onClick={resetCheckboxes}>
                Reset
            </Button>
            <Button
                color="primary"
                className={`${classes.button} ${classes.desktop}`}
                onClick={() => setDrawer(false)}
            >
                Apply
            </Button>

            {/* <Typography
                    className={classes.header}
                    variant="body1"
                >{`${filterData.filterCount} Unternehmen gefunden`}</Typography>

                {labels.map((label) => (
                    <CheckboxList
                        key={label[0]}
                        items={displayed[label[0]]}
                        activeItems={active[label[0]]}
                        labels={label}
                        onSelect={onCheckboxSelect}
                    />
                ))}

                 */}
        </div>
    )

    return (
        <div className={classes.drawer}>
            <Hidden mdUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={"left"}
                    open={drawer}
                    onClose={() => setDrawer(false)}
                >
                    {drawerBox}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer variant="permanent" open>
                    {drawerBox}
                </Drawer>
            </Hidden>
        </div>
    )
}

export default withStyles(styles)(FilterDrawer)
