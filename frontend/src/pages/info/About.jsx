import { FaHospital, FaAward, FaUsers, FaShieldAlt } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About Sachin Medical</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your trusted healthcare partner, committed to providing quality medicines and exceptional service
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-primary-600">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At Sachin Medical, we are dedicated to making healthcare accessible to everyone. Our mission is to provide 
              authentic, high-quality medicines at affordable prices, delivered right to your doorstep with care and convenience.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe that everyone deserves access to quality healthcare, and we're committed to being your trusted 
              partner in health and wellness.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-primary-600">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center card">
              <FaHospital className="text-5xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Quality First</h3>
              <p className="text-gray-600">
                We ensure 100% authentic medicines from certified manufacturers
              </p>
            </div>
            
            <div className="text-center card">
              <FaAward className="text-5xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600">
                Committed to providing the best healthcare experience
              </p>
            </div>
            
            <div className="text-center card">
              <FaUsers className="text-5xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Customer Care</h3>
              <p className="text-gray-600">
                Your health and satisfaction are our top priorities
              </p>
            </div>
            
            <div className="text-center card">
              <FaShieldAlt className="text-5xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Trust & Safety</h3>
              <p className="text-gray-600">
                Secure transactions and private data protection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-5xl font-bold mb-2">1K+</h3>
              <p className="text-xl">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">1000+</h3>
              <p className="text-xl">Medicines Available</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">10+</h3>
              <p className="text-xl">Cities Covered</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">24/7</h3>
              <p className="text-xl">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-primary-600">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Sachin Medical was founded with a simple vision: to make quality healthcare accessible to everyone, everywhere. 
              What started as a small pharmacy has grown into a trusted online healthcare platform serving thousands of 
              customers across the nation.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We understand the challenges people face in accessing medicines, especially in remote areas. That's why we've 
              built a robust delivery network that ensures your medicines reach you quickly and safely.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, we're proud to be a trusted name in online pharmacy, committed to innovation, quality, and customer 
              satisfaction.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;