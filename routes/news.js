const express = require('express'); // Fixed typo
const router = express.Router();

router.get('/', (req, res) => {
    // We pass an empty array [] so that the EJS 'if' check doesn't crash
    res.render('news', { news: [] }); 
});

module.exports = router;