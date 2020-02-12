import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import { ICompany } from "../../persistence/models/CompanyModel"
import { IUser } from "../../persistence/models/UserModel"

import companyService from "../services/companyService"

import UserView from "../views/userView"
import LoginView from "../views/loginView"
import RegisterView from "../views/registerView"

const styles = (theme: Theme) =>
    createStyles({
        main: {
            margin: theme.spacing(2)
        }
    })

interface Props extends WithStyles<typeof styles> {}

type State = {
    user: IUser
    company: ICompany
}

class UserController extends Component<Props, State> {
    state = {
        user: null,
        company: null
    }

    componentDidMount() {}

    render() {
        const { user, company } = this.state

        return (
            <>
                <Switch>
                    <Route path="/account/login" component={LoginView} />
                    <Route path="/account/register" component={RegisterView} />
                    <Route
                        path="/account"
                        render={() => <UserView user={user} company={company} />}
                    />
                </Switch>
            </>
        )
    }
}

export default withStyles(styles)(UserController)
