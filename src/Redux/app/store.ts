
import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../Features/User/authSlice';
import dataReducer from '../Features/Data/dataSlice';
import tabReducer from '../Features/Tabs/SelectedtabSlice';




export const  store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReducer,
        tab: tabReducer,
    },
    middleware: (getdefaultMiddleware) => getdefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;



