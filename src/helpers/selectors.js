export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find(i => i.name === day);
  if (filteredDays) {
    const { appointments } = filteredDays
    const filteredappointments = appointments.map(i => state.appointments[i])  
    return filteredappointments; 
  } 
  return []
  
}

export function getInterview(state, interview) {
  
 if (interview) {
  const interviewerId = interview.interviewer
  const interviewInfo = { ...interview, interviewer: state.interviewers[interviewerId] }
  return interviewInfo
}

return null

}



export function getInterviewersForDay(state, day) {
  const filteredAppointments = state.days.find(i => i.name === day);
  if (!filteredAppointments) {
    return []
  }
  
  const { interviewers } = filteredAppointments
  const filteredInter = interviewers.map(i => state.interviewers[i])

  return filteredInter;
  
}

