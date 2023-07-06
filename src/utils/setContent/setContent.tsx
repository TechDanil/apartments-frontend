import { ComponentType } from 'react';
import ProcessStatus from "enums/processStatus/ProcessStatus.enum";
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

type ContentOptions = {
    process: ProcessStatus;
    Component: ComponentType<any>;
    isNewItemLoading: boolean;
}

const setContent = ({ process, Component, isNewItemLoading }: ContentOptions) => {
    switch (process) {
        case ProcessStatus.Waiting:
            return <Spinner />;
        case ProcessStatus.Loading:
            return isNewItemLoading ? <Component /> : <Spinner />;
        case ProcessStatus.Idle:
            return <Component />;
        case ProcessStatus.Error:
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;
