import React from 'react';
import './calendar-page.scss';
import HeaderContainer from '../../components/header-container/header-container.cmp';
import MyCalendar from '../../components/calendar/calendar.cmp';

const CalendarPage = () => (
	<div className="calendar-page">
		<HeaderContainer>
			<h1> Calendar page</h1>
    </HeaderContainer>
    <div className="my-calendar">
      <MyCalendar /> 
    </div>
	</div>
);

export default CalendarPage;
