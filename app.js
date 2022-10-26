const express=require('express');
const path=require('path');
const bodyparser=require('body-parser');
const nodemailer=require("nodemailer");

const app=express();
app.set("view engine", "hbs");


//body parser
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


app.use('/public', express.static(path.join(__dirname,'public')));
 
app.get("/",(req,res)=>{
res.render('index');
});


// app.post("/send",(req,res)=>{
// console.log(req.body);
// });

app.post("/send",(req,res)=>{
const output= `
<p>You have a New Contact Request ....</p>
<h3>Contact Details:</h3>
<ul>
<li>Name:${req.body.name}</li>
<li>Company:${req.body.company}</li>
<li>Email:${req.body.email}</li> 
<li>Phone:${req.body.phone}</li>
</ul>

<h3>Message</h3>

<p>${req.body.message}</p>
`;

//////////////////////////////////////// 

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'testing8328.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'testing8328.gmail.com', // generated ethereal user
        pass: 'Tridib@25022002'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false/////
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <testing8328@email.com>', // sender address
      to: 'cse19020@gmail.com', // list of receivers
      subject: 'Email App By Node Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body=output variable
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('index', {msg:'Email has been sent...'});
  });

///////////////////////////////////////

});

app.listen(8001,()=>{
console.log("server started ...");
});
