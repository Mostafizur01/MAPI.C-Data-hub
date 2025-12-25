const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    const token = req.cookies.adminToken; // Check for token in cookies

    if (!token) {
        res.locals.isAdmin = false;
        return next();
    }

    try {
        const decoded = jwt.verify(token, "MPI_SECRET_KEY");
        res.locals.isAdmin = true;
        req.user = decoded;
    } catch (err) {
        res.locals.isAdmin = false;
    }
    next();
};

module.exports = isAdmin;