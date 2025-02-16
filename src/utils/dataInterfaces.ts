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
  total: number;
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
  total: number;
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

export interface GetProjectsByPurchasesId {
  _id: string;
  name: string;
  description: {
    name: string;
    type: string;
    extras: string[];
    areas: string[];
  };
  steps: {
    _id: string;
    step: string;
    information: { status: string; isComplete: boolean }[];
    content: { file: string; text: string; date: Date }[];
    isActive: boolean;
  }[];
  questionnaire: {
    _id: string;
    category: string[];
    questions: any[];
    isComplete: boolean;
    softDelete: boolean;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  };
  purchase: {
    _id: string;
    customer: string;
    product: string;
    extras: {
      extra: string;
      isActive: boolean;
      _id: string;
    }[];
    selectedAreas: {
      nameArea: string;
      isActive: boolean;
      _id: string;
    }[];
    total: number;
    status: string;
    isActive: boolean;
    softDelete: boolean;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  };
  team: string[];
  isActive: boolean;
  softDelete: boolean;
  deletedAt?: Date;
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
