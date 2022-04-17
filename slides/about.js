import { useState, useRef, useEffect } from "react"
import { useLocal } from "../locale"
import style from "../styles/about-slide.module.css"
import lib_style from "../styles/library.module.css"
import { max_scroll_x_of, x_is_fully_scrolled } from "../utils/dom"
import { clamp } from "../utils/math"
import { SmoothNumber } from "../utils/smooth_number"

export function AboutSlide() {
	const locale = useLocal()
	const container = useRef(null)
	const library = useRef(null)

	const ajust_text_height = () => {
		const inner_container = container.current.children[0];
		const inner_size = inner_container.offsetHeight / 2
		const lib_size = library.current.offsetHeight / 2

		if (inner_size > lib_size && (inner_size > innerHeight * 0.4 || inner_container.offsetWidth > innerWidth / 2)) {
			container.current.style.marginTop = 0
			container.current.style.overflowY = "scroll"
			container.current.style.height = library.current.offsetHeight + "px"
			container.current.onwheel = e => e.stopPropagation();
		} else {
			container.current.style.marginTop = (lib_size - inner_size) + "px"
			container.current.style.overflowY = "visible"
			container.current.style.height = "unset"
			container.current.onwheel = () => { };
		}

	}
	useEffect(ajust_text_height, [container, library])
	useEffect(() => addEventListener("resize", ajust_text_height), [])

	return <div className={style.container}>
		<div ref={container} className={style.text_container}>
			<div>
				<div className="header">{locale.about}</div>
				<div>{locale.about_body}</div>
			</div>
		</div>
		<Library container_ref={library} />
	</div>
}

const lib_content = [
	["Languages", [
		[30, ["JavaScript", 0], ["Html + Css", 2], 18, ["TypeScript", 3], 35, ["Python", 1]],
		[10, ["C & C++", 1], 4, ["Rust", 4], 23, ["Arduino", 0], 45, ["Java", 2]]
	]],
	["Libraries", [
		[["P5", 4], 2, ["Processing", 2], 20, ["React", 0]],
		[40, ["WebGl", 1], 5, ["OpenGl", 3]]
	]],
	["Frame Works", [
		[],
		[["Next.js", 4], 14, ["Electron", 1]]
	]],
	["Databases", [
		[],
		[13, ["Firebase", 1], 13]
	]],
	["Others", [
		[100, ["npm", 4]],
		[["webpack", 2], 26, ["git", 4], 13, ["cargo", 0]]
	]],
	["Languages", [
		[["Català", 1], 21, ["Español", 2]],
		[10, ["English", 0]]
	]],
]

const book_sizes = [59, 59, 69, 59, 99]

function Library({ container_ref }) {
	const [smooth, _] = useState(() => new SmoothNumber(10000))

	const move_scroll = () => {
		smooth.step()
		container_ref.current.scrollTo(smooth.x, 0)
		requestAnimationFrame(move_scroll)
	}
	useEffect(move_scroll, [])


	const on_wheel = event => {
		const element = container_ref.current
		
		if (x_is_fully_scrolled(element)) return

		event.stopPropagation()
		const x = smooth.target + event.deltaY
		smooth.set_target(clamp(x, 0, max_scroll_x_of(element)))
	}

	const labels = []
	const top_books = []
	const bottom_books = []

	let pos_x = 0;

	for (const group of lib_content) {
		const group_name = group[0]
		let group_width = 0

		let pos_x_top = pos_x
		for (const book of group[1][0]) {
			if (typeof book != "number") {
				top_books.push(<Book key={book[0]} name={book[0]} type={book[1]} pos={pos_x_top} />)
				pos_x_top += book_sizes[book[1]]
			} else pos_x_top += book
		}
		let pos_x_bottom = pos_x
		for (const book of group[1][1]) {
			if (typeof book != "number") {
				bottom_books.push(<Book key={book[0]} name={book[0]} type={book[1]} pos={pos_x_bottom} />)
				pos_x_bottom += book_sizes[book[1]]
			} else pos_x_bottom += book
		}

		group_width = Math.max(pos_x_top, pos_x_bottom) - pos_x + 70
		pos_x += group_width

		labels.push(<div key={group_name + group[1][0].length} style={{
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

function Book({ name, type, pos }) {
	return <div className={lib_style.book + " " + lib_style["book" + type]} style={{ left: pos + "px" }}>
		<div>{name}</div>
	</div>
}