import styled from 'styled-components';

export const NumberOfMessages = styled.div`
	position: absolute;
	top: -1px;
	border-radius: 50%;
	height: 18px;
	width: 17px;
	text-align: center;
	left: 12px;
	background: #424c58;
	border-radius: 10px;
	color: #8d949e;
	font-weight: normal;
	line-height: 17px;
	font-size: 0.6rem;
	display: none;
	color: #ced0d3;
`;

export const MessagesButtonContainer = styled.div`
	position: relative;
	bottom: 0;
	display: flex;
	cursor: pointer;

	& .active {
		color: rgb(55,170,213);
	}

	& .active + ${NumberOfMessages} {
		display: block !important;
	}
`;
