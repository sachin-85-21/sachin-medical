const Returns = () => {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Returns & Refunds Policy</h1>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="card space-y-6">
            <h2 className="text-3xl font-bold text-primary-600">Return Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              At Sachin Medical, customer satisfaction is our top priority. We accept returns within 7 days of delivery for damaged, defective, or wrong products.
            </p>

            <h3 className="text-2xl font-semibold text-primary-600 mt-8">Eligibility for Returns</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Product received is damaged or defective</li>
              <li>Wrong product delivered</li>
              <li>Product must be unopened and in original packaging</li>
              <li>Return request must be made within 7 days of delivery</li>
            </ul>

            <h3 className="text-2xl font-semibold text-primary-600 mt-8">Non-Returnable Items</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Opened medicine packages (for safety and hygiene reasons)</li>
              <li>Prescription medicines without valid documentation</li>
              <li>Products past their expiry date at time of purchase</li>
            </ul>

            <h3 className="text-2xl font-semibold text-primary-600 mt-8">Refund Process</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Contact customer support with order number and reason</li>
              <li>Our team will verify the claim and approve return</li>
              <li>Ship the product back using our provided courier</li>
              <li>Refund will be processed within 5-7 business days after receiving the product</li>
              <li>Amount will be credited to your original payment method</li>
            </ol>

            <div className="bg-primary-50 p-6 rounded-lg mt-8">
              <h3 className="text-xl font-semibold text-primary-600 mb-3">Need Help?</h3>
              <p className="text-gray-700">
                Contact us at <a href="mailto:sachinsahni702@gmail.com" className="text-primary-600 hover:underline">sachinsahni702@gmail.com</a> or call <a href="tel:+918521184035" className="text-primary-600 hover:underline">+91 85211 84035</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Returns;