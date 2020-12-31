import theme from 'styled-theming';

export const defaultTheme = 'light';

export const themeLight = {
  DISABLED_PRIMARY_BUTTON_COLOR: 'rgba(0, 0, 0, 0.25)',
  DISABLED_PRIMARY_BUTTON_BACKGROUND: '#f5f5f5',
  DISABLED_PRIMARY_BUTTON_BORDER: '#d9d9d9',
  BREADCRUMB_LINK_COLOR: '#424c58',
  SHOUTBOX_INPUT_BORDER_COLOR: '#dad7d7',
  DEFAULT_FONT_COLOR: 'rgba(0, 0, 0, 0.65)',
  ROW_HOVER_COLOR: '#ececec',
  ROW_LINK_COLOR: '#0d2963',
  USERNAME_COLOR: 'rgb(55, 170, 213)', //'#424c58',
  PLAYER_LIST_HEADER_COLOR: 'rgba(255, 255, 255, 0.8)',
  PRIMARY_COLOR: '#424c58',
  AVATAR_HOWER_SHADOW_COLOR: '#fff',
  HEADER_TOP_COLOR: '#292c35',
  LEFT_BAR_BG_COLOR: '#292c35',
  LEFT_BAR_INPUT_COLOR: '#282828',
  LEFT_BAR_ICON_COLOR: '#7b7f85',
  FOOTER_BG_COLOR: '#131619',
  BACKGROUND_COLOR: '#ebecf1',
  POST_BG_COLOR: '#fff',
  RIGHT_PANEL_COLOR: '#fff',
  BOX_BG_COLOR: '#fff',
  BOX_BORDER_COLOR: '#ebecf1',
  BOX_TOP_FONT_COLOR: '#888080',
  POST_TOP_MESSAGE_COLOR: '#403d3d',
  CHAT_HEADER_COLOR: 'rgb(249, 249, 249)',
  CHAT_MY_MESSAGE_COLOR: '#27488a',
  CHAT_BACKGROUND_COLOR: '#fff',
  CHAT_BORDER_COLOR: '#e4e3e4',
  CHAT_INNER_BORDER_COLOR: '#e6e6e6'
};

const themeDark = {
  DISABLED_PRIMARY_BUTTON_COLOR: 'rgb(41, 44, 53)',
  DISABLED_PRIMARY_BUTTON_BACKGROUND: '#424c58',
  DISABLED_PRIMARY_BUTTON_BORDER: '#292c35',
  BREADCRUMB_LINK_COLOR: 'rgb(55, 170, 213)',
  SHOUTBOX_INPUT_BORDER_COLOR: '#424c58',
  DEFAULT_FONT_COLOR: '#7f7676',
  ROW_HOVER_COLOR: '#424c58',
  ROW_LINK_COLOR: 'rgb(55, 170, 213)',
  USERNAME_COLOR: 'rgb(55, 170, 213)',
  PLAYER_LIST_HEADER_COLOR: 'rgba(47, 47, 47, 0.8)',
  PRIMARY_COLOR: '#424c58',
  DISABLED_COLOR: '#0000000d',
  AVATAR_HOWER_SHADOW_COLOR: '#fff',
  FORUMS_CATEGORY_HEADER_TEXT_COLOR: '#292c35',
  HEADER_TOP_COLOR: '#292c35',
  UNREAD_MESSAGES_COUNTER_BG_COLOR: '#e24040',
  LEFT_BAR_BG_COLOR: '#292c35',
  LEFT_BAR_INPUT_COLOR: '#282828',
  LEFT_BAR_ICON_COLOR: '#7b7f85',
  FOOTER_BG_COLOR: '#131619',
  BACKGROUND_COLOR: '#424c58',
  RIGHT_PANEL_COLOR: '#292c35',
  POST_BG_COLOR: '#292c35',
  BOX_BG_COLOR: '#292c35',
  BOX_BORDER_COLOR: '#394355',
  BOX_TOP_FONT_COLOR: '#e4d9d9',
  POST_TOP_MESSAGE_COLOR: '#e4d9d9',
  CHAT_HEADER_COLOR: '#292c35',
  CHAT_MY_MESSAGE_COLOR: '#27488a',
  CHAT_BACKGROUND_COLOR: '#2d3a4a',
  CHAT_BORDER_COLOR: '#00adff',
  CHAT_INNER_BORDER_COLOR: '#292c35'
};

