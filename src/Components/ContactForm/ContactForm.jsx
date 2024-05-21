import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    orderNumber: '',
    customerNote: '',
    spamProtection: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // State for tracking form submission



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        orderNumber: '',
        customerNote: '',
        spamProtection: ''
      });
      setIsSubmitted(true); // Set isSubmitted to true after successful form submission
      // Redirect to thank you page after 2 seconds
      setTimeout(() => {
        setIsSubmitted(false); 
      }, 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="customerName">NAME <em>&#x2a;</em></label>
      <input type="text" id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} required />

      <label htmlFor="customerEmail">EMAIL <em>&#x2a;</em></label>
      <input type="email" id="customerEmail" name="customerEmail" value={formData.customerEmail} onChange={handleChange} required />

      <label htmlFor="customerPhone">PHONE</label>
      <input type="tel" id="customerPhone" name="customerPhone" value={formData.customerPhone} onChange={handleChange} />

      <label htmlFor="orderNumber">PAYMENT NAME</label>
      <input type="text" id="orderNumber" name="orderNumber" value={formData.orderNumber} onChange={handleChange} />

      <label htmlFor="customerNote">YOUR MESSAGE <em>&#x2a;</em></label>
      <textarea rows="4" id="customerNote" name="customerNote" value={formData.customerNote} onChange={handleChange} required></textarea>

      <h3>Please provide all the information about your issue you can.</h3>

      <label htmlFor="spamProtection">PAPER NAME <em>&#x2a;</em></label>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <input type="text" id="spamProtection" name="spamProtection" value={formData.spamProtection} onChange={handleChange} />

      <button type="submit" id="customerOrder">SUBMIT</button>
      {isSubmitted && <p>Thank you! Your form has been submitted.</p>} {/* Conditional rendering for thank you message */}
    </form>
  );
};

export default ContactForm;
