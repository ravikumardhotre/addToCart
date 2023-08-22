const mongoose =  require('mongoose');

const productSchema = new mongoose.Schema({

    product_name:{
    type:String,
    require:true
},
product_price:{
    type:String,
    require:true
},
product_sku:{
    type:String,
    require:true
},
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


module.exports = mongoose.model('product',productSchema)














