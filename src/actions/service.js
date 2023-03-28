import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/service";

export const fetchServices = async (dispatch) => {
  const result = await fetchData({ url: url + "/all", method:"GET" }, dispatch);
//   console.log("url", url)
//   console.log("result", result)
  if (result) {
    dispatch({ type: "UPDATE_SERVICES", payload: result });
  }
}