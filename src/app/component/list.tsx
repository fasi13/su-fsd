import React from "react";

function ListOfSorted({ data }: any) {
  return (
    <div className="grid grid-cols-4">
      {data.map((e: any) => {
        return (
          <div key={e.timestamp}>
            <div className="p-4  ">
              <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8  ">
                <div className="flex flex-col ">
                  <p className="leading-relaxed text-base text-white dark:text-gray-300">
                    {e.timestamp}
                  </p>
                  <p className="leading-relaxed text-base text-white dark:text-gray-300">
                    {e.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListOfSorted;
