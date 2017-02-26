var express  = require('express');
var multer   = require('multer');
var ext      = require('file-extension');
var aws      = require('aws-sdk')
var multerS3 = require('multer-s3')

var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var expressSession = require('express-session')
var passport = require('passport')

var platzigram = require('platzigram-client')

var config   = require('./config')
var auth = require('./auth')

var client = platzigram.createClient(config.client);
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})

// Uncomment this if you have an AWS account
// var s3 = new aws.S3({
//   accessKeyId: config.accessKeyId,
//   secretAccessKey: config.secretAccessKey
// })

// var storage = multerS3({
//   s3: s3,
//   bucket: 'platzigram-curso',
//   acl: 'public-read',
//   metadata: function (req, file, cb) {
//     cb(null, {fieldName: file.fieldname})
//   },

//   key: function (req, file, cb) {
//     cb(null, +Date.now() + '.' + ext(file.originalname))
//   }
// })
 
var upload = multer({ storage: storage }).single('picture');

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(expressSession({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'pug');
app.use(express.static('public'));

passport.use(auth.localStrategy);
passport.deserializeUser(auth.deserializeUser);
passport.serializeUser(auth.serializeUser);

app.get('/', function (req, res) {
  res.render('index', { title: 'Platzigram' });
})

app.get('/signup', function (req, res) {
  res.render('index', { title: 'Platzigram - Signup' });
})

app.post('/signup', logSomething, function (req, res) {
  var user = req.body; //gracias a body-parser nos llega procesado
  client.saveUser(user, function (err, usr) {
    if (err) return res.status(500).send(err.message);

    res.redirect('/signin');
  })
})

app.get('/signin', function (req, res) {
  res.render('index', { title: 'Platzigram - Signin' });
})

app.post('/login', logSomething, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin'
}))

function logSomething (req, res, next) {
  console.log(req.body)
  next()
}

function ensureAuth (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.status(401).send({ error: 'not authenticated' })
}

app.get('/api/pictures', function (req, res, next) {
  var pictures = [
    {
      user: {
        username: 'Kurocode',
        avatar: 'https://pbs.twimg.com/profile_images/825478064515772417/-DlGz1qJ_400x400.jpg'
      },
      url: 'office.jpg',
      likes: 0,
      liked: false,
      createdAt: new Date().getTime()
    },
    {
      user: {
        username: 'Kurocode',
        avatar: 'https://pbs.twimg.com/profile_images/825478064515772417/-DlGz1qJ_400x400.jpg'
      },
      url: 'office.jpg',
      likes: 1,
      liked: true,
      createdAt: new Date().setDate(new Date().getDate() - 10)
    }
  ];

  res.send(pictures);  
});

app.post('/api/pictures', ensureAuth, function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.send(500, "Error uploading file");
    }
    res.send('File uploaded');
  })
})

app.get('/api/user/:username', function (req, res) {
  const user = {
    username: 'Kurocode',
    avatar: 'https://pbs.twimg.com/profile_images/825478064515772417/-DlGz1qJ_400x400.jpg',
    pictures : [
      {
        id: 1,
        src: 'https://pilefectionmedia.files.wordpress.com/2016/03/nanjolno_img_3-29.jpg?w=474',
        likes: 150
      },

      {
        id: 2,
        src: 'http://scontent.cdninstagram.com/t51.2885-15/s480x480/e35/13249862_127960024281114_511240438_n.jpg?ig_cache_key=MTI1MTM3NDc5NTA3MDMxNjgzNw%3D%3D.2',
        likes: 592
      },

      {
        id: 3,
        src: 'https://img.bestofinsta.org/t51.2885-15/e35/12965244_887884244670802_665788106_n.jpg?ig_cache_key=MTIyMjU4NjM4MDc2MTg5OTU2OQ%3D%3D.2',
        likes: 240
      },

      {
        id: 4,
        src: 'http://pds26.egloos.com/pds/201401/17/96/f0447596_52d8f76b2b486.jpg',
        likes: 346
      },

      {
        id: 5,
        src: 'https://ncache.ilbe.com/files/attach/new/20140930/14357299/4010811710/4394977427/379cd45c8113e307e467f7623f2a2c2b.jpg',
        likes: 164
      },

      {
        id: 6,
        src: 'http://cfile26.uf.tistory.com/image/23575F3C564041D017266C',
        likes: 124
      }
    ]
  }

  res.send(user)
})

app.get('/:username', function (req, res) {
  res.render('index', { title: `Platzigram - {req.params.username}` })
})

app.get('/:username/:id', function (req, res) {
  res.render('index', { title: `Platzigram - {req.params.username}` })
})

app.listen(3000, function (err) {
  if (err) return console.log('Hubo un error'), process.exit(1);

  console.log('Platzigram escuchando en el puerto 3000');
})