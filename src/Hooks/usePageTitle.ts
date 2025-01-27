import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPageTitle } from "../store/slices/Dashboard";

export const usePageTitle = (title: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle(title));
    document.title = `Truecare | ${title}`;
  }, [title]);

  return title;
};
