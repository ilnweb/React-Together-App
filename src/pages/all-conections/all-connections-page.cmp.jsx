import React from 'react';
import './all-connections-page.scss';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import HeaderContainer from '../../components/header-container/header-container.cmp';
import CardAllConnections from '../../components/card-all-connections/card-all-connections.cmp';
import SearchModal from '../../components/search-modal/search-modal.cpm';
import { MdArrowBack } from 'react-icons/md';

class AllConectionsPage extends React.Component {
	render() {
		const { currentUser } = this.props;
		return (
			<div className="all-connections">
				<HeaderContainer>
					<MdArrowBack className="back-button" onClick={() => this.props.history.goBack()} />
					<h1>Your connections</h1>
				</HeaderContainer>
				<SearchModal />
				<div className="all-connections-display mt-30 flex-c-c">
					{currentUser &&
            currentUser.connections.map((item) => <CardAllConnections  key={item.connectionId} item={item}/>)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(AllConectionsPage);
