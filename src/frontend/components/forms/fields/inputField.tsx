import React from "react"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"
import { FormControl, Input, InputLabel } from "@material-ui/core"

const styles = (theme: Theme) =>
    createStyles({
        formControl: {
            width: "-webkit-fill-available",
            margin: theme.spacing(2),
            marginTop: theme.spacing(),
            marginBottom: 0
        },
        label: {
            width: "max-content"
        }
    })

interface Props extends WithStyles<typeof styles> {
    name: string
    label: string
    error: string
    type: string
    value: string
    multiline: boolean
    placeholder: string
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

const InputField = ({ classes, name, label, error, ...rest }: Props) => {
    return (
        <FormControl className={classes.formControl} error={!!error}>
            <InputLabel htmlFor={name} className={classes.label}>
                {error ? error : label}
            </InputLabel>
            <Input {...rest} id={name} name={name} />
        </FormControl>
    )
}

export default withStyles(styles)(InputField)
