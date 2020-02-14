import React, { FunctionComponent } from "react"
import { Route, Redirect } from "react-router-dom"
import { toast } from "react-toastify"

import authService from "../services/authService"
import IUser from "../../persistence/interfaces/IUser"
import { Level } from "../../persistence/interfaces/ILevel"

interface Props {
    path: string
    protectedComponent: FunctionComponent
    authLevel: Level
}

const ProtectedRoute = ({ path, protectedComponent, authLevel }: Props) => {
    const user: IUser = authService.getCurrentUser()

    if (!user || user.level > authLevel) {
        toast.error("Keine Berechtigung")
        return <Redirect to={"/account/login"} />
    }

    return <Route path={path} component={protectedComponent} />
}

export default ProtectedRoute