export const rowBorderColor = theme('mode', {
  light: 'rgba(0, 0, 0, 0.12)',
  dark: 'rgba(66, 76, 88,0.2)'
});
export const disabledPrimaryButtomColor = theme('mode', {
  light: themeLight.DISABLED_PRIMARY_BUTTON_COLOR,
  dark: themeDark.DISABLED_PRIMARY_BUTTON_COLOR
});
export const disabledPrimaryButtomBackground = theme('mode', {
  light: themeLight.DISABLED_PRIMARY_BUTTON_BACKGROUND,
  dark: themeDark.DISABLED_PRIMARY_BUTTON_BACKGROUND
});
export const disabledPrimaryButtomBorder = theme('mode', {
  light: themeLight.DISABLED_PRIMARY_BUTTON_BORDER,
  dark: themeDark.DISABLED_PRIMARY_BUTTON_BORDER
});
export const separatorColor = theme('mode', {
  light: '#eeeeee',
  dark: '#424c58'
});
export const inputLabelColor = theme('mode', {
  light: 'rgba(0, 0, 0, 0.85)',
  dark: 'rgba(232, 232, 232, 0.85)'
});
export const inputBorderColor = theme('mode', {
  light: '#dfe1e6',
  dark: '#424c58'
});
export const inputBackgorundColor = theme('mode', {
  light: '#fafbfc',
  dark: '#424c58'
});
export const contentPlaceholderColor = theme('mode', {
  light: '#eff1ef',
  dark: '#424c58'
});
export const chatInnerBorderColor = theme('mode', {
  light: themeLight.CHAT_INNER_BORDER_COLOR,
  dark: themeDark.CHAT_INNER_BORDER_COLOR
});
export const chatBorderColor = theme('mode', {
  light: themeLight.CHAT_BORDER_COLOR,
  dark: themeDark.CHAT_BORDER_COLOR
});
export const chatBackgroundColor = theme('mode', {
  light: themeLight.CHAT_BACKGROUND_COLOR,
  dark: themeDark.CHAT_BACKGROUND_COLOR
});
export const shoutboxInputBorderColor = theme('mode', {
  light: themeLight.SHOUTBOX_INPUT_BORDER_COLOR,
  dark: themeDark.SHOUTBOX_INPUT_BORDER_COLOR
});
export const breadcrumbLinkColor = theme('mode', {
  light: themeLight.BREADCRUMB_LINK_COLOR,
  dark: themeDark.BREADCRUMB_LINK_COLOR
});
export const rowLinkColor = theme('mode', {
  light: themeLight.ROW_LINK_COLOR,
  dark: themeDark.ROW_LINK_COLOR
});
export const defaultFontColor = theme('mode', {
  light: themeLight.DEFAULT_FONT_COLOR,
  dark: themeDark.DEFAULT_FONT_COLOR
});
export const rowHoverColor = theme('mode', {
  light: themeLight.ROW_HOVER_COLOR,
  dark: themeDark.ROW_HOVER_COLOR
});
export const usernameColor = theme('mode', {
  light: themeLight.USERNAME_COLOR,
  dark: themeDark.USERNAME_COLOR
});
export const playerListHeaderColor = theme('mode', {
  light: themeLight.PLAYER_LIST_HEADER_COLOR,
  dark: themeDark.PLAYER_LIST_HEADER_COLOR
});
export const primaryColor = theme('mode', {
  light: themeLight.PRIMARY_COLOR,
  dark: themeDark.PRIMARY_COLOR
});
export const avatarHoverShadowColor = theme('mode', {
  light: themeLight.AVATAR_HOWER_SHADOW_COLOR,
  dark: themeDark.AVATAR_HOWER_SHADOW_COLOR
});
export const chatHeaderColor = theme('mode', {
  light: themeLight.CHAT_HEADER_COLOR,
  dark: themeDark.CHAT_HEADER_COLOR
});
export const chatMyMessageColor = theme('mode', {
  light: themeLight.CHAT_MY_MESSAGE_COLOR,
  dark: themeDark.CHAT_MY_MESSAGE_COLOR
});
export const headerTopColor = theme('mode', {
  light: themeLight.HEADER_TOP_COLOR,
  dark: themeDark.HEADER_TOP_COLOR
});
export const leftBarBGColor = theme('mode', {
  light: themeLight.LEFT_BAR_BG_COLOR,
  dark: themeDark.LEFT_BAR_BG_COLOR
});
export const leftBarInputColor = theme('mode', {
  light: themeLight.LEFT_BAR_INPUT_COLOR,
  dark: themeDark.LEFT_BAR_INPUT_COLOR
});
export const leftBarIconColor = theme('mode', {
  light: themeLight.LEFT_BAR_ICON_COLOR,
  dark: themeDark.LEFT_BAR_ICON_COLOR
});
export const footerBGColor = theme('mode', {
  light: themeLight.FOOTER_BG_COLOR,
  dark: themeDark.FOOTER_BG_COLOR
});
export const backgroundColor = theme('mode', {
  light: themeLight.BACKGROUND_COLOR,
  dark: themeDark.BACKGROUND_COLOR
});
export const postBGColor = theme('mode', {
  light: themeLight.POST_BG_COLOR,
  dark: themeDark.POST_BG_COLOR
});
export const rightPanelColor = theme('mode', {
  light: themeLight.RIGHT_PANEL_COLOR,
  dark: themeDark.RIGHT_PANEL_COLOR
});
export const boxBGColor = theme('mode', {
  light: themeLight.BOX_BG_COLOR,
  dark: themeDark.BOX_BG_COLOR
});
export const boxBorderColor = theme('mode', {
  light: themeLight.BOX_BORDER_COLOR,
  dark: themeDark.BOX_BORDER_COLOR
});
export const BoxTopFontColor = theme('mode', {
  light: themeLight.BOX_TOP_FONT_COLOR,
  dark: themeDark.BOX_TOP_FONT_COLOR
});
export const postTopMessageColor = theme('mode', {
  light: themeLight.POST_TOP_MESSAGE_COLOR,
  dark: themeDark.POST_TOP_MESSAGE_COLOR
});

