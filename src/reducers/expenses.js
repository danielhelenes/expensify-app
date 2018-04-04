// Expenses Reducer - gets all the expenses related components

//question: why does this reducer has access to action if they are in different folders and there is no import here??!?!

const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter((expense) => {//this is the same as cur. we map through the cur object that state has. we look for the exact id inside of all the objects that has the same id of the one we are deleting, so we can delete it.
        return expense.id !== action.id;
      });

    case 'EDIT_EXPENSE':
    return state.map((expense) => { //this is the same as cur. we map through the cur object that state has. if the id of each cur object matches the id of the action object (the one we are editing), we return the cur object + the updates.
      if (expense.id === action.id) {
        return {...expense, ...action.updates}
      }else { //for all the objects that have a different id than the one we are editing, we return the same object. nothing changes.
        return expense;
      }
    });

    default:
      return state;
  }
};


///IMPORTANT: the state is simply what you add to it. that is the following object:
/*expense: {
  id: uuid(),
  description,
  note, // this is the same of note: note
  amount,
  createdAt
}*/
