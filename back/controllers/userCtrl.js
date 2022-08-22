const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { signUpErrors, loginErrors } = require('../utils/errors.utils');
const { isValidObjectId } = require('mongoose');
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

module.exports.signUp = async (req, res) => {

  bcrypt
  .hash(req.body.password, 10)
  .then((hash) => {
    const user = new User({
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() => res.status(201).json({ message: "Utilisateur crée !" }))
      .catch((user) => {
        //const errors = signUpErrors(err)
        res.status(200).send({user})
      } )//json({ error })); //ici erreurs de saisi ou champs vides par exemple
  })
  .catch((error) => res.status(500).json({ error })); //ici erreur serveur

  /*console.log("body", req.body)//il renvoi bien le contenu du formulaire rempli...
  const {pseudo, email, password} = req.body

  try {
    const user = await User.create({ pseudo, email, password });
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }*/
}

module.exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge});
    res.status(200).json({ user: user._id})
  } catch (err){
    const errors = loginErrors(err);
    res.status(200).json({ errors });
  }
}

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}


module.exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
};

module.exports.getUser = (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  User.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};