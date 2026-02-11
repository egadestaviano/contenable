import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { BlogDetail, BlogListResponse, BlogState, SearchBlogParams } from './blog'
import api from '@/lib/axios'
import type { ResError } from '@/types/api'

export const fetchNewBlogs = createAsyncThunk<
  BlogListResponse,
  void,
  { rejectValue: ResError }
>('blogs/fetchNewBlogs', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<BlogListResponse>('/blogs', {
      params: { sort: 'newest' },
    })
    return data
  } catch (err) {
    const error = err as AxiosError<ResError>
    return rejectWithValue(
      error.response?.data || { message: error.message || 'Failed to load new blogs.' }
    )
  }
})

export const fetchTopBlogs = createAsyncThunk<
  BlogListResponse,
  void,
  { rejectValue: ResError }
>('blogs/fetchTopBlogs', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<BlogListResponse>('/blogs', {
      params: { sort: 'top' },
    })
    return data
  } catch (err) {
    const error = err as AxiosError<ResError>
    return rejectWithValue(
      error.response?.data || { message: error.message || 'Failed to load top blogs.' }
    )
  }
})

export const fetchFeaturedBlogs = createAsyncThunk<
  BlogListResponse,
  void,
  { rejectValue: ResError }
>('blogs/fetchFeaturedBlogs', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<BlogListResponse>('/blogs', {
      params: { sort: 'featured' },
    })
    return data
  } catch (err) {
    const error = err as AxiosError<ResError>
    return rejectWithValue(
      error.response?.data || { message: error.message || 'Failed to load featured blogs.' }
    )
  }
})

export const fetchBlogs = createAsyncThunk<
  BlogListResponse,
  SearchBlogParams | void,
  { rejectValue: ResError }
>('blogs/fetchBlogs', async (params, { rejectWithValue }) => {
  try {
    const { data } = await api.get<BlogListResponse>('/blogs', {
      params
    })
    return data
  } catch (err) {
    const error = err as AxiosError<ResError>
    return rejectWithValue(
      error.response?.data || { message: error.message || 'Failed to load blogs.' }
    )
  }
})

export const fetchSerachBlogs = createAsyncThunk<
  BlogListResponse,
  SearchBlogParams | void,
  { rejectValue: ResError }
>('blogs/fetchSearchBlogs', async (params, { rejectWithValue }) => {
  try {
    const { data } = await api.get<BlogListResponse>('/blogs/search', {
      params
    })
    return data
  } catch (err) {
    const error = err as AxiosError<ResError>
    return rejectWithValue(
      error.response?.data || { message: error.message || 'Failed to load blogs.' }
    )
  }
})

export const fetchBlogDetail = createAsyncThunk<
  BlogDetail,
  string,
  { rejectValue: ResError }
>('blogs/fetchBlogDetail', async (slug, { rejectWithValue }) => {
  try {
    const { data } = await api.get<{ status: string; data: BlogDetail }>(`/blogs/${slug}`);
    return data.data;
  } catch (err) {
    const error = err as AxiosError<ResError>;
    return rejectWithValue(
      error.response?.data || { message: error.message || 'Failed to load blog detail.' }
    );
  }
});


const initialState: BlogState = {
  blogs: [],
  newBlogs: [],
  topBlogs: [],
  featuredBlogs: [],
  searchBlogs: [],
  blogDetail: null,
  meta: null,
  loading: true,
  error: null,
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    clearBlogs: (state) => {
      state.blogs = []
      state.newBlogs = []
      state.topBlogs = []
      state.featuredBlogs = []
      state.meta = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    const pending = (state: BlogState) => {
      state.loading = true
      state.error = null
    }
    const rejected = (state: BlogState, action: any) => {
      state.loading = false
      state.error = action.payload?.message || 'Something went wrong.'
    }

    builder
      .addCase(fetchBlogs.pending, pending)
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<BlogListResponse>) => {
        state.loading = false
        state.blogs = action.payload.data
        state.meta = action.payload.meta ?? null
      })
      .addCase(fetchBlogs.rejected, rejected)
      .addCase(fetchNewBlogs.pending, pending)
      .addCase(fetchNewBlogs.fulfilled, (state, action: PayloadAction<BlogListResponse>) => {
        state.loading = false
        state.newBlogs = action.payload.data
      })
      .addCase(fetchNewBlogs.rejected, rejected)
      .addCase(fetchTopBlogs.pending, pending)
      .addCase(fetchTopBlogs.fulfilled, (state, action: PayloadAction<BlogListResponse>) => {
        state.loading = false
        state.topBlogs = action.payload.data
      })
      .addCase(fetchTopBlogs.rejected, rejected)
      .addCase(fetchFeaturedBlogs.pending, pending)
      .addCase(fetchFeaturedBlogs.fulfilled, (state, action: PayloadAction<BlogListResponse>) => {
        state.loading = false
        state.featuredBlogs = action.payload.data
      })
      .addCase(fetchFeaturedBlogs.rejected, rejected)
      .addCase(fetchBlogDetail.pending, pending)
      .addCase(fetchBlogDetail.fulfilled, (state, action: PayloadAction<BlogDetail>) => {
        state.loading = false
        state.blogDetail = action.payload
      })
      .addCase(fetchBlogDetail.rejected, rejected)
      .addCase(fetchSerachBlogs.pending, pending)
      .addCase(fetchSerachBlogs.fulfilled, (state, action: PayloadAction<BlogListResponse>) => {
        state.loading = false
        state.searchBlogs = action.payload.data
        state.meta = action.payload.meta ?? null
      })
      .addCase(fetchSerachBlogs.rejected, rejected)
  },
})

export const { clearBlogs } = blogSlice.actions
export default blogSlice.reducer
