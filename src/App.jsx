import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [contactData, setContactData] = useState({
    from_name: "",
    to_name: "Kareem",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Check local storage for submission flag
    const submissionFlag = localStorage.getItem("formSubmitted");
    if (submissionFlag) {
      setIsSubmitted(true);
    }
  }, []);

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // EmailJS configuration
    const serviceID = "service_9lw8y27";
    const templateID = "template_oqn06zu";
    const publicKey = "Ko78QeIe9T1syn6vf";

    emailjs.send(serviceID, templateID, contactData, publicKey).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        // Reset the form and show a success message
        setContactData({
          from_name: "",
          to_name: "Kareem",
          phone: "",
          email: "",
          message: "",
        });
        setIsSubmitted(true);
        setSuccessMessage(
          "Thank you! Your message has been sent successfully."
        );
        localStorage.setItem("formSubmitted", "true");
      },
      (error) => {
        console.log("FAILED...", error);
        setSuccessMessage("Failed to send your message. Please try again.");
      }
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-header-h1">
          <a href="#home">Tape Cutting</a>
        </h1>
        <nav>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#team">Team</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="App-main">
        <section id="home" className="hero">
          <h1>Discover Your Trusted Home Service Specialist</h1>
          <p>
            Experience Unrivaled Expertise, Meticulous Attention to Detail, and
            Unwavering Commitment to Transforming Your Home into a Haven of
            Comfort and Style.
          </p>
          <button
            onClick={() => {
              window.location.href = "#contact";
            }}
          >
            Contact Us
          </button>
        </section>
        <section id="about" className="about-us">
          <h2>About Us</h2>
          <p>
            Welcome to Tape Cutting, your trusted partner for all your fabric
            tape and piping cutting needs. We specialize in delivering
            high-quality, precise cutting services tailored to meet the unique
            requirements of our clients across various industries, including
            fashion, upholstery, and industrial manufacturing.
          </p>
          <h3>Our Mission</h3>
          <p>
            Our mission is to provide exceptional cutting services that exceed
            customer expectations. We achieve this through state-of-the-art
            machinery and expert craftsmanship, ensuring every cut is accurate
            and consistent.
          </p>
        </section>
        <section id="services" className="services">
          <h2>Our Services</h2>
          <div className="service-cards">
            <div className="service-card">
              <h3>Fabric Tape Cutting</h3>
              <p>
                We offer precision fabric tape cutting services for various
                applications, ensuring clean and accurate cuts every time.
              </p>
            </div>
            <div className="service-card">
              <h3>Piping Cutting</h3>
              <p>
                Our piping cutting services cater to a wide range of industries,
                providing custom solutions to meet your specific needs.
              </p>
            </div>
            <div className="service-card">
              <h3>Custom Solutions</h3>
              <p>
                We provide tailored cutting solutions for unique requirements,
                delivering high-quality results for your projects.
              </p>
            </div>
          </div>
        </section>

        <section id="team" className="team">
          <h2>Our Team</h2>
          <div className="team-cards">
            <div className="team-card">
              <img
                src="src/assets/bgHome.jpg"
                alt="Team Member 1"
              />
              <h3>John Doe</h3>
              <p>
                Lead Engineer with 10 years of experience in tape cutting
                technology.
              </p>
            </div>
            <div className="team-card">
              <img
                src="src/assets/bgHome.jpg"
                alt="Team Member 2"
              />
              <h3>Jane Smith</h3>
              <p>
                Chief Designer focused on creating innovative solutions for our
                clients.
              </p>
            </div>
            <div className="team-card">
              <img
                src="src/assets/bgHome.jpg"
                alt="Team Member 3"
              />
              <h3>Emily Johnson</h3>
              <p>
                Customer Relations Manager dedicated to ensuring client
                satisfaction.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-us">
          <h2>Contact Us</h2>
          {isSubmitted ? (
            <p>Thank you! You have already submitted the form.</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="from_name">
                Full Name:
                <input
                  type="text"
                  name="from_name"
                  value={contactData.from_name}
                  onChange={handleChange}
                  pattern="^[a-zA-Z\s]+$"
                  required
                />
              </label>
              <label htmlFor="phone">
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={contactData.phone}
                  onChange={handleChange}
                  pattern="^\d{10}$"
                  required
                />
              </label>
              <label htmlFor="email">
                Email:
                <input
                  type="email"
                  name="email"
                  value={contactData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="message">
                Message:
                <textarea
                  name="message"
                  value={contactData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </label>
              <button type="submit">Submit</button>
            </form>
          )}
          {successMessage && <p>{successMessage}</p>}
        </section>
      </main>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-subscribe">
            <p>Subscribe to get special offers & once-in-a-lifetime deals.</p>
            <form>
              <input
                type="email"
                placeholder="Enter your e-mail address here"
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>About Us</h4>
              <ul>
                <li>
                  <a href="#">Our Story</a>
                </li>
                <li>
                  <a href="#">Made with Care</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Assistance</h4>
              <ul>
                <li>
                  <a href="#">Terms & Conditions</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Accessibility</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Boutiques</h4>
              <ul>
                <li>
                  <a href="#">Find a store</a>
                </li>
                <li>
                  <a href="#">Book a free eye test</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-social">
            <div className="social-icons">
              <i className="fab fa-instagram"></i>
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
            </div>
            <p>© 2023, Tape Cutting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
