import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/appointment";

export const createAppointment = async (appointment, dispatch) => {
    dispatch({ type: "START_LOADING" });
    console.log(appointment)
    const result = await fetchData(
        { url: url + "/create-appointment", body: appointment },
        dispatch
    );
    //if appointment exists
    if (result) {
        dispatch({ type: "UPDATE_ALERT", payload: {
            open: true,
            severity: "success",
            message: "Appointment created successfully",
        } });
        }
    dispatch({ type: "END_LOADING" });
}

export const getAppointments = async (dispatch) => {
    // dispatch({ type: "START_LOADING" });
    const result = await fetchData(
        { url: url + "/all-appointments" ,
          method: "GET"
        }, dispatch);
    if (result) {
        dispatch({ type: "UPDATE_APPOINTMENTS", payload: result });
        }
}