import React from 'react';
import styled from 'styled-components';
import {Button} from 'antd';

// const Container = styled.div`
// 	margin-bottom: 10px;
// 	background: #435a69;
// 	display: flex;
// 	align-items: center;
// 	background-repeat: no-repeat;
// 	padding: 31px 18px;
// 	background: linear-gradient(
// 			to bottom,
// 			rgba(0, 0, 0, 0.4),
// 			rgba(19, 18, 19, 0.4)
// 		),
// 		url(
// 			https://fiverr-res.cloudinary.com/image/upload/t_smartwm/t_collaboration_hd,
// 			q_auto,
// 			f_auto/v1/secured-attachments/message/delivery_attachments/8de82934d5c7070a27b557c38ae329e8-1566875875459/mock%20up.jpg?__cld_token__=exp=1566941865~hmac=d98009dcd0a14d46476b692cd41e7c225dae3184414db8f6a8a8e223b684c093
// 		);
// 	background-size: 424px auto;
// 	background-position: 30px -54px;
// `;

const Container = styled.div`
	box-shadow: 0 9px 35px rgba(0,0,0,0.59);
	vertical-align: middle;
	width: 100%;
	margin: 0 0px 16px;
	text-align: left;
	position: relative;
	min-height: 127px;
	display: flex;
	flex-direction: row;
	background: linear-gradient(315deg,#58424a 0,#e0003e 100%);
`;
const Text = styled.div`
	text-transform: uppercase;
	color: #ed7979;
	flex: 1;
	padding: 1rem;
`;

export default function NewsCard() {
	return (
		<Container>
			<img src="/assets/uploads/profile/8581-profileavatar.png" alt="" />
			<Text>
				Visiems privilegijos sutrumpintos -3d.
				<br></br>
				<Button
					href=""
					type='link'
				>
					Daugiau informacijos
				</Button>
			</Text>
		</Container>
	);
}
