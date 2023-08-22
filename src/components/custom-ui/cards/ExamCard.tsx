import React from "react";
import PropTypes from "prop-types";
import { DocumentChartBarIcon } from "@heroicons/react/20/solid";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CalculatorIcon,
  ChartBarSquareIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
ExamCard.propTypes = {};

function ExamCard(props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <div className="flex items-center p-2 bg-white text-black rounded flex justify-between  capitalize">
          <div className="inline-flex gap-x-2 items-center">
            <DocumentChartBarIcon className="text-yellow-600 mx-auto h-8 w-8 transition-transform" />
            <span>exam title</span>
          </div>
          <span>23 Sep 2023</span>
          <span>24 Sep 2023</span>
          <div className="inline-flex gap-x-0 items-center">
            <TooltipTrigger asChild>
              <PencilSquareIcon className="mx-auto h-8 w-8 transition-transform" />
            </TooltipTrigger>
            <TooltipContent className="bg-white text-black">
              <p>Add to library</p>
            </TooltipContent>
            <TooltipTrigger asChild>
              <CalculatorIcon
                className={`mx-auto h-8 w-8 transition-transform`}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-white text-black">
              <p>Add to library 2</p>
            </TooltipContent>
            <TooltipTrigger asChild>
              <ChartBarSquareIcon className="mx-auto h-8 w-8 transition-transform" />
            </TooltipTrigger>
            <TooltipContent className="bg-white text-black">
              <p>Add to library 3</p>
            </TooltipContent>
          </div>
        </div>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ExamCard;
