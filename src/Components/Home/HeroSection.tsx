//@ts-ignore
import HeroImage from "../../static/images/laptop/HeroImage.png";
import { Button } from "../../UI-Components/Button/Button";


export const HeroSection = () => {
  return (
    <>
      {/* hero section  */}
        {/* laptop */}
        <div className="flex gap-12 px-[15%] justify-between pt-16 pb-8 bg-surface-background sm:hidden">
          <div className="w-1/2 flex flex-col gap-6">
            <b className="text-[40px] text-text-100">True Care Detailing Service</b>
            <div className="text-h6 text-text-60">
              True Care Detailing Services offers the most comprehensive car
              detailing services in the industry. Our team of experts is
              committed to providing the best car detailing services to keep
              your car looking new.
            </div>
            <Button customType="primary">View All Services</Button>
          </div>
            <img
              src={HeroImage}
              alt="HeroImage"
              className="min-h-96 max-h-96"
            />
        </div>

      {/* phone  */}
        <div className="gap-8 px-4 pt-8 pb-8 bg-surface-background sm:flex hidden flex-col items-center text-center h-min">
            <b className="text-[40px] text-text-100">True Care Detailing Service</b>
            <div className="text-h6 text-text-60">
              True Care Detailing Services offers the most comprehensive car
              detailing services in the industry. Our team of experts is
              committed to providing the best car detailing services to keep
              your car looking new.
            </div>
            <Button customType="primary">View All Services</Button>
            <img
              src={HeroImage}
              alt="HeroImage"
              className="w-full"
            />
        </div>
    </>
  )
}

