import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {

      const product = action.payload;
      const productInCart = state.products.find((p) => p._id === product._id);

      if (productInCart) {
        productInCart.quantity += product.quantity;
        state.total = state.total + product.price * product.quantity;

      } else {
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      }
    
    },
    deleteProduct: (state, action) => {
      state.total -=
        state.products.find((product) => product._id === action.payload).price *
        state.products.find((product) => product._id === action.payload)
          .quantity;
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      state.quantity -= 1;
    },
    setQuantity:(state, action)  => {

      const product = action.payload;
      const productInCart =  state.products.find((p) => p._id === product.id);

      if (productInCart) {

        if (action.payload.type === "+") {
          productInCart.quantity += 1;
          state.total = state.total + productInCart.price;


        } else {

          
          if ( productInCart.quantity===1) {
            productInCart.quantity = 1
            state.total = state.total
          }else{
            productInCart.quantity -= 1;
            state.total = state.total - productInCart.price;
          }


        }
      }
    }
  },
});

export const { addProduct, deleteProduct,setQuantity } = cartSlice.actions;
export default cartSlice.reducer;
