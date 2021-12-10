export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find(i => i.name === day);
  if (!filteredDays) {
    return []
  }
  
  const { appointments } = filteredDays
  const filteredappointments = appointments.map(i => state.appointments[i])
  
  return filteredappointments;
  
}

export function getInterview(state, interview) {
  if (!interview) {
   return null
  }
  
  const interviewerId = interview.interviewer
  const interviewInfo = {
   student: interview.student,
   interviewer: state.interviewers[interviewerId]
  }
  
 return interviewInfo

}
