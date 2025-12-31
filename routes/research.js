const express = require('express');
const route = express.Router();
const Project = require('../models/projects');  

route.get('/', async (req, res) => {
    try {
        const topProjects = await Project.find().sort({ createdAt: -1 }).limit(5);
        res.render('research', { projects: topProjects, isAdmin: req.session.isAdmin || false });
    } catch (err) {
        res.render('research', { projects: [], isAdmin: false });
    } 
});

route.get('/overview', (req, res) => {
    res.render('overview');
});

route.get('/all-projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        const isAdmin = req.session && req.session.isAdmin;

        res.render('projects', { 
            projects: projects || [], 
            isAdmin: isAdmin || false 
        });
    } catch (err) {
        console.error(err);
        res.render('projects', { projects: [], isAdmin: false });
    }
});

route.post('/add', async (req, res) => {
    try {
        if (req.session && req.session.isAdmin) {
            await Project.create(req.body);
            res.redirect('/projects'); 
        } else {
            res.status(403).send("Unauthorized");
        }
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

module.exports = route;