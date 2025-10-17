import { prisma } from '@/lib/db/prisma'
import { addMinutes } from 'date-fns'
import { sendSms } from '@/lib/sms/twilio'
import { Mailer } from '@/lib/email'

export async function generateOtp({ target, channel, purpose, userId }: { target: string; channel: 'sms' | 'email'; purpose: string; userId?: string }) {
  const code = (Math.floor(100000 + Math.random() * 900000)).toString()
  const expiresAt = addMinutes(new Date(), 10)
  await prisma.otp.create({ data: { userId, target, channel, code, purpose, expiresAt } })

  if (channel === 'sms') {
    await sendSms(target, `Your BlinkPay ${purpose} code is ${code}. It expires in 10 minutes.`)
  } else {
    const mailer = new Mailer()
    await mailer.sendEmail({ to: target, subject: `Your BlinkPay ${purpose} code`, template: 'otp', from: process.env.EMAIL_FROM || 'BlinkPay <noreply@blinkpay.ng>', context: { code } })
  }
  return { code, expiresAt }
}

export async function verifyOtp({ target, code, purpose }: { target: string; code: string; purpose: string }) {
  const record = await prisma.otp.findFirst({ where: { target, purpose, usedAt: null }, orderBy: { createdAt: 'desc' } })
  if (!record) return false
  if (record.expiresAt < new Date()) return false
  if (record.code !== code) return false
  await prisma.otp.update({ where: { id: record.id }, data: { usedAt: new Date() } })
  return true
}
