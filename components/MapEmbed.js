import React from "react";

const MapEmbed = () => {
  return (
    <div className="sm:w-2/3 lg:w-1/2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.6448542967296!2d-81.82744472542137!3d30.247202608937364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5c10078d66fd9%3A0xc058b814f67b274a!2sBold%20City%20Indoor%20Air%20Quality%20and%20Emergency%20Services%20Jacksonville!5e0!3m2!1sen!2sus!4v1755976180449!5m2!1sen!2sus"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

export default MapEmbed;
