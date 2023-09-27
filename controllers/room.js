const imageDownloader = require('image-downloader');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const Place = require('../model/places');
const placeModel = require('../model/places');
const ImageTransformer = require('../utils/ImageTransformer');
const cloudinary  = require('../utils/fileUpload');
const { title } = require('process');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY 

const imageDownload = async (req,res) => {
    const {link} = req.body;
    const newName = 'photo-' + Date.now() +'.jpg';
   try {
    await imageDownloader.image({
        url: link,
        dest: `${__dirname}/images/${newName}`
    })
    res.status(200).json(newName);
   } catch (error) {
    res.status(500).json({message:error.message});
   }
}
const uploadFiles = async (req, res) => {
    const uploadedFiles = [];
    try {
        for (let i = 0; i < req.files.length; i++) {
            const {path,originalname} = req.files[i];
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            const newName = "photo-"+ Date.now() +"." + ext;
            fs.renameSync(path, __dirname+'/images/'+newName);
            uploadedFiles.push(newName);
            };
            res.status(200).json(uploadedFiles);
    } catch (error) {
        console.log(error);
    }
    }

const addNewPlace  = async (req, res) => {
    const {token} = req.cookies;
    const {
        title,Description,address,addedPhoto,
        checkIn,checkOut,maxGuests,perks,extraInfo,price
    } = req.body;
    const userData = await jwt.verify(token,JWT_SECRET_KEY);
        
        const placeDoc = await Place.create({
            user: userData.id,
            title: title,
            Description: Description,
            addresses: address,
            checkIn: checkIn,
            checkOut: checkOut,
            maxGuests: maxGuests,
            perks: perks,
            image: addedPhoto,
            price: price,
            extraInfo: extraInfo
        })
        res.status(201).json(placeDoc);
}
const retrieveUserPlaces = async (req, res) => {
    const {token} = req.cookies;
    const userData = await jwt.verify(token,JWT_SECRET_KEY);
    const {id} = userData;
    const places = await Place.find({user:id});
    res.status(200).json(places);
}
const retrieveAUserplace = async (req, res) => {
    const {id} = req.params;
    res.status(200).json(await Place.findById(id));
}
const showPlace = async (req, res) => {
    const {id} = req.params;
    res.status(200).json(await Place.findById(id));
}
const updateAplace = async (req, res) => {
    const {id} = req.params;
    const {token} = req.cookies;
    const {
        title,Description,address,addedPhoto,
        checkIn,checkOut,maxGuests,perks,extraInfo,price
    } = req.body;
    const userData = await jwt.verify(token,JWT_SECRET_KEY);
    if(userData && userData.id){
        const place = await Place.findById(id);
        if(place && place.user.toString() === userData.id) {
            
           await Place.updateOne({_id: place._id},{
                title: title,
                Description: Description,
                addresses: address,
                checkIn: checkIn,
                checkOut: checkOut,
                maxGuests: maxGuests,
                perks: perks,
                image: addedPhoto,
                price: price,
                extraInfo: extraInfo
           })
            res.status(200).json(price+'hello world');
        }else{
            res.status(404).json({message: ' 404 Not Found'});
        }
    }else{
        res.status(403).json({message: ' Access Denied'});
    }
}

const retrieveAllPlaces = async(req, res) => {
    const places = await Place.find();
    res.status(200).json(places);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const sortPlaces = async(req, res) => {

};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * keys.some((key) => place[key] && place[key].toLowerCase().includes(value)))
 * const result = await placeModel.find({title:{$regex: value,$options:'i'}});
 */
const searchPlaces = async(req, res) => {
   try {
    const keys = ['title', 'Description', 'address', 'perks']
    const {value} =req.params;
    const places = await placeModel.find();
    const result = places.filter((place) => place.title.includes(value));
    console.log(result);
    if (result.length === 0) {
       return  res.status(404).json({status:'failure',message:'not found'});
    }
   return res.status(200).json({status:'success',result});
   } catch (error) {
    res.status(500).json({ status:'failure', message: error.message});
   }


};


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const filterPlaces = async(req, res) => {

};
module.exports = {
                imageDownload, uploadFiles, 
                addNewPlace,retrieveUserPlaces,
                retrieveAUserplace,updateAplace,
                retrieveAllPlaces,showPlace,
                searchPlaces,filterPlaces,sortPlaces
                };