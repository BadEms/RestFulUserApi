const mongoose   =require("mongoose");
const Schema     =mongoose.Schema;
const brcypt     =require("bcrypt");


const userModel=new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

userModel.pre('save',function(next){
    var user =this;
    brcypt.genSalt(10,function(err,salt){
        if(err) return next(err);   
        brcypt.hash(user.password,salt,function(err,hash){
            if(err){
                return next(err);
                console.log("Hash Hatası");
            }

                user.password=hash;
                console.log("Şifre Hashlendi.");
                next();
            
        });
    });
});

module.exports =mongoose.model('User',userModel);

