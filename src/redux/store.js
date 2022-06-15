import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./modules/user";
import pokelistReducer from "./modules/pokelist";

const store = configureStore({
  reducer: {
    user: userReducer,
    pokelist: pokelistReducer,
  },
});

export default store;
