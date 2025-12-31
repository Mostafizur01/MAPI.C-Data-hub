const express = require('express');
const router = express.Router();

router.get('/photos', (req, res) => {
  const secretAdminKey = process.env.JWT_SECRET
  const adminToken = req.cookies.admin_token;
  const isAdmin = (adminToken === secretAdminKey);

  const photos = [
    { url: '/img/campus.jpg', title: 'Main Campus', desc: 'Magura Polytechnic Institute' },
    { url: '/img/lab.jpg', title: 'Computer Lab', desc: 'Advanced Engineering Lab' }
  ];

  res.render('photos', {
    isAdmin: isAdmin,
    photos: photos
  });
});

module.exports = router;