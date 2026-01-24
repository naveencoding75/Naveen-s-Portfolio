'use client';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back to Home */}
        <a 
          href="/" 
          className="inline-block mb-8 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          ← Back to Home
        </a>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-300 leading-relaxed">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
            <p>
              Welcome to my portfolio website. I am committed to protecting your privacy and ensuring you have a positive experience on this site. This Privacy Policy outlines how I collect, use, and protect any information you provide while visiting this website.
            </p>
          </section>

          {/* Information Collection */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Information I Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">Contact Form Data</h3>
                <p>
                  When you fill out the contact form on this website, I collect the following information:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                  <li>Your name</li>
                  <li>Your email address</li>
                  <li>Your message</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">Automatically Collected Information</h3>
                <p>
                  This website does not use cookies or tracking technologies. I do not collect information about your browsing behavior, device type, IP address, or location.
                </p>
              </div>
            </div>
          </section>

          {/* Use of Information */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">How I Use Your Information</h2>
            <p>Any information you provide through the contact form is used solely to:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-400">
              <li>Respond to your inquiry or message</li>
              <li>Follow up with you regarding your message</li>
              <li>Provide information you have requested</li>
            </ul>
            <p className="mt-4">
              I will never share, sell, or distribute your personal information to third parties without your explicit consent.
            </p>
          </section>

          {/* Data Storage & Security */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Data Storage & Security</h2>
            <p>
              Your contact form submissions are processed through Formspree, a secure third-party service. Formspree encrypts and securely stores all submitted data. I take reasonable measures to protect your information from unauthorized access or disclosure.
            </p>
            <p className="mt-4">
              For more information about Formspree's privacy practices, visit their privacy policy at formspree.io.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">External Links</h2>
            <p>
              This website may contain links to external websites (such as GitHub and LinkedIn). I am not responsible for the privacy practices of these external websites. I encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-400">
              <li>Request access to any personal information I hold about you</li>
              <li>Request correction or deletion of your information</li>
              <li>Withdraw consent for data processing at any time</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact me at naveenthor27@gmail.com
            </p>
          </section>

          {/* Policy Changes */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
            <p>
              I may update this Privacy Policy from time to time to reflect changes in my practices or for other operational, legal, or regulatory reasons. Any changes will be reflected on this page with an updated "Last updated" date at the top.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Me</h2>
            <p>If you have any questions about this Privacy Policy or how I handle your information, please feel free to contact me:</p>
            <div className="mt-4 space-y-2 text-gray-400">
              <p><strong>Email:</strong> naveenthor27@gmail.com</p>
              <p><strong>Phone:</strong> +91-8084026171</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
