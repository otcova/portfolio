import { useState, useEffect } from "react"
import nav_css from "../styles/nav.module.css"
import { TitleSlide } from "../slides/title"
import { AboutSlide } from "../slides/about"
import { PortfolioSlide } from "../slides/portfolio"
import { ContactSlide } from "../slides/contact"

export default function MainPage() {
	const [current_page, set_page] = useState(0)
	
	return <div>
		<Nav current_page={current_page} set_page={set_page} />
		<TitleSlide />
		<AboutSlide />
		<PortfolioSlide />
		<ContactSlide show={current_page == 3}/>
	</div>
}

function Nav({ current_page, set_page }) {
	const [is_scrolling, _] = useState({ value: false })
	const [page_target_index, set_page_target_index] = useState(current_page)

	const set_page_target = (page_target) => {
		if (is_scrolling.value) return

		page_target = Math.max(0, Math.min(3, page_target))
		if (page_target == current_page)
			return set_page_instant(current_page)

		scrollBy(0, page_target * innerHeight - scrollY)
		is_scrolling.value = true

		set_page_target_index(page_target)

		setTimeout(() => {
			is_scrolling.value = false
			set_page(page_target)
		}, 400)
	}

	const set_page_instant = page_index => {
		if (page_index != current_page) set_page(page_index)
		if (page_index != page_target_index) set_page_target_index(page_index)

		scroll({
			top: page_index * innerHeight,
			left: 0,
			behavior: 'instant',
		})
	}



	if (typeof window !== "undefined") {
		onwheel = ({ deltaY }) => set_page_target(current_page + Math.sign(deltaY))
		onresize = () => set_page_instant(current_page)

		// Set initial page index in relation of initial scroll
		// because on refresh some times scroll doesn't restart 
		useEffect(() => {
			set_page_instant(Math.round(scrollY / innerHeight))
		}, [])
	}

	return <div className={nav_css.container}>
		<div className={page_target_index == 0 ? nav_css.active : nav_css.btn} onClick={() => set_page_target(0)}></div>
		<div className={page_target_index == 1 ? nav_css.active : nav_css.btn} onClick={() => set_page_target(1)}></div>
		<div className={page_target_index == 2 ? nav_css.active : nav_css.btn} onClick={() => set_page_target(2)}></div>
		<div className={page_target_index == 3 ? nav_css.active : nav_css.btn} onClick={() => set_page_target(3)}></div>
	</div>
}

