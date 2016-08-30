var mongoose = require('mongoose'),
  express = require('express'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  md5 = require('md5'),
  email = require('emailjs'),
  user = require('./models/user'),
  router = express.Router();

//environment variables
var secret = process.env.AUTH_SECRET,
  smtpEmail = process.env.AUTH_SMTP_EMAIL,
  smtpPassword = process.env.AUTH_SMTP_PASSWORD,
  smtpHost = process.env.AUTH_SMTP_HOST;

//connect to Mongo when the app initializes
mongoose.connect('mongodb://mongo:27017/users');

var smtpServer = email.server.connect({
  user: smtpEmail,
  password: smtpPassword,
  host: smtpHost,
  ssl: true
});


/*
 * auth info
 */

router.get('/auth', (req, res) => {
  res.status(200).send({message: 'valid'});
});

/*
 * me info
 */

router.get('/me', (req, res) => {
  var token = req.get('Authorization');
  token = token.split(' ')[1];

  var info = {};

  verifyToken(token)
    .then((payload) => {
      console.log(payload);
      info.email = payload.email;
      info.username = payload.username;
      res.status(200).send(info);
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send({message: 'invalid token'});
    });
});

/*
 * users info
 */

router.get('/users', (req, res) => {
  mongoFind(user, {})
    .then((doc) => {
      //remove password
      doc = doc.map((user) => {
        return {email: user.email, username: user.username};
      });
      res.status(200).send({users: doc});
    })
    .catch((err) => {
      res.status(403).send({message: err});
    });

});

/*
 * user account creation
 */

router.post('/register', (req, res) => {
  var token,
    payload = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    };

  //valid parameters
  if (payload.email && payload.username && payload.password) {
    getHash(payload.password)
      .then((hash) => {
        payload.password = hash;
        //save to mongo
        return mongoSave(new user(payload));
      })
      .then(() => {
        res.status(200).send({message: 'added ' +payload.email});
      })
      .catch((err) => {
        res.status(409).send({message: err});
      });
  } else {
    res.status(400).send({message: 'error: need email, name and password ' +JSON.stringify(payload)});
  }

});

/*
 * user login
 */

router.post('/login', function (req, res) {
  var token, info, doc,
    password = req.body.password,
    email = req.body.email;

  mongoFind(user, {
    email: email
  })
    .then((user) => {
      doc = user;
      return compareHash(password, doc[0].password);
    })
    .then(() => {
      var payload = {
        email: doc[0].email,
        username: doc[0].username
      };
      return getToken(payload);
    })
    .then((token) => {
      res.status(200).send({token: token, message: 'success'});
    })
    .catch((err) => {
      res.status(403).send({message: err});
    });

});

/*
 * request change password
 */

router.post('/password', function (req, res) {
  var email = req.body.email,
    doc;

  mongoFind(user, {
    email: email
  })
    .then((res) => {
      var payload = {
        email: email
      };
      doc = res;
      return getToken(payload);
    })
    .then((token) => {
      return sendEmail(email, token);
    })
    .then(() => {
      res.status(200).send('email sent to ' + email);
    })
    .catch((err) => {
      res.status(403).send(err);
    });
});

/*
 * change password
 */

router.put('/password', function (req, res) {
  var newpassword = req.body.password,
    token = req.query.token,
    payload, email;

  verifyToken(token)  // this should be valid
    .then((res) => {
      email = res.email;
      payload = res;
      return mongoFind(user, {
        email: email
      });
    })
    .then((res) => {
      console.log(res);
      return getHash(newpassword);
    })
    .then((hash) => {
      return mongoUpdate(user, {
        email: email
      }, {
        $set: {
          password: hash
        }
      });
    })
    .then((doc) => {
      res.status(200).send('updated password for ' + payload.email);
    })
    .catch((err) => {
      res.status(403).send(err);
    });

});

/*
 * utils
 */

var getHash = (value) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(value, 10, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

var compareHash = (plain, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plain, hash, (err, res) => {
      if (err || !res) {
        reject('hash compare error ' + plain);
      } else {
        resolve();
      }
    });
  });
};

var getToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, {}, (err, token) => {
      if (err) {
        reject('token error');
      } else {
        resolve(token);
      }
    });
  });
};

var verifyToken = (payload) => {
  console.log(payload);
  return new Promise((resolve, reject) => {
    jwt.verify(payload, secret, (err, token) => {
      if (err) {
        reject('token error ' + err);
      } else {
        resolve(token);
      }
    });
  });
};

var decodeToken = (payload) => {
  console.log(payload);

  return jwt.decode(payload);
};

var mongoFind = (model, obj) => {
  return new Promise((resolve, reject) => {
    model.find(obj, (err, doc) => {
      if (err || !doc.length) {
        reject('mongo could not find ' + JSON.stringify(obj));
      } else {
        resolve(doc);
      }
    });
  });
};

var mongoSave = (model) => {
  return new Promise((resolve, reject) => {
    model.save((err) => {
      if (err) {
        reject('mongo save ' + err.errmsg);
      } else {
        resolve();
      }
    });
  });
};

var mongoUpdate = (model, id, set) => {
  return new Promise((resolve, reject) => {
    model.update(id, set, (err, model) => {
      if (err) {
        reject('mongo update ' + err.errmsg);
      } else {
        resolve(model);
      }
    });
  });
};

var sendEmail = (email, token) => {
  var emailMessage = 'Hello!\nYou can now access your account here: ' +
    'http://localhost:3000/password?token=' + token +
    '&uuid=' + encodeURIComponent(email);

  return new Promise((resolve, reject) => {
    smtpServer.send({
      text: emailMessage,
      from: smtpEmail,
      to: email,
      subject: 'Password reset for ' + email
    }, (err, message) => {
      if (err) {
        reject('email send error ' + JSON.stringify(err));
      } else {
        resolve();
      }
    });
  });
};

module.exports = router;
