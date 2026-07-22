import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  // Static user data
  const user = {
    name:   "Shani",
    email:  "shanimaurya8530@gmail.com",
    phone:  "+91 9580642893",
    joined: "January 2025",
    avatar: "https://ui-avatars.com/api/?name=Shani&background=0D8ABC&color=fff&size=128",
  };

  return (
    <div className="container mt-4 mb-5">
      <h3 className="mb-4">👤 My Profile</h3>

      <div className="row g-4">
        {/* Profile Card */}
        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <img src={user.avatar} alt="avatar" className="rounded-circle mb-3 mx-auto"
              style={{ width: 100, height: 100, objectFit: "cover" }} />
            <h5>{user.name}</h5>
            <p className="text-muted small mb-1">{user.email}</p>
            <p className="text-muted small">{user.phone}</p>
            <p className="text-muted small">Member since {user.joined}</p>
          </div>
        </div>

     
        <div className="col-md-8">
          <div className="row g-3">
            {[
              { icon: "bi-bag-check", label: "Order History",   sub: "View all your past orders",    path: "/orders"    },
              { icon: "bi-geo-alt",   label: "My Addresses",    sub: "Manage delivery addresses",     path: "/addresses" },
              { icon: "bi-heart",     label: "My Wishlist",     sub: "Products you love",             path: "/wishlist"  },
              { icon: "bi-cart3",     label: "My Cart",         sub: "Items ready for checkout",      path: "/cart"      },
            ].map(({ icon, label, sub, path }) => (
              <div className="col-sm-6" key={path}>
                <div className="card shadow-sm p-3 h-100" style={{ cursor: "pointer" }}
                  onClick={() => navigate(path)}>
                  <div className="d-flex align-items-center gap-3">
                    <i className={`bi ${icon} fs-3 text-primary`} />
                    <div>
                      <h6 className="mb-0">{label}</h6>
                      <small className="text-muted">{sub}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
