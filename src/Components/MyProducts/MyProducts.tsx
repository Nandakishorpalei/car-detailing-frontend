import React from "react";
import { useState } from "react";
import { usePageTitle } from "../../Hooks/usePageTitle";
import { useToast } from "../../Hooks/useToast";
import {
  useDeleteProductMutation,
  useGetMyProductsQuery,
} from "../../store/api/product";
import { Button } from "../../UI-Components/Button/Button";
import { Card } from "../../UI-Components/Card/Card";
import { ImageCarouselComponent } from "../../UI-Components/Carousel/ImageCarouselComponent";
import { Header } from "../../UI-Components/Header/Header";
import Loader from "../../UI-Components/Loader/Loader";
import { AddProduct } from "./AddProduct";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const MyProducts = () => {
  usePageTitle("My Products");
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const { data, isLoading: isProductLoading } = useGetMyProductsQuery();
  const products = data?.products || [];
  const { alertToast, successToast } = useToast();
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const deleteProductById = async (id: string) => {
    try {
      await deleteProduct({ productId: id });
    } catch (e: any) {
      alertToast({ message: e.message });
    }
  };

  if (isProductLoading || isDeleting) {
    return <Loader />;
  }
  return (
    <div className="h-screen w-screen">
      <Header
        title="Products"
        right={
          <Button
            customType="primary"
            onClick={() => setShowAddProductModal(true)}
          >
            Add Product
          </Button>
        }
      />
      <div className="w-screen h-[calc(100vh-65px)] overflow-scroll grid grid-cols-4 gap-4 p-8">
        {products.map((product) => {
          const imageUrls = product.files.map(({ url }) => url);
          return (
            <Card className="w-84 p-4 max-h-[560px]">
              <ImageCarouselComponent images={imageUrls} alt="file images" />
              <div className="flex justify-between items-center">
                <div className="text-subtitle font-bold text-text-60 truncate">
                  {product.title}
                </div>
                <div className="text-body font-bold text-text-60">
                  ₹{product.sizeAndPrice[0].price}
                </div>
              </div>
              <div className="text-body text-text-60 truncate">
                {product.subtitle}
              </div>
              <div className="mt-2 flex justify-between gap-2">
                <Button block size="small">
                  <FavoriteIcon style={{ fontSize: "16px" }} /> &nbsp; Add to
                  wishlist
                </Button>
                <Button block size="small">
                  <ShoppingCartIcon style={{ fontSize: "16px" }} /> &nbsp; Add
                  to cart
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
      <AddProduct
        show={showAddProductModal}
        closeModal={() => setShowAddProductModal(false)}
      />
    </div>
  );
};
