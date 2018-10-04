var safeBox;

(function () {
    var secret;
    var password;

    var safeBox = {
        saveSecret: function (_secret, _password) {
            // TODO
            if (typeof _password === 'undefined' && typeof _password !== String) {
                throw Error("Password must be set");
            }
            if (_password.length === 0) {
                throw Error('invalid password');
            }

            if (!_password.trim().length === 0) {
                throw Error('invalid password')
            }

            secret = _secret;
            password = _password;
        },
        retrieveSecret: function (_password) {
            // TODO
            if (password === _password) {
                return secret;
            }
            throw Error("Invalid password");
        }
    }
    return safeBox;
})()