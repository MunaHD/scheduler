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

   console.log("state.days", state.days)
  

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    //console.log("app",appointment)
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
     
   
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      setState({ ...state, appointments })
      let days = [ ...state.days ];
      // get the day to update
      let dayToUpdate = days.find(day => day.appointments.includes(id));
      // get the day to update's index
      let indexToUpdate = days.indexOf(dayToUpdate);
      // depending on the type, it will either increment, decrement, or do nothing.
      dayToUpdate.spots -= 1;
      
      days[indexToUpdate] = dayToUpdate;
      return days;
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
        setState({ ...state, appointments })
        let days = [ ...state.days ];
        // get the day to update
        let dayToUpdate = days.find(day => day.appointments.includes(id));
        // get the day to update's index
        let indexToUpdate = days.indexOf(dayToUpdate);
        // depending on the type, it will either increment, decrement, or do nothing.
        dayToUpdate.spots += 1;
        
        days[indexToUpdate] = dayToUpdate;
        return days;
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