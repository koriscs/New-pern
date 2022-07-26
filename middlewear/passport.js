const passport = require('passport')
const { Strategy } = require('passport-jwt')
const { SECRET } = require('../const/index')
const pool = require('../database/index')
const GoogleStrategy = require('passport-google-oauth20').Strategy
require('dotenv').config();

const cookieExtractor = function (req) {
  let token = null
  if (req && req.cookies) token = req.cookies['token']
  return token
}
const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
}

passport.use(
  new Strategy(opts, async ({ id }, done) => {
    try {
      const { rows } = await pool.query(
        'SELECT id, email FROM customers WHERE id = $1',
        [id]
      )

      if (!rows.length) {
        throw new Error('401 not authorized')
      }

      let user = { id: rows[0].id, email: rows[0].email }

      return await done(null, user);
    } catch (error) {
      console.log(error.message)
      done(null, false);
    }
  })
)

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://fullstack-webshop.herokuapp.com/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
     
      const { rows } = await pool.query("SELECT * FROM customers WHERE google_id = $1;",[profile.id])
      if(rows.length) {
        return done(null, rows[0], { message: 'User found' });
      } else {
        //Check if we have an active user with this email and add google_id
        const { rows } = await pool.query("SELECT * FROM customers WHERE email = $1",[profile.emails[0].value])
        if (rows.length) {
           const newGoogleUser = await pool.query("UPDATE customers SET google_id = $1 WHERE email=$2 RETURNING *;"[profile.id, profile.emails[0].value])
            
          return done(null, newGoogleUser, { message: 'Google login added to user'})
        }
        
        const newGoogleUser = await pool.query('INSERT INTO customers (email, first_name, last_name, google_id) VALUES ($1, $2, $3, $4) RETURNING *;',
        [profile.emails[0].value,
        profile.name.givenName,
        profile.name.familyName,
        profile.id,])

            
        return done(null, newGoogleUser, { message: 'New user created' })}

     
  }))
  