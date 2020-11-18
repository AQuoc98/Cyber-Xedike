const validator = require("validator");

module.exports.validateRegister = (req, res, next) =>{
    let errors = {};
    const {email, password, password2, fullName, userType, phone, DOB} = req.body;

    // check email
    if(validator.isEmpty(email)){
        errors.email = "Vui lòng nhập địa chỉ email";
    }
    else if(!validator.isEmail(email)){
        errors.email = "Địa chỉ email không đúng";
    }

    // check password
    if(validator.isEmpty(password)){
        errors.password = "Vui lòng nhập mật khẩu";        
    }
    else if(!validator.isLength(password, {min: 6, max: 30})){
        errors.password = "Mật khẩu phải từ 6 - 30 ký tự";
    }
    
    if(validator.isEmpty(password2)){
        errors.password2 = "Vui lòng nhập mật khẩu xác thực";        
    }
    else if(!validator.equals(password, password2)){
        errors.password2 = "Mật khẩu không giống";
    }

    // check date of birth
    if(validator.isEmpty(DOB)){
        errors.DOB = "Vui lòng nhập ngày sinh";        
    }
    

    // check fullName
    if(validator.isEmpty(fullName)){
        errors.fullName = "Vui lòng nhập họ tên";        
    }
    else if(!validator.isLength(fullName, {min: 5, max: 30})){
        errors.fullName = "Họ tên phải từ 5 - 30 ký tự";
    }
    

    // check userType
    if( !validator.equals(userType, "driver") &&
        !validator.equals(userType, "passenger")
     ){
         errors.userType = "Vui lòng chọn vai trò";
     }

    // check phone
    if(validator.isEmpty(phone)){
        errors.phone = "Vui lòng nhập số điện thoại";
    }
    else if(!validator.isLength(phone, {min: 10, max: 11})){
        errors.phone = "Số điện thoại phải từ 10 - 11 ký tự";
    }

    



    // send errors if not valite
    if(Object.keys(errors).length){
        return res.status(400).json(errors);
    }
    next();
}


module.exports.validateLogin = (req, res, next) => {
    let errors = {};
    const {email, password} = req.body;
    // check email
    if(validator.isEmpty(email)){
        errors.email = "Email required";
    }
    else if(!validator.isEmail(email)){
        errors.email = "Wrong email";
    }

    // check password
    if(validator.isEmpty(password)){
        errors.password = "Pasword required";        
    }
    else if(!validator.isLength(password, {min: 6, max: 30})){
        errors.password = "Password must be 6 - 30 characters";
    }

    
    // send errors if not valite
    if(Object.keys(errors).length){
        return res.status(400).json(errors);
    }
    next();
}
