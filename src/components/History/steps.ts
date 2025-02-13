const steps = [
  {
    id: 1,
    title: "Project created successfully",
    areaType: "Area Basic",
    status: "Completed",
    date: "Monday, Dec 5 2023 | 07:00 PM"
  },
  {
    id: 2,
    title: "Questionnaire",
    questions: [
      {
        id: "q1",
        title: "Questionnaire General",
        filled: true,
      },
      {
        id: "q2",
        title: "Questionnaire Frontyard",
        filled: true
      },
      {
        id: "q3",
        title: "Questionnaire Backyard",
        filled: true
      },
      {
        id: "q4",
        title: "Images and Videos",
        filled: true
      }
    ],
    status: "Completed",
    date: "Monday, Dec 4 2023 | 07:00 PM"
  },
  {
    id: 3,
    title: "Coordination Call",
    text: "Choose a date and time for the coordination call. The Project Manager will confirm the availability of the chosen time.", 
    status: "There is no Coordination Call Scheduled",
    date: "Tuesday, Dec 5 2023 | 07:00 PM"
  },
  {
    id: 4,
    title: "First Draft",
    status: "There is no First Draft Submited",
    date: "Wednesday, Dec 6 2023 | 07:00 PM"
  },
  {
    id: 5,
    title: "Revision Call",
    status: "There is no Revision Call Scheduled",
    date: "Thursday, Dec 7 2023 | 07:00 PM"
  },
  {
    id: 6,
    title: "Design Revision",
    status: "There is no Design Revision Submited",
    date: "Friday, Dec 8 2023 | 07:00 PM"
  },
  {
    id: 7,
    title: "Final Design",
    status: "There is no Final Design Submited",
    date: "Saturday, Dec 9 2023 | 07:00 PM"
  }
]

const projects = [
  {
    id: 1234223,
    title: "Project 1 U1 - [ ID: 1 ]",
    status: "Pending",
    type: "Area Basic",
    designer: "Joao Da Silva",
    steps: steps
  },
  {
    id: 2234332,
    title: "Project 2 U2 - [ ID: 2 ]",
    status: "Pending",
    type: "Area Basic",
    designer: "Joao Da Silva",
    steps: steps
  },
  {
    id: 433358776,
    title: "Project 3 U3 - [ ID: 3 ]",
    status: "Pending",
    type: "Area Basic",
    designer: "Joao Da Silva",
    steps: steps
  }
]

const backgrounds = [
  {
    name: "myprofile",
    path: "/spaceMyProfileBg.webp"
  },
  {
    name: "projects",
    path: "/panel-clientBg.jpg"
  },
]

export {
  projects,
  steps,
  backgrounds
}