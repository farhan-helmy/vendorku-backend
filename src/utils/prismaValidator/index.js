function returnErrorMessage(code) {
    switch (code){
        case 'P2002':
            return {message:'There is a unique constraint violation, a new user cannot be created with this email'}
        case 'P2021':
            return {message:'Table doesnt exist, please restart server or db'}
        default:
            return {message: 'ok'}
    }

}

module.exports = {
    returnErrorMessage
}