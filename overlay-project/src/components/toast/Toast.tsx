import { useToast } from '../../contexts/ToastContext';

export const Toast = () => {
  const { overlayList, hideToast } = useToast();

  return (
    <section className="fixed top-4 right-4 z-50 flex flex-col gap-4">
      {overlayList.map((overlay) => {
        const { id, title, description } = overlay;

        return (
          <div
            key={id}
            className={`transform transition-all duration-300 ease-in-out
                  translate-y-0 opacity-100
                  flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow 
                  dark:text-gray-400 dark:bg-gray-800`}
            role="alert"
          >
            <div
              className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 
                    ${
                      title === '오류'
                        ? 'bg-red-100 text-red-500'
                        : 'bg-blue-100 text-blue-500'
                    } rounded-lg dark:bg-blue-800 dark:text-blue-200`}
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
                />
              </svg>
              <span className="sr-only">Fire icon</span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="ms-3 text-[16px] font-normal">{title}</h3>
              <p className="ms-3 text-[14px]">{description}</p>
            </div>
            <button
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg 
                   focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center 
                   justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 
                   dark:hover:bg-gray-700"
              data-dismiss-target="#toast-default"
              aria-label="Close"
              onClick={() => hideToast(id)}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        );
      })}
    </section>
  );
};
