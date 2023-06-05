"use client";

import { useEffect, useState } from "react";

const China = () => {
  const [china, setChina] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=a9140ce4ab7b4471854195258230206&q=China&aqi=no`
        );
        const json = await response.json();
        setChina(json);
      } catch (error) {
        console.error("error logging data", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {china ? (
        <>
          <div className="flex text-[1.4rem] pt-[2rem]">
            <img src={china.current.condition.icon} alt={`${china.location.name}`} className="otherImgSize"/>
            <p>{china.location.name}</p>
            <p className="pl-4 primary_font text-[#D35400] degree_font">{`${china.current["temp_c"]}°`}</p>
          </div>
        </>
      ) : (
        <p className="text-white">{`No china Data`}</p>
      )}
    </>
  );
};
export default China;
