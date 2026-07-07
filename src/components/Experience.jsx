import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ExperienceCard = ({ role, date, company, desc }) => {
  return (
    <motion.div
      className="exp-item"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="exp-date">{date}</div>
      <div className="exp-details">
        <h3>{role}</h3>
        <span className="exp-company">{company}</span>
        <p className="exp-desc">{desc}</p>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const experiences = [
    {
      role: "Senior Product Designer",
      date: "2022 — Present",
      company: "FinTech Innovators",
      desc: "Leading the redesign of mobile banking solutions, increasing user retention by 25% through iterative prototyping and user research."
    },
    {
      role: "UX/UI Designer",
      date: "2019 — 2022",
      company: "Creative Digital Agency",
      desc: "Developed comprehensive design systems for Fortune 500 clients, ensuring brand consistency across multi-platform experiences."
    },
    {
      role: "Junior Designer",
      date: "2017 — 2019",
      company: "Startup Hub",
      desc: "Collaborated with engineers to build MVP products from scratch, focusing on rapid prototyping and user feedback integration."
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Work Experience
        </motion.h2>
        <div className="experience-list">
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
