const express = require('express')
const app = express()

const path = require('path')

const part = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'build')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})


app.listen(part, (err) =>{
    if (err) return console.log(err)
    console.log(`Server is running on port ${part}`)
})