const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');


const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: 'String',
            required: true,
            maxLength: 30,
            minLength: 6,
        },

        username: {
            type: 'String',
            trim: true,
            required: true,
            unique: true,
            minLength: 6,
            maxLength: 15,
        },

        email: {
            type: 'String',
            trim: true,
            required: true,
            unique: true,
        },


        password: {
            type: 'String',
            required: true,
            minLength: 6,
            maxlength: 30
        },

        avatar: {
            public_id: {
                type: String,
                default: 'qmedia/fnhasw8hrnzcmszpisgu'
            },
            url: {
                type: String,
                default: 'https://res.cloudinary.com/quankiu/image/upload/v1655386021/qmedia/fnhasw8hrnzcmszpisgu.png'
            },

        },
        gender: {
            type: 'Number',
            default: 1,
        },
        dob: {
            type: 'String'
        },
        works: [{
            name: String,
            position: String,
            working: Boolean
        }],
        schools: [{
            name: String,
            learning: Boolean
        }],
        maritalStatus: {
            type: 'Number',
            enum: [1, 2],
            default: 1,
        },
        address: {
            province: String,
            district: String,
        },
        countryside: {
            province: String,
            district: String,
        },
        mobile: {
            type: 'String',
            default: '',
        },
        story: {
            type: 'String',
            default: '',
            maxLength: 100,
        },

        blocks: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            }
        ],
        followers: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
        ],
        following: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
        ],
        userSettings: Object,
        saved: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
        status: {
            type: String,
            enum: ['I', 'A'],
            default: 'A',
        },
        isAdmin: {
            type: Boolean,
            default: false
        },


    },
    {
        timestamps: true,
    }
);
userSchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true });

module.exports = mongoose.model('User', userSchema);
