const router = require('express').Router();
const { User } = require('../../models');
const { validateEmail } = require('../../utils/routeHelpers');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    console.log(userData.dataValues.id, "-----------------");

    req.session.user_id = userData.dataValues.id;
    req.session.username = userData.dataValues.username;
    req.session.email = userData.dataValues.email;
    req.session.logged_in = true;

    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log('\n --------login-------- \n')

    const isEmail = validateEmail(req.body.email_or_username);
    console.log(isEmail);
    const queryOptionsObj = {
      where: {}
    };

    if (isEmail) {
      queryOptionsObj.where.email = req.body.email_or_username;
    } else {
      queryOptionsObj.where.username = req.body.email_or_username;
    }

    console.log(queryOptionsObj);

    console.log('\n -------before-------\n')

    const userData = await User.findOne(queryOptionsObj);

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email, please try again.' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password, please try again.' });
      return;
    }

    req.session.user_id = userData.id;
    req.session.username = userData.username;
    req.session.email = userData.email;
    req.session.logged_in = true;

    res.json({ user: userData, message: 'You are now logged in!' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    console.log(err);
    res.status(404).end();
  }
});

module.exports = router;
