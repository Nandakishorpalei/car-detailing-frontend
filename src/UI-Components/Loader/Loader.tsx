import React from "react";
import Wrapper from "../../UI-Utils/Wrapper";

const Loader = ({ noWrapper = false }: { noWrapper?: boolean }) => {
  return (
    <Wrapper noWrapper={noWrapper}>
      <div className="loading">
        <div></div>
        <div></div>
      </div>
    </Wrapper>
  );
};

export default Loader;
