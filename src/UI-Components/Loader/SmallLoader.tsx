import React from "react";
import Wrapper from "../../UI-Utils/Wrapper";

export const SmallLoader = ({ noWrapper = false }: { noWrapper?: boolean }) => {
  return (
    <Wrapper
      noWrapper={noWrapper}
      wrapperClassName="flex w-full h-full justify-center items-center"
    >
      <div className="loading">
        <div></div>
        <div></div>
      </div>
    </Wrapper>
  );
};
