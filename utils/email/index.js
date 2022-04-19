import nodemailer from "nodemailer"
import inlineBase64 from "nodemailer-plugin-inline-base64"
import template from "./template.html"

const transporter = nodemailer.createTransport({
	service: process.env.EMAIL_HOST,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
})
transporter.use("compile", inlineBase64({cidPrefix: 'somePrefix_'}))

function build_html_from_template(template, template_params) {
	let html = template
	for (const keyword in template_params)
		html = html.replaceAll("{" + keyword + "}", template_params[keyword])
	return html
}

export async function send_email({ template_params }) {
	const html = build_html_from_template(template, template_params)
	console.log(html)
	return await new Promise(resolve => transporter.sendMail({
		to: process.env.EMAIL_USER,
		// bcc: process.env.EMAIL_BCC,
		subject: "EMAIL FROM PORTFOLIO !!!",
		html,
	}, (error, success) => {
		if (error) resolve({ success: false, error })
		else resolve({ success: true })
	})
	)
}