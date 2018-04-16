'use strict';

var path = require('path');
var DataStore = require('nedb');
var dbFileName = path.join(__dirname, 'contacts.json');

var db = new DataStore({
    filename : dbFileName,
    autoload : true
});


var Contacts = function () {};

Contacts.prototype.allContacts = function(callback) {
    return db.find({}, callback);
};

Contacts.prototype.add = function(contact, callback) {
    return db.insert(contact, callback);
};

Contacts.prototype.removeAll = function(callback) {
    return db.remove({},{ multi: true},callback);
};

Contacts.prototype.get = function(username, callback) {
    return db.find({username:username}, callback);
};

Contacts.prototype.remove = function(username, callback) {
    return db.remove({username:username},{ multi: true}, callback);
};

Contacts.prototype.update = function(username, updatedContact, callback) {
    return db.update({username:username},updatedContact,{}, callback);
};

module.exports = new Contacts();