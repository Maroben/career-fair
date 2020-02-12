import React, { Component } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { FormState } from "../../types/IForm"

import _ from "lodash"
import Joi, { ObjectSchema } from "@hapi/joi"

import InputField from "./fields/inputField"
// import CheckboxField from "./fields/checkboxField"

import { Button, Typography } from "@material-ui/core"

// const styles = (theme: Theme) =>
//     createStyles({
//         container: {
//             marginTop: theme.spacing()
//         },
//         buttonBox: {
//             display: "flex",
//             justifyContent: "flex-end",
//             marginTop: theme.spacing(2)
//         },
//         button: {
//             margin: theme.spacing(2),
//             marginLeft: 0
//         },
//         cardAction: {
//             marginTop: theme.spacing(),
//             justifyContent: "flex-end",
//             padding: 0
//         },
//         info: {
//             margin: theme.spacing()
//         },
//         list: {
//             margin: theme.spacing(2)
//         }
//     })

abstract class Form<Props, State extends FormState> extends Component<Props, State> {
    abstract state: State
    abstract joiSchema: { [name: string]: Joi.Schema }
    abstract objectSchema: ObjectSchema
    abstract doSubmit: () => void

    validate = () => {
        const options: Joi.ValidationOptions = { abortEarly: false }
        const { error } = this.objectSchema.validate(this.state.data, options)
        if (!error) return {}
        const errors = {}
        for (let item of error.details) {
            errors[item.context.key] = item.message
        }
        return errors
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value }
        const objectSchema: ObjectSchema = Joi.object({ [name]: this.joiSchema[name] })
        const { error } = objectSchema.validate(obj)
        return error ? error.details[0].message : null
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const errors = this.validate()

        this.setState({ errors: errors })
        if (!errors) {
            toast.error("Some form fields have errors")
            return false
        }

        this.doSubmit()
    }

    handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = target
        const errors = { ...this.state.errors }
        const errorMessage = this.validateProperty(target)
        errorMessage ? (errors[name] = errorMessage) : delete errors[name]

        const data = { ...this.state.data }
        data[name] = value

        this.setState({ data, errors })
    }

    handleCheckboxSelect = (label: string, item: string) => {
        const data = { ...this.state.data }
        data[label] = _.xor(this.state.data[label], [item])
        this.setState({ data })
    }

    renderInput = (name: string, label: string, type = "text", multiline = false) => {
        const { data, errors } = this.state

        return (
            <InputField
                type={type}
                name={name}
                value={data[name]}
                label={label}
                multiline={multiline}
                placeholder={label}
                error={errors[name]}
                onChange={this.handleChange}
            />
        )
    }

    // renderCheckbox(label, items) {
    //     const activeItems = this.state.data[label[0]]

    //     return (
    //         <CheckboxList
    //             items={items}
    //             activeItems={activeItems}
    //             noMax={true}
    //             labels={label}
    //             onSelect={this.handleCheckboxSelect}
    //         />
    //     )
    // }

    renderSubmit = (label: string, classes) => {
        return (
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
                {label}
            </Button>
        )
    }

    renderCancel = (label: string, onClick: () => void, classes) => {
        return (
            <Button color="primary" className={classes.button} onClick={onClick}>
                {label}
            </Button>
        )
    }

    renderSecondaryAction = (label: string, path: string, classes) => {
        return (
            <Button
                variant="text"
                color="primary"
                className={classes.button}
                component={Link}
                to={path}
            >
                {label}
            </Button>
        )
    }

    renderButtonList = (label: string, items: string[], classes) => {
        return (
            <div className={classes.list}>
                <Typography variant="h6">{label}</Typography>
                {items.map((item) => (
                    <Button key={item} variant="outlined" className={classes.button}>
                        {item}
                    </Button>
                ))}
            </div>
        )
    }
}

export default Form
