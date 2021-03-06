const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json({ users });
        return;
    } catch(e) {
        console.log('ERROR', e);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({_id: id});
        res.json({ user });
    } catch(e) {
        console.log('ERROR', e); 
    }
});

router.post('/', async (req, res) => {
    const {body} = req;
    try {
        const user = new User(body);
        const saved = await user.save();

        res.json({message: "Usuário salvo com sucesso", data: saved})
    } catch(e) {
        console.log('ERROR', e); 
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = await User.findById(id);
        if(!user) { 
            res.json({"message": "Nenhum usuario encontrado", data: null});
            return;
        }

        for (prop in body) {
            user[prop] = body[prop];
        }
        const saved = await user.save();

        res.json({message: "Usuário salvo com sucesso", data: saved});
    } catch(e) {
        console.log('ERROR', e); 
    }
});

router.delete('/:id', (req, res) => {
    try {
        
    } catch(e) {
        console.log('ERROR', e); 
    }
});


module.exports = router;