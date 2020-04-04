import React from 'react';
import './all-connections-page.scss';
import HeaderContainer from '../../components/header-container/header-container.cmp';
import { Button } from 'antd';
import SearchModal from '../../components/search-modal/search-modal.cpm';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import Moment from 'react-moment';
import { MdArrowBack } from "react-icons/md";

class AllConectionsPage extends React.Component {
	render() {
		const { currentUser } = this.props;
		return (
			<div className="all-connections">
        <HeaderContainer>
        <MdArrowBack className="back-button" onClick={()=>this.props.history.goBack()}/>
					<h1>Your connections</h1>
				</HeaderContainer>
				<SearchModal />
				<div className="all-connections-display mt-30">
					{currentUser &&
						currentUser.connections.map((item) => {
							return (
								<div key={item.connectionId} className="all-connections-single flex-c">
									<div className="flex-c">
										<img src={item.connectionImg} alt="" />
										<div className="flec-c-c ml-10 mr-30">
											<h2>{item.connectionName}</h2>
											<div className="date-color">
												Created: <Moment className="date-color" fromNow date={item.createdAt.toDate()} />
											</div>
										</div>
									</div>
									<Button size="large" type="primary">
										Open
									</Button>
								</div>
							);
						})}
				</div>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(AllConectionsPage);
