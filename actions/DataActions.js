// data is passed into payload. refer to DataReducer line 279
export const loadFromAsyncStorage = data => ({
    type: 'LOAD_FROM_ASYNCSTORAGE',
    payload: data
});