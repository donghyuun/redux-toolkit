import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openModal } from "../modal/modalSlice";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};
/* fetch 사용할 떼
export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
});
*/
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    try {
      //console.log(name);//async 액션 함수로 인자 전달가능
      //console.log(thunkAPI)//more log detail 전달가능
      //console.log(thunkAPI.getState());
      //thunkAPI.dispatch(openModal());//여기(cartSlice) 에 없어도 불러온 다음, thunkAPI 를 이용하면 사용가능
      const resp = await axios(url);

      return resp.data;
    } catch (error) {
      //에러 발생(rejected)시 툴킷을 이용한 처리
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      //return { cartItems: []}; XX! 이것만 state 에 저장됨
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    //action 받는 방법1
    increase: (state, action) => {
      console.log(action);
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      cartItem.amount = cartItem.amount + 1;
    },
    //action 받는 방법2, 좀 더 알아보기 쉬움
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state, action) => {
      //console.log(action);
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      //console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      //console.log(action);
      state.isLoading = false;
    },
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
