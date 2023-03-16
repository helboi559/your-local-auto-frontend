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


// fetch customers from db
export const getCustomers = async (dispatch) => {
    // dispatch({ type: "START_LOADING" });
    const result = await fetchData(
        { url: url + "/all" ,
          method: "GET"
        }, dispatch);
    if (result) {
        dispatch({ type: "UPDATE_CUSTOMERS", payload: result });
        }
};


export const updateCustomer = async (updatedFields, _id, dispatch) => {
  return fetchData(
    {
      url: `${url}/update-customer/${_id}`,
      method: 'PATCH',
      body: updatedFields,
    },
    dispatch
  );
};