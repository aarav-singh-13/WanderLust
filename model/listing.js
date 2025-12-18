const mongoose = require("mongoose");
const def = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeach%2F&psig=AOvVaw29tdBCMZ56fqpeKYDZ3TT1&ust=1760540296652000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNjnxOn5o5ADFQAAAAAdAAAAABAE";

const listingSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image : {
        type : String,
        default : def,
        set : (x)=> x==="" ? def : x,
    },
    price : Number,
    location : String,
    country : String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
