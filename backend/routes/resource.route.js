import { createResource, getResource, updateResource,deleteResource, getArticles, getVideos, createGoal } from "../controller/resource.controller.js";
import express from 'express';

const router = express.Router();

router.post('/',createResource);

router.post('/goal',createGoal);

router.get('/',getResource);

router.get('/article/:article',getArticles)

router.get('/video/:tag',getVideos)

router.put('/:id', updateResource);

router.delete('/:id', deleteResource);

export default router;
