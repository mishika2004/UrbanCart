const PrivacyPolicy = () => {
  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "800px" }}>
      <h2 className="fw-bold mb-1">Privacy Policy</h2>
      <p className="text-muted mb-4">Last updated: March 2026</p>

      <p className="text-muted mb-4">
        At <strong>UrbanCart</strong>, we are committed to protecting your personal information.
        This policy explains what data we collect, how we use it, and your rights over it.
      </p>

      {[
        {
          icon: "📋",
          title: "Information We Collect",
          content: (
            <ul className="text-muted mb-0">
              <li><strong>Personal Info:</strong> Name, email address, phone number, delivery address</li>
              <li><strong>Payment Info:</strong> We do not store card details — all payments are processed securely via third-party gateways</li>
              <li><strong>Usage Data:</strong> Pages visited, products viewed, search queries, and cart activity</li>
              <li><strong>Device Info:</strong> Browser type, IP address, and device identifiers</li>
            </ul>
          ),
        },
        {
          icon: "🎯",
          title: "How We Use Your Data",
          content: (
            <ul className="text-muted mb-0">
              <li>To process and deliver your orders</li>
              <li>To send order confirmations and shipping updates</li>
              <li>To personalise your shopping experience</li>
              <li>To send promotional offers (only if you've opted in)</li>
              <li>To improve our platform and fix bugs</li>
            </ul>
          ),
        },
        {
          icon: "🤝",
          title: "Data Sharing",
          content: (
            <p className="text-muted mb-0">
              We do <strong>not</strong> sell your personal data to third parties. We may share data with:
              trusted logistics partners (for delivery), payment processors (for transactions),
              and analytics tools (anonymised data only). All partners are bound by strict data
              protection agreements.
            </p>
          ),
        },
        {
          icon: "🔒",
          title: "Data Security",
          content: (
            <p className="text-muted mb-0">
              We use industry-standard SSL encryption for all data transmissions. Access to personal
              data is restricted to authorised personnel only. We regularly audit our security
              practices to ensure your data stays safe.
            </p>
          ),
        },
        {
          icon: "⚙️",
          title: "Your Rights",
          content: (
            <ul className="text-muted mb-0">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
          ),
        },
        {
          icon: "🍪",
          title: "Cookies",
          content: (
            <p className="text-muted mb-0">
              We use cookies to maintain your session, remember your cart, and analyse site traffic.
              You can disable cookies in your browser settings, but some features may not work correctly.
            </p>
          ),
        },
      ].map(({ icon, title, content }) => (
        <div className="card shadow-sm p-4 mb-4" key={title}>
          <h5 className="fw-semibold mb-3">{icon} {title}</h5>
          {content}
        </div>
      ))}

      <p className="text-muted small">
        For any privacy-related queries, contact us at{" "}
        <a href="mailto:privacy@urbancart.in">privacy@urbancart.in</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
