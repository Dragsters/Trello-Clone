import { OAuth2Client } from "google-auth-library";

export const isAuthorized = async (req, res, next) => {

    if (req.signedCookies['token'] != undefined) {
        const token = req.signedCookies['token'];
        if (token.type === 'google') {
            const cliendId = process.env.GOOGLE_CLIENT_ID;
            const client = new OAuth2Client(cliendId);
            try {
                await client.verifyIdToken({
                    idToken: token.tokenId,
                    audience: cliendId
                });
            } catch (e) {
                return next(Error('Unauthorized'));
            }
        }
        res.cookie('token', token,
            { maxAge: 60 * 60 * 24 * 7, signed: true, sameSite: 'strict' });
        return next();
    }
    else
        return next(Error('Unauthorized'));
};