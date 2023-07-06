import * as ApartmentsActions from '../reducers/Apartments.slice';
import * as ApartmentsSortActions from '../reducers/ApartmentsSort.slice';
import * as ApartmentsFilterActions from '../reducers/ApartmentsFilter.slice';

const rootActions = {
    ...ApartmentsActions,
    ...ApartmentsSortActions,
    ...ApartmentsFilterActions,
};

export default rootActions;