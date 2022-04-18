import { useRef } from "react"
import { useLocal } from "../locale"
import style from "../styles/contact-slide.module.css"
import { user_info } from "../utils/user_info"

export function ContactSlide() {
	const locale = useLocal()

	const name_input = useRef()
	const email_input = useRef()
	const subject_input = useRef()
	const message_input = useRef()

	const on_send = () => {

		const name = name_input.current.value.trim()
		const email = email_input.current.value.trim()
		const subject = subject_input.current.value.trim()
		const message = message_input.current.value.trim()

		if (!name || !email || !subject || !message) {
			console.log("You need to fill it all!!")
			return
		}

		send_email({ name, email, subject, message })
	}

	return <div className={style.container}>
		<div className={style.text_container}>
			<div className="header">{locale.contact_me}</div>
			<div className={style.contact_body}>{locale.contact_body}</div>
		</div>
		<div className={style.form_container}>
			<input ref={name_input} className={style.small_input} placeholder="Name"></input>
			<input ref={email_input} className={style.small_input} placeholder="Email"></input>
			<input ref={subject_input} className={style.large_input} placeholder="Subject"></input>
			<div style={{ width: "100%" }}>
				<textarea ref={message_input} className={style.text_area} placeholder="Message"></textarea>
			</div>
			<button className={style.btn_send} onClick={on_send}>{locale.send}</button>
		</div>
	</div>
}

async function send_email({ name, email, subject, message }) {
	console.log("Sending...")
	const res = await fetch("/api/send", {
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
	console.log(await res.json())
	console.log("Sended!!!")
}