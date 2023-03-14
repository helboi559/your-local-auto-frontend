import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/customer";

export const createCustomer = async (customer, dispatch) => {
    dispatch({ type: "START_LOADING" });
    console.log(customer)
    const result = await fetchData(
        { url: url + "/create", body: customer },
        dispatch
    );
    //if customer exists
    if (result) {
        dispatch({ type: "UPDATE_ALERT", payload: {
            open: true,
            severity: "success",
            message: "Customer created successfully",
        } });
        }
    dispatch({ type: "END_LOADING" });
};
