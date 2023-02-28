const express = require('express');
const cloudinary = require('../utils/cloudinary');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/user');
const { isAdmin, isUser } = require('../middleware/auth');

//GET USERS
router.get('/', async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//DELETE USER
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    console.log(req.params.id);
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send('Deleted User Success');
  } catch (error) {
    res.status(500).send(error);
  }
});
// Get User Detail -- for user
router.get('/:id', isUser, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Get User Detail -- for admin
router.get('/:id', isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
//UPDATE PROFILE USER
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!(user.email === req.body.email)) {
      const emailUser = await User.findOne({ email: req.body.email });
      if (emailUser) {
        return res.status(400).send('That email is already taken');
      }
    }
    if(req.body.password && user){
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password,salt)

      user.password = hashedPassword
    }
   
    const uploadRes = await cloudinary.uploader.upload(req.body.avatar, {
      upload_preset: 'onlineShop',
    });
   
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
        password: user.password,
        avatar:  uploadRes,
      },
      { new: true }
    );
    
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});
//UPDATE PROFILE USER --for ADMIN
router.put('/admin/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!(user.email === req.body.email)) {
      const emailUser = await User.findOne({ email: req.body.email });
      if (emailUser) {
        return res.status(400).send('That email is already taken');
      }
    }
    if(req.body.password && user){
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password,salt)

      user.password = hashedPassword
    }
   
   

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
        password: user.password,
       
      },
      { new: true }
    );
    
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});



module.exports = router;
