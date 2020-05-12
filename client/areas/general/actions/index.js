export const SET_CONFIG = 'areas/general/set_config';
export const SET_THEME = 'areas/general/set_theme';

export function setConfig(config) {
	return {
		type: SET_CONFIG,
		config,
	};
}
export function setTheme(theme) {
	return {
		type: SET_THEME,
		theme,
	};
}
