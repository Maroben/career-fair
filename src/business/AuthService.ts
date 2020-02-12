import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import config from "config"
import { level, IUser } from "../persistence/models/UserModel"

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("x-auth-token")
    if (!token) return res.status(401).send(`Access denied. No token provided.`)

    try {
        req.body.user = jwt.verify(token, config.get("jwtPrivateKey"))
        return next()
    } catch (err) {
        return res.status(400).send(`Invalid token ${err}`)
    }
}

export const isRoot = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.user.level <= level.root) return res.status(403).send("Access denied.")
    return next()
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.user.level <= level.admin) return res.status(403).send("Access denied.")
    return next()
}

export const isUser = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.user.level <= level.user) return res.status(403).send("Access denied.")
    return next()
}

export const isAuthorized = (token: string, body: IUser): boolean => {
    if (body.level === level.user) {
        return true
    } else if (!token) {
        return false
    } else {
        try {
            let user: IUser = jwt.verify(token, config.get("jwtPrivateKey")) as IUser
            return user.level <= body.level
        } catch (err) {
            throw new Error("Action Denied, Invalid token provided.")
        }
    }
}
