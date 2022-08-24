const Users = require('../app/modules/user');
const jwt = require('jsonwebtoken');
const createRes = require('../utils/response_utils');

const admin = async (req, res, next) => {
    try {
        const token = req?.header('Authorization')?.split(' ')[1];

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await Users.findById(decoded.id);
        if (user?.isAdmin) {
            req.user = user;
            next();
        } else {
            return res.json(createRes.error('Chức năng chỉ dành cho tài khoản Admin'))
        }

    } catch (error) {
        return res.status(401).json({ message: 'Vui lòng đăng nhập lại.' });
    }
};

module.exports = admin;
