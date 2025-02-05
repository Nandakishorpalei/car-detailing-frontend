import React from "react";
import { Header } from "../../UI-Components/Header/Header";

export const Contact = () => {
  return (
    <div>
      <Header title="Contact" />
      <div className="flex flex-col gap-6 p-12 h-[calc(100vh-65px)] sm:h-[calc(100vh-90px)] w-screen px-[15%] sm:px-[4%]">
        <div className="flex justify-between">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3739.115178730003!2d84.2279619!3d20.419340899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a23ad83b4d28e4f%3A0x59b0635782e1c1cb!2sTruecare%20detailing%20phulbani!5e0!3m2!1sen!2sin!4v1738045948590!5m2!1sen!2sin"
            width="60%"
            height="450"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Truecare Detailing Phulbani"
          ></iframe>
          <div className="w-1/3 space-y-5 text-text-60">
            <div className="text-h6">Have Questions?</div>
            <div className="text-subtext">
              Please feel free to call or email us. We look forward to hearing
              from you!
              {/* Please feel free to call or email us or use our contact form to
              get in touch with us. We look forward to hearing from you! */}
            </div>
            <div>
              <div className="text-subtext">Emergency? Call Us: </div>
              <div className="text-subtext">+91 **********</div>
            </div>
            <div>
              <div className="text-subtext">Send Us Mail: </div>
              <div className="text-subtext">**********@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
