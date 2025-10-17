import { PaymentService } from '@/lib/payment/service'
import { PaystackProvider } from '@/lib/payment/paystack'

export function getPaymentService() {
  return new PaymentService(new PaystackProvider())
}
