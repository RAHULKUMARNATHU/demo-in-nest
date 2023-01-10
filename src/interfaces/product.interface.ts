export interface IProduct {
    _id?: number;
    prodName: string;
    code: string;
    imageUrl: string,
    sku: string;
    price: number;
    isActive: boolean;
    categoryId: number;
  }