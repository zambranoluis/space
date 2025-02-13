export interface CreateCustomer {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: {
    areaCode: string;
    number: string;
  };
  skype: string;
  address: string;
  birthdate: string;
}

export interface Customer {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: {
    areaCode: string;
    number: string;
  };
  skype: string;
  address: string;
  birthdate: string;
}

export interface Extra {
  _id: string;
  name: string;
  description: string;
  items: string[];
  cost: number;
  price: number;
  isActive: boolean;
}

export interface SelectedExtra {
  extra: string;
  isActive: boolean;
  price: number;
}

export interface Area {
  nameArea: string;
  isActive: boolean;
}

export interface Product {
  _id: string;
  name: string;
  type: string;
  area: number;
  image: string;
  include: string[];
  extra: string[];
  cost: number;
  price: number;
  picture: string;
}

export interface Transaction {
  _id: string;
  purchase: string;
  status: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePurchase {
  customer: string;
  product: string;
  selectedAreas: [
    {
      nameArea: string;
      isActive: boolean;
    },
    {
      nameArea: string;
      isActive: boolean;
    },
  ];
  extras: SelectedExtra[];
  price: number;
  status: string;
  isActive: boolean;
}

export interface Purchase {
  customer: string;
  product: string;
  selectedAreas: [
    {
      nameArea: string;
      isActive: boolean;
    },
    {
      nameArea: string;
      isActive: boolean;
    },
  ];
  extras: SelectedExtra[];
  price: number;
  status: string;
  isActive: boolean;
}

export interface DetailedPurchase {
  _id: string;
  customer: Customer;
  product: Product;
  selectedAreas: [
    {
      nameArea: string;
      isActive: boolean;
    },
    {
      nameArea: string;
      isActive: boolean;
    },
  ];
  extras: Extra[];
  total: number;
  status: string;
  isActive: boolean;
}

export interface createQuestionnaires {
  category: string[];
  questions: [{}];
  isComplete: boolean;
  softDelete: boolean;
  deletedAt: string;
}

export interface createProject {
  purchaseId: string;
}

export interface getProjectsByPurchasesId {
  _id: string;
  name: string;
  description: string;
  steps: [
    {
      step: string;
      information: [{ status: string; isComplete: boolean }];
      content: [{ file: string; text: string; date: Date }];
      isActive: boolean;
    },
  ];
  questionnaire: string;
  purchase: string;
  team: [string];
  development: string;
  isActive: boolean;
  deletedAt: Date;
  softDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface question {
  quest: string; // Pregunta
  category: string; // Categoría (Frontyard, Backyard, etc.)
  notes: [{ note: string }]; // Nota adicional
  selected: [{ selected: string }]; // Si es una pregunta con selección
  select: boolean;
  people: number; // Número de personas asociadas
  files: string[]; // Archivos subidos por el cliente
  questionnaireId: string;
}
