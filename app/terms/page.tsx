import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'

export const metadata: Metadata = {
  title: 'Terms of Service — Syntra Optimizer',
  description: 'Read the Syntra Optimizer terms of service. Understand your rights and responsibilities when using our software.',
  alternates: { canonical: 'https://www.syntraoptimizer.site/terms' },
}

export default function TermsPage() {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Terms of Service</h1>
        <p className="mt-4 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="mt-12 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-base font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By accessing or using Syntra Optimizer, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">2. Description of Service</h2>
            <p className="mt-2">
              Syntra Optimizer is a PC optimization software designed for Windows 10 & 11. We provide tools 
              to improve system performance, clean unnecessary files, and optimize system settings.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">3. User Responsibilities</h2>
            <p className="mt-2">
              You are responsible for maintaining the confidentiality of your account credentials and for all 
              activities that occur under your account. You agree to notify us immediately of any unauthorized 
              use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">4. Payment Terms</h2>
            <p className="mt-2">
              Payment for our services is processed through third-party payment processors. By providing payment 
              information, you represent that you are authorized to use the payment method and that all information 
              you provide is accurate and complete.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">5. Intellectual Property</h2>
            <p className="mt-2">
              All content, features, and functionality of Syntra Optimizer are owned by us and are protected by 
              international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">6. Disclaimer of Warranties</h2>
            <p className="mt-2">
              Syntra Optimizer is provided "as is" without warranties of any kind, either express or implied. 
              We do not guarantee that the service will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">7. Limitation of Liability</h2>
            <p className="mt-2">
              In no event shall we be liable for any indirect, incidental, special, consequential, or punitive 
              damages arising out of or related to your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">8. Termination</h2>
            <p className="mt-2">
              We reserve the right to terminate or suspend your account at any time for violation of these terms 
              or for any other reason at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">9. Governing Law</h2>
            <p className="mt-2">
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction 
              in which our company is registered.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">10. Changes to Terms</h2>
            <p className="mt-2">
              We reserve the right to modify these terms at any time. Continued use of the service after such 
              modifications constitutes acceptance of the updated terms.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
