var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);



//validacion de los usuarios 
module.exports.createUserDBService = (userDetails) => {

   return new Promise(function myFn(resolve, reject) {
      var userModelData = new userModel();

      userModelData.firstname = userDetails.firstname;
      userModelData.lastname = userDetails.lastname;
      userModelData.email = userDetails.email;
      userModelData.password = userDetails.password;
      var encrypted = encryptor.encrypt(userDetails.password);
      userModelData.password = encrypted;

      userModelData.save(function resultHandle(error, result) {

          if (error) {
              resolve(false);
          } else {
              resolve(true);
          }
      });
  });
}

module.exports.loginuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            resolve({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               var decrypted = encryptor.decrypt(result.password);

               if(decrypted== userDetails.password) {
                  resolve({status: true,msg: "Usuario Validado"});
               }
               else {
                  resolve({status: false,msg: "Falla en validacion de usuario"});
               }
            }
            else {
               resolve({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });   
}
   module.exports.searchUserDBService = (userDetails) => {

      return new Promise(function myFn(resolve, reject) {
      
      userModel.findOne({firstname: userDetails.firstname}, function getresult(errorvalue, result) {
      
      if (errorvalue) {
      
      resolve({status: false, msg: "Datos Invalidos"}); }
      
      else {
      
      if(result !=undefined && result !=null) {
      
      resolve({status: true});
      
      }
      
      else {
      
      resolve({status: false});
      
      }
      
      }
      
      });
      
      })
      
      }
      
      module.exports.deleteUserDBService = (userDetails) => { return new Promise((resolve, reject) => {
      
      userModel.findOneAndDelete({email: userDetails.email}, (errorvalue, result) => {
      
      if(errorvalue){
      
      resolve({status: false, msg: "Datos invalidos"}); } else {
      
      if(result != undefined && result != null) {
      
      resolve({status: true, msg: "Usuario eliminado"}); } else {
      
      resolve ({status: false, msg: "Usuario no encontrado"})
      
      } }
      
      }) })
      
      }