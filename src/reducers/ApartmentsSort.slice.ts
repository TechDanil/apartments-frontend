import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Options from "enums/Options.enum";
import OptionType from "types/OptionType";

interface IInitialState {
    sorts: OptionType[];
    activeSort: Options;
}

const initialState: IInitialState = {
    sorts: [],
    activeSort: Options.All,
};

const ApartmentSortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        fetchedSorts: (state, action: PayloadAction<OptionType[]>) => {
            state.sorts = action.payload;
        },

        changeActiveSort: (state, action: PayloadAction<Options>) => {
            state.activeSort = action.payload;
        }
    }
});

export const {
    fetchedSorts,
    changeActiveSort,
} = ApartmentSortSlice.actions;

export default ApartmentSortSlice.reducer;