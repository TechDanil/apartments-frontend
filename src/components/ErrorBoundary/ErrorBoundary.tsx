import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import ProcessStatus from 'enums/processStatus/ProcessStatus.enum';

type ErrorBoundaryAttributes = {
    children: ReactNode;
}

type ErrorBoundaryState = {
    process: ProcessStatus | null;
}

class ErrorBoundary extends Component<ErrorBoundaryAttributes, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryAttributes) {
        super(props);
        this.state = {
            process: null,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log(error, errorInfo);
        this.setState({
            process: ProcessStatus.Error,
        });
    }

    render(): JSX.Element {
        const { process } = this.state;

        if (process === ProcessStatus.Error) {
            return <ErrorMessage />
        }

        return this.props.children as JSX.Element;
    }
}

export default ErrorBoundary;