//------------------------

// const theme = {
// 	PRIMARY_COLOR: '#27488a',
// 	AVATAR_HOWER_SHADOW_COLOR: '#fff',
// 	CHAT_HEADER_COLOR: 'rgb(249, 249, 249)',
// 	CHAT_MY_MESSAGE_COLOR: '#27488a',
// 	FORUMS_CATEGORY_HEADER_TEXT_COLOR: '#1a47a5',
// 	HEADER_TOP_COLOR: '#0d2963',
// 	UNREAD_MESSAGES_COUNTER_BG_COLOR: '#e24040',
// 	LEFT_BAR_BG_COLOR: '#06183c',
// 	LEFT_BAR_INPUT_COLOR: '#0f1d3a',
// 	LEFT_BAR_ICON_COLOR: '#1e4aa7',
// 	FOOTER_BG_COLOR: '#131619',
// 	BACKGROUND_COLOR: '#ebecf1',
// };
// const theme = {
// 	PRIMARY_COLOR: '#424c58',
// 	AVATAR_HOWER_SHADOW_COLOR: '#fff',
// 	CHAT_HEADER_COLOR: 'rgb(249, 249, 249)',
// 	CHAT_MY_MESSAGE_COLOR: '#27488a',
// 	FORUMS_CATEGORY_HEADER_TEXT_COLOR: '#292c35',
// 	HEADER_TOP_COLOR: '#292c35',
// 	UNREAD_MESSAGES_COUNTER_BG_COLOR: '#e24040',
// 	LEFT_BAR_BG_COLOR: '#292c35',
// 	LEFT_BAR_INPUT_COLOR: '#282828',
// 	LEFT_BAR_ICON_COLOR: '#7b7f85',
// 	FOOTER_BG_COLOR: '#131619',
// 	BACKGROUND_COLOR: '#424c58',
// };
// const theme2 = {
// 	PRIMARY_COLOR: '#424c58',
// 	DISABLED_COLOR: '#0000000d',
// 	AVATAR_HOWER_SHADOW_COLOR: '#fff',
// 	CHAT_HEADER_COLOR: 'rgb(249, 249, 249)',
// 	CHAT_MY_MESSAGE_COLOR: '#27488a',
// 	FORUMS_CATEGORY_HEADER_TEXT_COLOR: '#292c35',
// 	HEADER_TOP_COLOR: '#292c35',
// 	UNREAD_MESSAGES_COUNTER_BG_COLOR: '#e24040',
// 	LEFT_BAR_BG_COLOR: '#292c35',
// 	LEFT_BAR_INPUT_COLOR: '#282828',
// 	LEFT_BAR_ICON_COLOR: '#7b7f85',
// 	FOOTER_BG_COLOR: '#131619',
// 	BACKGROUND_COLOR: '#ebecf1',
// 	POST_BG_COLOR: '#fff',
// 	RIGHT_PANEL_COLOR: '#fff',
// 	BOX_BG_COLOR: '#fff',
// 	BOX_BORDER_COLOR: '#dcd7d7', //#e4e7ed
// 	BOX_TOP_FONT_COLOR: '#888080',
// 	POST_TOP_MESSAGE_COLOR: '#403d3d',
// };
