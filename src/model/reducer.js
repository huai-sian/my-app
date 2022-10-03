import axios from 'axios';

const initState = {
  data: [],
  isPending: false,
  error: null,
  recordData: [],
  filterData: []
};

export const fetchData = (selected) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'PENDING', payload: true });
    try {
      const res = await axios.get('https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json');
      dispatch({ type: 'FETCH_DATA', payload: res.data});
      dispatch({ type: 'RECORD_DATA', payload: res.data.result.records});
      let newData = []
      let items = selected === '' ? res.data.result.records : res.data.result.records.filter(item => item.Zone === selected)
      
      items.forEach((item, i) => {
        if(i % 10 === 0) {
          newData.push([])
        }
        const page = parseInt(i / 10)
        newData[page].push(item)
      })
      dispatch({ type: 'FILTERED_DATA', payload: newData});
      dispatch({ type: 'PENDING', payload: false });
      dispatch({ type: 'ERROR', payload: null });

    } catch(err) {
      dispatch({ type: 'PENDING', payload: false });
      dispatch({ type: 'ERROR', payload: 'Could not fetch the data' });
    }
    
  }
}

const dataReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, data: action.payload }
    case 'PENDING': 
      return { ...state, isPending: action.payload }
    case 'ERROR': 
      return { ...state, error: action.payload }
    case 'RECORD_DATA': 
      return { ...state, recordData: action.payload }
    case 'FILTERED_DATA': 
      return { ...state, filterData: action.payload }
    default:
      return state
  }
}

export { dataReducer };