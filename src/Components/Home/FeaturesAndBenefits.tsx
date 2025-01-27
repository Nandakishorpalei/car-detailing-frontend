import { Divider } from "@mui/material";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
// @ts-ignore
import FeatureImg from "../../static/images/laptop/FeatureImg.png";

const ListItem = ({ feature }: { feature: string }) => {
  return (
    <div className="flex items-center gap-4">
      <AdjustIcon style={{color: "#FFCC00"}} />
      <div className="text-body text-text-60">{feature}</div>
    </div>
  );
};

export const FeaturesAndBenefits = () => {
  return (
    <>
      {/* laptop */}
      <div className="px-[15%] bg-surface-background py-8 flex flex-col gap-12 sm:hidden">
        <Divider>
          <div className="text-body text-text-30">Features & Benefits</div>
        </Divider>
        <div className="flex justify-between gap-6">
          <div className="space-y-8 w-1/3">
            <div className="text-subtitle text-text-100">Features</div>
            <div className="space-y-4">
              <ListItem feature="Exterior Detailing" />
              <ListItem feature="Exterior Detailing" />
              <ListItem feature="Exterior Detailing" />
              <ListItem feature="Exterior Detailing" />
              <ListItem feature="Exterior Detailing" />
            </div>
          </div>
          <div className="space-y-8 w-1/3">
            <div className="text-subtitle text-text-100">Features</div>
            <div className="space-y-4">
              <ListItem feature="Exterior Detailing" />
              <ListItem feature="Exterior Detailing" />
              <ListItem feature="Exterior Detailing" />
              <ListItem feature="Exterior Detailing" />
              <ListItem feature="Exterior Detailing" />
            </div>
          </div>
          <img src={FeatureImg} alt="" className="w-1/3" />
        </div>
      </div>
      {/* phone  */}
      <div className="px-4 bg-surface-background py-8 hidden flex-col gap-12 sm:flex">
        <Divider>
          <div className="text-body text-text-30">Features & Benefits</div>
        </Divider>
        <div className="flex flex-col gap-6">
          <div className="space-y-6 w-full">
            <div className="text-subtitle text-text-100">Features</div>
            <div className="space-y-4">
              <ListItem feature="Exterior Detailing" />
              <ListItem feature="Exterior Detailing" />
              <ListItem feature="Exterior Detailing" />
              <ListItem feature="Exterior Detailing" />
              <ListItem feature="Exterior Detailing" />
            </div>
          </div>
          <div className="space-y-6 w-full">
            <div className="text-subtitle text-text-100">Features</div>
            <div className="space-y-4">
              <ListItem feature="Exterior Detailing" />
              <ListItem feature="Exterior Detailing" />
              <ListItem feature="Exterior Detailing" />
              <ListItem feature="Exterior Detailing" />
              <ListItem feature="Exterior Detailing" />
            </div>
          </div>
          <img src={FeatureImg} alt="" className="w-full" />
        </div>
      </div>
    </>
  );
};
