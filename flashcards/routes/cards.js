const express = require('express');
const router = express.Router();
const { data } = require("../data/flashcards.json");
const { cards } = data


router.get('/:id', (req,res)=>{
    const {side} = req.query;
    const {id} = req.params;
    const text = cards[id][side];
    const {hint} = cards[id];
    
    const name = req.cookies.username;

    templateData = {text, id, name};

    if(!side){
        return res.redirect(`/cards/${id}?side=question`);
    }

    if(side === "question"){
        templateData.hint = hint;
    }

    res.render('card', templateData);
});

router.get('/',(req,res)=>{
    const id = Math.floor(Math.random() * cards.length);
    res.redirect(`/cards/${id}?side=question`);
    res.render('card', templateData);
});

module.exports = router;