const Cookies = () => {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Cookie Policy</h1>
          <p className="text-xl">Last updated: February 2026</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="card space-y-6">
            <h2 className="text-3xl font-bold text-primary-600">What Are Cookies?</h2>
            <p className="text-gray-700 leading-relaxed">
              Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience and improve our services.
            </p>

            <h2 className="text-3xl font-bold text-primary-600 mt-8">Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold text-primary-600 mt-6">Essential Cookies</h3>
            <p className="text-gray-700">
              Required for the website to function properly. These include session cookies for login, shopping cart, and security.
            </p>

            <h3 className="text-xl font-semibold text-primary-600 mt-6">Performance Cookies</h3>
            <p className="text-gray-700">
              Help us understand how visitors use our website by collecting anonymous information about page visits and navigation patterns.
            </p>

            <h3 className="text-xl font-semibold text-primary-600 mt-6">Functionality Cookies</h3>
            <p className="text-gray-700">
              Remember your preferences and settings to provide a personalized experience.
            </p>

            <h3 className="text-xl font-semibold text-primary-600 mt-6">Marketing Cookies</h3>
            <p className="text-gray-700">
              Track your browsing activity to show you relevant advertisements across websites.
            </p>

            <h2 className="text-3xl font-bold text-primary-600 mt-8">Managing Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              You can control cookies through your browser settings. However, disabling certain cookies may affect website functionality.
            </p>

            <h3 className="text-xl font-semibold text-primary-600 mt-6">How to Manage Cookies:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Chrome: Settings → Privacy and Security → Cookies</li>
              <li>Firefox: Options → Privacy & Security → Cookies</li>
              <li>Safari: Preferences → Privacy → Cookies</li>
              <li>Edge: Settings → Privacy, search, and services → Cookies</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary-600 mt-8">Third-Party Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              We use third-party services like Google Analytics and payment gateways that may set their own cookies. These are governed by their respective privacy policies.
            </p>

            <h2 className="text-3xl font-bold text-primary-600 mt-8">Updates to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Cookie Policy. Continued use of our website after changes constitutes acceptance of the updated policy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cookies;