import styled from 'styled-components';
import { primaryColor, rowHoverColor, rowLinkColor } from '_theme';

export const Container = styled.div`
	display: flex;
	padding-left: 0.25rem;
	padding-bottom: 0.25rem;
	padding-top: 0.25rem;
	padding-right: 0.5rem;
	color: #000;

	&:hover {
		color: ${primaryColor} !important;
		text-decoration: none;
		background: ${rowHoverColor};
	}
`;
export const PostLink = styled.a`
	color: #9c9c9c;
`;
export const LastPost = styled.div`
	display: flex;
	flex-basis: 0;
	flex-grow: 1;
	max-width: 28%;
	border-left: 3px;
	overflow: hidden;

	@media (max-width: 750px) {
		display: none;
	}
`;
export const ViewsColumn = styled.div`
	flex-basis: 15%;
	text-align: center;

	@media (max-width: 750px) {
		display: none;
	}
`;

export const AnswersColumn = styled(ViewsColumn)``;

export const Important = styled.div`
	font-size: 13px;
	color: ${primaryColor};
	font-weight: bold;
`;
export const ImportantBig = styled.div`
	font-weight: 100;
	font-size: 22px;
	color: ${primaryColor};
`;
export const NotImportant = styled.div`
	font-size: 12px;
	color: #9c9c9c;
`;

export const CategoryName = styled.div`
	font-weight: 500;
	font-size: 15px;
	color: ${rowLinkColor};
`;
export const CategoryDescription = styled.div`
	font-size: 12px;
	color: #9c9c9c;
`;
