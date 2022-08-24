const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const postStyleSchema = new mongoose.Schema(
    {
        background: {
            type: String,
        },
        color: {
            type: String,
        }
    }
);

postStyleSchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true });

module.exports.PostStyles = mongoose.model('PostStyle', postStyleSchema);
module.exports.PostStyleSchemma = postStyleSchema;
