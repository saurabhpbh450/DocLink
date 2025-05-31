// src/pages/About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="bg-[#121212] text-[#FFFFFF] min-h-screen px-4 py-10 space-y-12 container mx-auto">
      {/* Project Overview */}
      <section className="bg-[#1F1F1F] rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-4 text-[#D4AF37]">Project Overview</h1>
        <p className="text-lg leading-relaxed">
          DocLink is a web-based application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js) designed to bridge the gap between patients and healthcare providers. The project aims to provide a secure, intuitive, and scalable platform for booking, managing, and optimizing doctor appointments. By addressing common issues in traditional appointment systems—such as overbooking, long waiting times, and communication barriers—DocLink streamlines scheduling and ensures data security with JWT-based authentication.
        </p>
      </section>

      {/* Inspiration and Motivation */}
      <section className="bg-[#1F1F1F] rounded-lg p-8">
        <h2 className="text-3xl font-semibold mb-4 text-[#FFD15C]">Inspiration and Motivation</h2>
        <p className="text-lg leading-relaxed">
          The idea for DocLink emerged from the real-life challenges faced by both patients and healthcare providers in managing appointments. Frustration over inefficient scheduling, lengthy waiting times, and data privacy concerns inspired our team to reimagine the appointment process. We set out to build a modern solution that enhances user experience, improves workflow efficiency, and builds trust through secure, real-time booking.
        </p>
      </section>

      {/* Methodology */}
      <section className="bg-[#1F1F1F] rounded-lg p-8">
        <h2 className="text-3xl font-semibold mb-4 text-[#D4AF37]">Methodology</h2>
        <p className="text-lg leading-relaxed">
          Our approach to developing DocLink was structured and user-centric, involving several key phases:
        </p>
        <ul className="list-disc list-inside text-[#9E9E9E] text-lg mt-4 space-y-2">
          <li>
            <strong className="text-[#FFFFFF]">Research and Planning:</strong> We conducted extensive research on existing appointment systems to identify pain points and design a solution that addresses them.
          </li>
          <li>
            <strong className="text-[#FFFFFF]">Design and Prototyping:</strong> With the help of DFDs, Use Case Diagrams, and wireframes, we planned a scalable system architecture and created prototypes to validate our ideas.
          </li>
          <li>
            <strong className="text-[#FFFFFF]">Development:</strong> Leveraging the MERN stack, we built a dynamic frontend with React.js and a robust backend using Node.js and Express.js, while MongoDB ensured flexible and scalable data storage.
          </li>
          <li>
            <strong className="text-[#FFFFFF]">Testing and Validation:</strong> Rigorous unit, integration, and system testing helped us fine-tune the platform’s performance and security.
          </li>
          <li>
            <strong className="text-[#FFFFFF]">Deployment:</strong> The application was deployed on cloud-based platforms, ensuring high availability and ease of scaling.
          </li>
        </ul>
      </section>

      {/* Achievements and Results */}
      <section className="bg-[#1F1F1F] rounded-lg p-8">
        <h2 className="text-3xl font-semibold mb-4 text-[#FFD15C]">Achievements and Results</h2>
        <p className="text-lg leading-relaxed">
          During the development of DocLink, our team achieved several significant milestones:
        </p>
        <ul className="list-disc list-inside text-[#9E9E9E] text-lg mt-4 space-y-2">
          <li>Successfully implemented a secure authentication system using JWT.</li>
          <li>Developed a real-time appointment booking and management system, reducing scheduling conflicts.</li>
          <li>Received positive feedback from initial user testing for its intuitive design and efficiency.</li>
          <li>Earned recognition from academic mentors for innovative application of modern web technologies.</li>
        </ul>
      </section>

      {/* Future Plans */}
      <section className="bg-[#1F1F1F] rounded-lg p-8">
        <h2 className="text-3xl font-semibold mb-4 text-[#D4AF37]">Future Plans</h2>
        <p className="text-lg leading-relaxed">
          While DocLink has already made a significant impact, our journey continues. Future enhancements include:
        </p>
        <ul className="list-disc list-inside text-[#9E9E9E] text-lg mt-4 space-y-2">
          <li>Integrating AI-based features like symptom checkers and chatbots for enhanced user support.</li>
          <li>Expanding functionalities to support teleconsultations and e-prescriptions.</li>
          <li>Implementing multilingual support to cater to a broader audience.</li>
          <li>Optimizing scalability and performance to serve larger healthcare institutions.</li>
        </ul>
      </section>

      {/* Acknowledgments */}
      <section className="bg-[#1F1F1F] rounded-lg p-8">
        <h2 className="text-3xl font-semibold mb-4 text-[#FFD15C]">Acknowledgments</h2>
        <p className="text-lg leading-relaxed">
          We extend our heartfelt gratitude to our mentors, advisors, and collaborators for their invaluable guidance and support. Special thanks to the Department of Computer Science & Engineering at SMS, Lucknow, whose resources and expertise have been instrumental in bringing DocLink to life.
        </p>
      </section>

      {/* Testimonials */}
      <section className="bg-[#1F1F1F] rounded-lg p-8">
        <h2 className="text-3xl font-semibold mb-4 text-[#D4AF37]">Testimonials</h2>
        <blockquote className="border-l-4 border-[#D4AF37] pl-4 italic text-[#9E9E9E] text-lg">
          "Working on DocLink has not only expanded our technical horizons but also deepened our understanding of user needs in the healthcare sector. It's been a truly transformative experience."
          <br />
          <span className="font-bold text-[#FFFFFF]">- Team Member, DocLink Project</span>
        </blockquote>
        <blockquote className="border-l-4 border-[#65C3BA] pl-4 italic text-[#9E9E9E] text-lg mt-4">
          "DocLink is a groundbreaking solution that sets a new standard in appointment management. Its real-time features and secure design have the potential to revolutionize healthcare scheduling."
          <br />
          <span className="font-bold text-[#FFFFFF]">- Kuldeep Kr Katiyar, Mentor</span>
        </blockquote>
      </section>
    </div>
  );
};

export default About;
