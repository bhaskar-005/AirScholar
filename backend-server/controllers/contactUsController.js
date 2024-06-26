const mailsender = require('../utils/NodeMailer');
const contactUs = require('../Mail-template/contactUs');
const mailSender = require('../utils/NodeMailer');
const { redisClient } = require('../redis');
require('dotenv').config();

exports.contectUs = async (req,res)=>{
    try {
     const { email, firstname, lastname, message, phoneNo, countrycode } = req.body;
     if(!email|| !firstname|| !lastname ||!message){
        return res.status(404).send({
            message: 'please fill required fields',
            success: false
        })
     }
     const  cachedData = await redisClient.get(`contect:${email}`);
     if ( cachedData) {
      return res.status(400).json({
        message:`${cachedData} your message already sent.`
      })
     }
     const emailForAdmin = await mailsender(
        process.env.ADMIN_EMAIL ,  //email
        `mail from ${firstname} ${lastname} -AirScholer`, // title
         contactUs(email, firstname, lastname, message, phoneNo, countrycode) //html
     )
     if (emailForAdmin) {
       const mailForUser = await mailSender(
        email,
        `Your Mail send successfully to AirScholer`,
        contactUs(email, firstname, lastname, message, phoneNo, countrycode)
       )  
      }
      await redisClient.setex(`contect:${email}`,240,`${firstname} ${lastname}`)
      return res.json({
        success: true,
        message: "Email send successfully",
      })
    } catch (error) {
        console.log("Error message :", error)
        return res.json({
          success: false,
          message: "Something went wrong...",
        })
    }
}