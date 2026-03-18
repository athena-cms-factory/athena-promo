import React from 'react';

const GenericSection = ({ data, sectionName, layout = 'list', features = {}, style = {} }) => {
    if (!data || data.length === 0) return null;
    
    const effectiveLayout = (sectionName === 'voordelen' || sectionName === 'showcase') ? 'grid' : layout;

    const iconMap = {
        'table': 'fa-table-columns',
        'zap': 'fa-bolt-lightning',
        'smartphone': 'fa-mobile-screen-button',
        'laptop': 'fa-laptop',
        'gear': 'fa-gear',
        'check': 'fa-circle-check',
        'star': 'fa-star',
        'globe': 'fa-globe',
        'users': 'fa-users',
        'rocket': 'fa-rocket'
    };

    const renderIcon = (iconData) => {
        if (!iconData || typeof iconData !== 'string' || iconData.length < 2) return null;
        if (iconData.startsWith('M')) {
            return (
                <svg className="w-10 h-10 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={iconData} />
                </svg>
            );
        }
        if (iconData.includes('fa-') || iconMap[iconData.toLowerCase()]) {
            const iconClass = iconMap[iconData.toLowerCase()] || iconData;
            return <i className={`fa-solid ${iconClass} text-4xl text-accent`}></i>;
        }
        return null;
    };

    return (
        <section id={sectionName} data-dock-section={sectionName} className="py-24 px-6 bg-[var(--color-background)] text-[var(--color-text)]" style={style}>
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col items-center mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 capitalize">
                        <span data-dock-type="text" data-dock-bind="_section_order.0.sectie">{sectionName.replace(/_/g, ' ')}</span>
                    </h2>
                    <div className="h-1.5 w-24 bg-accent rounded-full"></div>
                </div>

                <div className={effectiveLayout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12' : 'space-y-20'}>
                    {data.map((item, index) => {
                        const titleKey = Object.keys(item).find(k => /naam|titel|onderwerp|header|title/i.test(k));
                        const iconKey = Object.keys(item).find(k => /icoon|icon/i.test(k));
                        const imgKey = Object.keys(item).find(k => /foto|afbeelding|url|image|img/i.test(k));
                        const textKeys = Object.keys(item).filter(k => k !== titleKey && k !== iconKey && k !== imgKey && !/link|id/i.test(k));
                        const isEven = index % 2 === 0;

                        if (effectiveLayout === 'grid') {
                            const iconElement = renderIcon(item[iconKey]);
                            return (
                                <div key={index} className="flex flex-col overflow-hidden bg-white/5 backdrop-blur-sm rounded-[2.5rem] shadow-xl border border-white/10 hover:border-accent/30 transition-all duration-500 group">
                                    {imgKey && item[imgKey] && (
                                        <div className="w-full aspect-video overflow-hidden">
                                            <img src={item[imgKey]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-dock-type="media" data-dock-bind={`sectionName.0.imgKey`} />
                                        </div>
                                    )}
                                    <div className="p-10 flex flex-col items-center text-center flex-1">
                                        {iconElement && (
                                            <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mb-8 shadow-inner group-hover:rotate-12 transition-transform duration-500">
                                                {iconElement}
                                            </div>
                                        )}
                                        {titleKey && (
                                            <h3 className="text-2xl font-bold text-primary mb-4 leading-tight">
                                                <span data-dock-type="text" data-dock-bind={`sectionName.0.titleKey`}>{item[titleKey]}</span>
                                            </h3>
                                        )}
                                        {textKeys.map(tk => (
                                            <div key={tk} className="text-slate-400 text-lg leading-relaxed mb-4">
                                                <span data-dock-type="text" data-dock-bind={`sectionName.0.tk`}>{item[tk]}</span>
                                            </div>
                                        ))}
                                        {(item.link || item.link_url) && (
                                            <a href={"#"} data-dock-type="link" data-dock-bind="site_settings.0.titel">{}</a>
                                        )}
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div key={index} className={`flex flex-col items-center text-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-20`}>
                                {imgKey && item[imgKey] && (
                                    <div className="w-full md:w-1/2 aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl rotate-1 group hover:rotate-0 transition-transform duration-500 border-8 border-white/5">
                                        <img src={item[imgKey]} className="w-full h-full object-cover" data-dock-type="media" data-dock-bind={`sectionName.0.imgKey`} />
                                    </div>
                                )}
                                <div className="flex-1">
                                    {titleKey && (
                                        <h3 className="text-3xl font-serif font-bold text-primary leading-tight mb-8">
                                            <span data-dock-type="text" data-dock-bind={`sectionName.0.titleKey`}>{item[titleKey]}</span>
                                        </h3>
                                    )}
                                    {textKeys.map(tk => (
                                        <div key={tk} className="text-xl leading-relaxed text-slate-400 mb-6 font-light">
                                            <span data-dock-type="text" data-dock-bind={`sectionName.0.tk`}>{item[tk]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default GenericSection;
