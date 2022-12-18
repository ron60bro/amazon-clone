export const initialState = {
  basket: [],
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);
const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.title === action.title
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product ${action.title} as it is not in the basket`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };
    case "SET_USER":
    return{
        ...state,
        user:action.user
    }

    case "EMPTY_BASKET":
        return{
            ...state,
            basket:[]
        }
    }
};
export default reducer;
