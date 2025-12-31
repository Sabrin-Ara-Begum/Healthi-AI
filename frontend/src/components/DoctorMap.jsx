import { useEffect } from "react";

export default function DoctorMap() {
  useEffect(() => {
    if (!window.google) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const map = new window.google.maps.Map(
          document.getElementById("doctor-map"),
          {
            center: userLocation,
            zoom: 14,
          }
        );

        new window.google.maps.Marker({
          position: userLocation,
          map,
          title: "You are here",
        });
      },
      () => {
        alert("Location access is needed to find nearby doctors");
      }
    );
  }, []);

  return (
    <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-md">
      <div id="doctor-map" className="w-full h-full" />
    </div>
  );
}
