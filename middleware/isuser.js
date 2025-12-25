const jwt = require('jsonwebtoken');

function checkUserToken(req, res, next) {
    const token = req.headers['authorization'] || req.cookies?.token;

    // Don't redirect if already on /signup or /signin
    if (!token) {
        if (req.path === '/signup' || req.path === '/signin') {
            return next();
        }
        return res.redirect('/signup');
    }

    try {
        // Verify the token if it's a JWT
        const secret = process.env.JWT_SECRET;
        if (token.startsWith('Bearer ')) {
            const actualToken = token.substring(7);
            jwt.verify(actualToken, secret);
        } else {
            jwt.verify(token, secret);
        }
        return next();
    } catch (err) {
        // Token is invalid or expired
        if (req.path === '/signup' || req.path === '/signin') {
            return next();
        }
        return res.redirect('/signup');
    }
}

module.exports = checkUserToken;