import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ZoomIn, X, Share2, Calendar, Tag, Check } from 'lucide-react';

interface StoryImage {
    id: string;
    src: string;
    alt: string;
    caption: string;
    category: string;
    date: string;
    details: string;
}

const STORY_IMAGES: StoryImage[] = [
    {
        id: 'story-1',
        src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
        alt: 'Ideation & Technical Synthesis',
        caption: 'Student developers collaborating late into the night at the BeeCode Hackathon, building real-time architectures.',
        category: 'HACKATHON',
        date: 'Oct 24, 2024',
        details: 'Teams spent 24 continuous hours whiteboarding database structures, configuring backend containers, and deploying prototype modules. The focus was on high-efficiency computing and modular, reactive interfaces.'
    },
    {
        id: 'story-2',
        src: 'https://images.unsplash.com/photo-1581092334651-ddf26d9aae9d?auto=format&fit=crop&w=1200&q=80',
        alt: 'Hands-on Hardware Prototyping',
        caption: 'Students getting hands-on with responsive microcontrollers, IoT configurations, and breadboard circuit designs.',
        category: 'WORKSHOP',
        date: 'Nov 05, 2025',
        details: 'A close-up of collaborative prototyping labs. Students integrated external sensor arrays with customized firmware, implementing a direct bridge between physical mechanical creases and virtual monitoring.'
    },
    {
        id: 'story-3',
        src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
        alt: 'Research Paper Keynotes & Presentations',
        caption: 'Student researchers presenting peer-reviewed research papers before academic editors and IEEE review committees.',
        category: 'RESEARCH PAPER',
        date: 'Feb 18, 2025',
        details: 'Exposing student minds to scientific research rigor. Academic leads and IEEE reviewers shared strategies on literature surveys, research paper drafting, LaTeX formatting, and publishing in Scopus-indexed journals.'
    },
    {
        id: 'story-4',
        src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
        alt: 'Award Ceremonies & Triumphs',
        caption: 'Student organizers and winners celebrating milestone victories at the grand techfest finale.',
        category: 'CELEBRATION',
        date: 'Mar 12, 2025',
        details: 'Recognizing hours of sleepless creation and collaborative precision. Winners walked away with cash prizes, company referrals, and fully integrated proof-of-concept projects.'
    }
];

interface StackingCardProps {
    key?: React.Key;
    img: StoryImage;
    index: number;
    total: number;
    copiedId: string | null;
    handleShare: (id: string, e: React.MouseEvent) => void;
    setSelectedImage: React.Dispatch<React.SetStateAction<StoryImage | null>>;
    scrollYProgress: any;
}

