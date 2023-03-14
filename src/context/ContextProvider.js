import {
    useContext,
    createContext,
    useReducer,
    useEffect
} from 'react'
import reducer from './reducer'


const initialState = {
    openLogin:false,
    currentUser:null,
    loading:false,
    alert:{open:false,severity:'info',message:''},
    profile:{open:false, file:null , photoURL:''},
    section:0,
    customers:[],
    customer:null,
    
}

const Context = createContext(initialState)

export const useValue = () => {
    return useContext(Context)
}
const ContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState)
    console.log("section",state.section)
    useEffect(()=> {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'))
      if(currentUser) {
        dispatch({type:'UPDATE_USER',payload:currentUser})
      }
    },[])
  return (
    <Context.Provider value={{state,dispatch}}>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider