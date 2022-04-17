import { useLocal } from "../locale"
import style from "../styles/contact-slide.module.css"

export function ContactSlide() {
	const locale = useLocal()
	return <div className={style.container}>
		<div className={style.text_container}>
			<div className="header">{locale.contact_me}</div>
			<div className={style.contact_body}>{locale.contact_body}</div>
		</div>
		<div className={style.form_container}>
			<input className={style.small_input} placeholder="Name"></input>
			<input className={style.small_input} placeholder="Email"></input>
			<input className={style.large_input} placeholder="Subject"></input>
			<div style={{width: "100%"}}>
				<textarea className={style.text_area} placeholder="Message"></textarea>
			</div>
			<button className={style.btn_send}>{locale.send}</button>
		</div>
	</div>
}
