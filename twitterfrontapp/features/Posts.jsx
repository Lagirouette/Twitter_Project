import { createSlice } from '@reduxjs/toolkit'

const Api = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
    loading: false,
    data: undefined,
    error: false
}

export const posts = createSlice({
    name: "posts",
    initialState,
    reducers:{
        addData: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        addLoader: (state, action) => {
            state.loading = true
        },
        addError: (state, action) => {
            state.error = true
            state.loading = false
        }
    }
})

export function getData() {
    return function(dispatch, getState) {
        dispatch(addLoader())
        let api = Api + "/post"
        fetch(api)
        .then(response => {
            if(!response.ok) throw new Error()
            return response.json()
        })
        .then(data => dispatch(addData(data)))
        .catch(() => dispatch(addError()))
    }
}

export const {addData, addLoader, addError} = posts.actions
export default posts.reducer