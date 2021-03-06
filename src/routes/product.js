const express = require('express');
const router = express.Router();

const Product = require('../models/product');

router.get('/', async (req, res) => {
    try {
        // const products = await Product
        //                         .find()
        //                         .populate({
        //                             path: 'owner',
        //                             select: '_id name email',
        //                             match: {
        //                                 active: true
        //                             }
        //                         })
        //                         .sort({name: 1})
        //                         .lean();
        const products = await Product
    .aggregate(
        [
            {$match: { "features.strings": 6 }},
            {$lookup: {from: "usuarios", localField: "owner", foreignField: "_id", as: "owner"}},
            {$unwind: {path: "$owner", preserveNullAndEmptyArrays: true}},
            {$project: {name: 1, year: 1, brand: 1, "features": 1}},
            {$sort: {year: -1, name: 1}}
        ]
    )
        res.json({ products });
        return;
    } catch(e) {
        console.log('ERROR', e);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product
                                .findById(id)
                                .populate('owner');
        res.json({ product });
    } catch(e) {
        console.log('ERROR', e); 
    }
});

router.post('/', async (req, res) => {
    const {body} = req;
    try {
        const product = new Product(body);
        const saved = await product.save();

        res.json({message: "Produto salvo com sucesso", data: saved})
    } catch(e) {
        console.log('ERROR', e); 
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const product = await Product.findById(id);
        if(!product) { 
            res.json({"message": "Nenhum produto encontrado", data: null});
            return;
        }

        for (prop in body) {
            product[prop] = body[prop];
        }
        const saved = await product.save();

        res.json({message: "Produto salvo com sucesso", data: saved});
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