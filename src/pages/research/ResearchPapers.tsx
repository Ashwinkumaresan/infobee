import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Bookmark, 
  Star, 
  ExternalLink, 
  X, 
  Grid, 
  List,
  Sparkles,
  BookOpen,
  FileText,
  Award,
  ChevronDown,
  ArrowLeft,
  Check
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { ResearchPaper, PaperSubmission } from '../../types';
import { API_URL } from '../../api';

interface ResearchPapersProps {
  onPaperSubmitSuccess?: (submission: PaperSubmission) => void;
}

export default function ResearchPapers({ onPaperSubmitSuccess }: ResearchPapersProps) {
  const navigate = useNavigate();
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedAuthorType, setSelectedAuthorType] = useState<'All' | 'Faculty' | 'Student'>('All');
  const [selectedYear, setSelectedYear] = useState<number | 'All'>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'cited' | 'oldest'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [displayCount, setDisplayCount] = useState(6);

  // Bookmarked paper IDsˀ
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('infobee_bookmarked_papers');
    return saved ? JSON.parse(saved) : ['paper-1', 'paper-3'];
  });



  // Dynamic domains derived from data
  const domains = useMemo(() => {
    const uniqueDomains = Array.from(new Set(papers.map(p => p.domain))).filter(Boolean);
    return ['All Domains', ...uniqueDomains];
  }, [papers]);
  const years = ['All', 2025, 2024, 2023, 2022];

  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = '';
    
    setIsLoading(true);
    fetch(`${API_URL}/research/`)
      .then((res) => res.json())
      .then((data) => {
        setPapers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching papers:", err);
        setIsLoading(false);
      });
  }, []);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('infobee_bookmarked_papers', JSON.stringify(updated));
      return updated;
    });
  };

  // Featured Papers
  const featuredPapers = useMemo(() => {
    return papers.filter((p) => p.featured);
  }, [papers]);

  // Filtered and Sorted Papers
  const filteredPapers = useMemo(() => {
    return papers.filter((paper) => {
      // Search query filter
      const matchesSearch =
        searchQuery.trim() === '' ||
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.authors.some((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        paper.journal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
        paper.abstract.toLowerCase().includes(searchQuery.toLowerCase());

      // Domain filter
      const matchesDomain =
        selectedDomain === 'All Domains' || paper.domain.toLowerCase() === selectedDomain.toLowerCase();

      // Author Type filter
      const matchesType =
        selectedAuthorType === 'All' || paper.author_type === selectedAuthorType;

      // Year filter
      const matchesYear = selectedYear === 'All' || paper.year === Number(selectedYear);

      return matchesSearch && matchesDomain && matchesType && matchesYear;
    }).sort((a, b) => {
      if (sortBy === 'newest') return b.year - a.year;
      if (sortBy === 'oldest') return a.year - b.year;
      if (sortBy === 'cited') return b.citations - a.citations;
      return 0;
    });
  }, [papers, searchQuery, selectedDomain, selectedAuthorType, selectedYear, sortBy]);

  // Reset display count when filters change
  React.useEffect(() => {
    setDisplayCount(6);
  }, [searchQuery, selectedDomain, selectedAuthorType, selectedYear, sortBy]);

  const displayedPapers = filteredPapers.slice(0, displayCount);

  // Handle Submission Form Submit


  const handleOpenPaperDetail = (paper: ResearchPaper) => {
    navigate(`/research/${paper.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="research" className="pt-20 sm:pt-24 pb-16 bg-white min-h-screen">
      <div className="relative bg-neutral-900 text-white py-10 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-800 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#F06C2510_1px,transparent_1px),linear-gradient(to_bottom,#F06C2510_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent"></div>
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[150px] sm:h-[300px] bg-brand-orange rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-orange transition-colors mb-6 group cursor-pointer"
          >
          </Link>

          <div className="inline-flex items-center space-x-2 bg-brand-orange text-white text-[10px] sm:text-xs font-mono tracking-widest font-bold px-3 py-1 uppercase mb-3 sm:mb-4">
            <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
            <span>120+ PAPERS PUBLISHED</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Research & Publications
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base mt-2 sm:mt-3 max-w-3xl leading-relaxed">
            Explore peer-reviewed research papers, projects, and journal publications authored by the students and faculty of the IT Department at Dr. MCET.
          </p>
        </div>
      </div>

      {/* 2. Search & Toolbar Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white border border-neutral-200 p-3 sm:p-4 shadow-card flex flex-col gap-3 sm:gap-4">
          
          {/* Main Controls Row */}
          <div className="flex flex-col xl:flex-row xl:flex-wrap items-stretch xl:items-center gap-3">
            
            {/* Search Input Bar */}
            <div className="relative flex-1 min-w-[200px] w-full xl:w-auto">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, or keyword..."
                className="w-full bg-base-subtle border border-neutral-200 pl-10 pr-8 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-900 placeholder-neutral-400 focus:outline-none focus:border-brand-orange transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filters and Controls container */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              
              {/* Domain Filter Dropdown */}
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full appearance-none bg-base-subtle border border-neutral-200 text-xs font-semibold pl-3 pr-8 py-2 sm:py-2.5 text-gray-700 focus:outline-none focus:border-brand-orange cursor-pointer"
                >
                  {domains.map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Segmented Author Type Toggle */}
              <div className="flex items-center bg-base-subtle p-1 border border-neutral-200 flex-1 sm:flex-none">
                {(['All', 'Faculty', 'Student'] as const).map((type) => {
                  const active = selectedAuthorType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setSelectedAuthorType(type)}
                      className={`flex-1 text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1.5 transition-all cursor-pointer ${
                        active
                          ? 'bg-white text-gray-900 font-bold shadow-xs'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>

              {/* Sort & View Mode Switchers */}
              <div className="flex items-center justify-between space-x-2 flex-1 sm:flex-none">
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full appearance-none bg-base-subtle border border-neutral-200 text-xs font-semibold pl-3 pr-8 py-2 sm:py-2.5 text-gray-700 focus:outline-none focus:border-brand-orange cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="cited">Most Cited</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                <div className="flex items-center border border-neutral-200 bg-base-subtle p-0.5 shrink-0">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-400 hover:text-gray-700'}`}
                    title="Grid View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-400 hover:text-gray-700'}`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Active Filter Badges */}
          {(selectedDomain !== 'All Domains' || selectedAuthorType !== 'All' || searchQuery !== '') && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-100 text-xs">
              <span className="text-gray-400 font-mono text-[10px] sm:text-[11px] uppercase">Active Filters:</span>
              {selectedDomain !== 'All Domains' && (
                <span className="inline-flex items-center space-x-1 bg-amber-50 border border-amber-200 text-amber-900 px-2 py-0.5 font-medium">
                  <span>Domain: {selectedDomain}</span>
                  <button onClick={() => setSelectedDomain('All Domains')} className="hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedAuthorType !== 'All' && (
                <span className="inline-flex items-center space-x-1 bg-orange-50 border border-orange-200 text-brand-orange px-2 py-0.5 font-medium">
                  <span>Author: {selectedAuthorType}</span>
                  <button onClick={() => setSelectedAuthorType('All')} className="hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center space-x-1 bg-neutral-100 border border-neutral-300 text-gray-800 px-2 py-0.5 font-medium">
                  <span>Query: "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')} className="hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedDomain('All Domains');
                  setSelectedAuthorType('All');
                  setSearchQuery('');
                }}
                className="text-[11px] text-gray-500 hover:text-brand-orange underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}

        </div>
      </div>

      {/* 3. Featured & Most Cited Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-1 bg-brand-orange" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Featured & Most Cited
          </h2>
        </div>

        {/* Featured Cards - Horizontal Scroll */}
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-none snap-x snap-mandatory">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div
                key={i}
                className="flex-none w-[85vw] md:w-[380px] snap-center relative p-5 sm:p-7 border border-neutral-200 bg-base flex flex-col justify-between animate-pulse"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-6 w-20 bg-neutral-200" />
                  </div>
                  <div className="h-8 w-3/4 bg-neutral-200 mb-3" />
                  <div className="h-4 w-1/2 bg-neutral-200 mb-4" />
                </div>
                <div>
                  <div className="pt-3 border-t border-neutral-100 flex justify-between items-center mb-4">
                    <div className="h-4 w-32 bg-neutral-200" />
                    <div className="h-4 w-12 bg-neutral-200" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-24 bg-neutral-200" />
                    <div className="h-4 w-20 bg-neutral-200" />
                  </div>
                </div>
              </div>
            ))
          ) : featuredPapers.map((paper) => {
            const isDark = paper.is_dark_featured;
            const isBookmarked = bookmarkedIds.includes(String(paper.id));

            return (
              <div
                key={paper.id}
                onClick={() => handleOpenPaperDetail(paper)}
                className={`flex-none w-[85vw] md:w-[380px] snap-center relative p-5 sm:p-7 border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                  isDark
                    ? 'bg-neutral-900 border-neutral-800 text-white shadow-lg hover:border-neutral-600'
                    : 'bg-white border-neutral-200 text-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.02)] hover:border-neutral-400 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Badge & Star */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 ${
                        paper.author_type === 'Student'
                          ? 'bg-brand-orange text-white'
                          : isDark
                          ? 'bg-neutral-800 text-gray-200 border border-neutral-700'
                          : 'bg-neutral-100 text-gray-800 border border-neutral-200'
                      }`}
                    >
                      {paper.author_type}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`font-display text-xl sm:text-2xl font-bold tracking-tight mb-3 line-clamp-3 leading-snug group-hover:text-brand-orange transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {paper.title}
                  </h3>

                  {/* Authors */}
                  <p className={`text-sm italic mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {paper.authors.map(a => a.name).join(', ')}
                  </p>
                </div>

                <div>
                  {/* Journal & Year */}
                  <div className={`pt-3 border-t flex justify-between items-center text-xs font-mono mb-4 ${isDark ? 'border-neutral-800 text-gray-400' : 'border-neutral-100 text-gray-500'}`}>
                    <span className="truncate max-w-[200px]">{paper.journal}</span>
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{paper.year}</span>
                  </div>

                  {/* Citations & Read More */}
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Citations: <strong className={isDark ? 'text-amber-400' : 'text-brand-orange'}>{paper.citations}</strong>
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenPaperDetail(paper);
                      }}
                      className={`inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                        isDark ? 'text-white hover:text-amber-300' : 'text-brand-orange hover:text-brand-orange-hover'
                      }`}
                    >
                      <span>Read More</span>
                      <span className="text-sm font-normal transition-transform group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. All Publications Collection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-200">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 tracking-tight">
              All Publications
            </h2>
            <p className="text-xs text-gray-500 font-mono mt-0.5">
              Showing {filteredPapers.length} indexed papers
            </p>
          </div>
        </div>

        {isLoading ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-white border border-neutral-200 p-5 sm:p-7 flex flex-col justify-between shadow-sm animate-pulse h-64">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-5 w-16 bg-neutral-200" />
                    </div>
                    <div className="h-6 w-full bg-neutral-200 mb-2" />
                    <div className="h-6 w-4/5 bg-neutral-200 mb-4" />
                    <div className="h-4 w-1/2 bg-neutral-200 mb-4" />
                  </div>
                  <div>
                    <div className="pt-3 border-t border-neutral-100 flex justify-between items-center mb-4">
                      <div className="h-4 w-32 bg-neutral-200" />
                      <div className="h-4 w-12 bg-neutral-200" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-20 bg-neutral-200" />
                      <div className="h-4 w-20 bg-neutral-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-white border border-neutral-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-pulse">
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex items-center space-x-3 mb-1.5">
                      <div className="h-5 w-16 bg-neutral-200" />
                      <div className="h-4 w-32 bg-neutral-200" />
                    </div>
                    <div className="h-6 w-3/4 bg-neutral-200 my-2" />
                    <div className="h-4 w-1/3 bg-neutral-200 mt-2" />
                  </div>
                  <div className="flex items-center space-x-6 self-end md:self-center">
                    <div className="h-4 w-20 bg-neutral-200" />
                    <div className="h-10 w-28 bg-neutral-200" />
                  </div>
                </div>
              ))}
            </div>
          )
        ) : filteredPapers.length === 0 ? (
          <div className="bg-base border border-dashed border-neutral-300 p-12 text-center my-6">
            <BookOpen className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h3 className="font-display text-lg font-bold text-gray-800">No Research Papers Found</h3>
            <p className="text-sm text-gray-500 mt-1">
              Try adjusting your search query or domain filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDomain('All Domains');
                setSelectedAuthorType('All');
              }}
              className="mt-4 inline-block bg-neutral-900 text-white text-xs font-bold uppercase px-4 py-2"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedPapers.map((paper) => {
              const isBookmarked = bookmarkedIds.includes(String(paper.id));
              return (
                <Link
                  key={paper.id}
                  to={`/research/${paper.id}`}
                  className="bg-white border border-neutral-200 p-5 sm:p-7 flex flex-col justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-neutral-400 transition-all duration-300 group cursor-pointer"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                          paper.author_type === 'Faculty'
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : 'bg-orange-100 text-orange-900 border border-orange-200'
                        }`}
                      >
                        {paper.author_type}
                      </span>
                      {paper.status === 'unpublished' && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-neutral-200 text-gray-700 border border-neutral-300 ml-2">
                          Internal
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg font-bold text-gray-900 tracking-tight mb-2 line-clamp-2 leading-snug group-hover:text-brand-orange transition-colors">
                      {paper.title}
                    </h3>

                    {/* Authors */}
                    <p className="text-xs text-gray-600 italic mb-4 line-clamp-1">
                      {paper.authors.map(a => a.name).join(', ')}
                    </p>
                  </div>

                  <div>
                    {/* Publisher & Year */}
                    <div className="pt-3 border-t border-neutral-100 flex justify-between items-center text-xs font-mono text-gray-500 mb-4">
                      <span className="truncate max-w-[180px]">{paper.journal}</span>
                      <span className="font-bold text-gray-900">{paper.year}</span>
                    </div>

                    {/* Citations & Link */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-gray-600">
                        {paper.citations} Citations
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenPaperDetail(paper);
                        }}
                        className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-brand-orange hover:text-brand-orange-hover transition-colors cursor-pointer"
                      >
                        <span>Read More</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {displayedPapers.map((paper) => {
              const isBookmarked = bookmarkedIds.includes(String(paper.id));
              return (
                <div
                  key={paper.id}
                  onClick={() => handleOpenPaperDetail(paper)}
                  className="bg-white border border-neutral-200 p-4 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-neutral-400 hover:shadow-sm transition-all cursor-pointer group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-1.5">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                          paper.author_type === 'Faculty'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-orange-100 text-orange-900'
                        }`}
                      >
                        {paper.author_type}
                      </span>
                      {paper.status === 'unpublished' && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-neutral-200 text-gray-700 ml-2">
                          Internal
                        </span>
                      )}
                      <span className="font-mono text-xs text-gray-500">
                        {paper.journal} • {paper.year}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-brand-orange transition-colors truncate">
                      {paper.title}
                    </h3>
                    <p className="text-xs text-gray-600 italic mt-0.5">
                      {paper.authors.map(a => a.name).join(', ')}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-end space-x-4 sm:space-x-6 self-end md:self-center mt-2 md:mt-0">
                    <div className="text-right font-mono text-xs text-gray-600">
                      <strong>{paper.citations}</strong> Citations
                    </div>

                    <button
                      onClick={(e) => toggleBookmark(paper.id, e)}
                      className={`p-1.5 transition-colors ${
                        isBookmarked ? 'text-brand-orange' : 'text-gray-300 hover:text-gray-600'
                      }`}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenPaperDetail(paper);
                      }}
                      className="bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase px-4 py-2 transition-all cursor-pointer"
                    >
                      Read More ↗
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Control */}
        {filteredPapers.length > 0 && (
          <div className="mt-12 text-center">
            {displayCount < filteredPapers.length ? (
              <button
                onClick={() => setDisplayCount(prev => prev + 6)}
                className="border-2 border-neutral-900 text-gray-900 font-bold text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-neutral-900 hover:text-white transition-all duration-200 cursor-pointer"
              >
                Load More Publications
              </button>
            ) : (
              <p className="text-gray-500 font-medium text-sm">You've reached the end of the list.</p>
            )}
            <p className="font-mono text-xs text-gray-500 mt-3">
              Showing {displayedPapers.length} of {filteredPapers.length} papers
            </p>
          </div>
        )}
      </div>

      {/* 5. Submit Publication CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-brand-orange text-white p-8 sm:p-12 relative overflow-hidden shadow-xl border border-orange-600">
          
          {/* Abstract Geometric Corner Accent */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden sm:block">
            <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
              <polygon points="0,0 200,0 200,200" fill="white" />
              <polygon points="50,200 200,50 200,200" fill="white" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Have you published a paper?
              </h2>
              <p className="text-orange-100 text-sm sm:text-base mt-2 font-medium leading-relaxed">
                Get your research paper featured on the official Dr. MCET Information Technology Department Portal.
              </p>
            </div>

            <button
              onClick={() => navigate('/research/submit')}
              className="bg-neutral-900 hover:bg-black text-white px-8 py-4 font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Submit Your Publication
            </button>
          </div>

        </div>
      </div>



    </section>
  );
}
