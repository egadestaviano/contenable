import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import api from '@/lib/axios';
import type { ResError, ResSuccess } from '@/types/api';
import { Blog } from '../blogs/blog';

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface TagDetail extends Tag {
  blogs: Blog[];
}

export type TagListResponse = ResSuccess<Tag[]>;

export interface TagState {
  tags: Tag[];
  tagDetail: TagDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: TagState = {
  tags: [],
  tagDetail: null,
  loading: false,
  error: null,
};

export const fetchTags = createAsyncThunk<
  TagListResponse,
  {
    slug?: string;
    limit?: number;
    order?: string;
  } | void,
  { rejectValue: ResError }
>('tags/fetchTags', async (params, { rejectWithValue }) => {
  try {
    const { data } = await api.get<TagListResponse>('/tags', { params });
    return data;
  } catch (err) {
    const error = err as AxiosError<ResError>;
    return rejectWithValue(
      error.response?.data || { message: error.message || 'Failed to load tags.' }
    );
  }
});

export const fetchTagDetail = createAsyncThunk<
  TagDetail,
  string,
  { rejectValue: ResError }
>('tags/fetchTagDetail', async (slug, { rejectWithValue }) => {
  try {
    const { data } = await api.get<{ status: string; data: TagDetail }>(
      `/tags/${slug}`
    );
    return data.data;
  } catch (err) {
    const error = err as AxiosError<ResError>;
    return rejectWithValue(
      error.response?.data || { message: error.message || 'Failed to load tag detail.' }
    );
  }
});

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    clearTagDetail: (state) => {
      state.tagDetail = null;
    },
  },
  extraReducers: (builder) => {
    const pending = (state: TagState) => {
      state.loading = true;
      state.error = null;
    };
    const rejected = (state: TagState, action: any) => {
      state.loading = false;
      state.error = action.payload?.message || 'Something went wrong.';
    };

    builder
      .addCase(fetchTags.pending, pending)
      .addCase(fetchTags.fulfilled, (state, action: PayloadAction<TagListResponse>) => {
        state.loading = false;
        state.tags = action.payload.data;
      })
      .addCase(fetchTags.rejected, rejected)

      .addCase(fetchTagDetail.pending, pending)
      .addCase(fetchTagDetail.fulfilled, (state, action: PayloadAction<TagDetail>) => {
        state.loading = false;
        state.tagDetail = action.payload;
      })
      .addCase(fetchTagDetail.rejected, rejected);
  },
});

export const { clearTagDetail } = tagSlice.actions;
export default tagSlice.reducer;
