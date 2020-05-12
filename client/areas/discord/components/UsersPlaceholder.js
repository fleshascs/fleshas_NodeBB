import React from 'react';
import ContentLoader from 'react-content-loader';

const PlaceHolder = () => (
	<div className="mb-3 px-2" style={{ height: '20px' }}>
		<ContentLoader
			height={30}
			primaryColor={'#9494941a'}
			secondaryColor={'#9494941a'}
		>
			<circle cx="35" cy="15" r="15" />
			<rect x="60" y="0" rx="4" ry="10" width="360" height="25" />
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
