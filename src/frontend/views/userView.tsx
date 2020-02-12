import React, { useState } from "react"
import { createStyles } from "@material-ui/core"
import { WithStyles, withStyles, Theme } from "@material-ui/core/styles"

import { Card, CardHeader, CardActions, Button, Typography } from "@material-ui/core"

import SimpleHeader from "../components/headers/simpleHeader"
import { IUser } from "../../persistence/models/UserModel"
import { ICompany } from "../../persistence/models/CompanyModel"

const styles = (theme: Theme) =>
    createStyles({
        card: {
            marginBottom: theme.spacing(2),
            padding: theme.spacing()
        },
        header: {
            paddingBottom: 0
        },
        pos: {
            margin: theme.spacing(2)
        },
        cardAction: {
            justifyContent: "flex-end"
        },
        mainAction: {
            width: "100%"
        }
    })

interface Props extends WithStyles<typeof styles> {
    user: IUser
    company: ICompany
}

const UserView = ({ classes, user, company }: Props) => {
    const [userEdit, setUserEdit] = useState(false)
    const [companyEdit, setCompanyEdit] = useState(false)

    return <>AccountView</>
}

export default withStyles(styles)(UserView)
