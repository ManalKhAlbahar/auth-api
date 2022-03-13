'use strict'
const express = require('express');
const models = require('../models');
const bearerAuth=require('../middleware/bearerAuth');
const acl =require('../middleware/acl')
const router = express.Router();

router.param('/model',(req,res,next)=>{
    const modelData=req.params.model;
    if(models[modelData]){
        req.model=models[modelData];
        next();
    }
    else{
        next('Model not exit');
    }
});

router.get('/:model',bearerAuth,acl('read'),getAll);
router.post('/:model',bearerAuth,acl('create'), createOne);
router.get('/:model/:id', bearerAuth,acl('read'),getOneById);
router.put('/:model/:id',bearerAuth,acl('update'),updateHandler);
router.delete('/:model/:id',bearerAuth,acl('delete'),deleteHandler);

async function getAll(req, res) {
    let getAll = await req.model.readRecord();
    res.status(200).json(getAll);
}

async function createOne(req, res) {
    let postOne = await req.model.createRecord(req.body);
    res.status(201).json(postOne);
}

async function getOneById(req,res) {
    let getId = req.params.id;
    let getOne = await req.model.readRecord(getId);
    res.status(200).json(getOne);
}

async function updateHandler(req,res) {
    let body = req.body;
    let bodyId =req.params.id;
    let updateOne = await req.model.updateRecord(body,bodyId);
    res.status(201).json(updateOne);
}

async function deleteHandler(req,res) {
    let bodyId = req.params.id;
    let deleteOne =await req.model.deleteRecord(bodyId);
    res.status(204).json(deleteOne);
}

module.exports = router;