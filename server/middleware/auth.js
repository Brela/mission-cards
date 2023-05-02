module.exports = {
    ensureAuth: async (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status(401).json({ message: 'Please login to use this feature' });
        }
    }
};
