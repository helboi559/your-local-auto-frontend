import dayjs from "dayjs"

const reducer = (state,action) => {
    switch(action.type) {
        case "OPEN_LOGIN":
            return {...state, openLogin:true}
        case "CLOSE_LOGIN":
            return {...state, openLogin:false}
        case 'UPDATE_USER':
            localStorage.setItem('currentUser',JSON.stringify(action.payload))
            return { ...state, currentUser: action.payload };
        case 'START_LOADING':
            return { ...state, loading:true };
        case 'END_LOADING':
            return { ...state, loading:false };
        case 'UPDATE_ALERT':
            return { ...state, alert: action.payload };
        case 'UPDATE_PROFILE':
            return { ...state, profile: action.payload };
        case 'UPDATE_SECTION':
            return { ...state, section: action.payload };
        case 'UPDATE_CUSTOMERS':
            return { ...state, customers: action.payload };
        case 'UPDATE_CUSTOMER':
            return { ...state, customer: action.payload };
        case "UPDATE_APPOINTMENT_CALENDAR":
            return { ...state, appointmentCalendar: { ...state.appointmentCalendar, ...action.payload }};
        case "UPDATE_APPOINTMENTS":
            return { ...state, appointments: action.payload };
        case "UPDATE_APPOINTMENT":
            return { ...state, appointment: action.payload };
        case "UPDATE_FILTERED_APPOINTMENTS":
            return {...state , filteredAppointments: filterAppointmentsByDate(state.appointments, state.appointmentCalendar.date)}
        case "UPDATE_SERVICES":
            return { ...state, services: action.payload };
        case "UPDATE_SERVICE":
            return { ...state, service: action.payload };
        default:
            throw new Error('No action matched!')
    }
}

export default reducer

// function to filter appointments by only those that are on the same date as the calendar
const filterAppointmentsByDate = (appointments, date) => {
    
    let filteredAppointments = appointments;
    // console.log("appointments",appointments)
    // console.log("filteredAppointments",filteredAppointments)
    if (date) {
        filteredAppointments = appointments.filter(appointment => {
            return dayjs(appointment.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
        })
    }
    // console.log("appointments",appointments)
    // console.log("filteredAppointments",filteredAppointments)
    return filteredAppointments;
  
}

// disable date based on the length of the filtered appointments array

