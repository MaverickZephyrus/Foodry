// currentData is mainly for visual purposes as once you load from AsyncStorage
// the value is replaced it can actaually be initially set as empty.
// for the meantime, we populate it so we can get state before actually manipulating it
const appState = {
  currentData: []
};

export const DataReducer = (state = appState, action) => {
  const { currentData } = state;

  switch (action.type) {
    // make a case to identify what you want to do
    // make sure to return state at the end or it will run the next case
    // after the current case.
    case "LOAD_FROM_ASYNCSTORAGE":
        // payload from DataActions loadFromAsyncStorage is saved as constant
        // can also do currentData = action.payload to avoid overusage of
        // constants declared. every constant regardless of case cannot be the
        // same name.
        const loaded = action.payload;
        for (i in loaded) {
            currentData.push(loaded[i]);
        }

      return state;


        case 'SAVE_TO_ASYNCSTORAGE':

            for(var i = 0; i < currentData.length; i++) {
                if (currentData[i].id === action.payload[0]) {
                    console.log('match')
                    currentData[i].foods.push(action.payload[1])
                } else {
                    console.log('no match')
                }
            }

            console.log(currentData)

            return state
        
        // default return when no case is used
        default:
            return state
    }
}

// NOTE TO TRAVIS: ADD THIS LINE WHEN SAVING TO ASYNCSTORAGE AFTER ADDING FOOD
// AsyncStorage.setItem('userData', JSON.stringify(currentData));