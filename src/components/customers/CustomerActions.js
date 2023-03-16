import { Box, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Check, Save } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { useValue } from '../../context/ContextProvider';
import { getCustomers, updateCustomer } from '../../actions/customer';

const CustomerActions = ({params, rowId, setRowId}) => {
    const {dispatch, state: {currentUser, customers}} = useValue()
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const handleSubmit = async () => {
        //animate the save button
        setLoading(true)
        const {custName, custEmail, custPhone, _id, active} = params.row
        console.log("_id", _id)
        const result = await updateCustomer({custName, custEmail, custPhone, active}, _id,dispatch);
        //if update is successful add green checkmark
        if(result) {
            setSuccess(true)
            setRowId(null)
            //update the customer in the customers array
            getCustomers(dispatch)
            setLoading(false)
        }
        setLoading(false)
    }

    
     useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);
    // console.log("loading", loading)
    // console.log("params.id", params.id)
    // console.log("rowId", rowId)
    return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  )
}

export default CustomerActions