const packages = [
  {
    id: 1,
    title: "1 Area Basic",
    price: "100",
    image: "https://github.com/BPM94/SCCTMD/raw/main/opt/carrito2.webp",
    includes: ["● 30-minute phone call with a project manager", "● One round of design revisions", "● 2-3 week to design delivery", "● Plant selection specific for your property", "● List of materials selected for your project"],
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



const extras =[
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

const extrasDetails = [
  {
    id: 1,
    title: "Irrigation Plan",
    description: "Add an irrigation system to your design to keep your landscape design well maintained",
    items: ["● 1 area basic", "● 1 area pro", "● 2 Basic areas"]
  },
  {
    id: 2,
    title: "360° Virtual Tour of Design",
    description: "Experience your design in a 360° video",
    items: ["● 1 area basic", "● 2 Basic areas"]
  },
  {
    id: 3,
    title: "Lighting Plan",
    items: ["● 1 area basic", "● 2 Basic areas"]
  }
]

export {
  packages,
  extras,
  extrasDetails
}