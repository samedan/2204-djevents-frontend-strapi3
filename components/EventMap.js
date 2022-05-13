import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocode from "react-geocode";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import styles from "@/styles/EventMap.module.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;

export default function EventMap({ evt }) {
  const mapContainerRef = useRef(null);

  const [lat, setLat] = useState(40.712772);
  const [lng, setLng] = useState(-73.935242);
  const [zoom, setZoom] = useState(9);

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  useEffect(() => {
    Geocode.fromAddress(evt.address).then((res) => {
      const { lat, lng } = res.results[0].geometry.location;
      console.log(lat, lng);
      setLat(lat);
      setLng(lng);
    });
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    // Create a new marker.
    const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    // Clean up on unmount
    return () => map.remove();
  }, [lat, lng]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className={styles.sidebarStyle}>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div
        className={styles.mapContainer}
        ref={mapContainerRef}
        style={{ border: "1px solid #000000", height: "500px", width: "500px" }}
      />
    </div>
  );
}
