export function validateRegisterField(user){
    const validationObj = {}
    const {email, password, name, lastName, passwordRepeat} = user;

    if(email.match("[A-Za-z0-9\\.\\+_-]+@[A-Za-z0-9\\._-]+\\.[A-Za-z]{2,24}")) {
            validationObj.email = true
    } else{
        validationObj.email = false
    }

    if(password.match("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,20}")){
        validationObj.password = true
    } else{
        validationObj.password = false
    }

    if(name.match("[a-zA-Z\\s']{4,20}")){
        validationObj.name = true
    } else{
        validationObj.name = false
    }

    if(lastName.match("[a-zA-Z\\s']{4,20}")){
        validationObj.lastName = true
    } else{
        validationObj.lastName = false
    }

    if(passwordRepeat === password){
        validationObj.passwordRepeat = true
    } else{
        validationObj.passwordRepeat = false
    }


    validationObj.emailValid = true

    return validationObj
}