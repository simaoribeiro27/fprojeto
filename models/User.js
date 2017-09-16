var keystone = require('keystone');
var Types = keystone.Field.Types;

//  User Model
var User = new keystone.List('User');

User.add({
    name: { type: Types.Name, index: true },
    email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
    password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
    isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
    idg: String,
    token: String,
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
    return this.isAdmin;
});

User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });

// findOne  method  for passport
/*var getUserModel = function() {
    return User.model('users', User.Schema);
};

User.Schema.path('email').validate(function (value, cb) {
    getUserModel().findOne({email: value}, function (err, user) {
        if (err) {
            cb(err);
        }
        else if(user){  //we found a user in the DB already, so this email has already been registered
            cb(null,false);
        }
        else{
            cb(null,true)
        }
    });
},'This email address is already taken!');*/
//

// Registration
User.defaultColumns = 'name, email, isAdmin';
User.register();