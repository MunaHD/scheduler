import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useVisualMode(initial) {
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // store the URLS seperately 
  const daysURL = '/api/days';
  const appointmentURL = '/api/appointments';
  const interviewersURL = '/api/interviewers';
  
  // get the data from the api calls and set state for days, appointments, interviewers
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

  
  function updateSpots(id, isDeleting) {
    // make an array from state.days
    let days = [...state.days];
    // find the day from the list of appointments by matching the id
    let dayToChange = days.find(day => day.appointments.includes(id));
    // get the index of the day in the day array 
    let indexToUpdate = days.indexOf(dayToChange);
    // depending on the boolean, it will either increment  if isDeleteing is true or decrement otherwise
    if (isDeleting) {
      dayToChange.spots += 1;
    } else {
      dayToChange.spots -= 1;
    }
    //replace the day we updated with the spots to it's place in the days array
    days[indexToUpdate] = dayToChange;
    //return the array that has the new list of days with the updated spots
    return days;
  }
  
  
  function bookInterview(id, interview) {
    // alter the individual appointment with the interview we pass in the parameter
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    //place the appointment we updated in the id that matches it 
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
         //days variable holds the new days array with spot decremented
        let days = updateSpots(id, false)
        //set state with the new appointments and days
        setState({ ...state, appointments, days })
      })   
  }


  function deleteInterview(id) {
     // alter the individual appointment and make the interview null
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    //place the appointment we updated in the id that matches it 
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }; 
    return axios.delete(`api/appointments/${id}`)
      .then(() => {
        //days variable holds the new days array with spot incremented
        let days = updateSpots(id, true)
        //set state with the new appointments and days
        setState({ ...state, appointments, days})
      })
  }
   
  return {state, setDay, bookInterview, deleteInterview }
}