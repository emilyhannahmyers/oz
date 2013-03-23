// setup stuff
var mongoose = require("mongoose")
    , Schema = mongoose.Schema;

var UserSchema = new Schema ( {
    userId: {type:Number, unique:true},
    firstName: String,
    streetAddress: String,
    zipcode: String
});

// gets the user information
UserSchema.static("getUser", function(userId, callback) {
    User.findOne({"userId": userId}, function(error, user) {
        if (error) {
            callback(error);
        }
        else if (user) {
            callback(null, user);
        }
        else {
            callback("No user.");
        }
    });
});

// create new user
UserSchema.static("createUser", function(userAttributes, callback) {
    var newUser = new User(userAttributes);
    newUser.save(function(error) {
        if (error) {
            callback(error);
        }
        else {
            callback(null, newUser);
        }
    });
});

// update user
UserSchema.method("update", function(userAttributes, callback) {
    for(var attr in userAttributes) {
        this[attr] = userAttributes[attr];
    }
    this.save(function(error) {
        if (error) {
            callback(error);
        }
        else {
            callback(null);
        }
    });
});

// destroy user
UserSchema.method("destroy", function(callback) {
    User.remove({"userId": this.userId}, function(error) {
        if (error) {
            callback(error);
        }
        else {
            callback(null);
        }
    });
});