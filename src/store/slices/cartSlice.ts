import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  cartItemId: string;
  productId: string;
  qty: number;
  product: {
    name: string;
    image: string;
    price: number;
    stock: number;
  };
};

type CartState = {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
  lastSyncedAt: number | null;
};

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  lastSyncedAt: null,
};

const recalculate = (state: CartState) => {
  state.totalAmount = state.items.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0,
  );
  state.totalQuantity = state.items.reduce((acc, item) => acc + item.qty, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.lastSyncedAt = Date.now();
      recalculate(state);
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId,
      );

      if (!existingItem) {
        state.items.push(action.payload);
      } else {
        existingItem.qty += 1;
      }

      console.log(JSON.parse(JSON.stringify(state.items)));
      recalculate(state);
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.productId === action.payload);

      if (item) {
        if (item.qty > 1) {
          item.qty -= 1;
        } else {
          state.items = state.items.filter(
            (i) => i.productId !== action.payload,
          );
        }
      }

      recalculate(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      );

      recalculate(state);
    },
    rollbackCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      recalculate(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      state.lastSyncedAt = null;
    },
  },
});

export const {
  setCart,
  addToCart,
  decreaseQuantity,
  removeFromCart,
  rollbackCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export type { CartItem };
