'use client';

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-300 leading-relaxed">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
            <p>
              Welcome to my portfolio website ("Website"). These Terms of Service govern your use of this website and any content, services, or features contained herein. By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          {/* Use License */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">License to Use</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on this website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-400">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer, disassemble, or decompile any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              <li>Use automated tools or bots to access or scrape the website</li>
            </ul>
          </section>

          {/* Content Rights */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property Rights</h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Naveen Sharma or its content suppliers and is protected by international copyright laws. All rights are reserved.
            </p>
            <p className="mt-4">
              You may view project descriptions and screenshots for educational and reference purposes only. You may not reproduce, distribute, or use any project information or code samples without explicit written permission.
            </p>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Disclaimer</h2>
            <p>
              The materials on this website are provided on an "as is" basis. I make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="mt-4">
              Further, I do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on this website or otherwise relating to such materials or on any sites linked to this website.
            </p>
          </section>

          {/* Limitations of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Limitations of Liability</h2>
            <p>
              In no event shall Naveen Sharma or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website, even if I have been notified of the possibility of such damage.
            </p>
          </section>

          {/* Accuracy of Materials */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Accuracy of Materials</h2>
            <p>
              The materials appearing on this website could include technical, typographical, or photographic errors. I do not warrant that any of the materials on this website are accurate, complete, or current. I may make changes to the materials contained on this website at any time without notice.
            </p>
          </section>

          {/* Links */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Links to External Websites</h2>
            <p>
              This website may contain links to external websites such as GitHub, LinkedIn, and other third-party services. I am not responsible for the contents of any linked website. The inclusion of any link does not imply endorsement by me of the website. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Modifications</h2>
            <p>
              I may revise these terms of service for this website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact me at:</p>
            <div className="mt-4 space-y-2 text-gray-400">
              <p><strong>Email:</strong> naveenthor27@gmail.com</p>
              <p><strong>Phone:</strong> +91-8084026171</p>
              <p><strong>GitHub:</strong> github.com/naveencoding75/</p>
              <p><strong>LinkedIn:</strong> linkedin.com/in/naveen-sharma-a34365293</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
