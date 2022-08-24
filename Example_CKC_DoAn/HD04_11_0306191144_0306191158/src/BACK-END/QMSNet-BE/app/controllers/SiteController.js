const User = require('../modules/user');

const SiteController = {
    getAllUser: async (req, res) => {
        const lstUser = await User.find({});
        return res.status(500).json({
            lstUser,
        });
    },

    deleteUser: async (req, res) => {
        try {
            const deleted = await User.deleteOne({
                username: req.body.username,
            }, req.user._id);
            return res.status(200).json({ message: 'Deleted' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
};

module.exports = SiteController;
