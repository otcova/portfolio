import Image from "next/image"
import { useLocal } from "../locale"
import style from "../styles/title-slide.module.css"

export function TitleSlide() {
	const locale = useLocal()
	return <div className={style.container}>
		<div className={style.lego}>
			<Image src="/lego.svg"
				width="100%"
				height="100%"
				layout="responsive"
				objectFit="contain"
				priority={true} />
		</div>
		<div className="center-column">
			<div className="header">{locale.hi}</div>
			<div className="title">{locale.title}</div>
		</div>
	</div>
}
