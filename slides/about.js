import { useState, useRef, useEffect, useCallback } from "react"
import { useRouter } from "next/router"
import { changeLanguage, useLocal } from "../locale"
import style from "../styles/about-slide.module.css"
import lib_style from "../styles/library.module.css"
import { max_scroll_x_of, x_scroll_is, y_scroll_is } from "../utils/dom"
import { clamp } from "../utils/math"
import { SmoothNumber } from "../utils/smooth_number"

export function AboutSlide() {
	const locale = useLocal()
	const container = useRef(null)
	const library = useRef(null)
	const txt_body = useRef(null)

	const ajust_text_height = useCallback(() => {
		const inner_container = container.current.children[0];
		const inner_size = inner_container.offsetHeight / 2
		const lib_size = library.current.offsetHeight / 2
	})
	useEffect(ajust_text_height, [container, library])
	useEffect(() => {
		addEventListener("resize", ajust_text_height)
		return () => removeEventListener("resize", ajust_text_height)
	}, [])

	const on_wheel = event => {
		if (!y_scroll_is(event.deltaY < 0 ? "top" : "bottom", txt_body.current))
			event.stopPropagation()
	}

	return <div className={style.container}>
		<div ref={container} className={style.text_container}>
			<div>
				<div className="header">{locale.about}</div>
				<div className={style.about_body} onWheel={on_wheel} ref={txt_body}>
					{locale.about_body}
				</div>
			</div>
		</div>
		<Library container_ref={library} />
	</div>
}

const book_sizes = [59, 59, 69, 59, 99]

function Library({ container_ref }) {
	const locale = useLocal()
	const router = useRouter()
	const [smooth, _] = useState(() => new SmoothNumber(10000))

	const lib_content = [
		[locale.languages, [
			[30, ["JavaScript", 0], ["Html + Css", 2], 18, ["TypeScript", 3], 35, ["Python", 1]],
			[10, ["C & C++", 1], 4, ["Rust", 4], 23, ["Arduino", 0], 45, ["Java", 2]]
		]],
		[locale.libraries, [
			[["P5", 4], 2, ["Processing", 2], 20, ["React", 0]],
			[40, ["WebGl", 1], 5, ["OpenGl", 3]]
		]],
		[locale.frame_works, [
			[],
			[["Next.js", 4], 14, ["Electron", 1]]
		]],
		[locale.hosters, [
			[],
			[13, ["Firebase", 0], 13, ["Vercel", 1], 20]
		]],
		[locale.others, [
			[100, ["npm", 4]],
			[["webpack", 2], 26, ["git", 4], 13, ["cargo", 0]]
		]],
		[locale.languages, [
			[["Català", 1, "cat"], 21, ["Español", 2, "es"]],
			[10, ["English", 0, "en"]]
		]],
	]

	const move_scroll = () => {
		if (!container_ref.current) return
		const moved = smooth.step()
		if (moved) container_ref.current.scrollTo(smooth.x, 0)
		else smooth.set(container_ref.current.scrollLeft)
		requestAnimationFrame(move_scroll)
	}
	useEffect(move_scroll, [])


	const on_wheel = event => {
		const element = container_ref.current

		if (x_scroll_is(event.deltaY < 0 ? "left" : "right", element)) return

		event.stopPropagation()
		const x = smooth.target + event.deltaY
		smooth.set_target(clamp(x, 0, max_scroll_x_of(element)))
	}

	const labels = []
	const top_books = []
	const bottom_books = []

	let pos_x = 0;
	let id = 0;

	for (const group of lib_content) {
		const group_name = group[0]
		let group_width = 0

		let pos_x_top = pos_x
		for (const book of group[1][0]) {
			if (typeof book != "number") {
				const props = { key: id++, name: book[0], type: book[1], pos: pos_x_top }
				if (book[2]) props.click = () => changeLanguage(router, book[2])
				top_books.push(<Book {...props} pos={pos_x_top} />)
				pos_x_top += book_sizes[book[1]]
			} else pos_x_top += book
		}
		let pos_x_bottom = pos_x
		for (const book of group[1][1]) {
			if (typeof book != "number") {
				const props = { key: id++, name: book[0], type: book[1], pos: pos_x_bottom }
				if (book[2]) props.click = () => changeLanguage(router, book[2])
				bottom_books.push(<Book {...props} />)
				pos_x_bottom += book_sizes[book[1]]
			} else pos_x_bottom += book
		}

		group_width = Math.max(pos_x_top, pos_x_bottom) - pos_x + 70
		pos_x += group_width

		labels.push(<div key={id++} style={{
			width: group_width
		}}>{group_name}</div>)
	}

	return <div ref={container_ref} className={style.library_container + " " + lib_style.container} onWheel={on_wheel}>
		<div className={lib_style.inner_container}>
			<div className={lib_style.label_container}>{labels}</div>
			<div className={lib_style.row}>
				{top_books}
			</div>
			<div className={lib_style.row}>
				{bottom_books}
			</div>
		</div>
	</div>
}

function Book({ name, type, pos, click }) {
	const style = { left: pos + "px" }
	if (click) style.cursor = "pointer"
	return <div
		className={lib_style.book + " " + lib_style["book" + type]}
		style={style}
		onClick={click}>
		<div>{name}</div>
	</div>
}