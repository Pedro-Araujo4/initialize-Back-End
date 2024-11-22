import express from "express";
import { listPosts } from "../controller/postsController.js";

export default function routes(app) {
    app.use(express.json());
    app.get("/posts", listPosts)
}

//ou

/*
const routes = (app) => {
    app.use(express.json());
    app.get("/posts", listPosts)
}

export default routes;
*/