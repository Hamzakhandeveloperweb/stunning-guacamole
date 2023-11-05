//importing modules
const nodemailer = require('nodemailer')


//function to send email to the user
module.exports.sendingMail = async({from, to, subject, text}) =>{

  try {
    let mailOptions = ({
      from,
      to,
      subject,
      text
  })
  const Transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'verifyhylaemail@gmail.com',
        pass: ''
      },
    });

      //return the Transporter variable which has the sendMail method to send the mail
      //which is within the mailOptions
    return await Transporter.sendMail(mailOptions) 
  } catch (error) {
  }
    
}