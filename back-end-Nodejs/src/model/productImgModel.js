const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const productImageSchema = new mongoose.Schema({

 
        product_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "products",
        }
,
is_deleted:{
    type:Boolean,
   default:false
},
createdAt: {
    type: Date,
    default: Date.now,
  },

  product_image: {
    public_id: String,
    url: String,
  },

})


module.exports = mongoose.model('product_img',productImageSchema)














