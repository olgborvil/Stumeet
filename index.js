'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var contacts = require("./contacts.js");

var port = (process.env.PORT || 16778);
var baseAPI = "/api/v1";

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get(baseAPI + "/contacts", (request, response) => {
    console.log("GET /contacts"); 
    
    contacts.allContacts((err,contacts)=>{
        response.send(contacts);    
    });
});

app.post(baseAPI + "/contacts", (request, response) => {
    console.log("POST /contacts");
    var contact = request.body;
    contacts.add(contact);
    response.sendStatus(201);
});

app.delete(baseAPI + "/contacts", (request, response) => {
    console.log("DELETE /contacts");

    contacts.removeAll((err,numRemoved)=>{
        console.log("contacts removed:"+numRemoved);
        response.sendStatus(200);    
    });

});

app.get(baseAPI + "/contacts/:username", (request, response) => {
    console.log("GET /contacts/"+username);
    var username = request.params.username;

    contacts.get(username,(err,contacts)=>{
        if (contacts.length === 0) {
            response.sendStatus(404);
        }
        else {
            response.send(contacts[0]);  
        }
    });
});


app.delete(baseAPI + "/contacts/:username", (request, response) => {
    var username = request.params.username;

    contacts.remove(username,(err,numRemoved)=>{
        console.log("contacts removed:"+numRemoved);
        response.sendStatus(200);    
    });

    console.log("DELETE /contacts/" + username);
});


app.put(baseAPI + "/contacts/:username", (req, res) => {
  console.log("PUT /contact/" + req.params.username);
	var updatedContact = req.body;
	if (updatedContact.username) {
		res.status(400).send('Username field cannot be updated');
	}
	else {
		var username = req.params.username;
		updatedContact.username= username;
		contacts.update(username, updatedContact, (err, numUpdates) => {
			if (err) {
				return res.sendStatus(500);
			}
			console.log("Contacts updated:" + numUpdates);
			if (numUpdates === 0) {
				res.sendStatus(404);
			}
			else {
				res.sendStatus(200);
			}
		});
	}
        
    });

  



app.listen(port, () => {
    console.log("Server with GUI up and running!!");
});
 