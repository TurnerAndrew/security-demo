const express = require('express')
const cors = require('cors')
const { createMessage } = require('./controllers/messageController')

const app = express()

app.use(express.json())
app.use(cors())


app.post('/api/messages', createMessage)




app.listen(4004, () => console.log('Server is running on 4004.'))