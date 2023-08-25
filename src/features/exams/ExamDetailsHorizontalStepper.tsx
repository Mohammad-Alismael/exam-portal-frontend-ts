import React from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import { ExamDetailsSteps } from "../../lib/consts";
import Settings from "./examDetails/Settings";
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
      <div className="w-full p-4 bg-white rounded relative bg-green-400">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          {ExamDetailsSteps.map((val, i) => {
            return (
              <Step className='bg-yellow-600' onClick={() => setActiveStep(i)}>
                {i == 0 && <Settings activeStep={i}/>}
              </Step>
            );
          })}
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
