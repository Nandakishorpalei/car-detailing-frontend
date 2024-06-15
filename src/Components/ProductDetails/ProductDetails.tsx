import React from "react";
import { useParams } from "react-router-dom";
import { usePageTitle } from "../../Hooks/usePageTitle";
import { useGetProductByIdQuery } from "../../store/api/product";
import { Header } from "../../UI-Components/Header/Header";
import Loader from "../../UI-Components/Loader/Loader";

export const ProductDetails = () => {
  usePageTitle("Product details");
  const { productid } = useParams();
  const { data, isLoading: isProductLoading } = useGetProductByIdQuery(
    {
      productId: productid!,
    },
    {
      skip: productid === undefined ? true : false,
    }
  );

  if (isProductLoading) {
    <Loader />;
  }

  const productFiles = data?.products?.files;
  console.log("productFiles:", productFiles);

  return (
    <div className="h-screen w-screen bg-surface">
      <Header />
      <div className="w-full h-[calc(100vh-65px)] overflow-y-scroll p-8 flex gap-8">
        <div className="w-3/5 grid grid-cols-2 gap-1">
          {productFiles?.map((productFile) => (
            <img src={productFile.url} alt={productFile.filename} />
          ))}
        </div>
        <div className="w-2/5 bg-s"></div>
      </div>
    </div>
  );
};
