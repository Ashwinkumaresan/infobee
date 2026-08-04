import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Bookmark, 
  Star, 
  Download, 
  Share2, 
  Quote, 
  Link as LinkIcon, 
  Info, 
  ArrowLeft,
  FileText
} from 'lucide-react';
import { researchPapersData } from '../../data';

export default function PaperDetail() {
  const { paperId } = useParams<{ paperId: string }>();
  const paper = researchPapersData.find((p) => p.id === paperId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [paperId]);
  
  const [copiedDoiId, setCopiedDoiId] = useState<string | null>(null);
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false); // Can be linked globally if needed

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('infobee_bookmarked_papers');
    return saved ? JSON.parse(saved) : ['paper-1', 'paper-3'];
  });

  if (!paper) {
    return (
      <section className="pt-32 pb-16 min-h-screen text-center">
        <h2 className="text-2xl font-bold">Paper Not Found</h2>
        <Link to="/research" className="text-[#f06c25] hover:underline mt-4 inline-block">
          Return to Research Papers
        </Link>
      </section>
    );
  }

  const isBookmarked = bookmarkedIds.includes(paper.id);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('infobee_bookmarked_papers', JSON.stringify(updated));
      return updated;
    });
  };

  const copyToClipboard = (text: string, type: 'doi' | 'bibtex', paperId?: string) => {
    navigator.clipboard.writeText(text);
    if (type === 'doi' && paperId) {
      setCopiedDoiId(paperId);
      setTimeout(() => setCopiedDoiId(null), 2000);
    } else if (type === 'bibtex') {
      setCopiedBibtex(true);
      setTimeout(() => setCopiedBibtex(false), 2000);
    }
  };

  const generateBibtex = () => {
    const firstAuthor = paper.authors[0].split(' ').pop()?.toLowerCase() || 'author';
    return `@article{${firstAuthor}${paper.year},
  title={${paper.title}},
  author={${paper.authors.join(' and ')}},
  journal={${paper.journal}},
  year={${paper.year}},
  publisher={${paper.publisher || 'Publisher'}}
}`;
  };

  return (
    <section id="research-detail" className="pt-24 pb-16 bg-[#FBFBFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 mb-6 border-b border-gray-200/80 gap-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-gray-500 uppercase tracking-wider overflow-x-auto">
            <Link to="/" className="hover:text-[#f06c25] transition-colors whitespace-nowrap">HOME</Link>
            <span>&gt;</span>
            <Link to="/research" className="hover:text-[#f06c25] transition-colors whitespace-nowrap">
              RESEARCH &amp; PUBLICATIONS
            </Link>
            <span>&gt;</span>
            <span className="text-[#f06c25] font-bold whitespace-nowrap">PAPER DETAIL</span>
          </div>

          <Link
            to="/research"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#f06c25] hover:text-[#d65718] transition-colors self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Publications</span>
          </Link>
        </div>

        {/* Main Paper Display Card */}
        <div className="bg-white border border-[#E2E1DF] p-6 sm:p-10 relative shadow-2xs">
          
          {/* Publication Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-[#EAE8E3] text-gray-800 text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1">
              {paper.authorType.toUpperCase()} PUBLICATION
            </span>
            <span className="bg-orange-50 text-[#d65718] border border-orange-200 text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1">
              {paper.domain.toUpperCase()}
            </span>
            {paper.keywords?.[0] && (
              <span className="bg-orange-50 text-[#d65718] border border-orange-200 text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1">
                {paper.keywords[0].toUpperCase()}
              </span>
            )}
          </div>

          {/* Paper Title */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8">
            {paper.title}
          </h1>

          {/* Authors List with Avatars */}
          <div className="flex flex-wrap items-center gap-8 mb-8 pb-8 border-b border-gray-100">
            {paper.authors.map((authorName, index) => {
              const isLead = index === 0;
              const initials = authorName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2);
              return (
                <div key={authorName} className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-900 text-white font-bold flex items-center justify-center font-display text-sm border border-gray-200">
                    {initials}
                  </div>
                  <div>
                    <div className="font-display font-bold text-gray-900 text-sm sm:text-base tracking-tight uppercase">
                      {authorName}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {isLead
                        ? `Lead Author • ${paper.authorType === 'Faculty' ? 'Professor of AI & IT' : 'Research Scholar'}`
                        : 'Research Associate'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Bar */}
          <div className="bg-[#FAF9F7] border border-[#E2E1DF] p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={paper.pdfUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 bg-[#f06c25] hover:bg-[#d65718] text-white text-xs font-bold uppercase tracking-widest px-5 py-3 shadow-2xs transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD PDF</span>
              </a>

              {paper.doi && (
                <button
                  onClick={() => copyToClipboard(`https://doi.org/${paper.doi}`, 'doi', paper.id)}
                  className="inline-flex items-center space-x-2 bg-white border border-[#E2E1DF] hover:bg-gray-50 text-gray-900 text-xs font-bold uppercase tracking-widest px-4 py-3 shadow-2xs transition-all cursor-pointer"
                >
                  <LinkIcon className="w-4 h-4 text-gray-600" />
                  <span>{copiedDoiId === paper.id ? 'DOI COPIED' : 'VIEW DOI'}</span>
                </button>
              )}

              <button
                onClick={() => copyToClipboard(generateBibtex(), 'bibtex')}
                className="inline-flex items-center space-x-2 bg-white border border-[#E2E1DF] hover:bg-gray-50 text-gray-900 text-xs font-bold uppercase tracking-widest px-4 py-3 shadow-2xs transition-all cursor-pointer"
              >
                <Quote className="w-4 h-4 text-gray-600" />
                <span>{copiedBibtex ? 'BIBTEX COPIED' : 'CITE THIS PAPER'}</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Paper URL copied to clipboard!');
                }}
                className="p-3 border border-[#E2E1DF] bg-white hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
                title="Share paper"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={(e) => toggleBookmark(paper.id, e)}
                className={`p-3 border border-[#E2E1DF] bg-white transition-colors cursor-pointer ${
                  isBookmarked ? 'text-[#f06c25]' : 'text-gray-700 hover:text-black'
                }`}
                title="Bookmark paper"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Main Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          
          {/* Left Column (Content) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* ABSTRACT */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <h2 className="font-display text-lg font-bold text-gray-900 tracking-wider uppercase">
                  ABSTRACT
                </h2>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                {paper.abstract}
              </p>

              {/* KEYWORDS */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono">
                <span className="font-bold text-gray-500 uppercase">KEYWORDS:</span>
                {paper.keywords?.map((kw) => (
                  <span
                    key={kw}
                    className="bg-[#F2F0ED] border border-[#E2E1DF] text-gray-800 px-3 py-1 font-sans text-xs"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* FULL PAPER PREVIEW */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <h2 className="font-display text-lg font-bold text-gray-900 tracking-wider uppercase">
                  FULL PAPER PREVIEW
                </h2>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="border border-[#E2E1DF] bg-[#FAF9F7] p-8 sm:p-12 text-center flex flex-col items-center justify-center relative">
                <div className="w-16 h-16 bg-[#F0EEEE] border border-[#E2E1DF] flex items-center justify-center text-[#f06c25] mb-4 shadow-2xs">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="font-display text-lg font-bold text-gray-900 mb-2">
                  Technical Documentation Preview
                </h3>
                <p className="text-xs text-gray-600 max-w-md mx-auto mb-6 leading-relaxed">
                  The full technical manuscript is available for authenticated university members, faculty researchers, and institutional subscribers.
                </p>
                <button
                  onClick={() => alert('Access Request submitted to the Dr. MCET IT Research Committee!')}
                  className="border-2 border-amber-900 text-amber-950 font-bold px-6 py-3 text-xs tracking-widest uppercase hover:bg-amber-950 hover:text-white transition-all cursor-pointer shadow-2xs"
                >
                  REQUEST FULL ACCESS
                </button>
              </div>
            </div>

            {/* ABOUT AUTHORS */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <h2 className="font-display text-lg font-bold text-gray-900 tracking-wider uppercase">
                  ABOUT AUTHORS
                </h2>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paper.authors.map((authorName, index) => {
                  const initials = authorName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2);
                  return (
                    <div
                      key={authorName}
                      className="border border-[#E2E1DF] bg-white p-5 flex items-start space-x-4 shadow-2xs"
                    >
                      <div className="w-12 h-12 bg-gray-900 text-white font-bold flex items-center justify-center font-display text-sm shrink-0">
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-bold text-gray-900 text-sm tracking-tight truncate uppercase">
                          {authorName}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1 leading-normal line-clamp-2">
                          {index === 0
                            ? 'Head of Distributed Intelligence Lab, Department of IT Research.'
                            : 'Ph.D. Candidate specializing in Federated Learning and Edge Computing.'}
                        </p>
                        <button
                          onClick={() => alert(`Viewing profile for ${authorName}`)}
                          className="inline-flex items-center space-x-1 text-[11px] font-bold text-[#f06c25] uppercase tracking-wider mt-3 hover:underline cursor-pointer"
                        >
                          <span>VIEW PROFILE</span>
                          <span>→</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-6">
            
            {/* DETAILS BOX */}
            <div className="bg-white border border-[#E2E1DF] p-6 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <h3 className="font-display font-bold text-gray-900 tracking-wider uppercase text-sm">
                  DETAILS
                </h3>
                <Info className="w-4 h-4 text-gray-400" />
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between items-start">
                  <span className="text-gray-500 font-mono uppercase font-medium">PUBLISHED IN</span>
                  <span className="font-bold text-gray-900 text-right max-w-[170px]">{paper.journal}</span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-gray-500 font-mono uppercase font-medium">YEAR</span>
                  <span className="font-bold text-gray-900">{paper.year}</span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-gray-500 font-mono uppercase font-medium">TYPE</span>
                  <span className="font-bold text-gray-900">Journal Article</span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-gray-500 font-mono uppercase font-medium">CITATIONS</span>
                  <span className="bg-[#f06c25] text-white px-2 py-0.5 font-mono text-xs font-bold">
                    {paper.citations}
                  </span>
                </div>

                {paper.doi && (
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-gray-500 font-mono uppercase font-medium">DOI</span>
                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#f06c25] hover:underline font-mono font-bold text-[11px]"
                    >
                      {paper.doi}
                    </a>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-gray-500 font-mono uppercase font-medium">STATUS</span>
                  <span className="inline-flex items-center space-x-1.5 text-emerald-700 font-bold uppercase tracking-wider text-[11px]">
                    <span className="w-2 h-2 bg-emerald-600 rounded-none inline-block" />
                    <span>Peer Reviewed</span>
                  </span>
                </div>
              </div>
            </div>

            {/* RELATED PAPERS BOX */}
            <div className="bg-[#F9F8F6] border border-[#E2E1DF] p-6">
              <h3 className="font-display font-bold text-gray-900 tracking-wider uppercase text-sm mb-4">
                RELATED PAPERS
              </h3>

              <div className="space-y-4 divide-y divide-gray-200/80">
                {researchPapersData
                  .filter((p) => p.id !== paper.id)
                  .slice(0, 3)
                  .map((relPaper) => (
                    <Link
                      to={`/research/${relPaper.id}`}
                      key={relPaper.id}
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="block pt-3 first:pt-0 cursor-pointer group"
                    >
                      <div className="font-mono text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">
                        {relPaper.journal} • {relPaper.year}
                      </div>
                      <h4 className="font-display text-xs font-bold text-gray-900 group-hover:text-[#f06c25] transition-colors leading-snug">
                        {relPaper.title}
                      </h4>
                    </Link>
                  ))}
              </div>
            </div>

            {/* DEPARTMENT TOP PAPER BOX */}
            <div className="bg-[#F7F4EE] border border-[#E5DFD5] p-6 relative overflow-hidden">
              <div className="flex items-center space-x-2 text-amber-700 mb-2">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
              <h3 className="font-display font-extrabold text-amber-950 tracking-wider uppercase text-sm mb-2">
                DEPARTMENT TOP PAPER
              </h3>
              <p className="text-xs text-amber-900/80 leading-relaxed mb-4">
                This publication ranks in the top 1% of research outputs from the Dr. MCET IT Department this academic cycle.
              </p>
              <button
                onClick={() => alert('Citation metrics loaded for Dr. MCET IT Research Portal!')}
                className="text-xs font-bold uppercase tracking-wider text-amber-900 hover:text-amber-950 underline cursor-pointer"
              >
                VIEW STATISTICS
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
