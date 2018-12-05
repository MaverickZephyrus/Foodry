// data is passed into payload. refer to DataReducer line 279
export const loadFromAsyncStorage = data => ({
    type: 'LOAD_FROM_ASYNCSTORAGE',
    payload: data
});

export const saveToAsyncStorage = data => ({
    type: 'SAVE_TO_ASYNCSTORAGE',
    payload: data 
}) 