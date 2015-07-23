var nodemailer = require('nodemailer');

this.transport = nodemailer.createTransport({
    //service: 'Gmail',
    host: "thsr1.supercp.com",
    secure: true,
    port: 465,
    auth: {
      user: "wedding@jamieandjorge.com",
      pass: "pass"
    }
  });

this.mailOptions = function (guests, email_subject, email_text, files) {
  console.log(guests);
  var mailOpts = {
      from: 'Jamie & Jorge <wedding@jamieandjorge.com>' ,
      bcc: guests,
      //replace it with id you want to send multiple must be separated by ,(comma)
      subject: email_subject,
      //generateTextFromHTML: true,
      text: email_text,
      html: "<p>" + email_text + "</p>" 
      //attachments: files
  }
    return mailOpts;
};
