import React from 'react';
import './with-spinner.scss';

const WithSpinner = (ComponentLoading) => ({ isLoading, ...otherProps }) => {
	return isLoading ? (
		<div className="loader-container">
			<div className="loader4">
				<div className="container" />
				<div className="line" />
				<div className="line2" />
			</div>
		</div>
	) : (
		<ComponentLoading {...otherProps} />
	);
};

export default WithSpinner;
