import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface DataItem {
  id: number;
  image: string;
  description: string;
  like: number;
  unlike: number;
  productName: string;
  uploaderName: string;
  category: string
  phone: string;
  whatsApp: string;
  address: string;
  skype: string;
  telegram: string;
  facebook: string;
  reviews: [
    {
      userName: string;
      rating: number;
      description: string;
    }
  ];
}

interface DataState {
  items: DataItem[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  items: [],
  loading: false,
  error: null,
};

// Define async thunk for fetching data
export const fetchData = createAsyncThunk<DataItem[]>(
  "data/fetchData",
  async () => {
    const response = await fetch("/data.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  }
);

// Create the slice
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      });
  },
});

export default dataSlice.reducer;
