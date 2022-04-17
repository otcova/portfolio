import { useRouter } from 'next/router'
import raw_lang_data from './language.js'

// Build language data

const lang_data = { en: {}, es: {}, cat: {} }

for (const text_id in raw_lang_data)
	for (const lang_name in lang_data)
		lang_data[lang_name][text_id] = raw_lang_data[text_id][lang_name]
			.replace(/^[^\S\n]+/gm, "")
			.replace(/\n{2,}/gm, "|")
			.replace(/\n/gm, "")
			.replaceAll("|", "\n\n")
			
export function useLocal() {
	const router = useRouter()
	return lang_data[router.locale]
}
