"use client";
import { useState } from "react";
import React from "react";
import List from "./component/list";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [data_, setData] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api");
        const { data } = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (item: string) => {
    setIsMenuOpen(false);
    if (item === "SORT_CREATED_AT_ASC") {
      const tempD = data_;
      tempD.sort((a: any, b: any) => {
        const dateA = new Date(a.timestamp as string);
        const dateB = new Date(b.timestamp as string);

        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
          return 0;
        }

        return dateA.getTime() - dateB.getTime();
      });
      setData(tempD);
    }
    if (item === "SORT_FILENAME_ASC") {
      const tempD = data_;
      tempD.sort((a: any, b: any) => {
        const filenameA = a.text.toLowerCase();
        const filenameB = b.text.toLowerCase();
        return filenameA.localeCompare(filenameB);
      });
      setData(tempD);
    }
    if (item === "SORT_FILENAME_DES") {
      const tempD = data_;
      tempD.sort((a: any, b: any) => {
        const filenameA = a.text.toLowerCase();
        const filenameB = b.text.toLowerCase();
        return filenameB.localeCompare(filenameA);
      });
      setData(tempD);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={handleMenuClick}
          >
            Options
            <svg
              className="-mr-1 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div
            className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1" role="none">
              <button
                className="text-gray-700 block px-4 py-2 text-sm w-full text-left"
                onClick={() => handleLinkClick("SORT_CREATED_AT_ASC")}
              >
                Sort by created at Ascendant
              </button>
              <button
                className="text-gray-700 block px-4 py-2 text-sm w-full text-left"
                onClick={() => handleLinkClick("SORT_FILENAME_ASC")}
              >
                Sort by filename Ascendant
              </button>
              <button
                className="text-gray-700 block px-4 py-2 text-sm w-full text-left"
                onClick={() => handleLinkClick("SORT_FILENAME_DES")}
              >
                Sort by filename Descendant
              </button>
            </div>
          </div>
        )}
      </div>
      <List data={data_} />
    </main>
  );
}
