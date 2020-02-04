'use strict'

const { User } = require('../db')
const express = require('express')
const router = express.Router()

const Sequelize = require('sequelize')
const Op = Sequelize.Op

router.get('/', async (req, res) => {
    const tasks = await User.findAll()
    res.json(tasks)
})

router.post('/', async (req, res) => {
    const { title, description } =  req.body
    await User.create({ Tasks: title, Description: description }).then(() => {
        res.json({status: 'Task saved'})
      })
      .catch(()=>{
        res.json({status: 'Error while trying add the task'})
      })
})

router.put('/:id', async (req, res) => {
    const { title, description } = req.body
    await User.update({ Tasks: title, Description: description }, {
        where: {
          _id: req.params.id
        }
      }).then(() => {
        res.json({status: 'Task updated'})
      }).catch(() => {
        res.json({status: 'Error while trying edit the task'})
      })
})

router.delete('/:id', async (req, res) => {
     await User.destroy({
        where: {
          _id: req.params.id
        }
      }).then(() => {
        res.json({status: 'Task saved'})
      })
      .catch(()=>{
        res.json({status: 'Error while trying remove the task'})
      })
      
})

router.get('/:id', async (req, res) =>{
    /* const task = await Task.findById(req.params.id)
    res.json(task) */
    const task = await User.findAll({
        where: {
          Tasks: {
            [Op.startsWith]: req.params.id
          }
        }
      })
    res.json(task)
})


/* router.get('/:id', async (req, res) =>{
    const task = await Task.findById(req.params.id)
    res.json(task)
})
 */

module.exports = {
    router
}