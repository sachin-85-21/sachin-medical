const Terms = () => {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-xl">Last updated: February 2026</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="card space-y-6">
            <h2 className="text-3xl font-bold text-primary-600">Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using Sachin Medical's services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>

            <h2 className="text-3xl font-bold text-primary-600 mt-8">Use of Service</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>You must be at least 18 years old to use our services</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must provide accurate and complete information</li>
              <li>You may not use our service for any illegal purpose</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary-600 mt-8">Product Information</h2>
            <p className="text-gray-700 leading-relaxed">
              We strive to provide accurate product information. However, we do not warrant that product descriptions, pricing, or other content is error-free. We reserve the right to correct errors and update information.
            </p>

            <h2 className="text-3xl font-bold text-primary-600 mt-8">Prescription Medicines</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Valid prescription required for prescription medicines</li>
              <li>We reserve the right to cancel orders without valid prescriptions</li>
              <li>Prescriptions are verified by licensed pharmacists</li>
              <li>You are responsible for the accuracy of uploaded prescriptions</li>
            </ul>

            <h2 className="text-3xl font-bold text-primary-600 mt-8">Pricing and Payment</h2>
            <p className="text-gray-700 leading-relaxed">
              All prices are in Indian Rupees (INR). We reserve the right to change prices without notice. Payment must be received before order processing.
            </p>

            <h2 className="text-3xl font-bold text-primary-600 mt-8">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              Sachin Medical shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services or products.
            </p>

            <h2 className="text-3xl font-bold text-primary-600 mt-8">Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Indore, Madhya Pradesh.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;