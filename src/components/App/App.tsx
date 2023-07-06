import { FC, useEffect, useCallback, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  DEFAULT_URL,
  LIMIT,
  LIMIT_INCREASE,
  PAGE_INCREASE,
  PAGE_VALUE,
} from "constants/constants";

import ApartmentList from "components/ApartmentList/ApartmentList";
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary";
import SelectWrapper from "components/SelectWrapper/SelectWrapper";

import useTypedSelector from "hooks/useTypedSelector/useTypedSelector.hook";
import useActions from "hooks/useActions/useActions.hook";

import ApartmentService from "services/ApartmentService.service";

import ProcessStatus from "enums/processStatus/ProcessStatus.enum";
import queryString from "query-string";

import styles from "./app.module.css";

const App: FC = () => {
  const navigate = useNavigate();
  const apartments = useTypedSelector((state) => state.apartments.apartments);

  const [isLoadMoreItems, setIsloadMoreItems] = useState(false);

  const { fetchedApartmens } = useActions();
  const { getAllApartments, setProcess, process } = ApartmentService();

  const apartmentListRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchApartments = async () => {
    try {
      const { filter = "all", sort = "all" } = queryString.parse(
        window.location.search
      ) as { filter?: string; sort?: string };
      const response = await getAllApartments(
        PAGE_VALUE,
        LIMIT,
        filter || "all",
        sort || "all"
      );

      console.log(response);
      fetchedApartmens([...apartments, ...response]);
      setProcess(ProcessStatus.Idle);
    } catch (e) {
      setProcess(ProcessStatus.Error);
      throw new Error("error while fetching appertments", e as Error);
    }
  };

  useEffect(() => {
    const currentUrl = window.location.pathname + window.location.search;
    const isReloaded = sessionStorage.getItem("isReloaded");

    if (currentUrl !== DEFAULT_URL && isReloaded) {
      window.history.pushState(null, "", DEFAULT_URL);
      window.location.reload();
    } else {
      sessionStorage.setItem("isReloaded", "true");
    }
  }, []);

  useEffect(() => {
    fetchApartments();
  }, []);

  const updateUrlParams = useCallback(
    (params: { filter?: string; sort?: string }) => {
      const { filter = "all", sort = "all" } = params;
      const queryParams = [];

      if (filter !== "all") {
        queryParams.push(`filter=${filter}`);
      }

      if (sort !== "all") {
        queryParams.push(`sort=${sort}`);
      }

      navigate(
        `/apartments${
          queryParams.length > 0 ? `?${queryParams.join("&")}` : ""
        }`
      );
    },
    [navigate]
  );

  const onButtonSaveHandler = useCallback(async () => {
    try {
      const { filter = "all", sort = "all" } = queryString.parse(
        window.location.search
      ) as {
        filter?: string;
        sort?: string;
      };

      const response = await getAllApartments(PAGE_VALUE, LIMIT, filter, sort);

      fetchedApartmens(response);
      setProcess(ProcessStatus.Idle);
    } catch (e) {
      setProcess(ProcessStatus.Error);
      throw new Error("Error while fetching apartments", e as Error);
    }
  }, [getAllApartments, fetchedApartmens, setProcess]);

  const onLoadMoreItemsHandler = useCallback(async () => {
    try {
      setIsloadMoreItems(true);

      const { filter = "all", sort = "all" } = queryString.parse(
        window.location.search
      ) as {
        filter?: string;
        sort?: string;
      };

      const nextPage = PAGE_VALUE + PAGE_INCREASE;
      const additionalApartments = await getAllApartments(
        nextPage,
        LIMIT_INCREASE,
        filter,
        sort
      );

      fetchedApartmens([...apartments, ...additionalApartments]);
      setProcess(ProcessStatus.Idle);

      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      
    } catch (e) {
      setProcess(ProcessStatus.Error);
      throw new Error("Error while loading more apartments");
    } finally {
      setIsloadMoreItems(false);
    }
  }, [apartments, fetchedApartmens, getAllApartments, setProcess]);

  const onLoadMoreHanlder = useCallback(async () => {
    try {
      await onLoadMoreItemsHandler();
    } catch (e) {
      throw new Error("Error while loading more apartments");
    }
  }, [onLoadMoreItemsHandler]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        onLoadMoreHanlder();
      }
    },
    [onLoadMoreHanlder]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    observerRef.current = new IntersectionObserver(handleObserver, options);

    if (apartmentListRef.current) {
      observerRef.current.observe(apartmentListRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Список квартир: </h1>
      <div>
        <SelectWrapper
          updateUrlParams={updateUrlParams}
          onButtonSaveHandler={onButtonSaveHandler}
        />
      </div>
      <div>
        <ErrorBoundary>
          <ApartmentList
            apartments={apartments}
            process={process}
            onLoadMoreHanlder={onLoadMoreHanlder}
            isLoadMoreItems={isLoadMoreItems}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default App;
