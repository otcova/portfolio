export function max_scroll_x_of(element) {
	return element.scrollWidth - element.clientWidth
}

export function max_scroll_y_of(element) {
	return element.scrollHeight - element.clientHeight
}

export function x_scroll_is(pos, element) {
	const max_scroll = max_scroll_x_of(element)
	if (pos == "left") return element.scrollLeft == 0
	else if (pos == "right") return element.scrollLeft == max_scroll
	throw Error("y_scroll_is(pos, element) invalid pos")
}

export function y_scroll_is(pos, element) {
	const max_scroll = max_scroll_y_of(element)
	if (pos == "top") return element.scrollTop == 0
	else if (pos == "bottom") return element.scrollTop == max_scroll
	throw Error("y_scroll_is(pos, element) invalid pos")
}