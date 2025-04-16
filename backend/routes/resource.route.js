import { createResource, getResource, updateResource,deleteResource } from "../controller/resource.controller.js";
import express from 'express';

const router = express.Router();

router.post('/',createResource);

router.get('/',getResource);

router.put('/:id', updateResource);

router.delete('/:id', deleteResource);

export default router;
