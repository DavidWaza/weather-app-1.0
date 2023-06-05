"use client";

import { useEffect, useState } from "react";

const London = () => {
  const [london, setLondon] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=a9140ce4ab7b4471854195258230206&q=London&aqi=no`
        );
        const json = await response.json();
        setLondon(json);
      } catch (error) {
        console.error("error logging data", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {london ? (
        <>
          <div className="flex text-[1.4rem] pt-[2rem]">
            <img src={london.current.condition.icon} alt={`${london.location.name}`} className="otherImgSize"/>
            <p>{london.location.name}</p>
            <p className="pl-4 primary_font text-[#D35400] degree_font">{`${london.current["temp_c"]}°`}</p>
          </div>
        </>
      ) : (
        <p className="text-white">{`No london Data`}</p>
      )}
    </>
  );
};
export default London;
