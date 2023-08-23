import React from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
function ExamDetailsHorizontalStepper(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <>
      <h1 className="text-white text-2xl font-semibold pb-2 m-0 capitalize">
        exam details
      </h1>
      <div className="w-full px-24 py-4 bg-white rounded relative">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step onClick={() => setActiveStep(0)}>
            <UserIcon className="h-5 w-5" />
            <div className="absolute top-[3.5rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 0 ? "blue-gray" : "gray"}
              >
                Step 1
              </Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(1)}>
            <CogIcon className="h-5 w-5" />
            <div className="absolute top-[3.5rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 1 ? "blue-gray" : "gray"}
              >
                Step 2
              </Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(2)}>
            <BuildingLibraryIcon className="h-5 w-5" />
            <div className="absolute top-[3.5rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 2 ? "blue-gray" : "gray"}
              >
                Step 3
              </Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(3)}>
            <BuildingLibraryIcon className="h-5 w-5" />
            <div className="absolute top-[3.5rem] w-max text-center">
              <Typography
                variant="h6"
                color={activeStep === 3 ? "blue-gray" : "gray"}
              >
                Step 4
              </Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(4)}>
            <BuildingLibraryIcon className="h-5 w-5" />
            <div className="absolute top-[3.5rem] w-max text-center">
              <Typography
                  variant="h6"
                  color={activeStep === 4 ? "blue-gray" : "gray"}
              >
                Step 5
              </Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(5)}>
            <BuildingLibraryIcon className="h-5 w-5" />
            <div className="absolute top-[3.5rem] w-max text-center">
              <Typography
                  variant="h6"
                  color={activeStep === 5 ? "blue-gray" : "gray"}
              >
                Step 6
              </Typography>
            </div>
          </Step>
        </Stepper>
        <div className="mt-32 flex justify-between">
          <Button onClick={handlePrev} disabled={isFirstStep}>
            Prev
          </Button>
          <Button onClick={handleNext} disabled={isLastStep}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default ExamDetailsHorizontalStepper;
