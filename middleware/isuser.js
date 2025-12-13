const jwt = require('jsonwebtoken');

function checkUserToken(req, res, next) {
    const token = req.headers['authorization'] || req.cookies?.token;

    if (!token) {
        return res.redirect('/signup');
    }

    try {
        // Verify the token if it's a JWT
        if (token.startsWith('Bearer ')) {
            const actualToken = token.substring(7);
            jwt.verify(actualToken, 'your_jwt_secret');
        } else {
            jwt.verify(token, 'your_jwt_secret');
        }
        return next();
    } catch (err) {
        // Token is invalid or expired
        return res.redirect('/signup');
    }
}

module.exports = checkUserToken;