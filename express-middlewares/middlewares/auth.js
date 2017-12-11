module.exports =  function auth(req, res, next) {
    console.log(req.query)
    if (req.query.username === 'frankie') {
        next()
    } else {
        res.end('please go away')
    }
}
