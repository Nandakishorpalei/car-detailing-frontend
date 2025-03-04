import { Children, createContext, ReactNode, useContext } from "react";
import Loader from "../Loader/Loader";

export type Rootprops = {
  children: ReactNode;
  isLoading: boolean;
  isSuccess: boolean;
  isError?: boolean;
  isEmpty: boolean;
  loaderType?: "primary" | "secondary";
  customLoader?: ReactNode;
  renderOnLoad?: ReactNode;
};

const AsyncContext = createContext<Omit<Rootprops, "children">>({
  isLoading: false,
  isSuccess: false,
  isError: false,
  isEmpty: false,
  loaderType: "primary",
});

const LoaderScreen = ({
  customLoader,
  loaderType,
}: Pick<Rootprops, "customLoader" | "loaderType">) => {
  if (customLoader) {
    return customLoader;
  }

  if (loaderType === "secondary") {
    return (
      <div className="t-h-4 t-w-4">
        <Loader />
      </div>
    );
  }

  if (loaderType === "primary") {
    return <Loader />;
  }

  return null;
};

const Root = ({
  children,
  isLoading,
  isSuccess,
  isEmpty,
  loaderType = "primary",
  renderOnLoad,
  customLoader,
  isError,
}: Rootprops) => {
  return (
    <AsyncContext.Provider
      value={{
        isLoading,
        isSuccess,
        isEmpty,
        loaderType,
        isError,
      }}
    >
      <>
        {isLoading ? (
          renderOnLoad || (
            <LoaderScreen customLoader={customLoader} loaderType={loaderType} />
          )
        ) : (
          <>{children}</>
        )}
      </>
    </AsyncContext.Provider>
  );
};

const Success = ({ children }: { children: ReactNode }) => {
  const { isSuccess, isEmpty } = useContext(AsyncContext);

  if (isSuccess && !isEmpty) return <>{children}</>;
  return null;
};

const Empty = ({ children }: { children: ReactNode }) => {
  const { isSuccess, isEmpty } = useContext(AsyncContext);

  if (isSuccess && isEmpty) return <>{children}</>;
  return null;
};

const ErrorHandler = ({ children }: { children: ReactNode }) => {
  const { isError } = useContext(AsyncContext);

  if (isError) return <>{children}</>;
  return null;
};

const Async = { Root, Success, Empty, ErrorHandler };

export default Async;
