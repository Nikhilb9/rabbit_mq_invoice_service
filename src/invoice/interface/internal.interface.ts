export interface ICreateInvoice {
  customerName: string;
  amount: number;
  reference: string;
  date: string;
  items: IItem[];
}

export interface IItem {
  sku: string;
  qt: number;
}

export interface IReadInvoice extends ICreateInvoice {
  id: string;
}

export interface IReadInvoiceList {
  invoices: IReadInvoice[];
}
