import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    keyword: ""
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        createDataFunc: (state, action) => {
            state.data = [...state.data, action.payload]
        },
        sortingDataFunc: (state, action) => {
            state.data = [...state.data.sort((a, b) => {
                if (action.payload === "asc") {
                    return a.price - b.price
                } else if (action.payload === "desc") {
                    return b.price - a.price
                } else {
                    return 0
                }
            })]
        },

        deleteDataFunc: (state, action) => {
            state.data = [...state.data.filter(dt => dt.id !== action.payload)]
        },
        updateDataFunc: (state, action) => {
            state.data = [...state.data.map(dt => dt.id == action.payload.id ? ({ ...dt, ...action.payload }) : dt)]
        },

        searchDataFunc: (state, action) => {
            state.keyword = action.payload
        },


    }
})

export const { createDataFunc, deleteDataFunc, updateDataFunc, sortingDataFunc, searchDataFunc } = dataSlice.actions

export default dataSlice.reducer