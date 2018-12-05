import { AsyncStorage } from "react-native"
// currentData is mainly for visual purposes as once you load from AsyncStorage
// the value is replaced it can actaually be initially set as empty.
// for the meantime, we populate it so we can get state before actually manipulating it
const appState = {
<<<<<<< HEAD
  currentData: [
    {
      id: 'sus4l3',
      address: "4635 Kingsway, dfsafdaBurnaby, BC V5H 4L3",
      restaurant: "Sushi Gdsafarden",
      foods: [
        {
          food_name: "Sushi",
          img:
                "https://static1.squarespace.com/static/5849a1775016e1094e1d0763/t/5849ddc1197aeaa33558470e/1481235920269/2016-01-Sushi-plate.jpg?format=1500w",
          price: "$15.99",
          notes:
            "I love it for the user to search the list, we need to add a search bar on the top of the FlatList. FlatList has a prop to add any custom component to its header. I love it.",
          date: "Nov 15, 2018",
        },
        {
          food_name: "Pizza",
          img:
                "https://static1.squarespace.com/static/5849a1775016e1094e1d0763/t/5849ddc1197aeaa33558470e/1481235920269/2016-01-Sushi-plate.jpg?format=1500w",
          price: "$8.99",
          notes:
            "I love it for the user to search the list, we need to add a search bar on the top of the FlatList. FlatList has a prop to add any custom component to its header. I love it.",
          date: "Nov 15, 2018",
        }
      ]
    },
    {
        id: 'sus4l7',
        address: "4635 Kingsway, Burnaby, BC V5H 4L7",
        restaurant: "Sushi Garden",
        foods: [
          {
            food_name: "Sushi",
            img:
                  "https://static1.squarespace.com/static/5849a1775016e1094e1d0763/t/5849ddc1197aeaa33558470e/1481235920269/2016-01-Sushi-plate.jpg?format=1500w",
            price: "$15.99",
            notes:
              "I love it for the user to search the list, we need to add a search bar on the top of the FlatList. FlatList has a prop to add any custom component to its header. I love it.",
            date: "Nov 15, 2018",
          },
          {
            food_name: "Sushi",
            img:
                  "https://static1.squarespace.com/static/5849a1775016e1094e1d0763/t/5849ddc1197aeaa33558470e/1481235920269/2016-01-Sushi-plate.jpg?format=1500w",
            price: "$8.99",
            notes:
              "I love it for the user to search the list, we need to add a search bar on the top of the FlatList. FlatList has a prop to add any custom component to its header. I love it.",
            date: "Nov 15, 2018",
          }
        ]
      }
  ]
=======
  currentData: []
>>>>>>> d7497ebed1b3a96ccb58b21b94037866c4fc69c2
};

export const DataReducer = (state = appState, action) => {
  const { currentData } = state;

  switch (action.type) {
    // make a case to identify what you want to do
    // make sure to return state at the end or it will run the next case
    // after the current case.
    case 'LOAD_FROM_ASYNCSTORAGE':
        // payload from DataActions loadFromAsyncStorage is saved as constant
        // can also do currentData = action.payload to avoid overusage of
        // constants declared. every constant regardless of case cannot be the
        // same name.
        const loaded = action.payload;
        for (i in loaded) {
            currentData.push(loaded[i]);
        }

      return state;
    
    case 'ADD_NEW_PLACE':
        currentData.splice(0, 0, action.payload);
        AsyncStorage.setItem('userData', JSON.stringify(currentData));

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

        AsyncStorage.setItem('userData', JSON.stringify(currentData))
        return state
    
    // default return when no case is used
    default:
        return state
    }
}

// NOTE TO TRAVIS: ADD THIS LINE WHEN SAVING TO ASYNCSTORAGE AFTER ADDING FOOD
// AsyncStorage.setItem('userData', JSON.stringify(currentData));