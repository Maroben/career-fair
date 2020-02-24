import React, { useState } from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"
import { ListItem, ListItemText, Checkbox, Collapse } from "@material-ui/core"
import _ from "lodash"

import { FormControl, Input, InputLabel } from "@material-ui/core"

import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"

const styles = (theme: Theme) =>
    createStyles({
        title: {
            marginTop: theme.spacing(2)
        },
        pos: {
            paddingTop: 0,
            paddingBottom: 0
        },
        formControl: {
            width: "-webkit-fill-available",
            marginTop: 0
        },
        label: {
            width: "max-content"
        },
        input: {
            marginBottom: theme.spacing(1)
        }
    })

interface Props extends WithStyles<typeof styles> {
    title: string
    name: string
    labels: { [name: string]: string[] }
    items: { [name: string]: string }
    errors: { [name: string]: string }
    onChange: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void
}

const InputListField = ({ classes, title, name, labels, items, errors, onChange }: Props) => {
    const [toggle, setToggle] = useState(false)
    console.log(items)
    return (
        <>
            <ListItem button onClick={() => setToggle(!toggle)} className={classes.title}>
                <ListItemText primary={title} />
                {toggle ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={toggle} timeout="auto" unmountOnExit>
                {labels.items.map((label, i) => (
                    <ListItem key={label} className={classes.pos}>
                        <FormControl
                            className={classes.formControl}
                            error={errors && !!errors[label]}
                        >
                            <InputLabel htmlFor={label} className={classes.label}>
                                {errors && errors[label] ? errors[label] : labels.labels[i]}
                            </InputLabel>
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    onChange(event, name)
                                }
                                className={classes.input}
                                id={label}
                                name={labels.labels[i]}
                                value={items[label]}
                            />
                        </FormControl>
                    </ListItem>
                ))}
            </Collapse>
        </>
    )
}

export default withStyles(styles)(InputListField)
