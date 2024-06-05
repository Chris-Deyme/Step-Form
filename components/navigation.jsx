export const Navigation = ({
  currentStep,
  setCurrentStep,
  maxValidatedStep,
}) => {
  return (
    <div className="w-full flex items-center justify-center m-4 sm:mb-5">
      <ol className="flex items-center w-full max-w-xl">
        <li
          className={`flex w-full items-center ${
            currentStep === 1 ? "text-[#FFFFFF]" : "text-gray-500"
          } after:content-[''] after:w-full after:h-1 after:border-b after:border-[#752466] after:border-4 after:inline-block dark:after:border-blue-800`}
        >
          <div onClick={() => setCurrentStep(1)}>
            <div
              className={`flex items-center justify-center w-10 h-10 ${
                currentStep === 1 ? "bg-[#752466]" : "bg-gray-300"
              } rounded-full lg:h-12 lg:w-12 ${
                currentStep === 1 ? "dark:bg-blue-800" : "dark:bg-gray-600"
              } shrink-0`}
            >
              <span
                className={`text-xl font-bold ${
                  currentStep === 1 ? "text-white" : "text-gray-500"
                }`}
              >
                1
              </span>
            </div>
          </div>
        </li>
        <li
          className={`flex w-full items-center ${
            currentStep === 2 ? "text-[#FFFFFF]" : "text-gray-500"
          } after:content-[''] after:w-full after:h-1 after:border-b after:border-[#752466] after:border-4 after:inline-block dark:after:border-blue-800`}
        >
          <div onClick={() => maxValidatedStep >= 2 && setCurrentStep(2)}>
            <div
              className={`flex items-center justify-center w-10 h-10 ${
                currentStep === 2 ? "bg-[#752466]" : "bg-gray-300"
              } rounded-full lg:h-12 lg:w-12 ${
                currentStep === 2 ? "dark:bg-blue-800" : "dark:bg-gray-600"
              } shrink-0`}
            >
              <span
                className={`text-xl font-bold ${
                  currentStep === 2 ? "text-white" : "text-gray-500"
                }`}
              >
                2
              </span>
            </div>
          </div>
        </li>
        <li
          className={`flex w-full items-center ${
            currentStep === 3 ? "text-[#FFFFFF]" : "text-gray-500"
          } after:content-[''] after:w-full after:h-1 after:border-b after:border-[#752466] after:border-4 after:inline-block dark:after:border-blue-800`}
        >
          <div onClick={() => maxValidatedStep >= 3 && setCurrentStep(3)}>
            <div
              className={`flex items-center justify-center w-10 h-10 ${
                currentStep === 3 ? "bg-[#752466]" : "bg-gray-300"
              } rounded-full lg:h-12 lg:w-12 ${
                currentStep === 3 ? "dark:bg-blue-800" : "dark:bg-gray-600"
              } shrink-0`}
            >
              <span
                className={`text-xl font-bold ${
                  currentStep === 3 ? "text-white" : "text-gray-500"
                }`}
              >
                3
              </span>
            </div>
          </div>
        </li>
        <li className="flex items-center w-full">
          <div
            onClick={() => maxValidatedStep >= 4 && setCurrentStep(4)}
            className={`flex items-center justify-center w-10 h-10 ${
              currentStep === 4 ? "bg-[#752466]" : "bg-gray-300"
            } rounded-full lg:h-12 lg:w-12 ${
              currentStep === 4 ? "dark:bg-blue-800" : "dark:bg-gray-600"
            } shrink-0`}
          >
            <span
              className={`text-xl font-bold ${
                currentStep === 4 ? "text-white" : "text-gray-500"
              }`}
            >
              4
            </span>
          </div>
        </li>
      </ol>
    </div>
  );
};
