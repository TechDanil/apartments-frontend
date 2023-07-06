import { API_URL, PAGE_VALUE, LIMIT_INCREASE } from "constants/constants";

import queryString from "query-string";

import ProcessStatus from "enums/processStatus/ProcessStatus.enum";
import useHttp from "hooks/useHttp/useHttp.hook";

import IApartment from "../interfaces/apartments/IApartment.interface";
import IHttpError from "interfaces/http/IHttpError/IHttpError.interface";


interface IApartmentService {
  isLoading: boolean;
  error: IHttpError | null;
  process: ProcessStatus;
  getAllApartments(page: number, limit: number, filter?: string, sort?: string): Promise<IApartment[]>;
  setProcess(status: ProcessStatus): void;
}

const ApartmentService = (): IApartmentService => {
  const { isLoading, request, error, process, setProcess } = useHttp();

  const getAllApartments = async (
    page: number = PAGE_VALUE,
    limit: number = LIMIT_INCREASE,
    filter: string = "all", 
    sort: string = "all",
  ): Promise<IApartment[]> => {
    const params = { page, limit, filter: filter || "all", sort: sort || "all" };
    const queryParams = queryString.stringify(params, { skipEmptyString: true, skipNull: true });
    const url = `${API_URL}?${queryParams}`

    const result = await request(url, "GET", null, {
      "Content-Type": "application/json",
    });

    return result.map(transformApartment);
  };

  const transformApartment = (apartment: IApartment): IApartment => {
    return {
      floor: apartment.floor,
      pos_on_floor: apartment.pos_on_floor,
      price: apartment.price,
      rooms: apartment.rooms,
      area_total: apartment.area_total,
      area_kitchen: apartment.area_kitchen,
      area_live: apartment.area_live,
      layout_image: apartment.layout_image,
    };
  };

  return {
    isLoading,
    error,
    setProcess,
    process,
    getAllApartments,
  };
};

export default ApartmentService;
