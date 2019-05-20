var express = require('express');
var user = express.Router();

const dbUser = require('../modelsC/dbUser');
var testT = dbUser.model('identifier');


//export databse schema

//adding new user details 
user.route('/add').post(function(req, res){
    var dbUser = new testT({
        name: 'user01',
        email : 'user02.email', 
        password: 'req.body.password', 
        mobileNo: 'req.body.mobileNo',
        NIC   : 'req.body.NIC'
    }); 
    dbUser.save()
        .then(() =>{
            res.status(200).json({'user': 'Added successfully'})
        })
        .catch(err => {
            res.status(400).send('failed');
        });

});


//get all users details
user.route('/').get(function(req, res){
    testT.find(function(err, todos){
        if(err){
            console.log(err);
        }else{
            
            res.json(todos);
        }
    });
});


//get one users details
user.route('/:id').get(function(req, res){
    let id = req.param.id;
    testT.findById(id, function(err, todos){
       // res.status(200).json({'user': 'Details regarding user 1'});
       if(err){
           console.log(err);
       }else{
           res.json(todos);
       }
        
    });
});

//delete one user
user.route('/delete/:id').delete(function(req, res){
    let id = req.param.id;
    testT.remove(id, function(err, result){
        res.send("Deleteed");
    });
});


//update details
user.route('/update/:id').post(function(req, res){
    testT.findById(req.param.id, function(err, todo){
        if(!todo)
            res.status(404).send('data is not found ');
        else
            todo.name = req.body.name;
            todo.email = req.body.email;
            todo.password = req.body.password;
            todo.mobileNo = req.body.mobileNo;
            todo.NIC = req.body.NIC;

            todo.save().then(todo => {
                res.json('Todo updated');
            })
            
            .catch(err =>{
                res.status(400).send("Update is not possible ")
            });
    });
});






module.exports = user;