import { configureStore } from '@reduxjs/toolkit'
import { dataSlice } from './dataSlice'
import { modalSlice } from './modalSlice'


const store = configureStore({
    reducer: {
        data: dataSlice.reducer,
        modal: modalSlice.reducer,

    }
})

export default store