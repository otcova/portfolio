import { useRef, useState } from "react"
import { useLocal } from "../locale"
import style from "../styles/contact-slide.module.css"
import { user_info } from "../utils/user_info"

export function ContactSlide({ show }) {
	const locale = useLocal()

	const [name_input, set_name] = useState("")
	const [email_input, set_email] = useState("")
	const subject_input = useRef()
	const [message_input, set_message] = useState("")

	const [name_error, set_name_error] = useState(false)
	const [email_error, set_email_error] = useState(false)
	const [message_error, set_message_error] = useState(false)

	const is_name_correct = name_input.trim().length > 2
	const is_email_correct = email_input.trim().match(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/) != null
	const is_message_correct = message_input.trim().length > 2

	if (is_name_correct && name_error) set_name_error(false)
	if (is_email_correct && email_error) set_email_error(false)
	if (is_message_correct && message_error) set_message_error(false)

	const on_send = async () => {

		if (!is_name_correct || !is_email_correct || !is_message_correct) {
			set_name_error(!is_name_correct)
			set_email_error(!is_email_correct)
			set_message_error(!is_message_correct)
			return
		}
		
		const result = await send_email({
			name: name_input.trim(),
			email: email_input.trim(),
			subject: subject_input.current.value.trim(),
			message: message_input.trim(),
		})
		console.log("result", result)
		if (result.success) {
			set_name("")
			set_email("")
			subject_input.current.value = ""
			set_message("")
		} else {
			alert("Something whent wrong sending the email ...\n Feel free to contact directly with otgercomas@gmail.com")
		}
	}

	//block tab when not in this slide
	if (typeof window != "undefined") {
		onkeydown = e => {
			if (!show && e.key == "Tab")
				e.preventDefault()
		}
	}

	return <div className={style.container}>
		<div className={style.text_container}>
			<div className="header">{locale.contact_me}</div>
			<div className={style.contact_body}>{locale.contact_body}</div>
		</div>
		<div className={style.form_container}>
			<div className={style.small_input_container}>
				<div className={style.input_error_base + (name_error ? " " + style.input_error : "")}>
					<input value={name_input} onChange={e => set_name(e.target.value)} className={style.input} placeholder={locale.name} />
				</div>
				<div className={style.input_error_base + (email_error ? " " + style.input_error : "")}>
					<input value={email_input} onChange={e => set_email(e.target.value)} className={style.input} placeholder={locale.email} />
				</div>
			</div>
			<input ref={subject_input} className={style.input} placeholder={locale.subject} />
			<div className={style.input_error_base + (message_error ? " " + style.input_error : "")}>
				<textarea value={message_input} onChange={e => set_message(e.target.value)} className={style.text_area} placeholder={locale.message}></textarea>
			</div>
			<button className={style.btn_send} onClick={on_send}>{locale.send}</button>
		</div>
	</div>
}

async function send_email({ name, email, subject, message }) {
	const res = await fetch("/api/test", {
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			template_params: {
				name, email, subject, message,
				...await user_info(),
			}
		})
	})
	return await res.json()
}