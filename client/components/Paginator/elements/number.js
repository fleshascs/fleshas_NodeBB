import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { primaryColor } from '_theme';

const Container = styled.a`
	display: flex;
	border-radius: 4px;
	margin-left: 0.5rem;
	margin-right: 0.5rem;
	width: 30px;
	height: 30px;
	justify-content: center;
	align-items: center;
	color: #484848;
	background: #fff;
	font-weight: 500;
	text-decoration: none;
	transition: transform 0.2s;

	&.active {
		background: ${primaryColor};
		color: #fff;
	}

	&:hover {
		transform: scale(1.1);
	}
`;

class Number extends Component {
	render() {
		const { page, href, as } = this.props;
		return (
			<Link href={href} as={as} passHref>
				<Container className={this.props.className}>{page}</Container>
			</Link>
		);
	}
}

export default Number;
