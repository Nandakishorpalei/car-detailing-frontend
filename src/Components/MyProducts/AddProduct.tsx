import React from "react";
import { FC } from "react";
import Modal from "../../UI-Components/Modal/Modal";
import YourFormComponent from "../ProductUpload/FormComponent";

type AddProductProps = {
  show: boolean;
  closeModal: () => void;
};

export const AddProduct: FC<AddProductProps> = ({ show, closeModal }) => {
  return (
    <Modal.Root open={show} onOpenChange={closeModal}>
      <Modal.Content size="xl">
        <Modal.Header>
          <Modal.Title>Add product</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <div className="p-6 h-full overflow-scroll">
          <YourFormComponent />
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
