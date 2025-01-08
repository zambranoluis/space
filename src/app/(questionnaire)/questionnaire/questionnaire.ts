const questionnaire = {
  general: [
    {
      id: "qg1",
      title: "Tell us the area you want to design",
      options: [
        {
          id: "qg1o1",
          name: "Backyard",
          img:""
        },
        {
          id: "qg1o2",
          name: "Frontyard",
          img:""
        },
        {
          id: "qg1o3",
          name: "Both",
          img:""
        },
        {
          id: "qg1o4",
          name: "Side Yard",
          img:""
        }
      ]
    },
    {
      id: "qg2",
      title: "What style are you looking for your space?",
      options: [
        {
          id: "qg2o1",
          name: "Backyard",
          img: "/questionnaire/nuevo-cuestionario-15.png"
        },
        {
          id: "qg2o2",
          name: "Frontyard",
          img: "/questionnaire/nuevo-cuestionario-16.png"
        },
        {
          id: "qg2o3",
          name: "Both",
          img: "/questionnaire/nuevo-cuestionario-17.png"
        },
        {
          id: "qg2o4",
          name: "Side Yard",
          img: "/questionnaire/nuevo-cuestionario-18.png"
        },
        {
          id: "qg2o5",
          name: "Rustic",
          img: "/questionnaire/nuevo-cuestionario-19.png"
        },
        {
          id: "qg2o6",
          name: "Desert",
          img: "/questionnaire/nuevo-cuestionario-20.png"
        },
        {
          id: "qg2o7",
          name: "Tropical",
          img: "/questionnaire/nuevo-cuestionario-21.png"
        },
        {
          id: "qg2o8",
          name: "Zen",
          img: "/questionnaire/nuevo-cuestionario-22.png"
        }
      ]
    },
    {
      id: "qg3",
      title: "Do you have kids & pets?",
      img: "/questionnaire/nuevo-cuestionario-23.png",
      options: []
    },
    {
      id: "qg4",
      title: "Can toxic plants be used?",
      img: "/questionnaire/nuevo-cuestionario-24.png",
      options: []
    },
    {
      id: "qg5",
      title: "Do you entertain a lot in your yard area?",
      img: "/questionnaire/nuevo-cuestionario-25.png",
      options: []
    }
  ],
  backyard: [
    {
      id: "qb1",
      title: " Do you prefer colorful plants or simple, green and white ones?",
      img: "/questionnaire/nuevo-cuestionario-26.png",
      buttonText: "Colorful / Green and white",
      options: [],
      question: ""
    },
    {
      id: "qb2",
      title: "How many plants do you want in your space?",
      img: "/questionnaire/nuevo-cuestionario-27.png",
      options: [
        {
          id: "qb2o1",
          name: "Minimum",
          detail: "(25% Of your garden)",
          img:""
        },
        {
          id: "qb2o2",
          name: "In Between",
          detail: "(40% Of your garden)",
          img:""
        },
        {
          id: "qb2o3",
          name: "Full",
          detail: "(80% Of your garden)",
          img:""
        }
      ],
      question: ""
    },
    {
      id: "qb3",
      title :"What are you looking to keep or remove in your yard?",
      img: "/questionnaire/nuevo-cuestionario-28.png",
      options: [
        {
          id: "qb3o1",
          name: "Things to keep",
          detail: "",
          img: ""
        },
        {
          id: "qb3o2",
          name: "Things to remove",
          detail: "",
          img: ""
        }
      ],
      question: ""
    },
    {
      id: "qb4",
      title: " Would you like to add some kind of hardscape?",
      buttonText: "Yes/No",
      options: [],
      question: ""
    },
    {
      id: "qb5",
      title: "Would you like a water feature?",
      buttonText: "Yes/No",
      options: [
        {
          id: "qb5o1",
          name: "Water Fountain",
          img: "/questionnaire/nuevo-cuestionario-30.png",
          detail: ""
        },
        {
          id: "qb5o2",
          name: "Water Hot Tub",
          img: "/questionnaire/nuevo-cuestionario-31.png",
          detail: ""
        },
        {
          id: "qb5o3",
          name: "Pool",
          img: "/questionnaire/nuevo-cuestionario-32.png",
          detail: ""
        },
        {
          id: "qb5o4",
          name: "Bird Bath",
          img: "/questionnaire/nuevo-cuestionario-33.png",
          detail: ""
        }
      ],
      question: "For how many people?",
    },
    {
      id: "qb6",
      title: " Would you like an area with a fire feature?",
      options: [],
      question: ""
    },
    {
      id: "qb7",
      title: "Would you like to have a covered patio or pergola?",
      options: [],
      question: ""
    },
    {
      id: "qb8",
      title: "Would you like to have a grass area?",
      options: [],
      question: ""
    },
    {
      id: "qb9",
      title: "Would you like to provide privacy to your space?",
      options: [],
      question: ""
    },
    {
      id: "qb10",
      title: "Would you like to add new trees to your yard?",
      options: [],
      question: ""
    }

  ],
  frontyard: [

  ]
}

export {
  questionnaire
}