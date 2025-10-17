// Minimal types to satisfy QoreID client imports
export interface WorkflowData { id: string; status: string; reference?: string }
export interface IReport { id: string; status: string; result?: unknown }
export interface BaseIdentityResponse { status: string; data?: unknown; message?: string }
export interface IPerson { firstName?: string; lastName?: string; middleName?: string; phone?: string; email?: string; dob?: string }
export interface IBvnResponse { status: string; data?: unknown }
export interface IIdentification { idNumber: string; selfieImage?: string; faceImage?: string }
export interface FaceVerificationResponse { status: string; score?: number; match?: boolean }
export interface NubanRequest { bankCode: string; accountNumber: string; bvn?: string }
export interface ICustomerReference { customerReference: string }
export interface IVerificationRecord { id: string; status: string }
export interface EmploymentRequest { customerReference: string; employer?: string }
export interface GuarantorRequest { customerReference: string; guarantor: { name: string; phone: string } }
export interface PropertyRequest { customerReference: string; address: string }
export interface PropertyResponse { id: string; status: string }
export interface VehicleRequest { plateNumber: string }
export interface CountriesResponse { countries: Array<{ id: number; name: string }> }
export interface StatesResponse { states: Array<{ id: number; name: string }> }
export interface LgasResponse { lgas: Array<{ id: number; name: string }> }
