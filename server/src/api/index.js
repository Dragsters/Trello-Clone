import { Router } from "express";
import v1 from "./v1 routes/index.js";

const api = Router();

api.use('/v1', v1);
api.get('/t', (req, res) => {
    res.json({
        msg: `welcome to the api route
    use the v1 routes at  /api/v1` });
});

export { api };