import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import { createStyles, Theme } from "@material-ui/core"
import { WithStyles, withStyles } from "@material-ui/core/styles"
import ProtectedRoute from "../components/protectedRoute"

import IUser from "../../persistence/interfaces/IUser"
import ICompany from "../../persistence/interfaces/ICompany"

import authService from "../services/authService"
import { getUser, removeUserCompany } from "../services/userService"

import UserView from "../views/userView"
import LoginView from "../views/loginView"
import RegisterView from "../views/registerView"
import { getCompany } from "../services/companyService"

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

    componentDidMount() {
        this.handleData()
    }

    async handleData() {
        const storedUser = authService.getCurrentUser()
        let user: IUser = storedUser ? await getUser(storedUser._id) : null
        let company: ICompany = user.company.length > 0 ? await getCompany(user.company) : null
        this.setState({ user, company })
    }

    async removeCompany() {
        await removeUserCompany(this.state.user)
        this.handleData()
    }

    render() {
        const { user, company } = this.state

        return (
            <>
                <Switch>
                    <Route path="/account/login" component={LoginView} />
                    <Route path="/account/register" component={RegisterView} />
                    <ProtectedRoute
                        path="/account"
                        authLevel={2}
                        protectedComponent={() => (
                            <UserView
                                user={user}
                                company={company}
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
