var express = require('express');
var router = express.Router();
var nodeMailer = require('nodemailer');
var AWS = require('aws-sdk')



/* POST home page. */
router.post('/contact_us', function(req, res, next) {
    const name = req.body.name;

    // to store the value in paramter store...
    // const ssmvalue = getSSMValue();

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.USERNAME,
            pass: process.env.PASSWORD
        }
    });


    let mailOptions = {
        from: '"Abhishek Shukla" <abhishekpshukla@gmail.com>', // sender address
        to: '"Abhishek Shukla" <abhishekpshukla@gmail.com>', // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.body, // plain text body
        html: req.body.message // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log('Message %s sent: %s', info.messageId, info.response)
        res.send('Thank you, we will get in touch asap');
    });

});

var getSSMValue = function() {
    var ssm = new AWS.SSM({
        region: "us-east-1"
    });
    var params = {
        "Names": ['/portfolio'],
        "WithDecryption": true
    };

    ssm.getParameters(params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        } else {
            var result = JSON.parse(data["Parameters"][0]['Value']);
            return result
        }
    });
}

module.exports = router;