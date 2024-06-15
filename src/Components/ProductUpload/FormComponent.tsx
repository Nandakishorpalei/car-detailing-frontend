import React from "react";
import {
  Formik,
  Form,
  Field,
  FieldArray,
  ErrorMessage,
  FormikHelpers,
} from "formik";
import { ProductPayloadWithoutImages } from "../../store/model/Product";
import { uploadProductSchema } from "../../FormValidations/uploadProductSchema";
import { UploadFromComputer } from "../../Icons/UploadFromComputer";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { LocalFile } from "../../store/model/File";
import { Document } from "../../Icons/Document";
import { Button } from "../../UI-Components/Button/Button";
import { DeleteIcon } from "../../Icons/DeleteIcon";
import { Input } from "../../UI-Components/Input/Input";
import { SelectDropDown } from "../../UI-Components/Select/Select";
import { Cross } from "../../Icons/Cross";
import { PlusIcon } from "../../Icons/PlusIcon";
import { useAddProductMutation } from "../../store/api/product";

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "FREE"];
const allDressCategories = [
  "Casual Dresses",
  "Cocktail Dresses",
  "Maxi Dresses",
  "Midi Dresses",
  "Mini Dresses",
  "Bodycon Dresses",
  "Shift Dresses",
  "Wrap Dresses",
  "A-Line Dresses",
  "Sheath Dresses",
  "Peplum Dresses",
  "Fit and Flare Dresses",
  "Halter Dresses",
  "Off-the-Shoulder Dresses",
  "Empire Waist Dresses",
  "Shirt Dresses",
  "Boho Dresses",
  "Tiered Dresses",
  "Pinafore Dresses",
  "Balloon Sleeve Dresses",
  "Slip Dresses",
  "Tunic Dresses",
  "Pleated Dresses",
  "Mermaid Dresses",
  "Tulle or Ballerina Dresses",
  "Casual Shirts and T-Shirts",
  "Dress Shirts",
  "Suits",
  "Blazers",
  "Trousers",
  "Jeans",
  "Polo Shirts",
  "Shorts",
  "Sweaters and Cardigans",
  "Ties and Bow Ties",
];

