import { send_email } from "../../utils/email";

export default async function handler(req, res) {
	if (req.method != "POST") return res.status(405).end()

	console.log("\n");
	console.log("-------  Email parameters  ---------------");
	console.log(req.body.template_params);
	console.log("------------------------------------------");
	console.log("");

	const email_res = await send_email({
		template_params: req.body.template_params
	})
	if (email_res.error) {
		console.log("------------------------------------------");
		console.log("------------------------------------------");
		console.log("-------  [ERROR] Email send failed -------");
		console.log(email_res.error);
		console.log("------------------------------------------");
		console.log("------------------------------------------");
		return res.status(424).end()
	}
	console.log("success sending email!");
	res.status(200).json({ success: true })
}