function StackingCard({ img, index, total, copiedId, handleShare, setSelectedImage, scrollYProgress }: StackingCardProps) {
    // Determine strictly increasing inputs and outputs for translateY translation
    let yInput: number[];
    let yOutput: string[];

    if (index === 0) {
        yInput = [0, 1];
        yOutput = ['0%', '0%'];
    } else if (index === 1) {
        yInput = [0, 1 / 3, 1];
        yOutput = ['100%', '0%', '0%'];
    } else if (index === 2) {
        yInput = [0, 1 / 3, 2 / 3, 1];
        yOutput = ['100%', '100%', '0%', '0%'];
    } else {
        // index === 3
        yInput = [0, 2 / 3, 1];
        yOutput = ['100%', '100%', '0%'];
    }

    // Determine strictly increasing inputs and outputs for scale transitions
    let scaleInput: number[];
    let scaleOutput: number[];

    if (index === total - 1) {
        scaleInput = [0, 1];
        scaleOutput = [1, 1];
    } else if (index === 0) {
        scaleInput = [0, 1 / 3, 1];
        scaleOutput = [1, 0.96, 0.96];
    } else if (index === 1) {
        scaleInput = [0, 1 / 3, 2 / 3, 1];
        scaleOutput = [1, 1, 0.96, 0.96];
    } else {
        // index === 2
        scaleInput = [0, 2 / 3, 1];
        scaleOutput = [1, 1, 0.96];
    }

    const yVal = useTransform(scrollYProgress, yInput, yOutput);
    const scaleVal = useTransform(scrollYProgress, scaleInput, scaleOutput);

    return (
        <motion.div
            className="absolute inset-0 bg-[#FAF9F6] overflow-hidden origin-bottom"
            style={{
                y: yVal,
                scale: scaleVal,
                zIndex: index + 10,
            }}
        >
            <div className="relative w-full h-full flex flex-col justify-between">
                {/* Background Image Container */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#FAF9F6]">
                    <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover opacity-40 transition-transform duration-700 hover:scale-[1.03]"
                        referrerPolicy="no-referrer"
                    />
                    {/* Multi-angle overlay matching high contrast light content visual layouts */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6]/100 via-[#FAF9F6]/85 to-transparent md:block hidden" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/100 via-[#FAF9F6]/85 to-transparent md:hidden block" />
                </div>

                {/* Content Overlay Panel */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20 px-6 sm:px-12 lg:px-20 text-gray-900">

                    {/* Header: Category */}
                    <div className="flex justify-end items-center">
                        <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest border border-[#f06c25]/30 text-[#f06c25] bg-[#f06c25]/10 px-3.5 py-1 uppercase rounded-none backdrop-blur-xs">
                            {img.category}
                        </span>
                    </div>

                    {/* Middle: Title & Story Details with Staggered Entrance Elements */}
                    <div className="max-w-xl md:my-auto space-y-4 pt-12 md:pt-0">
                        <div className="text-xs font-mono text-[#f06c25] font-medium tracking-wide">
                            {img.date}
                        </div>

                        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
                            {img.alt}
                        </h3>

                        <p className="text-gray-600">
                            {img.details}
                        </p>
                    </div>

                    {/* Bottom: Caption & Control Interactions */}
                    <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto">
                        <p className="text-[11px] sm:text-xs text-gray-500 font-mono italic max-w-sm sm:max-w-md line-clamp-2 md:line-clamp-1">
                            "{img.caption}"
                        </p>

                        {/* <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={(e) => handleShare(img.id, e)}
                className="flex-1 sm:flex-initial bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 text-xs font-mono tracking-wider uppercase rounded-none transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
              >
                {copiedId === img.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>SHARE</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedImage(img)}
                className="flex-1 sm:flex-initial bg-[#f06c25] hover:bg-[#d65718] text-white py-2 px-5 text-xs font-mono font-bold tracking-wider uppercase rounded-none transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>EXPAND</span>
              </button>
            </div> */}
                    </div>

                </div>
            </div>
        </motion.div>
    );
}

export default function Gallery() {
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<StoryImage | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Measure scroll of the entire card-stack track from its start hitting viewport top to its end hitting viewport bottom
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    const handleShare = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(`${window.location.origin}/#gallery/photo-${id}`);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <section className="pt-24 pb-0 bg-[#FAF9F6] border-b border-gray-200 relative overflow-visible">

            {/* Background Crease Grid Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
                <svg className="w-full h-full text-[#f06c25]" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.05" />
                    <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.05" />
                    <line x1="0" y1="33" x2="100" y2="33" stroke="currentColor" strokeWidth="0.05" strokeDasharray="1,2" />
                    <line x1="0" y1="66" x2="100" y2="66" stroke="currentColor" strokeWidth="0.05" strokeDasharray="1,2" />
                    <line x1="33" y1="0" x2="33" y2="100" stroke="currentColor" strokeWidth="0.05" strokeDasharray="1,2" />
                    <line x1="66" y1="0" x2="66" y2="100" stroke="currentColor" strokeWidth="0.05" strokeDasharray="1,2" />
                </svg>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">

                {/* Header Block */}
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
                    <div className="flex items-center space-x-3">
                        <span className="h-[2px] w-8 bg-[#f06c25]" />
                        <span className="text-xs font-bold font-mono tracking-widest text-[#f06c25] uppercase">
                            VISUAL IMPRESSIONS
                        </span>
                        <span className="h-[2px] w-8 bg-[#f06c25]" />
                    </div>

                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-none">
                        Story of <span className="font-handwritten font-normal text-brand-orange">Our</span> Creation
                    </h2>
                    <p className="text-gray-500 text-sm font-mono tracking-wide leading-relaxed">
                        Scroll down to watch our milestones and labs stack sequentially, revealing the deep history of our physical community.
                    </p>
                </div>

            </div>

            {/* Continuous Stacking Cards Scroll Container - Constrained to Container Width */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={containerRef} className="relative w-full h-[300vh]">
                    {/* Sticky view frame */}
                    <div className="sticky top-0 w-full h-[85vh] sm:h-screen overflow-hidden bg-[#FAF9F6] border border-gray-200 shadow-sm mb-16">
                        {STORY_IMAGES.map((img, index) => {
                            return (
                                <StackingCard
                                    key={img.id}
                                    img={img}
                                    index={index}
                                    total={STORY_IMAGES.length}
                                    copiedId={copiedId}
                                    handleShare={handleShare}
                                    setSelectedImage={setSelectedImage}
                                    scrollYProgress={scrollYProgress}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden" role="dialog" aria-modal="true">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.92 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                            className="absolute inset-0 bg-[#121212]/95 backdrop-blur-xs"
                        />

                        {/* Modal Body */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="relative max-w-4xl w-full bg-white border border-gray-100 shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
                        >
                            {/* Image Column */}
                            <div className="md:w-3/5 bg-black flex items-center justify-center relative aspect-video md:aspect-auto md:min-h-[450px]">
                                <img
                                    src={selectedImage.src}
                                    alt={selectedImage.alt}
                                    className="max-w-full max-h-[80vh] object-contain"
                                    referrerPolicy="no-referrer"
                                />
                            </div>

                            {/* Info Column */}
                            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-[#FAF9F6] text-gray-900">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-orange-50 text-[#f06c25] text-xs font-mono font-bold uppercase border border-orange-100">
                                            <Tag className="w-3 h-3" />
                                            <span>{selectedImage.category}</span>
                                        </span>
                                        <button
                                            onClick={() => setSelectedImage(null)}
                                            className="p-1.5 rounded-sm hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-all cursor-pointer"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <h3 className="font-display font-bold text-xl text-gray-900 mb-3 tracking-tight">
                                        {selectedImage.alt}
                                    </h3>

                                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                        {selectedImage.details}
                                    </p>
                                </div>

                                <div className="border-t border-gray-200 pt-5 space-y-3">
                                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                                        <Calendar className="w-4 h-4 text-[#f06c25]" />
                                        <span className="font-mono">Date: {selectedImage.date}</span>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => handleShare(selectedImage.id, e)}
                                            className="flex-1 bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-none transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                                        >
                                            {copiedId === selectedImage.id ? (
                                                <>
                                                    <Check className="w-4 h-4 text-emerald-600" />
                                                    <span>Link Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Share2 className="w-4 h-4" />
                                                    <span>Share Photo</span>
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => setSelectedImage(null)}
                                            className="bg-[#1C1C1C] hover:bg-black text-white py-2.5 px-6 text-xs font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
