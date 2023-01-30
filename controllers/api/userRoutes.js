const router = require('express').Router();
const { User } = require('../../models');
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
      req.session.logged_in = true;
      //removeing the password from the return json object as it is a security risk
      delete userData.dataValues.password
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/logout', (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'logout'
  if (req.session.logged_in) {
    // Remove the session variables\
    req.session.destroy(() => {
      res.status(204).end();
    });

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
                avatar: req.body.avatar
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
