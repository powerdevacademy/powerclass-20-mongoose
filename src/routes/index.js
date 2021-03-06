const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({message: "Bem vindo Power Dev"});
});

module.exports = router;