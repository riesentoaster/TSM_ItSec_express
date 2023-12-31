const express = require('express'); // server software
const bodyParser = require('body-parser'); // parser middleware
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication
const connectEnsureLogin = require('connect-ensure-login');// authorization
var LocalStrategy = require('passport-local');

const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'itsec',
  database: 'users_db'
})
db.connect()
// admin: admin
// someuser: test


// ### With MongoBD ###
// const User = require('./user.js'); // User Model

const app = express();

// Configure Sessions Middleware
app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10 * 1000 } // 1 hour
}));

// Configure Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());


var strategy = new LocalStrategy(function verify(username, password, cb) {
  db.query('SELECT * FROM users WHERE username = ?', [ username ], function(err, user) {
    if (err) { return cb(err); }
    if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    // Apply crypto stuff with other packages
    // crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
    //   if (err) { return cb(err); }
    //   if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
    //     return cb(null, false, { message: 'Incorrect username or password.' });
    //   }
    // if()
    //   return cb(null, user);
    // });

    if(password === 'admin') { return cb(null, user); }
    return cb(null, false, { message: 'Incorrect username or password.' });
  });
});
passport.use(strategy);

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        // id: user.id,
        username: user.username,
        // picture: user.picture
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });


// ### With MongoBD ###
// // Passport Local Strategy
// passport.use(User.createStrategy());

// // To use with sessions
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// Route to Homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

// Route to Login Page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/static/login.html');
});

// Route to Dashboard
app.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
  and your session expires in ${req.session.cookie.maxAge} 
  milliseconds.<br><br>
  <a href="/logout">Log Out</a><br><br><a href="/secret">Members Only</a>`);
});

// Route to Secret Page
app.get('/secret', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.sendFile(__dirname + '/static/secret-page.html');
});

// Route to Log out
app.get('/logout', function(req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
      });
});

// Post Route: /login
app.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
	console.log(req.user)
	res.redirect('/dashboard');
});

// assign port
const port = 3000;
app.listen(port, () => console.log(`This app is listening on port ${port}`));
