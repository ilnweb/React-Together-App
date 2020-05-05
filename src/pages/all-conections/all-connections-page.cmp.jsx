import React from 'react';
import './all-connections-page.scss';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { pullConnection, deleteConnectionFromFirebase } from '../../firebase/firebase.config';
import { setConnection } from '../../redux/connection/connection.actions';
import HeaderContainer from '../../components/header-container/header-container.cmp';
import CardAllConnections from '../../components/card-all-connections/card-all-connections.cmp';
import SearchModal from '../../components/search-modal/search-modal.cpm';
import { MdArrowBack } from 'react-icons/md';

class AllConectionsPage extends React.Component {
	deleteConnection = (connectionToDelete) => {
		const { currentUser } = this.props;
		deleteConnectionFromFirebase(connectionToDelete, currentUser.id);
	};
	dispatchConnection = (connection) => {
		const { setConnection } = this.props;
		pullConnection(connection.connectionId, setConnection);
	};
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
						currentUser.connections
							.map((item) => (
                <CardAllConnections key={item.connectionId} item={item} dispatchConnection={this.dispatchConnection} deleteConnection={this.deleteConnection}/>
							))
							.reverse()}
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	setConnection: (connection) => dispatch(setConnection(connection))
});

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(AllConectionsPage);
