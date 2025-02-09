// src/types/event.ts
export enum EventStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    // Add other status values from your configConsts.EXAMINATION_STATUS
  }
  
  export interface Event {
    id: string;
    slug: string;
    name: string;
    details: string;
    instruction: string;
    status: EventStatus;
    avatar: string | null;
    from: Date;
    to: Date;
  }
  
   