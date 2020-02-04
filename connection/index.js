const path = require('path')
const express = require('express')
const morgan = require('morgan')

const  {router}  = require('./routes/routes')
const PORT = process.env.PORT || 3000
const app = express()

require('./db')

app.use(express.json())
app.use(morgan('dev'))

app.use('/Hi', router)

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () =>{
    console.log(`App running on https://localhost:${PORT}`)
})

