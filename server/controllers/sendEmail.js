const nodemailer = require("nodemailer");
const Invoice = require("../models/invoices");
const hbs = require('nodemailer-express-handlebars');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

const sendEmail = (req, res) => {
	// pass in message to send, invoice ID into post request
	const { // references the emailMessage.html file
		message,
		invoiceID // uncomment these once you have appropriate IDs from database
		// userID
	} = req.body;

	if (!invoiceID) {
		return res
			.status(422)
			.json({ message: "Invoice ID required." });
	}

	Invoice.findById(invoiceID) // find the user by id passed in on post
		.then(invoice => {
			// searches the database of invoices by a specific ID
			console.log(invoice);
			if (!invoice) return res.status(404).json({ error: "Invoice not found" });
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

				transporter.use('compile',hbs({
					viewPath: 'server/controllers/email',
					extName: '.hbs'
				}))

				if (invoice.email.address === undefined)
					return res.status(404).json({ error: "No email found on Invoice." });
				// setup email data with unicode symbols
				let mailOptions = {
					from: '"GiveMeMyMoney" <Now@givememymoney.com>', // sender address
					to: `${invoice.email.address}`, // list of receivers
					subject: "You Have An Outstanding Invoice", // Subject line
					template: 'body',
					context: {
						name: `${invoice.clientName}`,
						amount: `${invoice.totalAmount}`,
						invoice: `${invoiceID}`,
						company: `${invoice.companyName}`
					} // html body
				};


				// send mail with defined transport object
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						return res.json({ error: "Email not sent", body: error });
					}
					res.send({
						success: "Email sent",
						messageInfo: info,
						messageURL: nodemailer.getTestMessageUrl(info)
					});
				});
			});
		})
		.catch(error => {
			res.status(501).json(error);
		});
};

module.exports = {
	sendEmail
};
