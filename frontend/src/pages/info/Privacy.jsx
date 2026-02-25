const Privacy = () => {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl">Last updated: February 2026</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="card space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Sachin Medical ("we", "us", or "our") respects your privacy and is committed to protecting your personal information.
            </p>

            <h2 className="text-3xl font-bold text-primary-600 mt-8">Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Personal information (name, email, phone number, address)</li>
              <li>Medical information (prescriptions uploaded by you)</li>
              <li>Payment information (processed securely by third-party payment gateways)</li>
              <li>Order history and preferences</li>
              <li>Device and browser information</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary-600 mt-8">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Process and deliver your orders</li>
              <li>Communicate order updates and promotional offers</li>
              <li>Improve our services and website</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and ensure security</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary-600 mt-8">Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard security measures including SSL encryption, secure servers, and access controls to protect your information. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-3xl font-bold text-primary-600 mt-8">Sharing Your Information</h2>
            <p className="text-gray-700 leading-relaxed">
              We do not sell your personal information. We may share data with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Delivery partners (only delivery address)</li>
              <li>Payment processors (for transaction processing)</li>
              <li>Legal authorities (when required by law)</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary-600 mt-8">Your Rights</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary-600 mt-8">Contact Us</h2>
            <p className="text-gray-700">
              For privacy-related queries: <a href="mailto:sachinsahni702@gmail.com" className="text-primary-600 hover:underline">sachinsahni702@gmail.com</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;