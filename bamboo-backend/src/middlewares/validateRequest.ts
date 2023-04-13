import { NextFunction, Request, Response } from "express";
import { reIssueTokens, verifyJWT } from "../utils/jwt-utils";

export const validateRequest = async(req: Request, res: Response, next: NextFunction) => {

    // get the tokens from req.object
    const accessToken = req.cookies["accessToken"] || req.headers.authorization?.split(" ")[1];
    const refreshToken = req.cookies["refreshToken"] || req.headers["x-refresh"];

    if(!accessToken) {
        return res.status(401).json({message: 'No Authorization'});
    }

    if(!refreshToken) {
        return res.status(401).json({message: 'No Authorization'})
    }

    const {decoded, expired} = verifyJWT(accessToken);

    if(decoded) {
        return next();
    }

    if(expired && refreshToken) {
        const tokens = await reIssueTokens(refreshToken);
        if(!tokens) return res.status(401).json({message: 'No Authorization'})

        const {newAccessToken, newRefreshToken} = tokens;

       // set response cookies
       res.cookie("accessToken", newAccessToken, {
        maxAge: 3.3e6, // 55 mins
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "none",
        secure: true,
      });

      res.cookie("refreshToken", newRefreshToken, {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "none",
        secure: true,
      });

      return next();
    }
    return res.status(401).json({ message: "no autorisation" });

}