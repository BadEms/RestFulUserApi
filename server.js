const express     =require("express");
var app           =express();

const bodyParser  =require("body-parser");
const mongoose    =require("mongoose");
const database    =require("./config/database");
const User        =require("./config/model");
const port        =1907;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(database.db,{useNewUrlParser:true},function(err){
    if(err){
        console.log("Database Error");
    }
    else{
        console.log("Database Run");
    }
});

app.get("/",function(req,res){
    res.json({success:true,msg:"Welcome Api"});
});
app.post("/api",function(req,res){
    var userModel=new User({
        name:req.body.name,
        password:req.body.password
    });
    userModel.save(function(err){
        if(err){
            res.json({succses:false,msg:"User Kaydedilmedi."});
        }
        else{
            res.json({succes:true,msg:"User Kaydedildi"});
        }
    });
});
app.delete("/delete",function(req,res){
    User.findOneAndRemove(req.body.name,function(err,user){
        if(err){
            res.json({succes:false,msg:"Silinmedi"});
        }
        res.json({succes:true,msg:"Silindi."});
    });
});
app.put("/update",function(req,res){
    var name=req.body.name;
    var newname=req.body.newname;
    User.findOneAndUpdate(name,{name:newname},function(err){
        if(err){
            res.json({succes:false,msg:"Güncellenmedi."});
        }
        res.json({succes:true,msg:"Güncellendi."});
    });
});

app.get("/find",function(req,res){
    User.find({},function(err,users){
        if(err){
            res.json({succes:false,msg:"Databasde Kayıt Yok"});
        }
        res.json({succes:true,msg:"Kayıtlar Bulundu",users});
    });
});

app.get("/find/:id",function(req,res){
    User.findById(req.params.id).then(doc=>{
        if(!doc){
            res.json({succes:false,msg:"Bulunamadı."});
        }
        res.json({succes:true,msg:"Bulundu",doc});
    });
});


app.listen(port,function(err){
    if(err){
        console.log("Sunucu Hatası");
    }
    else{
        console.log("Sunucu Çalıştı");
    }
});