import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export const Phone = ({
  phone,
  setPhone,
}: {
  phone: string;
  setPhone: (v: string) => void;
}) => {
  return (
    <div className="w-full">
      <label className="font-sans text-caption text-neutral-80">
        Enter phone number
      </label>
      <div className="w-full">
        <PhoneInput
          defaultCountry="IN"
          placeholder="Phone number"
          value={phone}
          onChange={setPhone}
          international
          className="rounded w-full justify-between border border-solid bg-surface-lighter-grey text-body font-medium text-text-100 transition-all p-3 border-neutral-10"
        />
      </div>
    </div>
  );
};
