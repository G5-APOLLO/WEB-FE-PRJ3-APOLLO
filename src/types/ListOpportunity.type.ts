export interface IOpportunity {
    id: number; 
    clientIds: number[];
    businessName: string; 
    businessLine: 'outsourcing recursos' | 'desarrollo web' | 'desarrollo mobile' | 'consultoría TI'; 
    description: string; 
    estimatedValue: number; 
    estimatedDate: string;
    status: 'Apertura' | 'En Estudio' | 'Orden de Compra' | 'Ejecutada'; 
}
