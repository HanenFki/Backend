const auth = async (req, res, next) => {
    const session = req.session;
    if (!session || !session.user || !session.user.email) {
        return res.status(401).send({ success: false, message: 'User not authenticated' });
    }
    req.user = session.user;
    next();
};

module.exports = auth;
