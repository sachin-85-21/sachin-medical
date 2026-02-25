import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'Orders & Delivery',
      questions: [
        {
          q: 'How do I place an order?',
          a: 'Simply browse our medicines, add items to cart, proceed to checkout, and complete payment. You can pay via UPI, card, or choose Cash on Delivery.'
        },
        {
          q: 'What is the delivery time?',
          a: 'Standard delivery takes 3-5 business days. Express delivery (available in select cities) delivers within 24-48 hours.'
        },
        {
          q: 'Do you deliver to my area?',
          a: 'We deliver across India. Enter your pincode during checkout to verify delivery availability in your area.'
        },
        {
          q: 'What are the delivery charges?',
          a: 'Delivery is FREE on orders above ₹500. For orders below ₹500, a nominal delivery charge of ₹40 applies.'
        }
      ]
    },
    {
      category: 'Prescriptions',
      questions: [
        {
          q: 'How do I upload a prescription?',
          a: 'After placing your order for prescription medicines, you can upload a clear photo or PDF of your prescription on the order confirmation page.'
        },
        {
          q: 'What if I don\'t have a prescription?',
          a: 'Prescription medicines require a valid prescription. However, we have many over-the-counter medicines available without prescription.'
        },
        {
          q: 'Is my prescription safe with you?',
          a: 'Yes, absolutely. Your prescription and medical information are stored securely and never shared with third parties.'
        }
      ]
    },
    {
      category: 'Payments',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery (COD).'
        },
        {
          q: 'Is online payment safe?',
          a: 'Yes, all online transactions are processed through secure payment gateways with 256-bit SSL encryption.'
        },
        {
          q: 'Can I cancel my order?',
          a: 'Yes, you can cancel your order before it is shipped. Once shipped, cancellation is not possible, but you can return it as per our return policy.'
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          q: 'What is your return policy?',
          a: 'We accept returns within 7 days of delivery for damaged or wrong products. Medicines must be unopened and in original packaging.'
        },
        {
          q: 'How do I return a product?',
          a: 'Contact our customer support with your order number and reason for return. Our team will guide you through the process.'
        },
        {
          q: 'When will I get my refund?',
          a: 'Refunds are processed within 5-7 business days after we receive the returned product. The amount is credited to your original payment method.'
        }
      ]
    },
    {
      category: 'General',
      questions: [
        {
          q: 'Are all medicines genuine?',
          a: 'Yes, 100%. We source all medicines directly from authorized distributors and manufacturers. All products are FDA approved.'
        },
        {
          q: 'How do I track my order?',
          a: 'After your order is shipped, you will receive a tracking link via SMS and email. You can also track your order from "My Orders" section.'
        },
        {
          q: 'Do you have a mobile app?',
          a: 'Currently, we operate through our website. A mobile app is in development and will be launched soon.'
        },
        {
          q: 'How can I contact customer support?',
          a: 'You can reach us via email at sachinsahni702@gmail.com or call us at +91 85211 84035 (Mon-Sat, 9AM-6PM).'
        }
      ]
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let questionIndex = 0;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Find answers to common questions about ordering, delivery, prescriptions, and more
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-primary-600">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq) => {
                  const currentIndex = questionIndex++;
                  return (
                    <div key={currentIndex} className="card">
                      <button
                        onClick={() => toggleAccordion(currentIndex)}
                        className="w-full flex justify-between items-center text-left"
                      >
                        <h3 className="text-lg font-semibold pr-4">{faq.q}</h3>
                        {openIndex === currentIndex ? (
                          <FaChevronUp className="text-primary-600 flex-shrink-0" />
                        ) : (
                          <FaChevronDown className="text-primary-600 flex-shrink-0" />
                        )}
                      </button>
                      {openIndex === currentIndex && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl mb-8">Our customer support team is here to help!</p>
          <a href="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQ;