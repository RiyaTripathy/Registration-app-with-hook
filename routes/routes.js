
const JSON = require('circular-json');
var nodemailer = require('nodemailer');
var http = require("http");
var express = require("express");


var app = express();

var data;
var appRouter = function (app) {
  app.post("/", function (req, res) {
    console.log(req.body.data.user.profile)
	  data= req.body.data.user.profile;
//Send deny command to Okta registration hook
    res.status(200).json({
    	   "commands":[
    		      {
    		         "type":"com.okta.action.update",
    		         "value":{
    		            "registration":"DENY"
    		         }
    		      }
    		   ]
    		});

    //send email for approval
	  var transporter = nodemailer.createTransport({
		  service: 'smtp.gmail.com',
		  port: 465,
		  secure: false	,
		  auth: {
			  user: 'suvadeepunplugged@gmail.com',
			  pass: ''
		  }
	  });

	  var mailOptions = {
		  from: 'Suvadeepunplugged@gmail.com',
		  to: 'Suvadeepunplugged@gmail.com',
		  subject: 'Request to create user',
		  text: 'data'
	  };

	  transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
			  console.log(error);
		  } else {
			  console.log('Email sent: ' + info.response);
		  }
	  });
  });
//approval API call to create user
	app.post("/createUser", function (req, res) {
		console.log(req.body.data.user.profile);
		//Okta API to create User
		app.use('http://halliburton.okta.com/api/v1/users?activate=false', function (req, res) {
			let url = config.API_HOST + req.ur
			req.headers['someHeader'] = 'someValue'
			req.pipe(request(url)).pipe(res)
		})



		var apiKey = "00mS7WX5Hink4vKrAfWq_DoEd98-cGadqgeq-HyztM";

		let url = "http://halliburton.okta.com/api/v1/users?activate=false";
		var options = {
			method: "GET",
			headers: {
				"X-Auth-Token": apiKey
			}
		};

		let data = "";

		let apiRequest = http.request(url, options, function(res) {
			console.log("Connected");

			res.on("data", chunk => {
				data += chunk;
			});

			res.on("end", () => {
				console.log("data collected");

				response.end(JSON.stringify(data));
			});
		});

		apiRequest.end();



		res.send('User is created')
	});
}
module.exports = appRouter;


