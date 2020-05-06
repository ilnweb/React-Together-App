import React from 'react';
import './todo-page.scss';
// import LoadingScreen from '../../components/loading-screen/loading-screen.cmp';
import HeaderContainer from '../../components/header-container/header-container.cmp';
import TodoList from '../../components/todo-list/todo-list.cpm';
import AddSpending from '../../components/add-spending/add-spending.cmp';
import FormToDo from '../../components/form-todo/form-todo.cmp';
import { firestore } from '../../firebase/firebase.config';
import firebase from 'firebase/app';
import { connect } from 'react-redux';
import { selectConnectionData } from '../../redux/connection/connection.selectors';
import { createStructuredSelector } from 'reselect';

class ToDoPage extends React.Component {
	state = {
		isLoading: true
	};

	dispatchItem = (readyItem) => {
		const { connection } = this.props;
		const collectionSet = firestore.doc(`connections/${connection.id}/userData/list`);
		collectionSet.update({
			[readyItem.id]: {
				name: readyItem.name,
				date: readyItem.date,
				items: []
			}
		});
	};

	deleteItem = (readyItem) => {
		const { connection } = this.props;
		const collectionSet = firestore.doc(`connections/${connection.id}/userData/list`);
		collectionSet.update({
			[readyItem]: firebase.firestore.FieldValue.delete()
		});
	};

	render() {
		const { connection } = this.props;
		const lists = connection && connection.userData.list;
		return (
			<div className="todo-page">
				{
					// lists && !lists.length && (
					// <LoadingScreen
					// 	img="https://res.cloudinary.com/ilnphotography/image/upload/v1584784280/HomePage/undraw_email_campaign_qa8y_bycdui.svg"
					//   title="Shared To-Do List"
					// 	inside
					// />
					// )
				}
        <HeaderContainer>
          <div className='page-title'>Group To-Do lists</div>
					<div className="flex-c-c mb-20 mt-5">
						<h2 className="mb-10">{connection && connection.connectionName}</h2>
						<div
							className="conect-img"
							style={{ backgroundImage: `url(${connection && connection.connectionImg})` }}
							alt=""
						/>
					</div>
				</HeaderContainer>
				<AddSpending>
					<FormToDo dispatchItem={this.dispatchItem} />
				</AddSpending>
				<div className="lists-container mb-50">
					{lists &&
						Object.keys(lists).sort().map((key, index) => (
							<TodoList
								key={index}
								list={lists[key]}
								listID={key}
								connectionID={connection.id}
								deleteItem={this.deleteItem}
							/>
						))}
				</div>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	connection: selectConnectionData
});

export default connect(mapStateToProps)(ToDoPage);
