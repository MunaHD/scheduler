import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useVisualMode(initial) {

  const setDay = day => setState({ ...state, day });
  const daysURL = 'api/days';
  const appointmentURL = 'api/appointments';
  const interviewersURL = '/api/interviewers';

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  function updateSpots(id, isDeleting) {
    let days = [...state.days];
    let dayToChange = days.find(day => day.appointments.includes(id));
    // get the day to update index
    let indexToUpdate = days.indexOf(dayToChange);
    // depending on the boolean, it will either increment or decrement
    if (isDeleting) {
      dayToChange.spots += 1;
    } else {
      dayToChange.spots -= 1;
    }
    days[indexToUpdate] = dayToChange;
    return days
  }
  
  
  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
     
   
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
         //days variable holds the new days array with spot incremented
        let days = updateSpots(id, false)
        setState({ ...state, appointments, days })
        

    })
    
    
  }
  function deleteInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }; 
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        //days variable holds the new days array with spot decremented
        let days = updateSpots(id, true)
        setState({ ...state, appointments, days})
      })
  }
  
  useEffect(() => {
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentURL),
      axios.get(interviewersURL)
    ]).then(all => {
      const [first, second, third] = all
      setState(prev => ({ ...prev, days: first.data, appointments: second.data, interviewers: third.data }))
    })
      
  }, []);
  return {state, setDay, bookInterview, deleteInterview }
}