import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import { serviceDetialSchema } from "../../FormValidations/ServiceDetailSchema";
import { useToast } from "../../Hooks/useToast";
import { CloseIcon } from "../../Icons/CloseIcon";
import { useGetAllCarsQuery } from "../../store/api/cars";
import { useUpdateServiceDetailsMutation } from "../../store/api/serviceDetails";
import { useGetAllUsersQuery } from "../../store/api/user";
import { File } from "../../store/model/File";
import {
  ServiceDetailsPayload,
  ServiceDetailsResponse,
} from "../../store/model/ServiceDetails";
import { RootState } from "../../store/store";
import { Button } from "../../UI-Components/Button/Button";
import { Combobox } from "../../UI-Components/Combobox/Combobox";
import { FileUpload } from "../../UI-Components/FileUpload/FileUpload";
import { Input } from "../../UI-Components/Input/Input";
import { SelectDropDown } from "../../UI-Components/Select/Select";

export const EditService = ({
  open,
  onClose,
  service,
}: {
  open: boolean;
  onClose: () => void;
  service: ServiceDetailsResponse;
}) => {
  const { alertToast, successToast } = useToast();
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: usersData } = useGetAllUsersQuery(undefined, {
    skip: user?.role !== "admin",
  });
  const { data: carsData } = useGetAllCarsQuery();
  const [selectedFiles, setSelectedFiles] = useState<File[]>(
    service.pre_service_photos || []
  );
  const [editService, { isLoading }] = useUpdateServiceDetailsMutation();

  const handleEditService = async (
    values: Omit<ServiceDetailsPayload, "pre_service_photos">
  ) => {
    try {
      await editService({
        ...values,
        pre_service_photos: selectedFiles,
        serviceId: service._id,
      }).unwrap();
      successToast({ message: "Service added successfully!" });
      onClose();
    } catch (error: any) {
      alertToast({ message: error.message || "Something went wrong!" });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      onClick={(e) => e.stopPropagation()}
    >
      <DialogTitle className="border-b border-neutral-10 text-h4 flex justify-between items-center">
        Edit Service
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Formik
        initialValues={{
          model: service.model,
          registration_number: service.car_details.registration_number,
          color: service.color,
          year: service.year,
          username: service.user_details.name,
          user_id: service.user_details._id,
        }}
        onSubmit={handleEditService}
        validationSchema={serviceDetialSchema}
        validateOnBlur={false}
        validateOnChange
        validateOnMount={false}
      >
        {({ submitForm, setFieldValue, values }) => (
          <Form className="m-0">
            <DialogContent className="space-y-4 overflow-scroll max-h-[440px]">
              {user?.role === "admin" && (
                <SelectDropDown
                  label="User"
                  name="user"
                  block
                  defaultValue={values.user_id}
                  onChange={(e) => {
                    const selectedUser = usersData?.users.find(
                      (user) => user._id === e.target.value
                    );

                    if (selectedUser) {
                      setFieldValue("username", selectedUser.name);
                      setFieldValue("user_id", selectedUser._id);
                    }
                  }}
                >
                  <option value="">Select</option>
                  {usersData?.users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </SelectDropDown>
              )}
              <Combobox
                name="registration_number"
                label="Registration Number"
                required
                defaultValue={service.car_details.registration_number}
                options={
                  carsData?.cars?.map((car) => ({
                    label: car.registration_number,
                    value: car.registration_number,
                  })) || []
                }
                onChange={(value) => {
                  const selectedCar = carsData?.cars.find(
                    (car) => car.registration_number === value
                  );

                  if (selectedCar) {
                    setFieldValue(
                      "registration_number",
                      selectedCar.registration_number
                    );
                    setFieldValue("model", selectedCar.model);
                    setFieldValue("color", selectedCar.color);
                    setFieldValue("year", selectedCar.year);
                  }
                }}
              />
              <Input
                required
                name="model"
                label="Model"
                placeholder="Skoda Slavia"
                customSize="small"
              />
              <Input
                required
                name="color"
                label="Color"
                placeholder="Red"
                customSize="small"
              />
              <Input
                required
                name="year"
                label="Registration Year"
                customSize="small"
                placeholder="Registration Year"
              />
              <FileUpload
                label="Pre Service Photos"
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                required
              />
            </DialogContent>
            <DialogActions className="border border-l-0 border-r-0 border-b-0 border-neutral-10 py-3 px-6">
              <Button onClick={onClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={submitForm}
                customType="primary"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Submit
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
