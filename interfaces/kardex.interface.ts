export interface Kardex {
    id: number;
    fecha: string;
    tipo_movimiento: 'entrada' | 'salida';
    referencia: string;
    producto: string;
    cantidad: number;
    stock_anterior: number;
    stock_actual: number;
    usuario: string;
  }
  