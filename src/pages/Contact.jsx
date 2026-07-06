import ContactForm from "../components/ContactForm.jsx";
import { useState } from "react"

function Contact() {
    const [showForm, setShowForm] = useState(false);
    return (
        <section className="page-section contact-page">
            <div className="page-heading">
              <p className="hero-label">Contact</p>
              <h1>Contact the team</h1>
              <p>
                Know of a great place near Hunter College? Share it with us and 
                help other hungry students!
              </p>
            </div>

            <div className="contact-card">
                <h2>Suggest a food spot</h2>
                <p>
                    Share a restaurant you think Hunter students should know about.
                    Submissions go to our team for review before being added to the app.
                </p>
                <button
                    className="primary-button"
                    onClick={() => setShowForm(true)}>
                    Submit Your Request!
                </button>
            </div>

            {showForm && (
                <ContactForm onClose={() => setShowForm(false)} />
            )}

            <p className="admin-entry-link">
                Team member? <a href="#admin">Review submissions</a>
            </p>
        </section>
    );
}

export default Contact