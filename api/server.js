const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/api/budget', (req, res) => {
    db('budget')
        .then(budget => {
            res.json(budget);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get budgets', err })
        })
});

server.get('api/budget/:id', (req, res) => {
    const { id } = req.params;

    db('budget').where({ id })
        .then(budget => {
            if (budget.length) {
                res.json(budget)
            } else {
                res.status(404).json({ message: 'Could not find budget with given ID'})
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get budget', err })
        })
});

server.post('/api/budget', (req, res) => {
    db('budget').insert({ name: 'account-14', budget: '857' })
        .then(budget => {
             res.status(201).json({ message: 'Budget added'})
         })
        .catch(err => {
            res.status(500).json({ message: 'Unable to add budget', err })
         })
});

server.put('/api/budget/:id', (req,res) => {
    const actionInfo = req.body;
    const { id } = req.params;

    db('budget').where(id)
        .update(actionInfo)
        .then(e => {
            if (e) {
                res.status(200).json({ message: 'Budget updated' })
            } else {
                res.status(404).json({ message: 'ID not found' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Unable to update budget', err })
        })
});

server.delete('/api/budget/:id', (req, res) => {
    const { id } = req.params;

    db('budget').where(id)
        .del()
        .then(e => {
            if (e) {
                res.status(200).json({ message: 'Budget deleted' })
            } else {
                res.status(404).json({ message: 'ID not found' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Unable to delete budget'})
        })
})

module.exports = server;
