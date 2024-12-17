

import { FaCheck } from "react-icons/fa";


const pictures = [
  {
    id: 1,
    image: "https://github.com/BPM94/SCCTMD/raw/main/opt/HomeSlider1.webp",
  },
  { 
    id: 2,
    image: "https://github.com/BPM94/SCCTMD/raw/main/opt/HomeSlider2.webp",
  },
  { 
    id: 3,
    image: "https://github.com/BPM94/SCCTMD/raw/main/opt/HomeSlider3.webp",
  },
  { 
    id: 4,
    image: "https://github.com/BPM94/SCCTMD/raw/main/opt/HomeSlider4.webp",
  },
  { 
    id: 5,
    image: "https://github.com/BPM94/SCCTMD/raw/main/opt/HomeSlider5.webp",
  },
  { 
    id: 6,
    image: "https://github.com/BPM94/SCCTMD/raw/main/opt/HomeSlider6.webp",
  }
]

const steps = [
  {
    id: 1,
    image: "https://github.com/BPM94/SCCTMD/raw/main/opt/step1.webp",
    title: "Step 1",
    content: ["● Select your package", "● Talk to the experts about your budget", "● Take photos of your property", "● Tell us about your ideal space"]
  },
  {
    id: 2,
    image: "https://github.com/BPM94/SCCTMD/raw/main/opt/step2.webp",
    title: "Step 2",
    content: ["A landscape designer will work on your space to create a design according to your budget and style."]
  },
  {
    id: 3,
    image: "https://github.com/BPM94/SCCTMD/raw/main/opt/step3.webp",
    title: "Step 3",
    content: ["You will receive a file with images of your new space, 3d floor plan and the additional plans you have requested."]
  }
]

const packagesDetails = [
  {
    id: 1,
    text: "WHAT'S INCLUDED",
  },
  {
    id: 2,
    text: "Work with a professional designer"
  },
  {
    id: 3,
    text: "Video/phone call with a project manager"
  },
  {
    id: 4,
    text: "Revisions"
  },
  {
    id: 5,
    text: "Estimated delivery time"
  },
  {
    id: 6,
    text: "Plant selection specific for your property"
  },
  {
    id: 7,
    text: "List of materials selected for your project"
  },
  {
    id: 8,
    text: "360° virtual tour of design"
  },
  {
    id: 9,
    text: "Lighting plan"
  },
  {
    id: 10,
    text: "Irrigation Plan"
  },
  {
    id: 11,
    text: "Prices"
  }
]

const packagesProducts = [
  [
    {
      id: 1,
      text: "1 Area Basic",
    },
    {
      id: 2,
      text: <FaCheck />
    },
    {
      id: 3,
      text: "30 min"
    },
    {
      id: 4,
      text: "1 round of revisions"
    },
    {
      id: 5,
      text: <FaCheck />
    },
    {
      id: 6,
      text: <FaCheck />
    },
    {
      id: 7,
      text: <FaCheck />
    },
    {
      id: 8,
      text: ""
    },
    {
      id: 9,
      text: ""
    },
    {
      id: 10,
      text: ""
    },
    {
      id: 11,
      text: "$175"
    }
  ],
  [
    {
      id: 1,
      text: "1 Area Pro",
    },
    {
      id: 2,
      text: <FaCheck />
    },
    {
      id: 3,
      text: "45 min"
    },
    {
      id: 4,
      text: "Unlimited rounds of revisions for 30 days"
    },
    {
      id: 5,
      text: "1-2 week to design delivery"
    },
    {
      id: 6,
      text: <FaCheck />
    },
    {
      id: 7,
      text: <FaCheck />
    },
    {
      id: 8,
      text: <FaCheck />
    },
    {
      id: 9,
      text: <FaCheck />
    },
    {
      id: 10,
      text: ""
    },
    {
      id: 11,
      text: "$265"
    }
  ],
  [
    {
      id: 1,
      text: "Both",
    },
    {
      id: 2,
      text: <FaCheck />
    },
    {
      id: 3,
      text: "1 hr"
    },
    {
      id: 4,
      text: "2 rounds of revisions"
    },
    {
      id: 5,
      text: <FaCheck />
    },
    {
      id: 6,
      text: <FaCheck />
    },
    {
      id: 7,
      text: <FaCheck />
    },
    {
      id: 8,
      text: ""
    },
    {
      id: 9,
      text: ""
    },
    {
      id: 10,
      text: ""
    },
    {
      id: 11,
      text: "$195"
    }
  ],
  [
    {
      id: 1,
      text: "Both Pro",
    },
    {
      id: 2,
      text: <FaCheck />
    },
    {
      id: 3,
      text: "1 hr"
    },
    {
      id: 4,
      text: "Unlimited rounds of revisions for 30 days"
    },
    {
      id: 5,
      text: "1-2 week to design delivery"
    },
    {
      id: 6,
      text: <FaCheck />
    },
    {
      id: 7,
      text: <FaCheck />
    },
    {
      id: 8,
      text: <FaCheck />
    },
    {
      id: 9,
      text: <FaCheck />
    },
    {
      id: 10,
      text: <FaCheck />
    },
    {
      id: 11,
      text: "$395"
    }
  ],
]

export {
  pictures,
  steps,
  packagesDetails,
  packagesProducts
}