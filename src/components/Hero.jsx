import React from 'react';

const Hero = ({ data, sectionName, features = {}, style = {} }) => {
    const hero = data[0];
    if (!hero) return null;

    const heroTitle = hero.titel || hero.hero_header || hero.site_naam;

    const handleScroll = (e) => {
        const url = hero.cta_url || "#contact";
        if (url.startsWith('#')) {
            e.preventDefault();
            const target = document.getElementById(url.substring(1));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="hero"
            data-dock-section={sectionName}
            className="relative w-full h-auto min-h-[var(--hero-height,85vh)] max-h-[var(--hero-max-height,150vh)] aspect-[var(--hero-aspect-ratio,16/9)] flex items-center justify-center overflow-hidden bg-[var(--color-hero-bg)]"
            style={style}
        >
            <div className="absolute inset-0 z-0">
                <img
                    src={hero.hero_afbeelding || hero.foto_url}
                    className="w-full h-full object-cover object-top"
                    data-dock-type="media"
                    data-dock-bind={`${sectionName}.0.${hero.hero_afbeelding ? 'hero_afbeelding' : 'foto_url'}`}
                />
                <div className="absolute inset-0 z-20 pointer-events-none" style={{
                    backgroundImage: 'linear-gradient(to bottom, var(--hero-overlay-start, rgba(0,0,0,0.6)), var(--hero-overlay-end, rgba(0,0,0,0.6)))'
                }}></div>
            </div>
            <div className="relative z-10 text-center px-6 max-w-5xl">
                <h1 
                    className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-2xl"
                    data-dock-type="text"
                    data-dock-bind={`${sectionName}.0.titel`}
                >
                    {heroTitle}
                </h1>
                <div className="h-2 w-32 bg-accent mx-auto mb-10 rounded-full shadow-lg shadow-accent/50"></div>
                <div className="flex flex-col items-center gap-12">
                    <p 
                        className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-light italic"
                        data-dock-type="text"
                        data-dock-bind={`${sectionName}.0.ondertitel`}
                    >
                        {hero.ondertitel || hero.introductie}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={handleScroll}
                            className="bg-[var(--color-button-bg)] text-white px-10 py-4 rounded-full text-xl font-bold shadow-2xl hover:opacity-90 transition-all transform hover:scale-105"
                            data-dock-type="link"
                            data-dock-bind={`${sectionName}.0.cta_label`}
                        >
                            {hero.cta_label || "Contact"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
