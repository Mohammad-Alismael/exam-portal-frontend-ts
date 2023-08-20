import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedCourseId, setTab } from "./sidebarSlice";
import { COURSES, courses, PROFILE, SETTINGS } from "../../lib/consts";
import { useGetCoursesQuery } from "../courses/coursesApiSlice";
import { Course } from "../../types/global";

export function SidebarWithSearch() {
  const [open, setOpen] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCoursesQuery();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const handleDispatch = (tab: string) => {
    dispatch(setTab(tab));
  };
  const handleCourseId = (courseId: string) => {
    handleDispatch(COURSES);
    dispatch(setSelectedCourseId(courseId));
  };

  return (
    <Card className="rounded-none float-left h-[calc(100vh)] text-black p-4 shadow-xl shadow-blue-gray-900/5">
      <div
        onClick={() => handleDispatch(null)}
        className="mb-2 flex items-center gap-4 p-4"
      >
        <img src="./logo.png" alt="brand" className="h-8 w-8" />
        <Typography variant="h5" color="blue-gray">
          Exam Portal
        </Typography>
      </div>
      <div className="p-2">
        <Input
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          label="Search"
        />
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => {
                handleOpen(1);
              }}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                courses
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              {!isLoading && courses["data"].map((course: Course, i: number) => {
                return (
                  <ListItem
                      key={course.id}
                    onClick={() => {
                      handleCourseId(course.classroom_id);
                    }}
                  >
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    {course.class_name}
                  </ListItem>
                );
              })}
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem onClick={() => handleDispatch(PROFILE)}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem onClick={() => handleDispatch(SETTINGS)}>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem onClick={() => navigate("/logout")}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
