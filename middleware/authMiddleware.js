const User = require('../models/User')

module.exports = (req, res, next) => {
    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
            console.log(error);
            console.log(user);
            console.log('Something');
            return res.redirect('/')
        }
        next()
    })
}