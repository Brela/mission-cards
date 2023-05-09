module.exports = {
    ensureAuth: async (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            // Return a 401 Unauthorized status if the user is not authenticated
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
};
