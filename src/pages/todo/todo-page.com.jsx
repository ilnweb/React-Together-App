import React from 'react';
import './todo-page.scss';
import LoadingScreen from '../../components/loading-screen/loading-screen.cmp';
import HeaderContainer from '../../components/header-container/header-container.cmp';
import TodoList from '../../components/todo-list/todo-list.cpm';
import AddSpending from '../../components/add-spending/add-spending.cmp';
import FormToDo from '../../components/form-todo/form-todo.cmp';

class ToDoPage extends React.Component {
	state = {};

	render() {
		return (
			<div className="todo-page">
				{
					//<LoadingScreen
					// 	img="https://res.cloudinary.com/ilnphotography/image/upload/v1584784280/HomePage/undraw_email_campaign_qa8y_bycdui.svg"
					// 	title="Coming soon, Shared To-Do List!"
					// 	inside
					// />
				}
				<HeaderContainer>
					<h1>Todo page</h1>
        </HeaderContainer>
        <AddSpending>
					<FormToDo/>
				</AddSpending>
          <TodoList/>
			</div>
		);
	}
}

export default ToDoPage;
