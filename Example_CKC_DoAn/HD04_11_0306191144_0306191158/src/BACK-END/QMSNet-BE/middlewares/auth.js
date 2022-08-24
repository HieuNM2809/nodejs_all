const Users = require('../app/modules/user');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await Users.findById(decoded.id);
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Vui lòng đăng nhập lại.' });
    }
};

module.exports = auth;
