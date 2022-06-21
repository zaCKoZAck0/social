const mongoose = require("mongoose")

const RefreshTokenSchema = mongoose.Schema({
    token: {
        refreshTokens: String,
        required: true
    }
});


module.exports = mongoose.model("RefreshToken",RefreshTokenSchema);