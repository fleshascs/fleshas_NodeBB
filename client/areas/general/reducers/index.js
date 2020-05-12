import * as actions from '../actions';
import { defaultTheme } from '_theme';

const initialState = { config: {}, theme: defaultTheme };
export default function config(state = initialState, action) {
	switch (action.type) {
		case actions.SET_CONFIG: {
			return { ...state, config: action.config };
		}
		case actions.SET_THEME: {
			return { ...state, theme: action.theme };
		}
		default:
			return state;
	}
}
