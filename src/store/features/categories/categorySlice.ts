import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "@/lib/axios";
import type { ResError, ResSuccess } from "@/types/api";
import type { Blog } from "../blogs/blog";

export interface Category {
  id: number;
  name: string;
  slug: string;
  blogs_count?: number;
}

export interface CategoryDetail extends Category {
  blogs: Blog[];
}

export type CategoryListResponse = ResSuccess<Category[]>;

export interface CategoryState {
  categories: Category[];
  categoryDetail: CategoryDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  categoryDetail: null,
  loading: false,
  error: null,
};

// Fetch all categories
export const fetchCategories = createAsyncThunk<
  CategoryListResponse,
  void,
  { rejectValue: ResError }
>("categories/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<CategoryListResponse>("/categories");
    return data;
  } catch (err) {
    const error = err as AxiosError<ResError>;
    return rejectWithValue(
      error.response?.data || {
        message: error.message || "Failed to load categories.",
      }
    );
  }
});

// Fetch category detail by slug
export const fetchCategoryDetail = createAsyncThunk<
  CategoryDetail,
  string,
  { rejectValue: ResError }
>("categories/fetchCategoryDetail", async (slug, { rejectWithValue }) => {
  try {
    const { data } = await api.get<{ success: boolean; data: CategoryDetail }>(
      `/categories/${slug}`
    );
    return data.data;
  } catch (err) {
    const error = err as AxiosError<ResError>;
    return rejectWithValue(
      error.response?.data || {
        message: error.message || "Failed to load category detail.",
      }
    );
  }
});

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategoryDetail: (state) => {
      state.categoryDetail = null;
    },
  },
  extraReducers: (builder) => {
    const pending = (state: CategoryState) => {
      state.loading = true;
      state.error = null;
    };
    const rejected = (state: CategoryState, action: any) => {
      state.loading = false;
      state.error = action.payload?.message || "Something went wrong.";
    };

    builder
      .addCase(fetchCategories.pending, pending)
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<CategoryListResponse>) => {
          state.loading = false;
          state.categories = action.payload.data;
        }
      )
      .addCase(fetchCategories.rejected, rejected)

      .addCase(fetchCategoryDetail.pending, pending)
      .addCase(
        fetchCategoryDetail.fulfilled,
        (state, action: PayloadAction<CategoryDetail>) => {
          state.loading = false;
          state.categoryDetail = action.payload;
        }
      )
      .addCase(fetchCategoryDetail.rejected, rejected);
  },
});

export const { clearCategoryDetail } = categorySlice.actions;
export default categorySlice.reducer;
