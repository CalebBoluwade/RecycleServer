export enum CompletionStatus {
    COMPLETED = 'COMPLETED',
    PENDING = 'PENDING',
    MISSED = 'MISSED',
    CANCELLED = 'CANCELLED',
    DELETED = 'DELETED'
}

export enum customerStatus {
    'ACTIVE' = 'ACTIVE',
    'PENDING' = 'PENDING',
    'DISABLED' = 'DISABLED',
    'DELETED' = 'DELETED'
}

export enum CollectorStatus {
    PENDING = 'PENDING',
    DECLINED = 'DECLINED',
    ACCEPTED = 'ACCEPTED'
}

export enum UserSet {
    'USER' = 'USER',
    'VENDOR' = 'VENDOR',
    'ADMIN' = 'ADMIN'
}

export interface Vendor {
    id: string;
    vendor: string;
    vendorTel: string;
    vendorEmail: string;
}

export interface wasteBinData {
    email: string;
    address: string;
    wasteBags: number;
    wasteMaterials: string[];
    phoneNumber: string;
    imageDescription: string | null;
    pickupDate: number;
    vendor: Vendor;
    CollectorStatus?: CollectorStatus;
    CompletionStatus?: CompletionStatus;
}

export interface RegisterData {
    fullName: string;
    email: string;
    password: string;
    userType: string;
    address?: string | null;
    verificationCode?: string;
    refCode?: string;
    refCodeCount?: number;
    phoneNumber: string;
    status: UserSet;
}

enum TranactionType {
    'CREDIT' = 'CREDIT',
    'DEBIT' = 'DEBIT'
}

enum TranactionStatus {
    'SUCCESSFUL' = 'SUCCESSFUL',
    'FAILED' = 'FAILED',
    'PENDING' = 'PENDING'
}

interface Transaction {
    id: string;
    amount: number;
    email: string;
    description: string;
    status: TranactionStatus;
    type: TranactionType;
    transDate: string;
    CRacctName: string;
    CRacctNo: string;
}
