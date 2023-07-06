import { configureStore  } from '@reduxjs/toolkit';
import ApartmentsSlice from 'reducers/Apartments.slice';
import ApartmentsSortSlice from 'reducers/ApartmentsSort.slice';
import ApartmentsFilterSlice from 'reducers/ApartmentsFilter.slice';

const store = configureStore({
    reducer: {
        apartments: ApartmentsSlice,
        apartmentSorts: ApartmentsSortSlice,
        apartmentFilters: ApartmentsFilterSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;