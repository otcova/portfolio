import { send_email } from "../../utils/email";

export default async function handler(req, res) {
	if (req.method != "POST") return res.status(405).end()

	const email_res = await send_email({ 
		template_params: req.body.template_params
	})

	if (email_res.success) console.log("success sending email!");
	else {
		console.log("------------------------------------------");
		console.log("------------------------------------------");
		console.log("-------  [ERROR] Email send failed -------");
		console.log(email_res.res);
		console.log("------------------------------------------");
		console.log("------------------------------------------");
	}

	res.status(200).json({ success: email_res.success })
}
