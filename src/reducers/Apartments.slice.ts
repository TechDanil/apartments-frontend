import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import ProcessStatus from "enums/processStatus/ProcessStatus.enum";
import IApartment from "interfaces/apartments/IApartment.interface";

interface IInitialState {
    apartments: IApartment[];
    apartmentsLoadingStatus: ProcessStatus;
}

const initialState: IInitialState = {
    apartments: [],
    apartmentsLoadingStatus: ProcessStatus.Idle,
}

const ApartmentsSlice = createSlice({
    name: 'apartments',
    initialState,

    reducers: {
        fetchingApartments: (state) => {
            state.apartmentsLoadingStatus = ProcessStatus.Loading;
        },

        fetchingApartmentsError: (state) => {
            state.apartmentsLoadingStatus = ProcessStatus.Error;
        },

        fetchedApartmens: (state, action: PayloadAction<IApartment[]>) => {
            state.apartments = action.payload;
            state.apartmentsLoadingStatus = ProcessStatus.Idle;
        }
    }
});

export const { 
    fetchingApartments, 
    fetchingApartmentsError,
    fetchedApartmens, 
} = ApartmentsSlice.actions;

export default ApartmentsSlice.reducer;