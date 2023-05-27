const BlogPost = require('../models/BlogPost.js')
module.exports = async (req, res) => {
    //.. not a . in the path
    console.log(req.session);
    const blogPosts = await BlogPost.find({}).populate('userid') 
        res.render('index', {
            blogPosts
        })
    }
