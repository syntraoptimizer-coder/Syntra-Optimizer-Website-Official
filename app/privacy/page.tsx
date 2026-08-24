import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — Syntra Optimizer',
  description: 'Read the Syntra Optimizer privacy policy. Learn how we collect, use, and protect your personal data.',
  alternates: { canonical: 'https://www.syntraoptimizer.site/privacy' },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="mt-12 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-base font-semibold text-foreground">1. Information We Collect</h2>
            <p className="mt-2">
              Syntra Optimizer collects information you provide directly to us, such as when you create an account, 
              make a purchase, or contact us for support. This may include your name, email address, payment information, 
              and any other information you choose to provide.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">2. How We Use Your Information</h2>
            <p className="mt-2">
              We use the information we collect to provide, maintain, and improve our services, process transactions, 
              send you technical notices and support messages, and communicate with you about products, services, 
              and events.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">3. Data Security</h2>
            <p className="mt-2">
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
              over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">4. Your Rights</h2>
            <p className="mt-2">
              You have the right to access, correct, or delete your personal information. You may also opt out of 
              certain communications from us. To exercise these rights, please contact us through our support channels.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">5. Third-Party Services</h2>
            <p className="mt-2">
              We use third-party services to operate our business, including payment processors and authentication 
              providers. These third parties have access to your information only to perform specific tasks on our 
              behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">6. Changes to This Policy</h2>
            <p className="mt-2">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the 
              new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">7. Contact Us</h2>
            <p className="mt-2">
              If you have any questions about this privacy policy, please contact us through our support channels 
              available in your account dashboard.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
