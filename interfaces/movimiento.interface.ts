export interface Movimiento {
    id: number;
    fecha: string;
    tipo: string;
    producto: string;
    cantidad: number;
    referencia: string;
    stock_anterior: number;
    stock_actual: number;
    usuario: string;
    estado: boolean;
  }
  