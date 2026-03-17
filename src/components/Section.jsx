import React, { useMemo } from 'react';
import Hero from './Hero';
import AboutSection from './AboutSection'; // Voor 'intro'
import CTA from './CTA';
import Testimonials from './Testimonials';
import Team from './Team';
import FAQ from './FAQ';
import GenericSection from './GenericSection';

// Mapping van Sheet Sectienaam -> React Component
const SECTION_COMPONENTS = {
  hero: Hero,
  intro: AboutSection,
  voordelen: GenericSection, // We gebruiken GenericSection als fallback voor eenvoudige lijstjes
  showcase: GenericSection,
  innovatie: GenericSection,
  proces: GenericSection,
  cta: CTA,
  testimonials: Testimonials,
  team: Team,
  faq: FAQ
};

export default function Section({ data }) {
  // v8.8 Modular Order Logic
  const orderSource = data?._section_order || data?.section_order || [];
  const sectionOrder = orderSource.map(item => typeof item === 'object' ? item.sectie : item).filter(Boolean);

  // Fallback order if _section_order is missing or corrupt
  const finalOrder = sectionOrder.length > 0 ? sectionOrder : ['hero', 'intro', 'voordelen', 'footer'];

  return (
    <div className="athena-sections-container">
      {finalOrder.map((sectionName, index) => {
        // Skip header/footer in the main section loop
        if (['header', 'footer'].includes(sectionName.toLowerCase())) return null;

        const Component = SECTION_COMPONENTS[sectionName.toLowerCase()] || GenericSection;
        const sectionData = data[sectionName] || [];

        return (
          <section key={`${sectionName}-${index}`} id={sectionName} className="athena-section">
            <Component 
              data={sectionData} 
              fullData={data}
              sectionName={sectionName}
            />
          </section>
        );
      })}
    </div>
  );
}
