

const Modal = ({modalData}:{modalData:any}) => {
  return (
    <div
    id="popup-modal"
    tabIndex={-1}
    className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-20 backdrop-blur-sm bg-gray-500"
  >
    <div className="relative p-4 w-full max-w-md">
      <div className="relative bg-white rounded-lg shadow">
        <button
          type="button"
          className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="popup-modal"
          onClick={modalData.btn2Handler}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-4 md:p-5 text-center">
          <svg
            className="mx-auto mb-4 text-gray-600 w-12 h-12"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-600">
            {modalData.title}
          </h3>
          <button
            data-modal-hide="popup-modal"
            type="button"
            className="text-white bg-blue-600 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
            onClick={modalData.btn1Handler}
          >
            {modalData.btn1Text}
          </button>
          <button
            data-modal-hide="popup-modal"
            type="button"
            className="text-gray-800 bg-gray-100 hover:bg-gray-200  rounded-lg border border-gray-400 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
            onClick={modalData.btn2Handler}
          >
            {modalData.btn2Text}
          </button>
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default Modal;
