const bcrypt = require('bcryptjs')

const chats = []

module.exports = {
  createMessage: (req, res) => {
    // console.log(req.body)
    const { pin, message } = req.body

    for (let i = 0; i < chats.length; i++) {
      console.log(chats[i])
      const existing = bcrypt.compareSync(pin, chats[i].pin)
      if (existing) {
        chats[i].messages.push(message)
        let messages = {...chats[i]}
        delete messages.pin
        res.status(200).send(messages)
      }
    }

    let salt = bcrypt.genSaltSync(5)
    // console.log(salt)
    const pinHash = bcrypt.hashSync(pin, salt)
    // console.log(pinHash)

    let msgObj = {
        pin: pinHash,
        messages: [message]
    }

    chats.push(msgObj)
    let messages = {...msgObj}
    delete messages.pin
    res.status(200).send(messages)
  }

}

