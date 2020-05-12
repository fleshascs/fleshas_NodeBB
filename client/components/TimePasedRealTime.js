import React, { Component } from 'react';
import { messageDate } from '_core/utils';

const UPDATE_EVERY_SECONDS = 1;

class TimePasedRealTime extends Component {
	constructor(props) {
		super(props);

		this.task = null;
		this.state = {
			timePasedText: '',
		};
	}

	componentDidMount() {
		this.setState({ timePasedText: messageDate(this.props.time) });
		this.startRecalculating();
	}

	componentWillUnmount() {
		this.stopRecalculating();
	}

	render() {
		return <>{this.state.timePasedText}</>;
	}

	startRecalculating() {
		this.task = setInterval(() => {
			this.setState({ timePasedText: messageDate(this.props.time) });
		}, 1000 * UPDATE_EVERY_SECONDS);
	}

	stopRecalculating() {
		clearInterval(this.task);
	}
}

export default TimePasedRealTime;
