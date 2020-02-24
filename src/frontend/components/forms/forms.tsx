import React, { Component } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { FormState } from "../../types/IForm"

import _ from "lodash"
import Joi, { ObjectSchema, SchemaMap } from "@hapi/joi"

import InputField from "./fields/inputField"
import CheckboxListField from "./fields/checkboxListField"
import InputListField from "./fields/inputListField"

import { Button, Typography } from "@material-ui/core"

abstract class Form<Props, State extends FormState> extends Component<Props, State> {
    abstract state: State
    abstract joiSchema: SchemaMap
    abstract objectSchema: ObjectSchema
    abstract doSubmit: () => void

    validate = () => {
        const options: Joi.ValidationOptions = { abortEarly: false }
        const { error } = this.objectSchema.validate(this.state.data, options)
        if (!error) return {}
        const errors = {}
        for (let item of error.details) {
            console.log(item)
            errors[item.context.key] = item.message
        }
        return errors
    }

    validateProperty = (name: string, value: string | object) => {
        const obj = { [name]: value }
        const objectSchema: ObjectSchema = Joi.object({ [name]: this.joiSchema[name] })
        const { error } = objectSchema.validate(obj)
        return error ? error.details[0].message : null
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const errors = this.validate()
        this.setState({ errors })

        if (!_.isEmpty(errors)) {
            toast.error("Some form fields have errors")
            return false
        }

        this.doSubmit()
    }

    handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = target
        const data = { ...this.state.data }
        data[name] = value

        const errors = { ...this.state.errors }
        const errorMessage = this.validateProperty(name, value)
        errorMessage ? (errors[name] = errorMessage) : delete errors[name]

        this.setState({ data, errors })
    }

    handleObjectChange = ({ target }: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const { id, value } = target
        const data = { ...this.state.data }
        let errors = { ...this.state.errors }

        data[name][id] = value
        const errorMessage = this.validateProperty(name, data[name])

        if (errorMessage) {
            errors = { [name]: { [id]: errorMessage } }
        } else {
            delete errors[name][id]
        }
        this.setState({ data, errors })
    }

    handleCheckboxSelect = (label: string, active: string[]) => {
        const data = { ...this.state.data }
        data[label] = active
        this.setState({ data })
    }

    renderInput = (name: string, label: string, type = "text", multiline = false) => {
        const { data, errors } = this.state

        return (
            <InputField
                type={type}
                name={name}
                value={data[name] as string}
                label={label}
                multiline={multiline}
                placeholder={label}
                error={errors[name] as string}
                onChange={this.handleChange}
            />
        )
    }

    renderCheckboxList(title: string, label: string, items: string[]) {
        let active = this.state.data[label] as string[]
        active = active ? active : []
        return (
            <CheckboxListField
                title={title}
                label={label}
                items={items}
                active={active}
                onActiveChange={this.handleCheckboxSelect}
            />
        )
    }

    renderInputList(title: string, name: string, labels: { [name: string]: string[] }) {
        const { data, errors } = this.state

        return (
            <InputListField
                title={title}
                name={name}
                labels={labels}
                items={data[name] as { [name: string]: string }}
                errors={errors[name] as { [name: string]: string }}
                onChange={this.handleObjectChange}
            />
        )
    }

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
