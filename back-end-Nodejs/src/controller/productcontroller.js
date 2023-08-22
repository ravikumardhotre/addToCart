 const productSchema = require('../model/productmodel');
const ObjectId = require('mongodb').ObjectId;
const cloudinary = require("cloudinary").v2
const {getDataUri} = require('../utils/dataUrl')
const productImageSchema = require('../model/productImgModel')
 const createProduct = async (req, res) => {
    try {

  
    let file = req.file;

    const fileUri = getDataUri(file);

    const myCloud = await cloudinary.uploader.upload(fileUri.content, {
      folder: "products",
    },(err, result) => {
      if (err) {
        console.log(err);
      }
      return result;
    });
 
   
   let requestBody = req.body;
      let {
       
        product_price,
       
        product_name,
      
        product_sku,
        
      } = requestBody;
    
      let data = {
      
        product_name: requestBody.product_name,
       
        product_price: requestBody.product_price,
        product_image: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
  
        product_sku: requestBody.product_sku,
      };
  
      let newProduct = await productSchema.create(data);
  
     
   
      if (newProduct) {
        return res
          .status(200)
          .send({
            status: true,
            message: "product created successfully",
            data: newProduct,
          });
      } else {
        return res
          .status(200)
          .send({ status: false, message: "product not created" });
      }
    } catch (error) {
      return res
        .status(500)
        .send({ status: false, message: error.message, data: null });
    }
  };

const createProductImages = async (req, res) => {
  
  try {
    let file = req.file;
  
    const fileUri = getDataUri(file);
  
    const myCloud = await cloudinary.uploader.upload(fileUri.content, {
      folder: "products",
    });
  
    let requestBody = req.body;
    let {
      product_id
    } = requestBody;
  
    let data = {
      product_id: requestBody.product_id,
      product_image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    };
  
    let newProductImage = await productImageSchema.create(data);
  
    if (newProductImage) {
      return res.status(200).send({
        status: true,
        message: "product image created successfully",
        data: newProductImage,
      });
    } else {
      return res
        .status(200)
        .send({ status: false, message: "product image not created" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message, data: null });
  }
  
  
  };




const getProducts = async (req, res) => {
    try {
      
  
   
  
   
  let page =0
      limit = 10;
      skip = 0;
      let search=''
      if (page > 1) {
        skip = (page - 1) * limit;
      }
      var product_search = new RegExp(search);
  
      let newProduct = await productSchema.aggregate([
       
        { $match: { is_deleted: false } },
        { $sort : {'createdAt': -1}},
        { $skip: skip },
        { $limit: limit },
        {$lookup:{
          from:"product_imgs",
          localField:"_id",
          foreignField:"product_id",
          as:"product_imgs"
        
      }
  },
      ]);
      const productCount = await productSchema.aggregate([
       
        { $count: "productCount" },
      ]);
  
      if(productCount.length===0){
        return res
          .status(200)
          .send({
            status: true,
            message: "product list",
            data: newProduct,
            productcount: productCount.length,
          });
      }
      
      if (newProduct) {
        return res
          .status(200)
          .send({
            status: true,
            message: "product list",
            data: newProduct,
            productcount: productCount[0].productCount,
          });
      } else {
        return res
          .status(200)
          .send({ status: false, message: "product not found" });
      }
    } catch (error) {
      console.log({ error: error });
      return res
        .status(500)
        .send({ status: false, message: error.message, data: null });
    }
  };


 





const getProductDetailById = async (req, res) => {
    try {
      const { id } = req.body;
  
  
  
      let getProduct = await productSchema.aggregate([
        { $match: { _id: new ObjectId(id) } },
        { $lookup:{
          from:"product_imgs",
          localField:"_id",
          foreignField:"product_id",
          as:"product_imgs"
        }}
         
      ]);
  
      if (getProduct) {
        return res
          .status(200)
          .send({
            status: true,
            message: "get product details succesfully",
            data: getProduct,
          });
      } else {
        return res
          .status(200)
          .send({ status: false, message: "data not found", data: null });
      }
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: error.message,
        data: null,
      });
    }
  };

  const updateProduct = async (req, res) => {
    try {
      let requestBody = req.body;
  
      let {
       
        product_price,
       
        product_name,
       
        product_sku,
  
        product_id
      } = requestBody;
      //upload product image to aws s3
  
   

     
      // let files = req.files;
      // if(files.length>0){
      //   let product_image = "products/" + Date.now() + files[0].originalname;
  
      // await config.uploadFile(files[0], product_image);
      // let data = {
      //   user_id: isLogin.userId,
      //   product_image:product_image,
      //   ...requestBody,
      // };
      // let newProduct = await productModel.findOneAndUpdate(
      //   { _id: requestBody.product_id },
      //   data,
      //   { new: true }
      // );
      // }
      let data = {
        
        ...requestBody,
      };
  
      let newProduct = await productSchema.findOneAndUpdate(
        { _id: requestBody.product_id },
        data,
        { new: true }
      );
      if (newProduct) {
        return res
          .status(200)
          .send({
            status: true,
            message: "product updated successfully",
            data: newProduct,
          });
      } else {
        return res
          .status(200)
          .send({ status: false, message: "product not updated" });
      }
    } catch (error) {
      return res
        .status(500)
        .send({ status: false, message: error.message, data: null });
    }
  };

const deleteProduct = async (req, res) => {
    try {
      let requestBody = req.body;
      let { id } = requestBody;
     
      let data = {
        is_deleted: true,
      };
      let newProduct = await productSchema.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      if (newProduct) {
        return res
          .status(200)
          .send({
            status: true,
            message: "product deleted successfully",
            data: newProduct,
          });
      } else {
        return res
          .status(200)
          .send({ status: false, message: "product not deleted" });
      }
    } catch (error) {
      return res
        .status(500)
        .send({ status: false, message: error.message, data: null });
    }
  };
 
module.exports = {createProductImages,createProduct,getProducts,getProductDetailById,deleteProduct,updateProduct}


