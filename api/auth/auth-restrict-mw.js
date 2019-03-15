const jwt = require("jsonwebtoken");

module.exports = {
  protect,
  restrict
};

function protect(req, res, next) {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET || "testing secret";
  // console.log("secret: ", secret);

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        // todo: a way to report this?
        res.status(401).json({ message: "Bad token." });
      } else {
        res.decodedJWT = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "You must log in to view this content." });
  }
}

function restrict(req, res, next) {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET || "testing secret";

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        // todo: a way to report this?
        res.status(401).json({ message: "Bad token." });
      } else {
        res.decodedJWT = decodedToken;
        if (decodedToken.role === 0) {
          next();
        } else {
          res.status(401).json({ message: "You must be admin to view this." });
        }
      }
    });
  } else {
    res.status(401).json({ message: "You must log in to view this content." });
  }
}
