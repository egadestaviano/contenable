import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from '@/store/features/blogs/blogSlice'
import tagsReducer from '@/store/features/tags/tagSlice'
import categoryReducer from '@/store/features/categories/categorySlice'

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    tags: tagsReducer,
    categories: categoryReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
