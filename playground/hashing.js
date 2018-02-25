var bcrypt = require('bcryptjs');

var password = 'erfanssss'
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        console.log(hash);

        bcrypt.compare(password+'1', hash, function(err, res) {
            console.log(res);
        });

    });
});