"use client";
import { motion } from "framer-motion";
import { CreditCard, Headphones, Shield, Truck } from "lucide-react";

export function ServiceHighlights() {
  const services = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Free Shipping",
      description: "On orders over $50",
      bgGradient: "from-blue-500 to-blue-600",
      iconColor: "text-white",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Payment",
      description: "100% secure transactions",
      bgGradient: "from-green-500 to-green-600",
      iconColor: "text-white",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "24/7 Support",
      description: "Dedicated support team",
      bgGradient: "from-blue-500 to-blue-600",
      iconColor: "text-white",
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "0% EMI Available",
      description: "Easy installment plans",
      bgGradient: "from-green-500 to-green-600",
      iconColor: "text-white",
    },
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 md:px-10 lg:px-28">
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer exceptional service and benefits to make your shopping
            experience enjoyable and hassle-free
          </p>
        </div> */}

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative h-full">
                {/* Card with gradient top border */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full overflow-hidden">
                  {/* Gradient Top Bar */}
                  <div
                    className={`h-2 bg-gradient-to-r ${service.bgGradient}`}
                  ></div>

                  <div className="p-6 text-center">
                    {/* Icon Container */}
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${service.bgGradient} mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className={service.iconColor}>{service.icon}</div>
                    </div>

                    <h3 className="font-bold text-xl mb-2 text-gray-800">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>

                    {/* Decorative Element */}
                    <div className="mt-4 flex justify-center">
                      <div className="h-1 w-12 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect - Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        {/* <div className="mt-16 text-center">
          <div className="inline-block p-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-full">
            <button className="px-8 py-3 bg-white text-gray-800 font-medium rounded-full hover:bg-gray-50 transition-colors duration-300">
              Learn More About Our Services
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}
