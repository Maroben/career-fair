import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"

import IUser from "../../persistence/interfaces/IUser"

import authService from "../services/authService"
import { getUser, removeUserCompany } from "../services/userService"

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
}

class UserController extends Component<Props, State> {
    state = {
        user: null
    }

    componentDidMount() {
        this.handleData()
    }

    async handleData() {
        const id = authService.getCurrentUser()._id
        const { data } = await getUser(id)
        this.setState({ user: data })
    }

    async removeCompany() {
        await removeUserCompany(this.state.user)
        this.handleData()
    }

    render() {
        const { user } = this.state

        return (
            <>
                <Switch>
                    <Route path="/account/login" component={LoginView} />
                    <Route path="/account/register" component={RegisterView} />
                    <Route
                        path="/account"
                        render={() => (
                            <UserView
                                user={user}
                                onChange={this.handleData.bind(this)}
                                onRemoveCompany={this.removeCompany.bind(this)}
                            />
                        )}
                    />
                </Switch>
            </>
        )
    }
}

export default withStyles(styles)(UserController)
