import React, { useState } from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"
import { ListItem, ListItemText, Checkbox, Collapse } from "@material-ui/core"
import _ from "lodash"

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
    title: string
    label: string
    items: string[]
    active: string[]
    onActiveChange: (label: string, active: string[]) => void
}

const CheckboxListField = ({ classes, title, label, items, active, onActiveChange }: Props) => {
    const [toggle, setToggle] = useState(true)

    const handleCheckboxSelect = (item: string) => {
        // const index = items.indexOf(item)

        active = _.xor(active, [item])

        // if (index > -1) {
        //     active.splice(index, 1)
        // } else {
        //     active.push(item)
        // }
        onActiveChange(label, active)
    }

    return (
        <>
            <ListItem button onClick={() => setToggle(!toggle)}>
                <ListItemText primary={title} />
                {toggle ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={toggle} timeout="auto" unmountOnExit>
                {items.map((item: string) => (
                    <ListItem
                        key={item}
                        className={classes.pos}
                        onClick={() => handleCheckboxSelect(item)}
                        role={undefined}
                        button
                    >
                        <Checkbox checked={active.indexOf(item) > -1} />
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </Collapse>
        </>
    )
}

export default withStyles(styles)(CheckboxListField)
