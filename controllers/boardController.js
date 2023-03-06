const { request } = require('express');
const Board = require('../model/Board');

const getBoardsByUser = async (req, res) => {
    const result = await Board.find({ userID: req.params.id }).exec();
    res.json(result);
}

const createNewBoard = async (req = request, res) => {
    const { boardName } = req.body;

    if(!boardName || !boardName?.length) return res.status(400).json({ "message": "The board name is required." });

    try {

        const result = await Board.create({
            "userID": req.body.id,
            "boardName": boardName
        })

        console.log(result);

        res.status(201).json({"message": `New board ${boardName} created.`});

    } catch (err) {
        res.status(500).json({"message": err.message});
    }

}

const deleteBoard = async (req, res) => {
    const { id } = req.body;

    if(!id) return res.status(204).json({ "message": "ID is require." });

    const foundBoard = await Board.findOne({ _id: id });

    if(!foundBoard) return res.status(404).json({ "message": `ID ${id} is Not match.` });

    const result =  await foundBoard.deleteOne();
    console.log(result);
    res.json(result);
}

const addingNewSection = async (req, res) => {

    if(!req?.body?.id || !req.body.sectionName) return res.status(400).json({ "message": "ID and section name are required" });

    const foundBoard = await Board.findOne({ _id: req.body.id }).exec();

    if(!foundBoard) return res.status(204).json({ "message": `The ID ${req.body.id} was not found.` });

    const sectionName = req.body.sectionName;

    if(req.body?.sectionName) foundBoard.sections.push({sectionName});

    const result = await foundBoard.save();
    console.log(result);
    res.json(result);

}

const deleteSection = async (req, res) => {
    const { id, bID } = req.body;

    if(!id || !bID) return res.status(400).json({ "message": "Id and board id are required." });

    const foundBoard = await Board.findOne({ _id: bID });

    const foundSection = foundBoard.sections.filter(section => {if(section._id.toString() === id) return section});
    
    if(!foundSection?.length) return res.sendStatus(204);

    const deletedSection = foundBoard.sections.filter(section => section._id !== foundSection[0]._id);

    foundBoard.sections = deletedSection;

    const result = await foundBoard.save();

    console.log(result);
    res.json(result);
} 

const addingNewTask = async (req, res) => {

    if(!req.body.sectionID || !req.body.id || !req.body.task || !req.body.description) return res.status(400).json({ "message": "It is missing a field" });

    const foundSection = await Board.findOne({ _id: req.body.id }).exec();

    if(!foundSection) return res.status(204).json({ "message": `The ID ${req.body.sectionID} was not found.` });

    const newTask = {
        sectionID: req.body.sectionID,
        task: req.body.task,
        description: req.body.description
    }

    if(req.body?.task) foundSection.tasks.push(newTask);

    const result = await foundSection.save();
    
    console.log(result);
    res.json(result);
}

const deleteTask = async (req, res) => {
    const { id, bID } = req.body;

    if(!id || !bID) return res.status(400).json({ "message": "Id and board id are required." });

    const foundBoard = await Board.findOne({ _id: bID });

    const foundTask = foundBoard.tasks.filter(task => {if(task._id.toString() === id) return task});
    
    if(!foundTask?.length) return res.sendStatus(204);

    const deletedTask = foundBoard.tasks.filter(task => task._id !== foundTask[0]._id);

    foundBoard.tasks = deletedTask;

    const result = await foundBoard.save();

    console.log(result);
    res.json(result);
}

module.exports = {
    getBoardsByUser,
    createNewBoard,
    addingNewSection,
    deleteSection,
    addingNewTask,
    deleteTask,
    deleteBoard
};