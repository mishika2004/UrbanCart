import { useEffect, useState } from "react";
import { apiUrl } from "../config/api";

const USER_ID = "user_urbancart_001";

const emptyForm = { name: "", phone: "", street: "", city: "", state: "", pincode: "" };

const AddressManager = () => {
  const [addresses,  setAddresses]  = useState([]);
  const [form,       setForm]       = useState(emptyForm);
  const [editId,     setEditId]     = useState(null);
  const [showForm,   setShowForm]   = useState(false);

  const fetchAddresses = async () => {
    const res  = await fetch(apiUrl(`/api/addresses/${USER_ID}`));
    const data = await res.json();
    setAddresses(data?.data?.addresses || []);
  };

  useEffect(() => { fetchAddresses(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, userId: USER_ID };

    if (editId) {
      await fetch(apiUrl(`/api/addresses/${editId}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      alert("Address updated!");
    } else {
      await fetch(apiUrl("/api/addresses/add"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      alert("Address added!");
    }

    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
    fetchAddresses();
  };

  const handleEdit = (addr) => {
    setForm({ name: addr.name, phone: addr.phone, street: addr.street, city: addr.city, state: addr.state, pincode: addr.pincode });
    setEditId(addr._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this address?")) return;
    await fetch(apiUrl(`/api/addresses/${id}`), { method: "DELETE" });
    fetchAddresses();
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>📍 My Addresses</h3>
        <button className="btn btn-primary" onClick={() => { setShowForm(!showForm); setForm(emptyForm); setEditId(null); }}>
          {showForm ? "Cancel" : "+ Add New Address"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card shadow-sm p-4 mb-4">
          <h5>{editId ? "Edit Address" : "Add New Address"}</h5>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {[["name","Full Name"],["phone","Phone"],["street","Street / Area"],["city","City"],["state","State"],["pincode","Pincode"]].map(([field, label]) => (
                <div className="col-md-6" key={field}>
                  <label className="form-label small">{label}</label>
                  <input required className="form-control" value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
                </div>
              ))}
            </div>
            <button className="btn btn-success mt-3">{editId ? "Update" : "Save Address"}</button>
          </form>
        </div>
      )}

      {/* Address List */}
      {addresses.length === 0 ? (
        <p className="text-muted">No addresses saved yet.</p>
      ) : (
        <div className="row g-3">
          {addresses.map((addr) => (
            <div className="col-md-6" key={addr._id}>
              <div className="card shadow-sm p-3">
                <h6 className="mb-1">{addr.name}</h6>
                <p className="mb-1 small text-muted">{addr.street}, {addr.city}, {addr.state} – {addr.pincode}</p>
                <p className="mb-2 small text-muted">📞 {addr.phone}</p>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(addr)}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger"  onClick={() => handleDelete(addr._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressManager;