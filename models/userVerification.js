const mongoose = require('mongoose');

const verificationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    verificationToken:{
        type: String
    },
    
},
{
    timestamps:  true
}
)



module.exports = mongoose.model('Verification',verificationSchema);