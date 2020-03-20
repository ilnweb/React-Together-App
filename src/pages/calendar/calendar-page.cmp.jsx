import React from 'react';
import './calendar-page.scss';
import HeaderContainer from '../../components/header-container/header-container.cmp';
import MyCalendar from '../../components/calendar/calendar.cmp';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectConnectionData } from '../../redux/connection/connection.selectors';
import { createStructuredSelector } from 'reselect';

class CalendarPage extends React.Component {
  state = {
    
  }
  render() {
    const { connection } = this.props;
    console.log(connection);
		return (
			<div className="calendar-page">
				<HeaderContainer>
					<h1> Calendar page</h1>
				</HeaderContainer>
				<div className="my-calendar">
					<MyCalendar />
				</div>
			</div>
		);
	}
}
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	connection: selectConnectionData
});

export default connect(mapStateToProps)(CalendarPage);
