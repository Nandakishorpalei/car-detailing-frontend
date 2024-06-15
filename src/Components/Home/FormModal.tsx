import { FormikValues } from "formik";
import React from "react";
import Modal from "../../UI-Components/Modal/Modal";
import { SignupUserForm } from "../auth/SignupUserForm";

export const FormModal = ({
  show,
  closeModal,
  onSubmit,
}: {
  show: boolean;
  closeModal: () => void;
  onSubmit: (v: FormikValues) => void;
}) => {
  return (
    <Modal.Root open={show} onOpenChange={closeModal}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Form</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <SignupUserForm onSubmit={onSubmit} />
      </Modal.Content>
    </Modal.Root>
  );
};
