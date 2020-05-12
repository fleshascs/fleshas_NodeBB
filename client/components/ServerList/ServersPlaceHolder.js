import React from 'react';
import ContentLoader from 'react-content-loader';

const PlaceHolder = () => (
	<div className="mb-3 px-2" style={{ height: '40px' }}>
		<ContentLoader
			height={140}
			primaryColor={'#9494941a'}
			secondaryColor={'#9494941a'}
		>
			<rect x="0" y="0" rx="5" ry="5" width="30" height="30" />
			<rect x="60" y="0" rx="4" ry="4" width="270" height="13" />
			<rect x="60" y="20" rx="3" ry="3" width="250" height="10" />
			<rect x="364.4" y="0" rx="5" ry="5" width="30" height="30" />
		</ContentLoader>
	</div>
);

function createPlaceHolder(shoutsNum = 1) {
	let placeHolders = [];
	for (let j = 0; j < shoutsNum; j++) {
		placeHolders.push(<PlaceHolder key={j} />);
	}
	return placeHolders;
}

const ShoutsPlaceHolder = () => (
	<div className="mt-3">{createPlaceHolder(11)}</div>
);
export default ShoutsPlaceHolder;
