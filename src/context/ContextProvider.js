import {
    useContext,
    createContext,
    useReducer,
    useEffect
} from 'react'
import reducer from './reducer'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const initialState = {
    openLogin:false,
    currentUser:null,
    loading:false,
    alert:{open:false,severity:'info',message:''},
    profile:{open:false, file:null , photoURL:''},
    section:0,
    customers:[],
    customer:null,
    appointments:[],
    appointmentCalendar:{date:dayjs()},
    appointment:null,
    services:[],
    service:null,
    
}

const Context = createContext(initialState)

export const useValue = () => {
    return useContext(Context)
}
const ContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState)
    // console.log("currentUser",state.currentUser)
    useEffect(()=> {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'))
      if(currentUser) {
        dispatch({type:'UPDATE_USER',payload:currentUser})
      }
    },[])
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Context.Provider value={{state,dispatch}}>
          {children}
      </Context.Provider>
    </LocalizationProvider>
  )
}

export default ContextProvider