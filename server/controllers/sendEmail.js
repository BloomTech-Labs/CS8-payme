// Author John C.

require('dotenv').load();
const nodemailer = require("nodemailer");

const Invoice = require("../models/invoices");
const User = require("../models/users");

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

const sendEmail = (req, res) => {
	// pass in message to send, invoice ID, and user ID into post request
	const {
		message
		// invoiceID, // uncomment these once you have appropriate IDs from database
		// userID
	} = req.body;

	// ====== TODO =======
	const invoice = Invoice.find({ id: invoiceID }); // find the user by id passed in on post
    const user = User.find({ id: userID }); // find the user by id passed in on post
	// when these are found, pass into mailoptions in appropriate fields
    
	nodemailer.createTestAccount((err, account) => {
		// create reusable transporter object using the default SMTP transport
		const transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			auth: {
				user: "nzopjkf67k7li4wv@ethereal.email",
				pass: "VFsAdsD4CRdU2NJ2wC"
			}
		});

		// setup email data with unicode symbols
		let mailOptions = {
			from: '"GiveMeMyMoney" <Now@givememymoney.com>', // sender address
			to: "bar@example.com, baz@example.com", // list of receivers
			subject: "Hello ✔", // Subject line
			text: message, // plain text body
			html: `<b>${message}</b>` // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				res.json({ error: "Email not sent" });
				return console.log(error);
			}
			res.send({
				success: "Email sent",
				messageID: info.messageId,
				messageURL: nodemailer.getTestMessageUrl(info)
			});
		});
	});
};

module.exports = {
	sendEmail
};