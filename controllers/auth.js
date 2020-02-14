const user = require('../models/user');

const login = db => async (req, res) => {
    try {
        const userFromDB = await user.login(db)(req.body.email, req.body.passwd);
        req.session.user = userFromDB;
        res.redirect('/');
    } catch (error) {
        res.send('Error' + error);
    }
}

const logout  = (req, res) => {
    req.session.destroy(() => {

    });
    res.redirect('/');
}

module.exports = {
    login,
    logout
}