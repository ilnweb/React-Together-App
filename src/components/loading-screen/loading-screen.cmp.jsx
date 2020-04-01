import React from 'react';
import './loading-screen.scss';
import { Button } from 'antd';

const LoadingScreen = ({ title, buttonText, img, isLoading, inside }) => {
	return (
		<div className={`flex-c-c isLoading ${inside && "inside"}`}>
			<div className="logo-container flex-c-c">
				<h1 className="logo-2">Together</h1>
				<p>{title}</p>
				<img src={img} alt="" />
			</div>
		</div>
	);
};

export default LoadingScreen;