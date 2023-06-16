import React, { useContext } from "react";

import { AppContext } from "../Context/AppContext";

const Pagination = () => {

  const { page, totalPages, handlerPageChange } = useContext(AppContext);
  
  return (

    <div className="fixed bottom-0 bg-slate-600 py-2 border-t-2 border-t-gray-300 w-full inset-x-0">

      <div className="flex items-center justify-aroun w-11/12 max-w-3xl mx-auto">

        <div className="flex gap-x-3 items-center">
          {
            (
              <button className="rounded-md border-gray-300 border-2 px-4 py-1 text-white" onClick={() => page > 1 ? handlerPageChange(page - 1) : (null)}>
                Previous
              </button>
            )
          }

          {
            (
              <button className="rounded-md border-gray-300 border-2 px-4 py-1 text-white" onClick={() => page < totalPages ? handlerPageChange(page + 1) : (null)}>
                Next
              </button>
            )
          }
        </div>

        <p className="text-sm font-semibold ml-auto text-white">
          Page {page} of {totalPages}
        </p>

      </div>

    </div>
  )
};

export default Pagination;
