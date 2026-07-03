import { useState } from "react";
import "./Contact.css"

function ContactForm({ onClose }) {
    const [formData, setFormData] = useState({
        restaurantName: "",
        cuisine: "",
        address: "",
        reason: "",
        email: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
    };

    return (
        
        

        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                <h2>Suggest a Food Spot</h2>
                <p>
                    Help Campus Delights grow by recommending your favorite
                    places to eat near Hunter College.
                </p>
            <button className="close-button" onClick={onClose}> x </button>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <label>
                        Restaurant Name
                        <input
                            type="text"
                            name="restaurantName"
                            value={formData.restaurantName}
                            onChange={handleChange}
                            placeholder="Ex. Joe's Pizza"
                            required
                        />
                    </label>

                    <label>
                        Cuisine Type
                        <input
                            type="text"
                            name="cuisine"
                            value={formData.cuisine}
                            onChange={handleChange}
                            placeholder="Korean, Mexican, Italian..."
                        />
                    </label>

                    <label>
                        Address
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Street address or nearby intersection"
                        />
                    </label>

                    <label>
                        Why should we add this place?
                        <textarea
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            rows="5"
                            placeholder="Tell us why students should know about it..."
                            required
                        />
                    </label>

                    <label>
                        Email (optional)
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="yourname@email.com"
                        />
                    </label>

                    <button type="submit" className="primary-button submit-button">
                        Submit!
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default ContactForm