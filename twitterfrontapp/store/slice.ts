import { createSlice } from '@reduxjs/toolkit'

export interface CounterState{
    value : number
}

const initialState: CounterState = {
    value:0
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    incremented: state => {
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    }
  }
})

export const { incremented, decremented } = counterSlice.actions

export default counterSlice.reducer
