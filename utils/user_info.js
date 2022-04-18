import { page_language } from '../locale';

export async function user_info() {
	if (typeof window == "undefined") return;

	let nAgt = navigator.userAgent;
	let browser_name = navigator.appName;
	let browser_version = '' + parseFloat(navigator.appVersion);
	let name_offset, ver_offset, ix;

	// In Opera, the true version is after "Opera" or after "Version"
	if ((ver_offset = nAgt.indexOf("Opera")) != -1) {
		browser_name = "Opera";
		browser_version = nAgt.substring(ver_offset + 6);
		if ((ver_offset = nAgt.indexOf("Version")) != -1)
			browser_version = nAgt.substring(ver_offset + 8);
	}
	// In MSIE, the true version is after "MSIE" in userAgent
	else if ((ver_offset = nAgt.indexOf("MSIE")) != -1) {
		browser_name = "Microsoft Internet Explorer";
		browser_version = nAgt.substring(ver_offset + 5);
	}
	// In Chrome, the true version is after "Chrome" 
	else if ((ver_offset = nAgt.indexOf("Chrome")) != -1) {
		browser_name = "Chrome";
		browser_version = nAgt.substring(ver_offset + 7);
	}
	// In Safari, the true version is after "Safari" or after "Version" 
	else if ((ver_offset = nAgt.indexOf("Safari")) != -1) {
		browser_name = "Safari";
		browser_version = nAgt.substring(ver_offset + 7);
		if ((ver_offset = nAgt.indexOf("Version")) != -1)
			browser_version = nAgt.substring(ver_offset + 8);
	}
	// In Firefox, the true version is after "Firefox" 
	else if ((ver_offset = nAgt.indexOf("Firefox")) != -1) {
		browser_name = "Firefox";
		browser_version = nAgt.substring(ver_offset + 8);
	}
	// In most other browsers, "name/version" is at the end of userAgent 
	else if ((name_offset = nAgt.lastIndexOf(' ') + 1) <
		(ver_offset = nAgt.lastIndexOf('/'))) {
		browser_name = nAgt.substring(name_offset, ver_offset);
		browser_version = nAgt.substring(ver_offset + 1);
		if (browser_name.toLowerCase() == browser_name.toUpperCase()) {
			browser_name = navigator.appName;
		}
	}
	// trim the fullVersion string at semicolon/space if present
	if ((ix = browser_version.indexOf(";")) != -1)
		browser_version = browser_version.substring(0, ix);
	if ((ix = browser_version.indexOf(" ")) != -1)
		browser_version = browser_version.substring(0, ix);

	const browser_brands = JSON.stringify(navigator.userAgentData.brands.map(brand =>
		brand.brand.trim() + " (version: " + brand.version + ")"
	)).replaceAll('"', "").replaceAll(",", ", ")

	const seconds = Math.round(performance.now() / 1000)
	const time_spent = `${Math.floor(seconds / 60)}min ${seconds % 60}s`

	let ip = "unknown", location = "unknown", connection = "unknown", timezone = "unknown"
	try {
		const response = await fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=1be9a6884abd4c3ea143b59ca317c6b2')
		const info = await response.json()
		ip = info.ip_address
		location = `${info.latitude}N ${info.longitude}E  ${info.city}, ${info.region}, ${info.country}, ${info.continent}`
		timezone = `${info.timezone.name} (${info.timezone.abbreviation}) ${info.timezone.current_time}`
		connection = `${info.connection.autonomous_system_organization}, ${info.connection.connection_type}`
		if (info.security.is_vpn) {
			location = "(vpn) " + location
			connection = "(vpn) " + connection
		}
	} catch (e) { }

	return {
		ip,
		location,
		connection,
		timezone,
		time_spent,
		browser_brands,
		browser_name,
		browser_version,
		browser_language: navigator.language || navigator.userLanguage,
		page_language,
		screen_width: screen.width,
		screen_height: screen.height,
		is_mobile: navigator.userAgentData.mobile,
		platform: navigator.platform,
	}
}