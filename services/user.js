const initModels = require("../models/init-models");
const models = initModels(global.sequelize);
const moment = require("moment");
const user = models.user;

module.exports = {
  add: async function (data) {
    try {
      let userExist = await user.findOne({
        where: {username: data.username}
      });
      if(userExist){
        return {
          message: "You are already registered with us",
          exist: true
        }
      }else{
      let result = await user.create(data);
      return {
        message: "user inserted successfully",
        exist : false
      };
    }
    } catch (err) {
      return {
        err: err,
      };
    }
  },
  login: async function (data) {
    try {
      let finduser;
      let userdata = await user.findOne({
        where: { username: data.username }
      });
      if (userdata) {
        let password = userdata.password;
        if (password === data.password) {
          finduser = userdata;
          return {
            verified: true,
            finduser:JSON.stringify(userdata),
            message: "user verified successfully",
          };
        } else {
          return {
            verified: false,
            message: "incorrect password",
          };
        }
      } else {
        return {
          verified: false,
          message: "username does not exist",
        };
      }
    } catch (err) {
      return {
        err: err,
      };
    }
  },
};
