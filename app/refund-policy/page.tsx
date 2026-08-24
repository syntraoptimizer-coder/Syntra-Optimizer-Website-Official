import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'

export const metadata: Metadata = {
  title: 'Refund Policy — Syntra Optimizer',
  description: 'Our refund policy and process for Syntra Optimizer.',
}

export default function RefundPolicyPage() {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Refund Policy</h1>
        <p className="mt-4 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="mt-12 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-base font-semibold text-foreground">1. Refund Request Process</h2>
            <p className="mt-2">
              To request a refund, you must provide a valid reason for your request. Simply being dissatisfied 
              is not sufficient grounds for a refund. We require specific details about the issue you are experiencing.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">2. Technical Verification Required</h2>
            <p className="mt-2">
              For refund requests based on application malfunction or non-performance, our team will need to 
              verify the issue by connecting to your computer via AnyDesk. This verification process is mandatory 
              to determine if the application is genuinely not working and to identify the specific cause of the problem.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">3. Issue Diagnosis</h2>
            <p className="mt-2">
              When our team connects to your computer via AnyDesk, we will:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Test the application functionality in your environment</li>
              <li>Identify any compatibility issues with your system</li>
              <li>Determine if the issue is caused by our software or external factors</li>
              <li>Document the specific technical reason for any malfunction</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">4. Refund Eligibility</h2>
            <p className="mt-2">
              Refunds will be processed only when:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>A valid technical reason is provided and verified</li>
              <li>Our team confirms the application is not functioning as intended</li>
              <li>The issue cannot be resolved through technical support</li>
              <li>The malfunction is directly attributable to our software</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">5. Non-Refundable Situations</h2>
            <p className="mt-2">
              Refunds will not be issued for:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>System incompatibility that was clearly stated in our requirements</li>
              <li>Issues caused by user modifications or third-party software</li>
              <li>Change of mind after purchase</li>
              <li>Performance variations due to hardware limitations</li>
              <li>Issues that can be resolved through our support channels</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">6. Verification Timeline</h2>
            <p className="mt-2">
              The technical verification process typically takes 3-5 business days from the time of your refund 
              request. During this period, our team may request additional information or access to diagnose 
              the issue properly.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">7. Refund Processing</h2>
            <p className="mt-2">
              Once the verification is complete and your refund is approved, the refund will be processed 
              within 5-10 business days. The refund will be issued to the original payment method used for 
              the purchase.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">8. Request Submission</h2>
            <p className="mt-2">
              To submit a refund request, please contact our support team through your account dashboard with:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Your order number and purchase date</li>
              <li>A detailed description of the issue</li>
              <li>System specifications and configuration</li>
              <li>Any error messages or screenshots of the problem</li>
              <li>Consent for our team to connect via AnyDesk for verification</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">9. Contact Us</h2>
            <p className="mt-2">
              If you have questions about our refund policy or need assistance with a refund request, 
              please contact our support team through your account dashboard.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
