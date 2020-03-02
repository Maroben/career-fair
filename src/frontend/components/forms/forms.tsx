import React, { Component } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { FormState } from "../../types/IForm"

import _ from "lodash"
import Joi, { ObjectSchema, SchemaMap } from "@hapi/joi"

import InputField from "./fields/inputField"
import CheckboxListField from "./fields/checkboxListField"
import InputListField, { InputListFieldObject } from "./fields/inputListField"

import { Button, Typography } from "@material-ui/core"

abstract class Form<Props, State extends FormState> extends Component<Props, State> {
    abstract state: State
    abstract joiSchema: SchemaMap
    abstract objectSchema: ObjectSchema
    abstract doSubmit: () => void

    validate = () => {
        const options: Joi.ValidationOptions = { abortEarly: false }
        const { error } = this.objectSchema.validate(this.state.data, options)
        console.log(error.details)
        if (!error) return {}
        const errors = {}
        for (let item of error.details) {
            errors[item.context.key] = item.message
        }
        return errors
    }

    validateProperty = (name: string, value: string): string => {
        const obj = { [name]: value }
        const objectSchema: ObjectSchema = Joi.object({ [name]: this.joiSchema[name] })
        const { error } = objectSchema.validate(obj)
        return error ? error.details[0].message : ""
    }

    validateObjectProperty = (name: string, id: string, value: string): string => {
        const obj = { [id]: value }
        const objectSchema: ObjectSchema = Joi.object({ [id]: this.joiSchema[name][id] })
        const { error } = objectSchema.validate(obj)
        return error ? error.details[0].message : ""
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
        const { data, errors } = this.state

        data[name] = value
        errors[name] = this.validateProperty(name, value)

        this.setState({ data, errors })
    }

    handleObjectChange = ({ target }: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const { id, value } = target
        let { data, errors } = this.state

        data[name][id] = value
        errors[name][id] = this.validateObjectProperty(name, id, value)

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

    renderInputList(title: string, name: string, labels: InputListFieldObject) {
        const { data, errors } = this.state

        return (
            <InputListField
                title={title}
                name={name}
                labels={labels}
                data={data[name] as InputListFieldObject}
                errors={errors[name] as InputListFieldObject}
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
