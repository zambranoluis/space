
const questionnaire = {
  general: [
    {
      id: "qg1",
      title: "What you paid for your renovation:",
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
          name: "Traditional",
          img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-15.png"
        },
        {
          id: "qg2o2",
          name: "Farmhouse",
          img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-16.png"
        },
        {
          id: "qg2o3",
          name: "Mediterranean",
          img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-17.png"
        },
        {
          id: "qg2o4",
          name: "Modern",
          img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-18.png"
        },
        {
          id: "qg2o5",
          name: "Rustic",
          img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-19.png"
        },
        {
          id: "qg2o6",
          name: "Desert",
          img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-20.png"
        },
        {
          id: "qg2o7",
          name: "Tropical",
          img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-21.png"
        },
        {
          id: "qg2o8",
          name: "Zen",
          img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-22.png"
        }
      ]
    },
    {
      id: "qg3",
      title: "Do you have kids & pets?",
      buttonText: "Yes/No",
      img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-23.png",
      options: []
    },
    {
      id: "qg4",
      title: "Can toxic plants be used?",
      buttonText: "Yes/No",
      img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-24.png",
      options: []
    },
    {
      id: "qg5",
      title: "Do you entertain a lot in your yard area?",
      buttonText: "Yes/No",
      img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-25.png",
      options: []
    }
  ],
  backyard: [
    {
      id: "qb1",
      title: " Do you prefer colorful plants or simple, green and white ones?",
      img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-26.png",
      buttonText: "Colorful / Green and white",
      options: [],
      question: ""
    },
    {
      id: "qb2",
      title: "How many plants do you want in your space?",
      img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-27.png",
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
      img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-28.png",
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
      img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-29.png",
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
          img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-30.png",
          detail: ""
        },
        {
          id: "qb5o2",
          name: "Water Hot Tub",
          img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-31.png",
          detail: ""
        },
        {
          id: "qb5o3",
          name: "Pool",
          img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-32.png",
          detail: ""
        },
        {
          id: "qb5o4",
          name: "Bird Bath",
          img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-33.png",
          detail: ""
        }
      ],
      question: "For how many people?",
    },
    {
      id: "qb6",
      title: " Would you like an area with a fire feature?",
      buttonText: "Yes/No",
      options: [
        {
          id: "qb6o1",
          name: "Fire Pit",
          img:"https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-34.png",
          detail:""
        },
        {
          id: "qb6o2",
          name: "Fire Place",
          img:"https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-35.png",
          detail:""
        }
      ],
      question: "For how many people?"
    },
    {
      id: "qb7",
      title: "Would you like to have a covered patio or pergola?",
      img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-36.png",
      buttonText: "Yes/No",
      options: [],
      question: ""
    },
    {
      id: "qb8",
      title: "Would you like to have a grass area?",
      img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-37.png",
      buttonText: "Yes/No",
      options: [],
      question: ""
    },
    {
      id: "qb9",
      title: "Would you like to provide privacy to your space?",
      img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-38.png",
      buttonText: "Yes/No",
      options: [],
      question: ""
    },
    {
      id: "qb10",
      title: "Would you like to add new trees to your yard?",
      img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-39.png",
      buttonText: "Yes/No",
      options: [],
      question: ""
    }

  ],
  frontyard: [

  ],
  extra: [
    {
      id: "qe1",
      title: "Is there anything else you would like to tell us to add to your design?",
      img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-40.webp",
      buttonText: "Yes/No",

    },
    {
      id: "qe2",
      title: "When do you plan to start renovating your patio?",
      img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-41.webp",
      buttonText: "Yes/No",
    },
    {
      id: "qe3",
      title: "Scope And Size Of Project",
      img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-42.webp",
      buttonText: "Yes/No",
    },
    {
      id: "qe4",
      title: "What is your budget for your yard renovation?",
      img: "https://github.com/BPM94/SCCTMD/raw/main/questionnaire/nuevo-cuestionario-41.webp",
      buttonText: "Yes/No",
    }
  ]
}

const packages = [
  {
    id: 1,
    title: "1 Area Basic",
    price: "100",
    image: "https://github.com/BPM94/SCCTMD/raw/main/opt/carrito2.webp",
    includes: ["▪ 30-minute phone call with a project manager", "▪ One round of design revisions", "▪ 2-3 week to design delivery", "▪ Plant selection specific for your property", "▪ List of materials selected for your project"],
    extrasOptions: [
      {
        id: 1,
        title: "Irrigation Plan",
      },
      {
        id: 2,
        title: "360° Virtual Tour of Design",
      },
      {
        id: 3,
        title: "Lighting Plan",
      },
      {
        id: 4,
        title: "Side Yard",
      },
    ]
    
  },
  {
    id: 2,
    title: "1 Area Pro",
    price: "100",
    image: "https://github.com/BPM94/SCCTMD/raw/main/opt/carrito3.webp",
    includes: ["● 45-minute phone call with a project manager", "● Unlimited rounds of revisions for 30 days", "● 1-2 week to design delivery", "● Plant selection specific for your property", "● List of materials selected for your project", "● 360° virtual tour of design", "● Lighting Plan"],
    extrasOptions: [
      {
        id: 1,
        title: "Irrigation Plan",
      },
      {
        id: 4,
        title: "Side Yard",
      },
    ]
  },
  {
    id: 3,
    title: "2 Areas Basic",
    price: "100",
    image: "https://github.com/BPM94/SCCTMD/raw/main/opt/carrito4.webp",
    includes: ["● 1 Hour phone call with a project manager", "● Two rounds of revision", "● 2-3 week to design delivery", "● Plant selection specific for your property", "● List of materials selected for your project"],
    extrasOptions: [
      {
        id: 1,
        title: "Irrigation Plan",
      },
      {
        id: 2,
        title: "360° Virtual Tour of Design",
      },
      {
        id: 3,
        title: "Lighting Plan",
      },
      {
        id: 4,
        title: "Side Yard",
      },
    ]
  },
  {
    id: 4,
    title: "2 Areas PRO",
    price: "100",
    image: "https://github.com/BPM94/SCCTMD/raw/main/opt/carrito5.webp",
    includes: ["● 1 Hour phone call with a project manager", "● Unlimited rounds of revisions for 30 days", "● 1-2 week to design delivery", "● Plant selection specific for your property", "● List of materials selected for your project", "● 360° virtual tour of design", "● Lighting Plan"],
    extrasOptions: [
      {
        id: 1,
        title: "Irrigation Plan",
      },
      {
        id: 4,
        title: "Side Yard",
      },
    ]
  }
]

export {
  questionnaire,
  packages
}