"use client";
import { useState } from "react";

export default function Form() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    services: [] as string[],
    serviceOther: "",
    duration: "",
    vaCount: "",
    communication: [] as string[],
    communicationOther: "",
    crmTools: "",
    updateFrequency: "",
    workingStyle: "",
    sensitiveData: "",
    mainGoal: "",
    metrics: "",
    form_type: "VA Service Inquiry",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === "services" || name === "communication") {
        setFormData((prev) => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter((item: string) => item !== value),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Form submitted successfully! We'll be in touch within 24 hours.");
        setFormData({
          services: [],
          serviceOther: "",
          duration: "",
          vaCount: "",
          communication: [],
          communicationOther: "",
          crmTools: "",
          updateFrequency: "",
          workingStyle: "",
          sensitiveData: "",
          mainGoal: "",
          metrics: "",
          form_type: "VA Service Inquiry",
        });
      } else {
        throw new Error(result.error || "Email sending failed");
      }
    } catch (error) {
      console.error(error);
      alert("❌ There was an error submitting the form. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle =
    "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white transition-all duration-200";
  const labelStyle = "block text-sm font-medium mb-2 text-gray-700";
  const checkboxStyle =
    "h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded";

  return (
    <div className="w-full bg-white/90 backdrop-blur-sm p-6 md:p-18 rounded-xl shadow-lg">
      <h2 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-800">
        <span className="text-orange-500">HibLink Tech</span> Kickstart Questionnaire
      </h2>
      <p className="text-gray-600 mb-6">
        Just a few quick questions to power your growth. Fill it out today and we’ll reach out within 24 hours
      </p>

      <form onSubmit={sendEmail} className="space-y-6">
        {/* Services */}
        <div>
          <label className={`${labelStyle} text-lg font-semibold`}>
            1. Choose Your Service(s)
          </label>
          <div className="space-y-2">
            {["Virtual Assistance", "Back Office" , "Digital Marketing", "Customer Support", "Sales Support", "IT Services"].map(
              (service) => (
                <div key={service} className="flex items-center">
                  <input
                    type="checkbox"
                    name="services"
                    value={service}
                    checked={formData.services.includes(service)}
                    onChange={handleChange}
                    className={checkboxStyle}
                  />
                  <label className="ml-2 text-gray-700">{service}</label>
                </div>
              )
            )}
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="services"
                value="Other"
                checked={formData.services.includes("Other")}
                onChange={handleChange}
                className={checkboxStyle}
              />
              <label className="ml-2 text-gray-700">Other:</label>
              <input
                type="text"
                name="serviceOther"
                value={formData.serviceOther}
                onChange={handleChange}
                placeholder="Please specify"
                className="ml-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 flex-1"
                disabled={!formData.services.includes("Other")}
              />
            </div>
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className={labelStyle}>2. How long do you intend to use this service?</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className={inputStyle}
            required
          >
            <option value="">Select duration</option>
            <option value="A few months">A few months</option>
            <option value="A year">A year</option>
            <option value="Indefinitely">Indefinitely</option>
          </select>
        </div>

        {/* VA Count */}
        <div>
          <label className={labelStyle}>3. How many VA&apos;s do you need?</label>
          <input
            type="number"
            name="vaCount"
            value={formData.vaCount}
            onChange={handleChange}
            min="1"
            className={inputStyle}
            required
          />
        </div>

        {/* Communication */}
        <div>
          <label className={labelStyle}>4. Preferred form of communication</label>
          <div className="space-y-2">
            {["Email", "Phone", "WhatsApp", "Telegram (Preferred)"].map((method) => (
              <div key={method} className="flex items-center">
                <input
                  type="checkbox"
                  name="communication"
                  value={method}
                  checked={formData.communication.includes(method)}
                  onChange={handleChange}
                  className={checkboxStyle}
                />
                <label className="ml-2 text-gray-700">{method}</label>
              </div>
            ))}
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                name="communication"
                value="Other"
                checked={formData.communication.includes("Other")}
                onChange={handleChange}
                className={checkboxStyle}
              />
              <label className="ml-2 text-gray-700">Other:</label>
              <input
                type="text"
                name="communicationOther"
                value={formData.communicationOther}
                onChange={handleChange}
                placeholder="Please specify"
                className="ml-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 flex-1"
                disabled={!formData.communication.includes("Other")}
              />
            </div>
          </div>
        </div>

        {/* CRM */}
        <div>
          <label className={labelStyle}>
            5. Do you currently use a CRM? If yes, please list them. Other tools/software you use:
          </label>
          <textarea
            name="crmTools"
            rows={3}
            value={formData.crmTools}
            onChange={handleChange}
            className={inputStyle}
            placeholder="e.g., Salesforce, HubSpot, Asana, etc."
          />
        </div>

        {/* Update Frequency */}
        <div>
          <label className={labelStyle}>6. How often would you like status updates?</label>
          <select
            name="updateFrequency"
            value={formData.updateFrequency}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="">Select frequency</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Bi-weekly">Bi-weekly</option>
          </select>
        </div>

        {/* Working Style */}
        <div>
          <label className={labelStyle}>
            7. Will the VA be working independently or closely with a team?
          </label>
          <select
            name="workingStyle"
            value={formData.workingStyle}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="">Select option</option>
            <option value="Independently">Independently</option>
            <option value="Closely with a team">Closely with a team</option>
            <option value="Mix of both">Mix of both</option>
          </select>
        </div>

        {/* Sensitive Data */}
        <div>
          <label className={labelStyle}>8. Will the VA be handling sensitive client data?</label>
          <select
            name="sensitiveData"
            value={formData.sensitiveData}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="">Select option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Not sure">Not sure</option>
          </select>
        </div>

        {/* Main Goal */}
        <div>
          <label className={labelStyle}>9. What is your main goal for hiring a VA?</label>
          <textarea
            name="mainGoal"
            rows={3}
            value={formData.mainGoal}
            onChange={handleChange}
            className={inputStyle}
            placeholder="Time savings, lead generation, customer service, etc."
          />
        </div>

        {/* Metrics */}
        <div>
          <label className={labelStyle}>10. Any key performance metrics or deadlines?</label>
          <textarea
            name="metrics"
            rows={3}
            value={formData.metrics}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-500 text-white p-3 rounded-lg font-medium hover:bg-orange-600 transition focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
