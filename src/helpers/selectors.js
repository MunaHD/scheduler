import Appointment from "components/Appointment";

export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find(i => i.name === day);
  if (!filteredDays) {
    return []
  }
  
  const { appointments } = filteredDays
  const filteredappointments = appointments.map(i => state.appointments[i])
  return filteredappointments;
  
}