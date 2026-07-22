const TermsOfService = () => {
  const sections = [
    {
      icon: "🛍️",
      title: "1. Use of the Platform",
      body: "UrbanCart is an online retail platform for personal, non-commercial use only. You must be at least 18 years old to make purchases. By using our platform, you agree to provide accurate information and are responsible for all activities under your account.",
    },
    {
      icon: "📦",
      title: "2. Orders & Payments",
      body: "All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise. We reserve the right to cancel orders in case of pricing errors, payment failure, or suspected fraud. You'll receive a full refund in such cases.",
    },
    {
      icon: "🚚",
      title: "3. Delivery",
      body: "Delivery times are estimates and may vary due to factors beyond our control (natural events, strikes, etc.). UrbanCart is not liable for delays caused by logistics partners. Risk of loss or damage transfers to you upon delivery.",
    },
    {
      icon: "🔄",
      title: "4. Returns & Refunds",
      body: "Returns are accepted within 7 days of delivery as per our Refund Policy. Items must be in original condition with all packaging. Refunds are processed within 5–7 business days of return approval.",
    },
    {
      icon: "🔒",
      title: "5. Account Security",
      body: "You are responsible for maintaining the confidentiality of your login credentials. Notify us immediately at support@urbancart.in if you suspect unauthorised access to your account. UrbanCart will not be liable for any loss due to unauthorised account use.",
    },
    {
      icon: "©️",
      title: "6. Intellectual Property",
      body: "All content on UrbanCart — including logos, images, text, and UI design — is the intellectual property of UrbanCart Pvt. Ltd. You may not copy, reproduce, or redistribute any content without prior written permission.",
    },
    {
      icon: "⚖️",
      title: "7. Limitation of Liability",
      body: "UrbanCart shall not be liable for any indirect, incidental, or consequential damages arising from the use of our platform or products. Our maximum liability is limited to the value of the order in question.",
    },
    {
      icon: "📝",
      title: "8. Changes to Terms",
      body: "We reserve the right to update these Terms of Service at any time. Continued use of the platform after changes constitutes acceptance of the new terms. We will notify users of significant changes via email.",
    },
  ];

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "800px" }}>
      <h2 className="fw-bold mb-1">Terms of Service</h2>
      <p className="text-muted mb-4">Last updated: March 2026</p>

      <p className="text-muted mb-4">
        Welcome to UrbanCart. By accessing or using our website and services, you agree to be bound
        by the following terms. Please read them carefully before using the platform.
      </p>

      {sections.map(({ icon, title, body }) => (
        <div className="card shadow-sm p-4 mb-3" key={title}>
          <h6 className="fw-semibold mb-2">{icon} {title}</h6>
          <p className="text-muted mb-0">{body}</p>
        </div>
      ))}

      <p className="text-muted small mt-4">
        Questions about these terms? Email us at{" "}
        <a href="mailto:legal@urbancart.in">legal@urbancart.in</a>.
      </p>
    </div>
  );
};

export default TermsOfService;
