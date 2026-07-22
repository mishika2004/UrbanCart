const faqs = [
  {
    category: "Orders & Payments",
    questions: [
      { q: "How do I place an order?", a: "Browse our products, add items to your cart, and proceed to checkout. Select a delivery address and click 'Place Order'." },
      { q: "What payment methods do you accept?", a: "We accept UPI, Credit/Debit Cards (Visa, Mastercard), Net Banking, and popular wallets like Paytm and PhonePe." },
      { q: "Can I cancel my order after placing it?", a: "You can cancel your order within 1 hour of placing it by contacting support. Once dispatched, cancellation is not possible." },
      { q: "Will I get an invoice for my order?", a: "Yes, an invoice is automatically generated and emailed to you after successful payment." },
    ],
  },
  {
    category: "Shipping & Delivery",
    questions: [
      { q: "How long does delivery take?", a: "Metro cities: 2–4 business days. Tier 2/3 cities: 4–7 days. Remote areas: up to 10 days." },
      { q: "Is there a free delivery option?", a: "Yes! Orders above ₹499 qualify for FREE delivery across India." },
      { q: "How do I track my order?", a: "Once dispatched, you'll receive a tracking link via SMS and email. You can also visit the FAQ & Track Order page." },
      { q: "What if I'm not home during delivery?", a: "Our courier will attempt delivery up to 3 times. After that, the package is returned and a refund is initiated." },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      { q: "What is the return window?", a: "You can return eligible products within 7 days of delivery. Items must be unused and in original packaging." },
      { q: "How do I initiate a return?", a: "Email support@urbancart.in with your Order ID and reason. We'll arrange a free pickup within 24 hours of approval." },
      { q: "When will I get my refund?", a: "Refunds are processed within 5–7 business days after return approval, back to your original payment method." },
      { q: "What items are non-returnable?", a: "Intimate apparel, perishables, and used/washed items are non-returnable for hygiene reasons." },
    ],
  },
  {
    category: "Account & Profile",
    questions: [
      { q: "Do I need an account to shop?", a: "Currently our platform uses a static user profile. Full account authentication is coming soon." },
      { q: "How do I add a delivery address?", a: "Go to Profile → My Addresses → Add New Address. You can save multiple addresses." },
      { q: "Where can I see my past orders?", a: "Go to Profile → Order History to see all your past orders and their statuses." },
    ],
  },
];

const FAQ = () => {
  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "800px" }}>
      <h2 className="fw-bold mb-1">Frequently Asked Questions</h2>
      <p className="text-muted mb-5">Everything you need to know about shopping on UrbanCart.</p>

      {faqs.map((section, si) => (
        <div key={section.category} className="mb-5">
          <h5 className="fw-bold mb-3 text-primary">{section.category}</h5>
          <div className="accordion" id={`accordion-${si}`}>
            {section.questions.map((item, qi) => {
              const id = `faq-${si}-${qi}`;
              return (
                <div className="accordion-item" key={id}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed fw-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${id}`}
                      aria-expanded="false"
                    >
                      {item.q}
                    </button>
                  </h2>
                  <div id={id} className={`accordion-collapse collapse`} data-bs-parent={`#accordion-${si}`}>
                    <div className="accordion-body text-muted">{item.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="card bg-light border-0 p-4 text-center mt-4">
        <h6 className="fw-semibold">Still have questions?</h6>
        <p className="text-muted mb-2">Our support team is available Mon–Sat, 9am–7pm IST.</p>
        <a href="mailto:support@urbancart.in" className="btn btn-primary btn-sm px-4">
          📧 Contact Support
        </a>
      </div>
    </div>
  );
};

export default FAQ;