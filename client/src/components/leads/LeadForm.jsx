import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createLead,
  updateLead,
} from "../../services/leadService";

function LeadForm({
  lead,
  onClose,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "Website",
    priority: "Medium",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name || "",
        email: lead.email || "",
        phone: lead.phone || "",
        company: lead.company || "",
        source: lead.source || "Website",
        priority: lead.priority || "Medium",
        notes: lead.notes || "",
      });
    }
  }, [lead]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (lead) {
        await updateLead(lead._id, formData);

        toast.success("Lead Updated Successfully");
      } else {
        await createLead(formData);

        toast.success("Lead Created Successfully");
      }

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Operation Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="text"
        name="name"
        placeholder="Lead Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="text"
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <select
        name="source"
        value={formData.source}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option>Website</option>
        <option>Facebook</option>
        <option>Instagram</option>
        <option>LinkedIn</option>
        <option>Referral</option>
        <option>Cold Call</option>
      </select>

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <textarea
        name="notes"
        rows="4"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          {loading
            ? lead
              ? "Updating..."
              : "Creating..."
            : lead
            ? "Update Lead"
            : "Create Lead"}
        </button>
      </div>
    </form>
  );
}

export default LeadForm;