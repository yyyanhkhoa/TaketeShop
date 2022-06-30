const bcrypt = require("bcrypt");
const { Users } = require("../models");
const { authService } = require("../services");
const { authValidation } = require("../validations");
const jwt = require("jsonwebtoken");
const SQLpool = require("../../database/connectSQL");
const { setConvertSQL } = require("../../ulti/ulti");

class UserController {
  index(req, res, next) {
    res.send("User controller....");
  }

  async register(req, res) {
    let command = "";
    const { username, password, name, birthday, gender, email, phone, type } =
      req.body;
    try {
      SQLpool.getConnection((err, connection) => {
        if (err) throw err;
        //check duplicated username and email
        command = `SELECT * FROM User WHERE email = '${email}' OR username = '${username}'`;

        connection.query(command, (error, result) => {
          if (error) throw error;
          if (result.length) {
            if (result[0].username === username) {
              return res.status(409).send({
                error: true,
                msg: "This username is already in use!",
              });
            }

            if (result[0].email === email) {
              return res.status(409).send({
                error: true,
                msg: "This email is already in use!",
              });
            }
          }
        });
        // hash password
        bcrypt.hash(password, 10, (error, passwordHashed) => {
          if (error) throw error;
          // has hashed pw => add to database
          command =
            "INSERT INTO `User` (`id`, `username`, `password`, `name`, `birthday`, `gender`, `email`, `phone`, `type`, `create_time`, `update_time`) VALUES (NULL, '" +
            username +
            "', '" +
            passwordHashed +
            "', '" +
            name +
            "', '" +
            birthday +
            "', '" +
            gender +
            "', '" +
            email +
            "', '" +
            phone +
            "', '" +
            type +
            "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
          connection.query(command, (error, result) => {
            if (error) throw error;

            console.log(username + " has been registered with us!");

            return res.status(201).send({
              msg: "The user has been registered with us!",
            });
          });
        });
        connection.release();
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        error: true,
        msg: err,
      });
    }
  }
  async login(req, res) {
    let command = "";
    const { username, password } = req.body;
    command = `SELECT * FROM User WHERE username = ${"'" + username + "'"};`;
    try {
      SQLpool.execute(command, (err, result) => {
        if (err) throw err;
        if (!result.length) {
          return res.status(401).send({
            error: true,
            msg: "Username is incorrect",
          });
        }
        if (result[0].type === "BANNED") {
          return res.status(401).send({
            error: true,
            msg: `${result[0].username} has been banned from system`,
          });
        }
        //check Password
        bcrypt.compare(password, result[0]["password"], (bErr, bResult) => {
          // wrong password
          if (bErr) {
            return res.status(401).send({
              error: true,
              msg: "Password encode Error!",
            });
          }

          if (bResult) {
            const d = new Date();
            d.setDate(d.getDate() + 1);

            // create token
            const token = authService.createAccessToken({ id: result[0].id });
            // create refresh token
            const refreshToken = authService.createRefreshToken({
              id: result[0].id,
            });
            // save refresh token to cookie
            res.cookie("refresh_token", refreshToken, {
              httpOnly: true,
              path: "/user/refresh_token",
              maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
            });

            return res.status(200).send({
              error: false,
              msg: `${result[0].name} (${result[0].username}) logged in!`,
              userID: result[0].id,
              name: result[0].name,
              gender: result[0].gender,
              birthday: result[0].birthday,
              email: result[0].email,
              phone: result[0].phone,
              avatar: result[0].avatar,
              role: result[0].type,
              token,
              expiredDay: d,
            });
          }

          return res.status(401).send({
            error: true,
            msg: "Password is incorrect!",
          });
        });
      });
    } catch (err) {
      res.status(500).json({
        error: false,
        message: err,
      });
    }
  }

