"use client";
import { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  MessageCircle,
  Mail,
} from "lucide-react";

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful?: number;
  notHelpful?: number;
};

type FAQSectionProps = {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
  showCategories?: boolean;
  showContactForm?: boolean;
};

const categories = [
  { id: "all", name: "All Questions", icon: HelpCircle },
  { id: "general", name: "General", icon: HelpCircle },
  { id: "orders", name: "Orders & Shipping", icon: MessageCircle },
  { id: "returns", name: "Returns & Refunds", icon: MessageCircle },
  { id: "payments", name: "Payments", icon: MessageCircle },
  { id: "account", name: "Account", icon: HelpCircle },
];

export default function FAQSection({
  faqs,
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about our products and services",
  showSearch = true,
  showCategories = true,
  showContactForm = true,
}: FAQSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    question: "",
  });

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [faqs, searchQuery, selectedCategory]);

  // Toggle expanded state
  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Handle helpful votes
  const handleHelpful = (id: string, isHelpful: boolean) => {
    setHelpfulVotes((prev) => ({ ...prev, [id]: isHelpful }));
  };

  // Handle contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    alert("Thank you for your question! We'll get back to you soon.");
    setContactForm({ name: "", email: "", question: "" });
  };

  return (
    <section className="w-[90%] py-10 bg-gray-50">
      <div className="container mx-auto px-4 md:px-10 lg:px-28">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Category Tabs */}
        {showCategories && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-blue-600 to-green-600 text-white"
                      : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        )}

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto mb-12">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No questions found matching your search.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => {
                const isExpanded = expandedItems.has(faq.id);
                const hasVoted = helpfulVotes[faq.id] !== undefined;

                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
                  >
                    <button
                      onClick={() => toggleExpanded(faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-6 pb-6">
                        <div className="prose prose-gray max-w-none">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>

                        {/* Helpful Buttons */}
                        <div className="mt-4 flex items-center gap-4">
                          <span className="text-sm text-gray-500">
                            Was this helpful?
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleHelpful(faq.id, true)}
                              disabled={hasVoted}
                              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                                helpfulVotes[faq.id] === true
                                  ? "bg-green-100 text-green-700 border-green-300"
                                  : hasVoted
                                    ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                                    : "border-gray-300 hover:bg-green-50 hover:text-green-600 hover:border-green-300"
                              }`}
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => handleHelpful(faq.id, false)}
                              disabled={hasVoted}
                              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                                helpfulVotes[faq.id] === false
                                  ? "bg-blue-100 text-blue-700 border-blue-300"
                                  : hasVoted
                                    ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                                    : "border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                              }`}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
