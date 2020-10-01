import React from "react";
import "./calendar-page.scss";
import HeaderContainer from "../../components/header-container/header-container.cmp";
import MyCalendar from "../../components/calendar/calendar.cmp";
// import LoadingScreen from '../../components/loading-screen/loading-screen.cmp';
import NoGroupScreen from "../../components/no-group-screen/no-group-screen.cmp";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectConnectionData } from "../../redux/connection/connection.selectors";
import { createStructuredSelector } from "reselect";

class CalendarPage extends React.Component {
  state = {};
  render() {
    return (
      <div className="calendar-page">
        <NoGroupScreen
          img="https://res.cloudinary.com/ilnphotography/image/upload/v1584784280/HomePage/undraw_events_2p66_lvgvqw.svg"
          title="Coming soon, Shared Calendar!"
          inside
          mainTitle="Callendar"
        />
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
  connection: selectConnectionData,
});

export default connect(mapStateToProps)(CalendarPage);
