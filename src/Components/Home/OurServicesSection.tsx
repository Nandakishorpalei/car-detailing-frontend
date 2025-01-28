//@ts-ignore
import { Button } from "../../UI-Components/Button/Button";
import { ConditionalLink } from "../../UI-Components/ConditionalLink/ConditionalLink";
//@ts-ignore
import Service1Img from "../../static/images/laptop/OurServices1.png";
//@ts-ignore
import Service2Img from "../../static/images/laptop/OurServices2.png";
//@ts-ignore
import Service3Img from "../../static/images/laptop/OurServices3.png";

export const OurServicesSection = ({
  isInsideServices,
}: {
  isInsideServices: boolean;
}) => {
  return (
    <>
      {/* our services  */}
      {/* laptop */}
      <div className="px-[15%] bg-surface-background py-8 flex flex-col gap-12 sm:hidden">
        <div className="flex items-center justify-between">
          <b className="text-[40px] text-text-100">Our Services</b>
          {!isInsideServices && (
            <ConditionalLink condition redirect="/services">
              <Button customType="primary">View All Services</Button>
            </ConditionalLink>
          )}
        </div>
        <div className="flex justify-between gap-6">
          <div className="space-y-4 w-1/3">
            <img src={Service1Img} alt="Service1Img" />
            <div className="text-subtitle text-text-100">
              Interior Detailing
            </div>
            <div className="text-subtitle-sm text-text-60">
              Our interior detailing service ensures your car's interior is
              hygienic, clean and comfortable for a better driving experience.
            </div>
            {/* <div className="text-subtitle-sm text-yellow">Read More</div> */}
          </div>
          <div className="space-y-4 w-1/3">
            <img src={Service2Img} alt="Service2Img" />
            <div className="text-subtitle text-text-100">
              Exterior Detailing
            </div>
            <div className="text-subtitle-sm text-text-60">
              Our exterior detailing services enhance your car's appearance by
              removing dirt, scratches and protecting your car from the
              elements.
            </div>
            {/* <div className="text-subtitle-sm text-yellow">Read More</div> */}
          </div>
          <div className="space-y-4 w-1/3">
            <img src={Service3Img} alt="Service3Img" />
            <div className="text-subtitle text-text-100">Paint Correction</div>
            <div className="text-subtitle-sm text-text-60">
              Our paint correction services restore your car's factory finish by
              removing scratches, swirl marks, and other unsightly
              imperfections.
            </div>
            {/* <div className="text-subtitle-sm text-yellow">Read More</div> */}
          </div>
        </div>
      </div>

      {/* phone  */}
      <div className="px-4 bg-surface-background py-8 flex-col gap-12 sm:flex hidden">
        <div className="flex items-center flex-col gap-6">
          <b className="text-[40px] text-text-100">Our Services</b>
          {!isInsideServices && (
            <ConditionalLink condition redirect="/services">
              <Button customType="primary">View All Services</Button>
            </ConditionalLink>
          )}
        </div>
        <div className="flex flex-col gap-6">
          <div className="space-y-4 w-full">
            <img src={Service1Img} alt="Service1Img" />
            <div className="text-subtitle text-text-100">
              Interior Detailing
            </div>
            <div className="text-subtitle-sm text-text-60">
              Our interior detailing service ensures your car's interior is
              hygienic, clean and comfortable for a better driving experience.
            </div>
            {/* <div className="text-subtitle-sm text-yellow">Read More</div> */}
          </div>
          <div className="space-y-4 w-full">
            <img src={Service2Img} alt="Service2Img" />
            <div className="text-subtitle text-text-100">
              Exterior Detailing
            </div>
            <div className="text-subtitle-sm text-text-60">
              Our exterior detailing services enhance your car's appearance by
              removing dirt, scratches and protecting your car from the
              elements.
            </div>
            {/* <div className="text-subtitle-sm text-yellow">Read More</div> */}
          </div>
          <div className="space-y-4 w-full">
            <img src={Service3Img} alt="Service3Img" />
            <div className="text-subtitle text-text-100">Paint Correction</div>
            <div className="text-subtitle-sm text-text-60">
              Our paint correction services restore your car's factory finish by
              removing scratches, swirl marks, and other unsightly
              imperfections.
            </div>
            {/* <div className="text-subtitle-sm text-yellow">Read More</div> */}
          </div>
        </div>
      </div>
    </>
  );
};
