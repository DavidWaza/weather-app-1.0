"use client";

import { useEffect, useState } from "react";

const Paris = () => {
  const [paris, setParis] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=a9140ce4ab7b4471854195258230206&q=Paris&aqi=no`
        );
        const json = await response.json();
        setParis(json);
      } catch (error) {
        console.error("error logging data", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {paris ? (
        <>
          <div className="flex text-[1.4rem] pt-[2rem]">
            <img src={paris.current.condition.icon} alt={`${paris.location.name}`} className="otherImgSize"/>
            <p>{paris.location.name}</p>
            <p className="pl-4 primary_font text-[#D35400] degree_font">{`${paris.current["temp_c"]}°`}</p>
          </div>
        </>
      ) : (
        <p className="text-white">{`No paris Data`}</p>
      )}
    </>
  );
};
export default Paris;
