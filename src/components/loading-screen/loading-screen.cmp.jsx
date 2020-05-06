import React from 'react';
import './loading-screen.scss';
import { Button } from 'antd';
import { Link } from 'react-router-dom';


const LoadingScreen = ({ title, button, img, isLoading, inside }) => {
	return (
		<div className={`flex-c-c isLoading ${inside && "inside"}`}>
			<div className="logo-container flex-c-c">
				<h1 className="logo-2">Together</h1>
        <p>{title}</p>
        {button&& <Link to="/all-connections"><Button type="primary" shape="round" size="large" className="mt-15">Invite Friends</Button></Link>}
				<img src={img} alt="" />
      </div>
		</div>
	);
};

export default LoadingScreen;