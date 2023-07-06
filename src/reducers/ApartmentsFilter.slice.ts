import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    filterParam: string;
}

const initialState: IInitialState = {
    filterParam: "",
};

const ApartmentFilterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilterParam: (state, action: PayloadAction<string>) => {
            state.filterParam = action.payload;
        },
    }
});

export const { 
    setFilterParam, 
} = ApartmentFilterSlice.actions;

export default ApartmentFilterSlice.reducer;