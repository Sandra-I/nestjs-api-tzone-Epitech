import { Plan } from "src/plan/entities/plan.entity";

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    history: [{
        text: string;
        date: Date;
    }];
    settings: {
        langage: string;
        preview: boolean;
    };
    payment: {
        date: Date;
        total: number;
    }[];
    subscription: {
        planId: string;
        plan?: Plan;
        startDate: Date;
        endDate?: Date;
        annual: boolean;
    }[];
}
