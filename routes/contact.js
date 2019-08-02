var express = require('express');
var router = express.Router();

/* POST home page. */
router.post('/contact_us', function(req, res, next) {
	console.log('..... ', req.body.name)
	const name = req.body.name
  // res.render('index', {page:'Home', menuId:'home'});
  res.send('Thank you, we will get in touch asap');
});

module.exports = router;
