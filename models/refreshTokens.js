const mongoose = require("mongoose")

const RefreshTokenSchema = mongoose.Schema({
    token: {
        refreshTokens: String,
    }
});


module.exports = mongoose.model("RefreshToken",RefreshTokenSchema);