import React from 'react';
import styled from 'styled-components';

const Label = styled.div`
	font-size: 0.85em;
	font-style: inherit;
	line-height: 1.3;
	color: #6b778c;
	font-weight: 600;
	display: inline-block;
`;

export default props => (
	<Label classNames={props.classNames}>{props.children}</Label>
);
