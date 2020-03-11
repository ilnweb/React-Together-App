import React from 'react';
import './all-connections-page.scss';
import HeaderContainer from '../../components/header-container/header-container.cmp';
// import { Button } from 'antd';
import SearchModal from '../../components/search-modal/search-modal.cpm';

class AllConectionsPage extends React.Component {
	render() {
		return (
			<div className="all-connections flex-c-c">
				<HeaderContainer>
					<h1>Your connections</h1>
				</HeaderContainer>
				<SearchModal />
			</div>
		);
	}
}

export default AllConectionsPage;
