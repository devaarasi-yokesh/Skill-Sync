import { createGoal, getGoal, updateGoal,deleteGoal,  getVideos, createCompletedGoal, createResource, getResource } from "../controller/goal.controller.js";
import express from 'express';

const router = express.Router();

router.post('/',createGoal);

router.post('/goal',createCompletedGoal);

router.post('/rsc',createResource);

router.get('/',getGoal);

router.get('/rsc',getResource);

// router.get('/article/:article',getArticles)

router.get('/video/:tag',getVideos)

router.put('/:id', updateGoal);

router.delete('/:id', deleteGoal);

export default router;
