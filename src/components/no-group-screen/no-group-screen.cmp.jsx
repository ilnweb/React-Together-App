import React from 'react';
import './no-group-screen.scss';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const NoGroupScreen = ({ title, button, img, isLoading, inside ,mainTitle}) => {
	return (
		<div className={`flex-c-c isLoading ${inside && 'inside'}`}>
			<div className="logo-container flex-c-c">
				<h1 className="logo-2">{mainTitle}</h1>
				<p>{title}</p>
				{button && (
					<Link to="/all-connections">
						<Button type="primary" shape="round" size="large" className="mt-15">
							Create new Group
						</Button>
					</Link>
				)}
				<img src={img} alt="" />
			</div>
		</div>
	);
};

export default NoGroupScreen;