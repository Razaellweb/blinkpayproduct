import { z } from 'zod'

export const signupSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().min(8).max(20).optional(),
  password: z.string().min(8),
  role: z.enum(['ADMIN', 'VENDOR', 'CONSUMER']).default('CONSUMER'),
})

export const signinSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().min(8).max(20).optional(),
  password: z.string().min(8),
  otp: z.string().length(6).optional(),
})

export const passwordResetRequestSchema = z.object({
  emailOrPhone: z.string().min(3),
})

export const passwordResetCompleteSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(8),
})

export const profileUpdateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  displayName: z.string().optional(),
  pin: z.string().min(4).max(6).optional(),
  notifications: z.record(z.any()).optional(),
})

export const kycSubmitSchema = z.object({
  method: z.enum(['BVN', 'NIN']),
  value: z.string(),
})

export const walletTopupSchema = z.object({
  amount: z.number().positive(),
  email: z.string().email(),
  callbackUrl: z.string().url().optional(),
  metadata: z.record(z.any()).optional(),
})

export const transferSchema = z.object({
  toUserId: z.string().optional(),
  toWalletId: z.string().optional(),
  amount: z.number().positive(),
  description: z.string().optional(),
  bankAccountNumber: z.string().min(10).max(10).optional(),
  bankCode: z.string().min(2).max(6).optional(),
  bankAccountName: z.string().optional(),
  otp: z.string().length(6).optional(),
})

export const spendCodeGenerateSchema = z.object({
  amount: z.number().positive(),
  offline: z.boolean().default(false),
  expiresInMinutes: z.number().int().min(1).max(1440).default(15),
})

export const spendCodeRedeemSchema = z.object({
  code: z.string(),
})

export const billsPaySchema = z.object({
  provider: z.string(),
  productCode: z.string(),
  amount: z.number().positive(),
  metadata: z.record(z.any()).optional(),
})
