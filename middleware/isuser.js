const jwt = require('jsonwebtoken');

function checkUserToken(req, res, next) {
    const token = req.cookies?.token || req.headers['authorization'];

    if (!token) {
        // টোকেন না থাকলে এবং সাইন-ইন/আপ পেজ না হলে রিডাইরেক্ট করবে
        res.locals.token = null;
        if (req.path === '/signup' || req.path === '/signin') {
            return next();
        }
        return res.redirect('/signin'); // প্রোফাইলে যাওয়ার চেষ্টা করলে সাইন-ইন এ পাঠাবে
    }

    try {
        const secret = process.env.JWT_SECRET;
        let actualToken = token;

        if (token.startsWith('Bearer ')) {
            actualToken = token.substring(7);
        }

        // টোকেন ভেরিফাই করে ডাটা বের করা
        const decoded = jwt.verify(actualToken, secret);
        
        // এটিই সবচেয়ে গুরুত্বপূর্ণ অংশ:
        req.user = decoded;        // রাউটারের জন্য
        res.locals.token = actualToken; // EJS ফাইলের জন্য (প্রোফাইল আইকন দেখাতে)
        
        return next();
    } catch (err) {
        res.locals.token = null;
        res.clearCookie('token');
        if (req.path === '/signup' || req.path === '/signin') {
            return next();
        }
        return res.redirect('/signin');
    }
}

module.exports = checkUserToken;