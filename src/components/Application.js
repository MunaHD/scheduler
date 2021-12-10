import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from './DayList';
import "components/Application.scss";
import Appointment from "components/Appointment"
import { getAppointmentsForDay } from "helpers/selectors"

export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  //const setDays = days => setState(prev => ({ ...prev, days }));
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  useEffect(() => {
    const daysURL = 'api/days';
    const appointmentURL = 'api/appointments';
    const interviewersURL = '/api/interviewers';
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentURL),
      axios.get(interviewersURL)
    ]).then(all => {
      setState(prev => ({ ...prev, days:all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
      
  }, []);
  
  //setDays(response.data)
  const schedule = dailyAppointments.map((app) => {
    const interview = getInterview(state, app.interview)
    return (
      <Appointment
        key={app.id}
        {...app}
        interview={interview} //might not work
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

