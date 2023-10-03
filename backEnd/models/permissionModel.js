const mongoose = require('mongoose')
const permissionSchema = new mongoose.Schema({
    allPermissions:[mongoose.Schema.Types.Mixed],
})
module.exports = mongoose.model('permissions', permissionSchema);