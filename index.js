const express = require('express');
const path = require('path');
const db= require('./config/mongoose');
const Contact = require('./models/contact');
const port=8001;

const app=express();

//middleware
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('assets'));

var contactList = [
    {
       name:"Adarsh",
       phone:"23435334"
    },
    {
        name:"Rohit",
        phone:"254470294"
    },
    {
        name:"Vishal",
        phone:"826454872"
    }
];

app.get('/',async function(req,res){
    try{
        const contacts=await Contact.find({});
        return res.render('home',{
            title:"contacts",
            contact_list:contacts
           });
    }catch(err){
       console.log('error');
       return;
    }
});
app.post('/create-contact',async function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    try{
        await Contact.create({
            name:req.body.name,
            phone:req.body.phone
        })
    }catch(err){
       if(err){
        console.log('error');
       }
    }
    return res.redirect('/');
});
app.get('/delete-contact',async function(req,res){
    let id=req.query.id;
    // let contactIndex=contactList.findIndex(contact=>(contact.phone==phone));
    // if(contactIndex!==-1){
    //     contactList.splice(contactIndex,1);
    // }
    try{
       await Contact.findByIdAndDelete(id);
    }catch(err){
       console.log("error",err);
    }
    return res.redirect('back');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });