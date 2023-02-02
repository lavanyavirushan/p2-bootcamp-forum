const router = require('express').Router();
const { User } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');

router.post('/login', async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Sign in user'
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({
        where: {email:req.body.email}
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      //removing the password from the return json object as it is a security risk
      delete userData.dataValues.password
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/edit-name', withAuth, async (req, res) => {
  try {
    const user = await User.update(
      {username: req.body.username },
      {where: {id : req.body.id}}
    )
    res.status(200).json(user);    
  } catch (error) {
    res.status(400).json(error);  
  }
});

router.post('/edit-message', withAuth, async (req, res) => {
  try {
    const user = await User.update(
      {message: req.body.message},
      {where: {id : req.body.id}}
    )
    res.status(200).json(user);      
  } catch (error) {
    res.status(400).json(error);  
  }
});

router.post('/edit-avatar', async (req, res) => {
  try {
    console.log(req.body.image);
    const user = await User.update(
      {avatar: req.body.image},
      {where: {id : req.body.id}}
    )
    res.status(200).json(user);      
  } catch (error) {
    res.status(400).json(error);  
  }
});

router.get('/logout', (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'logout
  if(req.session.loggedIn){
    req.session.destroy(() => {
      res.status(204).redirect('/login');
    })
  } else {
    res.status(404).end();
  }
});

router.post('/register', async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Register new user'
    if (!req.session.logged_in) {
      // Creat new user
        try {
            const user = await User.create({
                username: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
                message: req.body.message
            });
            delete user.dataValues.password
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json({error: "Unable to create an account"});
        }
  
    } else {
      res.status(404).end();
    }
  });

module.exports = router;
