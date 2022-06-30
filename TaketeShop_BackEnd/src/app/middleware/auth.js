const jwt = require("jsonwebtoken");
const SQLpool = require("../../database/connectSQL");
const verifyToken = (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer") ||
    !req.headers.authorization.split(" ")[1]
  ) {
    return res.status(422).json({
      error: true,
      msg: "Please provide the token",
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const command = "SELECT * FROM User where id = " + decoded.id;
    SQLpool.execute(command, (err, result, field) => {
      if (err) throw err;

      if (!result.length)
        return res.send({
          error: true,
          msg: "Invalid Token",
        });

      next();
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
};

const verifyTokenWithSHOPRoles = (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer") ||
    !req.headers.authorization.split(" ")[1]
  ) {
    return res.status(422).json({
      error: true,
      msg: "Please provide the token",
    });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const command = "SELECT type FROM User where id = " + decoded.id;
    SQLpool.execute(command, (err, result, field) => {
      if (err) throw err;
      if (!result.length)
        return res.send({
          error: true,
          msg: "Invalid User",
        });
      if (result[0].type !== "SHOP") {
        res.status(401);
        return res.send("Not allowed, require a SHOP");
      }
      if (result[0].type === "BANNED") {
        res.status(401);
        return res.send("Not allowed, Account has been banned");
      }
      next();
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
};

const verifyTokenWithSTAFFRoles = (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer") ||
    !req.headers.authorization.split(" ")[1]
  ) {
    return res.status(422).json({
      msg: "Please provide the token",
    });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const command = "SELECT type FROM User where id = " + decoded.id;
    SQLpool.execute(command, (err, result, field) => {
      if (err) throw err;

      if (!result.length)
        return res.send({
          message: "Invalid User",
        });

      if (result[0].type === "CUSTOMER") {
        res.status(401);
        return res.send("Not allowed, require a STAFF or SHOP");
      }
      if (result[0].type === "BANNED") {
        res.status(401);
        return res.send("Not allowed, Account has been banned");
      }
      next();
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
};

module.exports = {
  verifyToken,
  verifyTokenWithSHOPRoles,
  verifyTokenWithSTAFFRoles,
};

