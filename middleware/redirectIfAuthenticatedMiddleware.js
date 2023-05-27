module.exports = (req, res, next) => {
    if (req.session.userId) {
        //If user logged in -> redirect to home
        return res.redirect('/')
    }
    next()
}