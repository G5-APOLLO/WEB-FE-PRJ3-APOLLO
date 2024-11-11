export interface IOpportunity {
    id: number; 
    clientIds: number[];
    businessName: string; 
    businessLine: 'Outsourcing Resources' | 'Web Development' | 'Mobile Development' | 'IT Consulting'; 
    description: string; 
    estimatedValue: number; 
    estimatedDate: string;
    status: 'Open' | 'Under Review' | 'Purchase Order' | 'Completed'; 
}
