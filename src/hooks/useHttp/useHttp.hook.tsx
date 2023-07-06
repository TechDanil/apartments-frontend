import { useState, useCallback } from 'react';
import IHttpError from 'interfaces/http/IHttpError/IHttpError.interface';
import IHttpHeaders from 'interfaces/http/IHttpHeaders/IHttpHeaders.interface';

import HttpMethod from 'types/http/httpMethod/httpMethod';
import ProcessStatus from 'enums/processStatus/ProcessStatus.enum';
import IApartment from 'interfaces/apartments/IApartment.interface';
import axios from 'axios';

interface IHttpHook {
    isLoading: boolean;
    request(url: string, method?: HttpMethod, body?: any, headers?: IHttpHeaders, params?: any): Promise<IApartment[]>;
    error: IHttpError | null;
    process: ProcessStatus;
    setProcess(status: ProcessStatus): void;
}

const useHttp = (): IHttpHook => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<IHttpError | null>(null);
    const [process, setProcess] = useState<ProcessStatus>(ProcessStatus.Waiting);

    const request = useCallback(
        async (
            url: string,
            method: HttpMethod = 'GET',
            body: any = null,
            headers: IHttpHeaders = { 'Content-Type': 'application/json' },
            params: any
        ): Promise<IApartment[]> => {
            try {
                setIsLoading(true);
                setProcess(ProcessStatus.Loading);
                
                const response = await axios({
                    url,
                    method,
                    data: body,
                    headers,
                    params,
                });

                if (response.status !== 200)
                    throw new Error(`Could not fetch ${url}, status: ${response.status}`);

                const data: IApartment[] = await response.data;

                setIsLoading(false);
                return data;
            } catch (e) {
                setIsLoading(false);
                setError({ message: (e as Error).message });
                setProcess(ProcessStatus.Error);
                throw e;
            }
        },
        []
    );

    return {
        isLoading,
        request,
        error,
        process,
        setProcess,
    };
};

export default useHttp;
