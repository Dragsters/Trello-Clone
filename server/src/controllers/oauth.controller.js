import { OAuth2Client } from "google-auth-library";
import UserModel from "../models/user.model.js";
const cliendId = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(cliendId);

export const authGoogle = async (req, res) => {
    // console.log()
    const { tokenId } = req.body;
    // console.log('take all info from body. ', req.body);
    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: cliendId
        });
        console.log(ticket);
        const { name, email, picture } = ticket.getPayload();
        // console.log('ticket payload', ticket.getPayload());

        await UserModel.updateOne({ email: email },
            { name: name, img_url: picture },
            { upsert: true });
        const user = { name: name, img_url: picture, email: email };
        console.log(user);
        if (req.cookies['token']) {
            console.log(req.cookies.token);
            res.clearCookie('token');
        }
        const tokenCookie = JSON.stringify({ tokenId: tokenId, type: 'google' });
        console.log('setting token cookie ', tokenCookie);
        res.cookie('token', tokenCookie,
            { maxAge: 60 * 60 * 24 * 7, signed: true, sameSite: 'strict' });
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
};

export const authSimple = async (req, res) => {

};

export const signout = (req, res) => {
    for (let i in req.cookies) {
        res.clearCookie(i);
    }
    for (let i in req.signedCookies)
        res.clearCookie(i);
    res.status(200).json({ 'ok': true });
};