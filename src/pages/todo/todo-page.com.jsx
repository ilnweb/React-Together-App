import React from 'react';
import './todo-page.com';
import LoadingScreen from '../../components/loading-screen/loading-screen.cmp';
import HeaderContainer from '../../components/header-container/header-container.cmp';

const ToDoPage = () => (
  <div className="todo-page">
  <LoadingScreen img="https://res.cloudinary.com/ilnphotography/image/upload/v1584784280/HomePage/undraw_email_campaign_qa8y_bycdui.svg" title="Coming soon, Shared To-Do List!" inside/> 
    <HeaderContainer>
      <h1>Todo page</h1>
    </HeaderContainer>
	</div>
);

export default ToDoPage;