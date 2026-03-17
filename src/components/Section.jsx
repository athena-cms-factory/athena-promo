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
  voordelen: GenericSection,
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
  // We zoeken naar _section_order OF section_order
  const orderSource = data?._section_order || data?.section_order || [];
  
  // Data-cleaning: zorg dat we een lijst van namen hebben
  const sectionOrder = orderSource.map(item => {
    if (typeof item === 'object' && item !== null) return item.sectie;
    return item;
  }).filter(name => typeof name === 'string' && name.length > 0);

  // Fallback order if _section_order is missing or corrupt
  const finalOrder = sectionOrder.length > 0 ? sectionOrder : ['hero', 'intro', 'voordelen'];

  return (
    <div className="athena-sections-container">
      {finalOrder.map((sectionName, index) => {
        // Skip header/footer in the main section loop
        const lowerName = sectionName.toLowerCase();
        if (['header', 'footer'].includes(lowerName)) return null;

        const Component = SECTION_COMPONENTS[lowerName] || GenericSection;
        const sectionData = data[sectionName] || data[lowerName] || [];

        return (
          <section key={`${sectionName}-${index}`} id={sectionName} className="athena-section">
            <Component 
              data={Array.isArray(sectionData) ? sectionData : [sectionData]} 
              fullData={data}
              sectionName={sectionName}
            />
          </section>
        );
      })}
    </div>
  );
}
