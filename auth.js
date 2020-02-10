const jwtSecret = 'your_jwt_secret'; // This has to be the same key used in the JWTStrategy
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport'); // Your local passport file.

function generateJWTToken(user) {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // This is the username you're encoding in the JWT
    expiresIn: '7d', // This specifies that the token will expire in 7 days
    algorithm: 'HS256', // This is the algorithm used to "sing" or encode the values of the JWT
  });
}

// POST login.
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false },
      // eslint-disable-next-line no-unused-vars
      (error, user) => {
        if (error || !user) {
          return res.status(400).json({
            message: 'Something is not right',
            user,
          });
        }
        req.login(user, { session: false }, (err) => {
          if (err) {
            res.send(err);
          }
          // if username and password in request body exist in db, generateJWTToken creates a JWT based on username and password.
          const token = generateJWTToken(user.toJSON());
          return res.json({ user, token });
        });
      })(req, res);
  });
};
