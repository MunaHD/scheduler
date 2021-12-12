export function getAppointmentsForDay(state, day) {
  //get the day object that matches given day 
  const filteredDays = state.days.find(i => i.name === day);
  if (filteredDays) {
    const { appointments } = filteredDays
    //get the apointments that match the given day
    const filteredappointments = appointments.map(i => state.appointments[i])
    return filteredappointments; 
  } 
  return []
  
}

export function getInterview(state, interview) {
 // in the case that an interview is passed
 if (interview) {
  const interviewerId = interview.interviewer
  // get the student and interviewer information that matches the id in the interview object
   const interviewInfo = {
     ...interview,
     interviewer: state.interviewers[interviewerId]
   }
  return interviewInfo
}

return null

}



export function getInterviewersForDay(state, day) {
  //get the day object that matches given day 
  const filteredDays = state.days.find(i => i.name === day);
  if (!filteredDays) {
    return []
  }
  const { interviewers } = filteredDays
  //get interviewer information for the IDs in the interviewers array from filteredDays
  const filteredInterviewers = interviewers.map(i => state.interviewers[i])
  return filteredInterviewers;
  
}

