import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import { serviceDetialSchema } from "../../FormValidations/ServiceDetailSchema";
import { useToast } from "../../Hooks/useToast";
import { useGetAllCarsQuery } from "../../store/api/cars";
import { useAddServiceMutation } from "../../store/api/serviceDetails";
import { useGetAllUsersQuery } from "../../store/api/user";
import { File } from "../../store/model/File";
import { ServiceDetailsPayload } from "../../store/model/ServiceDetails";
import { RootState } from "../../store/store";
import { Button } from "../../UI-Components/Button/Button";
import { Combobox } from "../../UI-Components/Combobox/Combobox";
import { FileUpload } from "../../UI-Components/FileUpload/FileUpload";
import { Input } from "../../UI-Components/Input/Input";
import { SelectDropDown } from "../../UI-Components/Select/Select";

export const AddService = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) => {
  const { alertToast, successToast } = useToast();
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: usersData } = useGetAllUsersQuery(undefined, {
    skip: user?.role !== "admin",
  });
  const { data: carsData } = useGetAllCarsQuery();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [addNewService, { isLoading }] = useAddServiceMutation();
  console.log({ user });

  const createService = async (
    values: Omit<ServiceDetailsPayload, "pre_service_photos">
  ) => {
    try {
      await addNewService({
        ...values,
        pre_service_photos: selectedFiles,
      }).unwrap();
      successToast({ message: "Service added successfully!" });
      setOpen(false);
    } catch (error: any) {
      alertToast({ message: error.message || "Something went wrong!" });
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle className="border border-l-0 border-r-0 border-t-0 border-neutral-10 text-h4">
        Add Service
      </DialogTitle>
      <Formik
        initialValues={{
          model: "",
          registration_number: "",
          color: "",
          year: "",
          username: user?.name || "",
          user_id: user?._id || "",
        }}
        onSubmit={createService}
        validationSchema={serviceDetialSchema}
        validateOnBlur={false}
        validateOnChange
        validateOnMount={false}
      >
        {({ submitForm, setFieldValue }) => (
          <Form className="m-0">
            <DialogContent className="space-y-4 overflow-scroll max-h-[440px]">
              {user?.role === "admin" && (
                <SelectDropDown
                  label="User"
                  name="user"
                  block
                  onChange={(e) => {
                    const selectedUser = usersData?.user.find(
                      (user) => user._id === e.target.value
                    );

                    if (selectedUser) {
                      setFieldValue("username", selectedUser.name);
                      setFieldValue("user_id", selectedUser._id);
                    }
                  }}
                >
                  <option value="">Select</option>
                  {usersData?.user.map((user) => (
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
              <Button onClick={() => setOpen(false)} color="primary">
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
