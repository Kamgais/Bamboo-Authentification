import { Request } from "express";
import { Session, SessionData } from "express-session";
import { UserDto } from "./user-dto";


export interface RequestType extends Request {
    session: Session & Partial<SessionData> & {
        user: UserDto
    }
}