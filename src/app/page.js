"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentTimestamp = Date.now();
const currentHour = new Date().getHours();

const currentDate = new Date(currentTimestamp);

const year = currentDate.getFullYear();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const dayOfWeek = daysOfWeek[currentDate.getDay()];
const monthOfYear = monthsOfYear[currentDate.getMonth()];

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.weatherapi.com/v1/current.json?key=a9140ce4ab7b4471854195258230206&q=Abuja&aqi=no"
        );
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const hourStatement =
    currentHour >= 5 && currentHour < 12
      ? "Morning"
      : currentHour >= 12 && currentHour < 17
      ? "Afternoon"
      : currentHour >= 17 && currentHour < 21
      ? "Evening"
      : "Night";

  return (
    <main className="flex min-h-screen flex-col">
      <article>
        <div>
          {data ? (
            <div
              className={`h-[100vh] w-full px-[20%] p-24 ${
                data.current.temp_c > 23 ? "clear-sky" : "rainy-day"
              }`}
            >
              <div
                className={`flex justify-between text-white primary_font p-24 ${hourStatement}`}
              >
                <p>{`${hours}:${minutes} ${hours < 12 ? "AM" : "PM"}`}</p>
                <p>{`${dayOfWeek} - ${monthOfYear} - ${year}`}</p>
              </div>
              <div></div>
              <div className="text-center text-[#fff]">
                {/* <p className=" text-center">Today</p> */}
                <>
                  <p className="py-2 primary_font text-[1.5rem]">
                    {data.location.name}
                  </p>
                  <p className="py-2 primary_font text-[1.5rem]">
                    {data.location.region}
                  </p>
                  <p className="text-[5rem] degree_font text-[#D35400]">{`${data.current.temp_c}°`}</p>
                  <p className="text-[1rem] primary_font">
                    feels like: {` ${data.current.feelslike_c}°`}
                  </p>
                  <div className="flex justify-center">
                    <img
                      src={data.current.condition.icon}
                      alt="weather-icon"
                      className="img_size"
                    />
                  </div>
                  <p className="text-[1.5rem] primary_font">
                    {data.current.condition.text}
                  </p>
                </>
              </div>
            </div>
          ) : (
            <p>Data Loading ....</p>
          )}
        </div>
      </article>
    </main>
  );
}
