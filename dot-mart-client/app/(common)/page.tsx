import { Carousel } from "@/components/carousel";
import FAQSection, { FAQ } from "@/components/FAQSection";
import FeaturedProductsSection from "@/components/featuredProducts";
import HomeCategorySlider from "@/components/HomeCategorySlider";
import NewArrivalsSection from "@/components/NewArrivals";
import ReviewSection from "@/components/ReviewSection";
import { ServiceHighlights } from "@/components/ServiceHighlights";
import TrendingOffersSection from "@/components/TrendingOffersSection";

const page = async () => {

  const mockFAQs: FAQ[] = [
    {
      id: "1",
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout for 2-3 business days delivery. International shipping may take 10-15 business days depending on the destination.",
      category: "orders",
      helpful: 42,
      notHelpful: 3,
    },
    {
      id: "2",
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for unused items in their original packaging. Simply contact our customer service to initiate a return. Refunds are processed within 5-7 business days after we receive the returned item.",
      category: "returns",
      helpful: 38,
      notHelpful: 5,
    },
    {
      id: "3",
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location. You can check if we ship to your country at checkout.",
      category: "orders",
      helpful: 25,
      notHelpful: 2,
    },
    {
      id: "4",
      question: "How can I track my order?",
      answer:
        "Once your order ships, you'll receive a tracking number via email. You can use this number on our website or the carrier's website to track your package in real-time.",
      category: "orders",
      helpful: 31,
      notHelpful: 1,
    },
    {
      id: "5",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secured with SSL encryption.",
      category: "payments",
      helpful: 28,
      notHelpful: 0,
    },
    {
      id: "6",
      question: "How do I create an account?",
      answer:
        "Click on the 'Sign In' button at the top of our website and select 'Create Account'. You'll need to provide your email address and create a password. Account creation is free and gives you access to order history and faster checkout.",
      category: "account",
      helpful: 19,
      notHelpful: 1,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content with 90% width */}
      <main className="container mx-auto">
        <section className="pt-8 md:pt-6 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <Carousel />
          </div>
        </section>
        <ServiceHighlights />
        <HomeCategorySlider />
        <NewArrivalsSection />
        <TrendingOffersSection />
        <FeaturedProductsSection />
        <ReviewSection />
        <FAQSection faqs={mockFAQs} />
      </main>
    </div>
  );
};

export default page;
