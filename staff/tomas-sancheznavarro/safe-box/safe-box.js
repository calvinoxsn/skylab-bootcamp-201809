function passwordAdmin() {
    var secret;
    var password;
    var safeBox = {
        saveSecret: function (_secret, _password) {
            // TODO
            if (_password == 'undefined' && typeof _password !== String) {
                throw Error("Password must be set");
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
}
var safeBox = passwordAdmin();