const Users = require('../modules/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createRes = require('../../utils/response_utils');
const sendMail = require('../../utils/sendMail')

const AuthController = {
    register: async (req, res, next) => {
        try {
            const { fullname, email, password, username } = req.body;
            let newUsername = username.toLowerCase().replace(/ /g, '');
            const user_name = await Users.findOne({ username: newUsername });
            const regex = /^[a-z0-9]+$/
            if (!regex.test(newUsername)) {
                return next(createRes.error('Tên tài khoản chỉ chứa các kí tự chữ và số.'));
            }
            if (user_name)
                return next(createRes.error('Rất tiếc, tên tài khoản này đã tồn tại. Vui lòng sử dụng tên tài khoản khác.'));
            if (username.length < 6)
                return next(createRes.error(
                    'Tên tài khoản nhiều hơn 6 ký tự.',
                ));
            if (username.length > 15)
                return next(createRes.error(
                    'Tên tài khoản ít hơn 15 ký tự.',
                ));
            if (username.length > 30)
                return next(createRes.error(
                    'Tên tài khoản không quá 30 ký tự.'
                ));

            if (fullname.length < 6)
                return next(createRes.error(
                    'Họ tên nhiều hơn 6 ký tự.',
                ));

            if (fullname.length > 30)
                return next(createRes.error(
                    'Họ tên không quá 30 ký tự.',
                ));


            const user_email = await Users.findOne({ email });
            if (user_email)
                return next(createRes.error(
                    'Rất tiếc, email này đã tồn tại. Vui lòng sử dụng email khác.',
                ));

            if (password.length < 6)
                return next(createRes.error(
                    'Mật khẩu nhiều hơn 6 ký tự.',
                ));

            const hashPassword = await bcrypt.hash(password, 12);

            const newUser = new Users({
                fullname,
                email,
                password: hashPassword,
                username: newUsername,
            });

            const token = createAccessToken({ email }, '10m');

            const mailInfo = {
                from: process.env.ADMIN_EMAIL, // sender address
                to: `${email}`, // list of receivers
                subject: "QMNets xin chào! Vui lòng xác minh tài khoản của bạn.", // Subject line
                text: `Xin chào ${email}!`,
                // HTML body
                html: `
                <p>Chào bạn nha!....</p>
                <p>Chào mừng bạn đến với QMNets</p>
                <p>Bạn vui lòng nhấn vào nut màu đỏ ở dưới đây để xác minh tài khoản của mình trước khi tham gia vào với chúng tôi nhé.</p>
                <a style="padding:10px 20px;background-color:#ea1e30;text-decoration:none;color:#fffffe;border-radius:5px;display:inline-block;max-width:70%;font-size:16px;margin:10px 0" href="${process.env.CLIENT_SERVER}/verify/${token}">Xác nhận tài khoản</a>
                <p>Cảm ơn và hẹn gặp lại bạn sau.</p>
                <p style="color:#ea1e30">Chú ý: Email này chỉ có hiệu lực trong 10 phút kể từ khi email được gửi đến.</p>`
            }

            sendMail(mailInfo);

            await newUser.save();

            return res.status(201).json(createRes.success('Tạo tài khoản thành công, vui lòng kiểm tra email kích hoạt tài khoản.', {

            }));
        } catch (err) {
            return next(err);
        }
    },

    generatePassword: async (req, res, next) => {
        try {
            const token = req.params.id;
            if (!token)
                return next(createRes.error('Tạo lại mật khẩu không thành công.'))
            const hashToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (hashToken) {
                const pass = Math.round(Math.random() * (9999999 - 1000000) + 1000000);
                const hashPassword = await bcrypt.hash(pass.toString(), 12);
                const user = await Users.findOneAndUpdate({
                    email: hashToken.email
                }, {
                    password: hashPassword
                }, { new: true })
                if (user) {
                    return res.status(200).json(createRes.success('Đổi mật khẩu thành công. Mật khẩu mới của bạn là: ', { password: pass }
                    ));
                } else {
                    return next(createRes.error('Tài khoản này không tồn tại.'))
                }

            }
        } catch (error) {
            next({ message: 'Có thể mã xác nhận của bạn đã hết hạn. Vui lòng thử lại.' })
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const email = req.body.email;
            if (!email)
                return next(createRes.error('Vui lòng nhập email.'))
            const user = await Users.findOne({ email: email });
            if (!user)
                return next(createRes.error('Tài khoản này không tồn tại.'))
            const token = createAccessToken({ email }, '10m');
            const mailInfo = {
                from: process.env.ADMIN_EMAIL, // sender address
                to: `${email}`, // list of receivers
                subject: "QMNets giúp bạn lấy lại mật khẩu.", // Subject line
                text: `Xin chào ${email}!`,
                // HTML body
                html: `
                    <p>Chúng tôi có nhận được yêu cầu nhận lại mật khẩu tài khoản của bạn, bạn vui lòng nhấn nút màu đỏ dưới đây để chúng tôi đổi mật khẩu mới cho bạn</p>
                    <a style="padding:10px 20px;background-color:#ea1e30;text-decoration:none;color:#fffffe;border-radius:5px;display:inline-block;max-width:70%;font-size:16px;margin:10px 0" href="${process.env.CLIENT_SERVER}/forgotPassword/${token}">Nhận mật khẩu mới</a>
                    <p>Cảm ơn và hẹn gặp lại bạn sau.</p>
                    <p style="color:#ea1e30">Chú ý: Email này chỉ có hiệu lực trong 10 phút kể từ khi email được gửi đến.</p>`
            }
            sendMail(mailInfo);
            return res.status(201).json(createRes.success('Vui lòng kiểm tra email của bạn.', {

            }));
        } catch (error) {
            next({ message: 'Có thể mã xác nhận của bạn đã hết hạn. Vui lòng thử lại.' })
        }
    },

    verifyEmail: async (req, res, next) => {
        try {
            const hashToken = jwt.verify(req.params.id, process.env.ACCESS_TOKEN_SECRET);
            if (hashToken) {
                const user = await Users.findOneAndUpdate({
                    email: hashToken.email
                }, {
                    status: 'A'
                }, { new: true })
                if (user) {

                    return res.status(200).json(createRes.success('Xác nhận tài khoản thành công, vui lòng đăng nhập.'
                    ));
                } else {
                    return next(createRes.error('Kích hoạt tài khoản không thành công. Liên hệ quankiugl@gmail.com để được hỗ trợ.'))
                }

            }
        } catch (error) {
            error.message = 'Kích hoạt tài khoản không thành công, Vui lòng đăng nhập lại và làm theo hướng dẫn.'
            next(error);
        }
    },

    sendNewCodeVerify: async (req, res, next) => {
        try {
            const email = req.body.email;

            if (!email) {
                return next(createRes.error('Vui lòng nhập email'));
            }
            const token = createAccessToken({ email }, '10m');

            const mailInfo = {
                from: process.env.ADMIN_EMAIL, // sender address
                to: `${email}`, // list of receivers
                subject: "QMNets xin chào! Vui lòng xác minh tài khoản của bạn.", // Subject line
                text: `Xin chào ${email}!`,
                // HTML body
                html: `
                <p>Chào bạn nha!....</p>
                <p>Chào mừng bạn đến với QMNets</p>
                <p>Bạn vui lòng nhấn vào nut màu đỏ ở dưới đây để xác minh tài khoản của mình trước khi tham gia vào với chúng tôi nhé.</p>
                <a style="padding:10px 20px;background-color:#ea1e30;text-decoration:none;color:#fffffe;border-radius:5px;display:inline-block;max-width:70%;font-size:16px;margin:10px 0" href="${process.env.CLIENT_SERVER}/verify/${token}">Xác nhận tài khoản</a>
                <p>Cảm ơn và hẹn gặp lại bạn sau.</p>
                <p style="color:#ea1e30">Chú ý: Email này chỉ có hiệu lực trong 10 phút kể từ khi email được gửi đến.</p>`
            }

            sendMail(mailInfo);

            return res.status(201).json(createRes.success('Vui lòng kiểm tra email của bạn.', {

            }));

        } catch (error) {
            next(error);
        }

    },

    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email })
            if (!user)
                return next(createRes.error(
                    'Rất tiếc, email của bạn không đúng. Vui lòng kiểm tra lại email.',
                ));

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return next(createRes.error(
                    'Rất tiếc, mật khẩu của bạn không đúng. Vui lòng kiểm tra lại mật khẩu.',

                ));

            if (user.deleted) {
                return next(createRes.error(
                    'Tài khoản của bạn đã bị xóa, vui lòng liên hệ support@qmnets.social để được hỗ trợ.',
                ));
            }

            if (user.status !== 'A') {
                if (user.status === 'B') {

                    return next(createRes.error(
                        'Tài khoản của bạn đã bị khóa, vui lòng liên hệ support@qmnets.social để được hỗ trợ.',
                    ));
                }
                return next(createRes.error(
                    'Tài khoản chưa được kích hoạt, vui lòng kích hoạt tài khoản của bạn.', 403, { email: user.email },
                ));

            }

            if (user.deleted) {
                return next(createRes.error(
                    'Tài khoản này không tồn tại.',
                ));

            }

            const accessToken = createAccessToken({ id: user._id });
            const refreshToken = refreshAccessToken({ id: user._id });

            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30 * 7 * 24 * 60 * 60 * 1000,
            });

            return res.status(201).json(createRes.success('Đăng nhập thành công.', {
                accessToken,
                user: {
                    ...user._doc,
                    password: '',
                },
            }));
        } catch (err) {
            next(err);
        }
    },

    logout: async (req, res, next) => {
        try {
            res.clearCookie('refreshtoken', { path: '/api/refresh_token' });
            return res.status(200).json(createRes.success('Đăng xuất thành công'));
        } catch (err) {
            return next(err);
        }
    },



    generateAccessToken: async (req, res, next) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) {
                return next(createRes.error('Vui lòng đăng nhập lại.', 401))
            }
            jwt.verify(
                rf_token,
                process.env.REFRESH_TOKEN_SECRET,
                async (err, result) => {
                    if (err)
                        return next(createRes.error('Vui lòng đăng nhập lại.', 401))
                    const user = await Users.findById(result.id)
                        .select('-password')


                    if (!user)
                        return next(createRes.error('Tài khoản không tồn tại.', 401))
                    if (user.status !== 'A')
                        return next(createRes.error('Tài khoản chưa được kích hoạt, vui lòng kích hoạt tài khoản của bạn.', 403, user))
                    const accessToken = createAccessToken({ id: result.id });

                    res.status(200).json(createRes.success('Thành công', { accessToken, user }));
                }
            );
        } catch (err) {
            next(err);
        }
    },
};

const createAccessToken = (payload, expiresIn) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: expiresIn || '1d',
    });
};
const refreshAccessToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '15d',
    });
};

module.exports = AuthController;
