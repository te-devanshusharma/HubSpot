import React, { useState } from "react";
import axios from "axios";
const HubspotForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const portalId = "242802722";
    const formGuid = "472fa717-7d4f-407c-845c-11367768e66e";
    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;
    const payload = {
      fields: [
        { name: "firstname", value: formData.firstname },
        { name: "lastname", value: formData.lastname },
        { name: "email", value: formData.email },
      ],
      context: {
        // Optional: Add page context if needed
        pageUri: window.location.href,
        pageName: document.title,
      },
    };
    console.log("check playload", payload);
    try {
      const response = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("HubSpot response:", response);
      if (response.status === 200) {
        alert("Form submitted successfully!");
      }
      setFormData({ firstname: "", lastname: "", email: "" }); // Reset form
    } catch (error) {
      console.log("error", error);
      alert("Submission failed. Please try again.");
    }
  };
  return (
   <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  }}
>
  <form
    onSubmit={handleSubmit}
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      maxWidth: "500px",
      width: "100%",
    }}
  >
    <input
      type="text"
      name="firstname"
      placeholder="First Name"
      value={formData.firstname}
      onChange={handleChange}
      required
    />
    <input
      type="text"
      name="lastname"
      placeholder="Last Name"
      value={formData.lastname}
      onChange={handleChange}
      required
    />
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
      required
    />
    <button
      type="submit"
      style={{
        padding: "8px",
        backgroundColor: "#ff7a59",
        color: "white",
        border: "none",
      }}
    >
      Submit
    </button>
  </form>
</div>
  );
};
export default HubspotForm;