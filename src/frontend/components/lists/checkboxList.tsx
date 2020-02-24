import React, { useState } from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import Filter from "../../types/IFilter"
import { info } from "../../types/IInfo"

import { ListItem, ListItemText, Checkbox, Collapse } from "@material-ui/core"

import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"

const styles = (theme: Theme) =>
    createStyles({
        pos: {
            paddingTop: 0,
            paddingBottom: 0
        }
    })

interface Props extends WithStyles<typeof styles> {
    filter: Filter
    label: string
    onFilterChange: (filter: Filter) => void
}

const CheckboxList = ({ classes, filter, label, onFilterChange }: Props) => {
    const [toggle, setToggle] = useState(true)

    const handleFilterSelect = (item: string) => {
        const index = filter[label].indexOf(item)
        if (index > -1) {
            filter[label].splice(index, 1)
        } else {
            filter[label].push(item)
        }
        onFilterChange(filter)
    }

    return (
        <>
            <ListItem button onClick={() => setToggle(!toggle)}>
                <ListItemText primary={info.filters[label].label} />
                {toggle ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={toggle} timeout="auto" unmountOnExit>
                {info.filters[label].items.map((item: string) => (
                    <ListItem
                        key={item}
                        className={classes.pos}
                        onClick={() => handleFilterSelect(item)}
                        role={undefined}
                        button
                    >
                        <Checkbox checked={filter[label].indexOf(item) > -1} />
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </Collapse>
        </>
    )
}

export default withStyles(styles)(CheckboxList)
