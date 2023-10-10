export const initialState = {
    basket: [],
    user: null,
  };
  
  //si escucha 
  export const actionTypes = {
    ADD_BASKET: "ADD_BASKET",
    REMOVE_ITEM: "REMOVE_ITEM",
    EMPTY_BASKET: "EMPTY_BASKET",
    SET_USER: "SET_USER",
  };
  
 export const getBasketPrice = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

   //cuando escuche retorna eso
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_BASKET":
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
        //el index va eliminar un id
      case "REMOVE_ITEM":
        const index = state.basket.findIndex(
          (basketItem) => basketItem.id === action.id
        );
        let newBasket = [...state.basket];
        if (index >= 0) {
          newBasket.splice(index, 1);
        } else {
          console.log(`No se puede eliminar producto (id: ${action.id})!`);
        }
        return {
          ...state,
          basket: newBasket,
        };
        //retorna el estado del producto
      case "EMPTY_BASKET":
        return {
          ...state,
          basket: action.basket,
        };
      case "SET_USER":
        return {
          ...state,
          user: action.user,
        };
      default:
        return state;
    }
  };
  
  export default reducer;