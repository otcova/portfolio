import { useRef } from "react"
import { useLocal } from "../locale"
import style from "../styles/portfolio-slide.module.css"

const portfolio_data = [
	["Web Pages", ["This portfolio", "Paperbit documentation", "Recambis Gil Comas"]],
	["Administrative Apps", ["Arxivador", "Gaudí", "Caixa"]],
	["Network", ["Remote keyboard", "Remote power up", "Minecraft shared server"]],
	["Simulators", ["Ant simulator", "CPU simulator", "Logic simulator", "Pneumatics simulator"]],
	["Libraries", ["Paperbit"]],
	["Bots", ["Bot Auto light", "Discord bot", "Karel auto-solver"]],
	["Beautiful Pices of Art", ["Close the Window", "P5 projects", "Stuff"]],
]

export function PortfolioSlide() {
	const clipboard = useRef(null)
	const locale = useLocal()

	const on_wheel = event => {
		if (event.deltaY > 0) {
			const scrollBottom = clipboard.current.scrollHeight - clipboard.current.offsetHeight
			if (clipboard.current.scrollTop == scrollBottom) return
		} else if (clipboard.current.scrollTop == 0) return

		event.stopPropagation()
	}

	return <div className={style.container}>
		<div className={style.clipboard_container}>
			<div className={style.clipboard_clip}></div>
			<div className={style.clipboard_paper}>
				<div ref={clipboard} className={style.clipboard_paper_scroll} onWheel={on_wheel}>
					<div className={style.clipboard_paper_content}>
						{
							portfolio_data.map(item => (<div
								className={style.clipboard_header}
								key={item[0]}>
								{item[0]}
								{item[1].map(childern =>
									<div key={childern} className={style.clipboard_link}>- {childern}</div>
								)}
							</div>))
						}
					</div>
				</div>
			</div>
		</div>
		<div className={style.description_container}>
			<div className="header">{locale.hi}</div>
			<div className="title">{locale.title}</div>
		</div>
	</div>
}
