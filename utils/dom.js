export function max_scroll_x_of(element) {
	return element.scrollWidth - element.clientWidth
}

export function x_is_fully_scrolled(element) {
	const max_scroll = max_scroll_x_of(element)
	return (event.deltaY < 0 && element.scrollLeft == 0) ||
	(event.deltaY > 0 && element.scrollLeft == max_scroll)
}