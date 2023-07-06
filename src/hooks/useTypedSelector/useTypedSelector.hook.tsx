import { useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState } from "store";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;