  async refreshToken(req, res) {
    // GET refresh Token from request
    const refreshToken = req.cookies.refresh_token;
    console.log(refreshToken);
    try {
      // check if refresh token exists
      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: "Please Login first.",
        });
      }

      // check if refresh token is valid
      authService.refreshToken(refreshToken, (error, user) => {
        // Invalid
        if (error) {
          return res.status(400).json({
            success: false,
            message: "Please Login first.",
          });
        }

        // Valid
        const accessToken = authService.createAccessToken({ id: user.id });
        res.status(200).json({
          success: true,
          accessToken,
        });
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getUserByUsername(username) {
    try {
      var command = "SELECT * FROM `User` WHERE username = " + `'${username}'`;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        if (result.length > 0) return result;
        return -1;
      });
    } catch (err) {
      console.log("Find User by ID error");
      console.log(err);
    }
  }

  async getUserByID(id) {
    try {
      var command = "SELECT * FROM `User` WHERE id = " + `'${id}'`;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        if (result.length > 0) return result;
        return -1;
      });
    } catch (err) {
      console.log("Find User by ID error");
      console.log(err);
    }
  }
  async getAllUser(req, res) {
    try {
      var command = "SELECT * FROM `User`";
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    } catch (err) {
      console.log(err);
    }
  }
  async getUserByIDRequest(req, res) {
    try {
      const userID = req.params.id;
      var command = "SELECT * FROM `User` WHERE id =" + userID;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        //console.log(result.length);
        res.status(200).send({
          error: false,
          userID: result[0].id,
          name: result[0].name,
          gender: result[0].gender,
          birthday: result[0].birthday,
          email: result[0].email,
          phone: result[0].phone,
          avatar: result[0].avatar,
          role: result[0].type,
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
  async getUserByIDRequestADMIN(req, res) {
    try {
      const userID = req.params.id;
      var command = "SELECT * FROM `User` WHERE id =" + userID;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        res.send(result[0]);
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: err,
      });
    }
  }
  async getAllStaff(req, res) {
    try {
      var command = "SELECT * FROM `User` WHERE type = 'STAFF'";
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        //console.log(result);
        res.send(result);
      });
    } catch (err) {
      console.log(err);
    }
  }
  async updateUserByIDRequest(req, res) {
    const userID = req.params.id;
    const {
      username,
      name,
      password,
      birthday,
      gender,
      email,
      phone,
      type,
      avatar,
    } = req.body;
    const setUsername = setConvertSQL(username, "username");
    const setName = setConvertSQL(name, "name");
    const setGender = setConvertSQL(gender, "gender");
    const setPhone = setConvertSQL(phone, "phone");
    const setBirthday = setConvertSQL(birthday, "birthday");
    const setEmail = setConvertSQL(email, "email");
    const setType = setConvertSQL(type, "type");
    const setAvatar = setConvertSQL(avatar, "avatar");
    const setPassword = setConvertSQL(
      password ? hashedPassword(password) : false,
      "password"
    );
    const hashedPassword = (pass) =>
      bcrypt.hash(pass, 10, (error, passwordHashed) => {
        if (error) throw error;
        return passwordHashed;
      });

    try {
      var command =
        "UPDATE `User` SET " +
        `${setUsername}${setPassword}${setName}${setGender}${setPhone}${setBirthday}${setEmail}${setType}${setAvatar}` +
        " update_time = CURRENT_TIMESTAMP WHERE id = " +
        userID;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send({
          error: false,
          msg: `Update Success`,
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  async updateStaffByIDRequest(req, res) {
    const userID = req.params.id;
    const {
      username,
      name,
      password,
      birthday,
      gender,
      email,
      phone,
      type,
      avatar,
    } = req.body;
    const setUsername = setConvertSQL(username, "username");
    const setName = setConvertSQL(name, "name");
    const setGender = setConvertSQL(gender, "gender");
    const setPhone = setConvertSQL(phone, "phone");
    const setBirthday = setConvertSQL(birthday, "birthday");
    const setEmail = setConvertSQL(email, "email");
    const setType = setConvertSQL(type, "type");
    const setAvatar = setConvertSQL(avatar, "avatar");
    const setPassword = setConvertSQL(
      password ? hashedPassword(password) : false,
      "password"
    );
    const hashedPassword = (pass) =>
      bcrypt.hash(pass, 10, (error, passwordHashed) => {
        if (error) throw error;
        return passwordHashed;
      });

    try {
      var command =
        "UPDATE `User` SET " +
        `${setUsername}${setPassword}${setName}${setGender}${setPhone}${setBirthday}${setEmail}${setType}${setAvatar}` +
        " update_time = CURRENT_TIMESTAMP WHERE id = " +
        userID;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send({
          error: false,
          msg: `Update Success`,
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
  async updatePassByIDRequest(req, res) {
    let command = "";
    const { oldPass, newPass } = req.body;
    const userID = req.params.id;
    console.log("oldPass");
    command = "SELECT * FROM `User` WHERE id =" + userID;
    try {
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        bcrypt.compare(oldPass, result[0]["password"], (bErr, bResult) => {
          // wrong password
          if (bErr) {
            console.log("result");
            throw bErr;
          }
          console.log("result2");
          // if oldPass = nowpass => upload newPass
          if (bResult) {
            bcrypt.hash(newPass, 10, (error, passwordHashed) => {
              var command =
                "UPDATE `User` SET `" +
                "password" +
                "` = '" +
                passwordHashed +
                "', `update_time` = CURRENT_TIMESTAMP WHERE id = " +
                userID;
              SQLpool.execute(command, (err, result, field) => {
                if (error) throw error;
                console.log(result);
              });
            });
            return res.status(200).send({
              error: false,
              msg: `Update Success`,
            });
          }
          return res.status(401).send({
            error: true,
            msg: "Mật khẩu không đúng, mời nhập lại",
          });
        });
      });
    } catch (err) {
      console.log(err);
      res.send({ error: true, msg: err });
    }
  }

  async updatePassByIDRequestSTAFF(req, res) {
    let command = "";
    const { oldPass, newPass } = req.body;
    const userID = req.params.id;

    //console.log(oldPass);
    command = "SELECT * FROM `User` WHERE id =" + userID;

    try {
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        bcrypt.compare(oldPass, result[0]["password"], (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
          }
          // if oldPass = nowpass => upload newPass
          if (bResult) {
            bcrypt.hash(newPass, 10, (error, passwordHashed) => {
              var command =
                "UPDATE `User` SET `" +
                "password" +
                "` = '" +
                passwordHashed +
                "', `update_time` = CURRENT_TIMESTAMP WHERE id = " +
                userID;
              SQLpool.execute(command, (err, result, field) => {
                if (error) throw error;
                console.log(result);
              });
            });
            return res.status(200).send({
              error: false,
              msg: `Update Success`,
            });
          }
          return res.status(401).send({
            error: true,
            msg: "Password is incorrect!",
          });
        });
      });
    } catch (err) {
      console.log(err);
      res.send({ error: true, msg: err });
    }
  }
  async updatePassByIDRequestADMIN(req, res){
    let command = "";
    const { oldPass, newPass } = req.body;
    const userID = req.params.id;

    //console.log(oldPass);
    command = "SELECT * FROM `User` WHERE id =" + userID;

    try {
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        bcrypt.compare(oldPass, result[0]["password"], (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
          }
          // if oldPass = nowpass => upload newPass
          if (bResult) {
            bcrypt.hash(newPass, 10, (error, passwordHashed) => {
              command =
                "UPDATE `User` SET `" +
                "password" +
                "` = '" +
                passwordHashed +
                "', `update_time` = CURRENT_TIMESTAMP WHERE id = " +
                userID;
              SQLpool.execute(command, (err, result, field) => {
                if (error) throw error;
                console.log(result);
              });
            });
            return res.status(200).send({
              error: false,
              msg: `Update Success`,
            });
          }
          return res.status(401).send({
            error: true,
            msg: "Password is incorrect!",
          });
        });
      });
    } catch (err) {
      console.log(err);
      res.send({ error: true, msg: err });
    }
  }
  async updatePassByIDAdmin(req, res) {
    const { newPass } = req.body;
    const userID = req.params.id;    
    try {
      bcrypt.hash(newPass, 10, (error, passwordHashed) => {
        var command =
          "UPDATE `User` SET `" +
          "password" +
          "` = '" +
          passwordHashed +
          "', `update_time` = CURRENT_TIMESTAMP WHERE id = " +
          userID;
        SQLpool.execute(command, (err, result, field) => {
          if (error) throw error;
          console.log(result);
        });
      });
      return res.status(200).send({
        error: false,
        msg: `Update Success`,
      });
    } catch (err) {
      console.log(err);
      res.send({ error: true, msg: err });
    }
  }


  async deleteUserByIDRequest(req, res) {
    const userID = req.params.id;
    try {
      var command = "DELETE FROM User WHERE id = " + userID;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    } catch (err) {
      console.log(err);
    }
  }
  async deleteStaffByIDRequest(req, res) {
    const userID = req.params.id;
    try {
      var command = "DELETE FROM User WHERE id = " + userID;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    } catch (err) {
      console.log(err);
    }
  }


}

module.exports = new UserController();
