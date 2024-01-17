import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";


export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://redux-c755b-default-rtdb.firebaseio.com/cart.json"
      ); //get default

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }
      const data = await response.json();

      return data ||{items:[],totalQuantity:0,totalAmount:0};
    };
    try {
      const cartData = await fetchData();
      if(cartData){
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [] ,
          totalQuantity: cartData.totalQuantity,
          totalAmount:cartData.totalAmount || 0,
        })
      );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        cartActions.replaceCart({
          items: [],
          totalQuantity: 0,
          totalAmount: 0,
        })
      );

      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data Failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending Cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-c755b-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending Cart data failed.");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success...",
          message: "Sent Cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data Failed!",
        })
      );
    }
  };
};
