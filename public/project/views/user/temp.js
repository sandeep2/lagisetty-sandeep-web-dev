/**
 * Created by slagisetty on 6/18/2016.
 */
var http=require("http");
var nodemailer=require("nodemailer");

http.createServer(function(req,res){
    res.writeHead(200, {"Content-Type": "text/plain"});
    var smtpTransport = require('nodemailer-smtp-transport');

    var transport = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'noreply.whereismypet@gmail.com', // my mail
            pass: 'Whatiswhat1'
        }
    }));
    var mailOptions = {
        from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
        to: 'mail4sandeeps@gmail.com@gmail.com', // the same mail = want to send it to myself
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ✔', // plaintext body
        html: '<b>Hello world ✔</b>' // html body
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });
    res.end("hllo");
}).listen(4)