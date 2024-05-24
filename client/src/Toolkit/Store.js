import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Reducers'

export default configureStore({
  reducer: {userReducer},
})