const YourFormComponent: React.FC = () => {
  const initialValues: ProductPayloadWithoutImages = {
    title: "Miss Chase",
    subtitle: "Women Blue Georgette Maxi Dress",
    sizeAndPrice: [
      {
        size: "M",
        price: 1399,
        actualPrice: 1799,
        remainingQuantity: 5,
      },
    ],
    description:
      "Blue solid maxi dress</n>Round neck</n>Short, no sleeves</n>Maxi length in assymetric hem</n>Georgette fabric</n>Zip closure</n>Comes with a belt",
    brand: "Miss Chase",
    modelDetails: "The model (height 5'8) is wearing a size S",
    color: "Blue",
    material: "100% Polyester",
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    category: "Maxi Dresses",
    tags: [],
  };
  const [selectedFiles, setSelectedFiles] = useState<LocalFile[]>([]);
  const [addProduct, { isLoading }] = useAddProductMutation();

  // Handle form submission
  const handleSubmit = async (
    values: ProductPayloadWithoutImages,
    { setSubmitting, resetForm }: FormikHelpers<ProductPayloadWithoutImages>
  ) => {
    try {
      // console.log("coming here ");
      // const { title, subtitle, sizeAndPrice } = values;
      // const formData = new FormData();

      // selectedFiles.forEach((file) =>
      //   formData.append("files", file as unknown as Blob)
      // );
      // formData.append("title", title);
      // formData.append("subtitle", subtitle);
      // formData.append("sizeAndPrice", JSON.stringify(sizeAndPrice));
      console.log("hello");
      console.log("values", { ...values, files: selectedFiles });
      const res = await addProduct({
        payload: { ...values, files: selectedFiles },
      }).unwrap();
      console.log("response here:", res);
      resetForm();
      setSubmitting(false);
    } catch (e) {
      console.log({ e });
    }
  };

  const removeDuplicateFile = (arr: LocalFile[]) => {
    const seen = new Set();
    return arr.filter((item: LocalFile) => {
      let identifier = item.path;
      if (!seen.has(identifier)) {
        seen.add(identifier);
        return true;
      }

      return false;
    });
  };

  const onDelete = (index: number) => {
    setSelectedFiles((prevSelectedFiles: LocalFile[]) => {
      const updatedFiles = [...prevSelectedFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const onDrop = (newFiles: LocalFile[]) => {
    setSelectedFiles((prev: LocalFile[]) =>
      removeDuplicateFile([...prev, ...newFiles])
    );
  };

  const { open, getRootProps, getInputProps } = useDropzone({
    noClick: true,
    noKeyboard: true,
    // @ts-ignore
    onDrop,
    maxSize: 25000000,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".webp", ".avif"],
      "application/pdf": [".pdf"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "text/csv": [".csv"],
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={uploadProductSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting }) => {
        const selectedSizes = values.sizeAndPrice.map(({ size }) => size);
        const defaultSizeForNewRow = sizes.find(
          // @ts-ignore
          (size) => !selectedSizes.includes(size)
        );
        return (
          <Form className="flex flex-col gap-6">
            {/* Additional Fields Outside sizeAndPrice Array */}
            <div className="flex gap-4">
              <Input type="text" label="Title" name="title" />
              <Input type="text" label="Subtitle" name="subtitle" />
            </div>
            {/* sizeAndPrice Array */}
            <FieldArray name="sizeAndPrice">
              {({ push, remove }) => (
                <div className="flex flex-col gap-6">
                  {values.sizeAndPrice.map((item, index) => {
                    return (
                      <div key={index} className="flex gap-2 items-center">
                        <SelectDropDown
                          label="Size"
                          name={`sizeAndPrice[${index}].size`}
                          block
                        >
                          <option value="">Select Size</option>
                          {sizes.map((size) => (
                            <option
                              key={size}
                              value={size}
                              // @ts-ignore
                              disabled={selectedSizes.includes(size)}
                            >
                              {size}
                            </option>
                          ))}
                        </SelectDropDown>
                        <Input
                          label="Price"
                          name={`sizeAndPrice[${index}].price`}
                          type="number"
                        />
                        <Input
                          label="Quantity Available"
                          name={`sizeAndPrice[${index}].remainingQuantity`}
                          type="number"
                        />
                        <div className="mt-6">
                          <Button
                            customType="icon"
                            size="large"
                            onClick={() => remove(index)}
                          >
                            <Cross />
                          </Button>
                        </div>
                        <div className="mt-6">
                          <Button
                            customType="secondary"
                            onClick={() => push({ size: defaultSizeForNewRow })}
                            type="button"
                            size="large"
                            block
                          >
                            <PlusIcon />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </FieldArray>
            <Input type="text" label="Description" name="description" />
            <div className="flex gap-4">
              <Input type="text" label="Brand" name="brand" />
              <Input type="text" label="Model details" name="modelDetails" />
            </div>
            <div className="flex gap-4">
              <Input type="text" label="Color" name="color" />
              <Input type="text" label="Material" name="material" />
            </div>
            <div className="flex gap-4">
              <Input
                type="text"
                label="Weight"
                name="weight"
                placeholder="Weight in gram"
              />
              <SelectDropDown label="Category" name="category" block>
                <option value="">Select Category</option>
                {allDressCategories.map((categories) => (
                  <option key={categories} value={categories}>
                    {categories}
                  </option>
                ))}
              </SelectDropDown>
            </div>
            <div className="flex gap-4">
              <Input
                type="text"
                label="Length"
                name="length"
                placeholder="Length in cm"
              />
              <Input
                type="text"
                label="Width"
                name="width"
                placeholder="Width in cm"
              />
              <Input
                type="text"
                label="Height"
                name="height"
                placeholder="Height in cm"
              />
            </div>
            <div>
              <div className="font-sans text-caption text-neutral-80 mb-1">
                Images
              </div>
              <div
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded border border-dashed border-neutral-20 py-3 text-subtitle-sm hover:border-blue-40"
                onClick={open}
              >
                <input {...getInputProps()} {...getRootProps()} />
                <UploadFromComputer />
                Choose a file from the computer
              </div>
            </div>
            {selectedFiles.length > 0 && (
              <div className="mt-4 flex flex-col gap-2">
                <div className="text-overline text-blue">
                  {selectedFiles.length} Files Selected
                </div>
                <div className="max-h-44 overflow-y-scroll flex flex-col gap-2">
                  {selectedFiles.map((file: LocalFile, index: number) => (
                    <div className="flex w-full justify-between gap-4 px-3 py-1 border border-solid border-blue rounded">
                      <div className="text-button font-light flex items-center overflow-hidden">
                        <div className="mr-2 flex">
                          <Document />
                        </div>
                        <div className="w-11/12 truncate">{file.name}</div>
                      </div>
                      <div className="self-end">
                        <Button
                          customType="transparent"
                          onClick={(e) => onDelete(index)}
                          type="button"
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-6">
              <Button
                customType="primary"
                type="submit"
                block
                size="large"
                isLoading={isLoading || isSubmitting}
                disabled={isLoading || isSubmitting}
              >
                Add
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default YourFormComponent;
