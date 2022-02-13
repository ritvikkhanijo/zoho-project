const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');
const Comment = require('../models/comment.model');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.secretKey = req.body.secretKey;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.getAllCom = (req, res, next) => {
    Comment.find({}).exec((err,comments)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(comments);
        }
    })
}

module.exports.getMyCom = (req, res, next) => {
    User.findById(req._id).populate("comments").exec(function(err,user){
        if(err){
            console.log(err);
            res.status(500).send(err);
        }else{
            res.status(200).send(user.comments);
        }
    });
}

module.exports.createCom = (req, res, next) => {
    User.findOne({ _id: req._id },(err,user)=>{
        if(err){
          console.log(err);
          res.status(500).send(err);
        }
        else{
            console.log("user is",user);
        Comment.create(req.body,function(err,comment){
          if(err){
            console.log(err);
            res.status(500).send(err);
          }
          else{
            comment.author.id=req._id;
            comment.save();
            user.comments.push(comment);
            user.save();
            res.status(200).send("discussion created and linked to user");
          }
        });
        }
      });  
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['email']) });
        }
    );
}
