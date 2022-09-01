function sendDataEmptyMessage(req, res){
    res.status(200).send({message: "Requested data is empty"})
}

module.exports = {sendDataEmptyMessage}