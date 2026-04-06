import React from "react";

export default function MapEmbed() {
  return (
    <div className="h-[320px] w-full sm:h-[380px] lg:h-[100%] min-h-[320px]">
      <iframe
        title="Bold City IAQ location map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.6448542967296!2d-81.82744472542137!3d30.247202608937364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5c10078d66fd9%3A0xc058b814f67b274a!2sBold%20City%20Indoor%20Air%20Quality%20and%20Emergency%20Services%20Jacksonville!5e0!3m2!1sen!2sus!4v1755976180449!5m2!1sen!2sus"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-full w-full border-0"
      />
    </div>
  );
}
