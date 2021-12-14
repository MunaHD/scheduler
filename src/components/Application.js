import React from "react";
import DayList from './DayList';
import "components/Application.scss";
import Appointment from "components/Appointment"
import useApplicationData from 'hooks/useApplicationData';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"

export default function Application(props) {
  
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData()

  
  const getInterviewers = getInterviewersForDay(state, state.day);
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const schedule = dailyAppointments.map((app) => {
    const interview = getInterview(state, app.interview)

    return (
      <Appointment
        key={app.id}
        {...app}
        interview={interview}
        interviewers={getInterviewers}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
      />)
  } )

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList
        days={state.days}
        value={state.day}
        onChange={setDay}
      />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
