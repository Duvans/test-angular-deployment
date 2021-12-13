function requireHTTPS(req, res, next)
{
    if(!req.secure && req.get('x-forwarded-proto') !== 'https')
    {
        return res.redirect('https://' + req.get('host') + req.url)
    }
    next()
}

const express = require('express')
const app = express()

//penerapan middleware
app.use(requireHTTPS)
app.use(express.static('./dist/test-angular-deployment'))

//proses handle request->method get
app.get('/*', (req, res) => req.sendFile('index.html', {root: 'dist/test-angular-deployment'}))

const port = process.env.PORT || 8000
app.listen(port, () => 
{
    console.log(`Example app listening att http://localhost:${port}`)
})