import React from "react";
import ExamDetailsHorizontalStepper from "./ExamDetailsHorizontalStepper";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Button } from "@material-tailwind/react";
import { TabsContent } from "@radix-ui/react-tabs";
import ReportPage from "./ReportPage";
import ResponsePage from "./ResponsePage";

function CreateExamPage(props) {
  return (
    <div>
      <Tabs defaultValue="questions" className="w-full pb-4">
        <TabsList className="grid w-[400px] grid-cols-3 text-black">
          <TabsTrigger className="" value="questions">
            questions
          </TabsTrigger>
          <TabsTrigger className="" value="responses">
            responses
          </TabsTrigger>
          <TabsTrigger className="" value="reports">
            reports
          </TabsTrigger>
        </TabsList>
        <TabsContent className="mt-5" value="questions">
          <ExamDetailsHorizontalStepper />
        </TabsContent>
        <TabsContent className="mt-5" value="responses">
          <ResponsePage />
        </TabsContent>
        <TabsContent className="mt-5" value="reports">
          <ReportPage />
        </TabsContent>
        <Button className="bg-yellow-600 text-black absolute top-5 right-5 rounded">
          preview exam
        </Button>
      </Tabs>
    </div>
  );
}

export default CreateExamPage;
