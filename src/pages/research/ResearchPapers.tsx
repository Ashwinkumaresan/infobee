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
import { researchPapersData } from '../../data';

interface ResearchPapersProps {
  onPaperSubmitSuccess?: (submission: PaperSubmission) => void;
}

export default function ResearchPapers({ onPaperSubmitSuccess }: ResearchPapersProps) {
  const navigate = useNavigate();
  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedAuthorType, setSelectedAuthorType] = useState<'All' | 'Faculty' | 'Student'>('All');
  const [selectedYear, setSelectedYear] = useState<number | 'All'>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'cited' | 'oldest'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Bookmarked paper IDsˀ
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('infobee_bookmarked_papers');
    return saved ? JSON.parse(saved) : ['paper-1', 'paper-3'];
  });

  // Modal & Detailed Page states
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Paper Submission Form State
  const [subTitle, setSubTitle] = useState('');
  const [subAuthor, setSubAuthor] = useState('');
  const [subEmail, setSubEmail] = useState('');
  const [subType, setSubType] = useState<'Faculty' | 'Student'>('Student');
  const [subDomain, setSubDomain] = useState('AI');
  const [subJournal, setSubJournal] = useState('');
  const [subAbstract, setSubAbstract] = useState('');
  const [subDoi, setSubDoi] = useState('');
  const [subSubmitSuccess, setSubSubmitSuccess] = useState(false);

  // Dynamic domains derived from data
  const domains = ['All Domains', 'AI', 'Networking', 'IoT', 'Cloud', 'Cybersecurity'];
  const years = ['All', 2025, 2024, 2023, 2022];

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
    return researchPapersData.filter((p) => p.featured);
  }, []);

  // Filtered and Sorted Papers
  const filteredPapers = useMemo(() => {
    return researchPapersData.filter((paper) => {
      // Search query filter
      const matchesSearch =
        searchQuery.trim() === '' ||
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.authors.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
        paper.journal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
        paper.abstract.toLowerCase().includes(searchQuery.toLowerCase());

      // Domain filter
      const matchesDomain =
        selectedDomain === 'All Domains' || paper.domain.toLowerCase() === selectedDomain.toLowerCase();

      // Author Type filter
      const matchesType =
        selectedAuthorType === 'All' || paper.authorType === selectedAuthorType;

      // Year filter
      const matchesYear = selectedYear === 'All' || paper.year === Number(selectedYear);

      return matchesSearch && matchesDomain && matchesType && matchesYear;
    }).sort((a, b) => {
      if (sortBy === 'newest') return b.year - a.year;
      if (sortBy === 'oldest') return a.year - b.year;
      if (sortBy === 'cited') return b.citations - a.citations;
      return 0;
    });
  }, [searchQuery, selectedDomain, selectedAuthorType, selectedYear, sortBy]);

  // Handle Submission Form Submit
  const handlePaperFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subTitle || !subAuthor || !subEmail || !subJournal) return;

    const newSubmission: PaperSubmission = {
      id: `sub-paper-${Date.now()}`,
      title: subTitle,
      primaryAuthor: subAuthor,
      authorEmail: subEmail,
      authorType: subType,
      domain: subDomain,
      journal: subJournal,
      abstract: subAbstract,
      status: 'under_review',
      timestamp: new Date().toISOString()
    };

    if (onPaperSubmitSuccess) {
      onPaperSubmitSuccess(newSubmission);
    }

    setSubSubmitSuccess(true);
    setTimeout(() => {
      setSubSubmitSuccess(false);
      setIsSubmitModalOpen(false);
      // Reset form
      setSubTitle('');
      setSubAuthor('');
      setSubEmail('');
      setSubJournal('');
      setSubAbstract('');
      setSubDoi('');
    }, 2000);
  };

  const handleOpenPaperDetail = (paper: ResearchPaper) => {
    navigate(`/research/${paper.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="research" className="pt-24 pb-16 bg-white min-h-screen">
      <div className="relative bg-[#110804] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#3a180a] overflow-hidden">
        {/* Sleek Grid Pattern with Orange Tint */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f06c2515_1px,transparent_1px),linear-gradient(to_bottom,#f06c2515_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        {/* Subtle top fade for the grid */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#110804] via-transparent to-transparent"></div>
        {/* Brand color ambient glow */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#f06c25] rounded-full blur-[120px] opacity-25 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#f06c25] transition-colors mb-6 group cursor-pointer"
          >
            {/* <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" /> */}
            {/* <span>Back to Main Portal</span> */}
          </Link>

          <div className="inline-flex items-center space-x-2 bg-[#f06c25] text-white text-[10px] sm:text-xs font-mono tracking-widest font-bold px-3 py-1 uppercase rounded-none mb-4">
            <Award className="w-3.5 h-3.5 text-white" />
            <span>120+ PAPERS PUBLISHED</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Research & Publications
          </h1>
          <p className="text-gray-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
            Explore peer-reviewed research papers, projects, and journal publications authored by the students and faculty of the IT Department at Dr. MCET.
          </p>
        </div>
      </div>

      {/* 2. Search & Toolbar Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white border border-[#E2E1DF] p-3 sm:p-4 shadow-md rounded-none flex flex-col gap-4">
          
          {/* Main Controls Row */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            
            {/* Search Input Bar */}
            <div className="relative flex-1 min-w-[280px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, or keyword..."
                className="w-full bg-[#F9F8F6] border border-[#E2E1DF] pl-10 pr-8 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#f06c25] transition-colors"
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

            {/* Domain Filter Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {domains.map((domain) => {
                const isSelected = selectedDomain === domain;
                return (
                  <button
                    key={domain}
                    onClick={() => setSelectedDomain(domain)}
                    className={`whitespace-nowrap text-xs font-semibold px-3 py-2 rounded-none transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#f06c25] text-white font-bold shadow-sm'
                        : 'bg-[#F2F0ED] text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {domain}
                  </button>
                );
              })}
            </div>

            {/* Segmented Author Type Toggle (All, Faculty, Student) */}
            <div className="flex items-center bg-[#F2F0ED] p-1 border border-[#E2E1DF]">
              {(['All', 'Faculty', 'Student'] as const).map((type) => {
                const active = selectedAuthorType === type;
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedAuthorType(type)}
                    className={`text-xs font-semibold px-3 py-1.5 transition-all cursor-pointer ${
                      active
                        ? 'bg-white text-gray-900 font-bold shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>

            {/* Sort & View Mode Switchers */}
            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F9F8F6] border border-[#E2E1DF] text-xs font-medium px-3 py-2 text-gray-800 focus:outline-none focus:border-[#f06c25] cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="cited">Most Cited</option>
                <option value="oldest">Oldest First</option>
              </select>

              <div className="flex items-center border border-[#E2E1DF] bg-[#F9F8F6] p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-white shadow-xs text-black' : 'text-gray-400 hover:text-gray-700'}`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-white shadow-xs text-black' : 'text-gray-400 hover:text-gray-700'}`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Active Filter Badges */}
          {(selectedDomain !== 'All Domains' || selectedAuthorType !== 'All' || searchQuery !== '') && (
            <div className="flex items-center space-x-2 pt-1 border-t border-gray-100 text-xs">
              <span className="text-gray-500 font-mono text-[11px] uppercase">Active Filters:</span>
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
                <span className="inline-flex items-center space-x-1 bg-gray-100 border border-gray-300 text-gray-800 px-2 py-0.5 font-medium">
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
          <div className="w-8 h-1 bg-[#f06c25]" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Featured & Most Cited
          </h2>
        </div>

        {/* Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPapers.map((paper) => {
            const isDark = paper.isDarkFeatured;
            const isBookmarked = bookmarkedIds.includes(paper.id);

            return (
              <div
                key={paper.id}
                onClick={() => handleOpenPaperDetail(paper)}
                className={`relative p-7 border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                  isDark
                    ? 'bg-[#1C1C1C] border-gray-800 text-white shadow-lg hover:border-gray-600'
                    : 'bg-white border-[#E2E1DF] text-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.02)] hover:border-gray-400 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Badge & Star */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 ${
                        paper.authorType === 'Student'
                          ? 'bg-[#f06c25] text-white'
                          : isDark
                          ? 'bg-gray-800 text-gray-200 border border-gray-700'
                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}
                    >
                      {paper.authorType}
                    </span>

                    {/* <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => toggleBookmark(paper.id, e)}
                        className={`p-1 transition-colors ${
                          isBookmarked
                            ? 'text-[#f06c25]'
                            : isDark
                            ? 'text-gray-500 hover:text-white'
                            : 'text-gray-400 hover:text-gray-700'
                        }`}
                        title={isBookmarked ? 'Bookmarked' : 'Bookmark paper'}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                      <Star className={`w-4 h-4 ${isDark ? 'text-amber-400 fill-amber-400' : 'text-[#f06c25] fill-[#f06c25]'}`} />
                    </div> */}
                  </div>

                  {/* Title */}
                  <h3 className={`font-display text-xl sm:text-2xl font-bold tracking-tight mb-3 line-clamp-3 leading-snug group-hover:text-[#f06c25] transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {paper.title}
                  </h3>

                  {/* Authors */}
                  <p className={`text-sm italic mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {paper.authors.join(', ')}
                  </p>
                </div>

                <div>
                  {/* Journal & Year */}
                  <div className={`pt-3 border-t flex justify-between items-center text-xs font-mono mb-4 ${isDark ? 'border-gray-800 text-gray-400' : 'border-gray-100 text-gray-500'}`}>
                    <span className="truncate max-w-[200px]">{paper.journal}</span>
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{paper.year}</span>
                  </div>

                  {/* Citations & Read More */}
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Citations: <strong className={isDark ? 'text-amber-400' : 'text-[#f06c25]'}>{paper.citations}</strong>
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenPaperDetail(paper);
                      }}
                      className={`inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                        isDark ? 'text-white hover:text-amber-300' : 'text-[#f06c25] hover:text-[#d65718]'
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
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 tracking-tight">
              All Publications
            </h2>
            <p className="text-xs text-gray-500 font-mono mt-0.5">
              Showing {filteredPapers.length} indexed papers
            </p>
          </div>
        </div>

        {filteredPapers.length === 0 ? (
          <div className="bg-[#F9F8F6] border border-dashed border-gray-300 p-12 text-center my-6">
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
              className="mt-4 inline-block bg-[#1C1C1C] text-white text-xs font-bold uppercase px-4 py-2"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPapers.map((paper) => {
              const isBookmarked = bookmarkedIds.includes(paper.id);
              return (
                <Link
                  key={paper.id}
                  to={`/research/${paper.id}`}
                  className="bg-white border border-[#E2E1DF] p-7 flex flex-col justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-gray-400 transition-all duration-300 group cursor-pointer"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                          paper.authorType === 'Faculty'
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : 'bg-orange-100 text-orange-900 border border-orange-200'
                        }`}
                      >
                        {paper.authorType}
                      </span>

                      {/* <button
                        onClick={(e) => toggleBookmark(paper.id, e)}
                        className={`p-1 transition-colors ${
                          isBookmarked ? 'text-[#f06c25]' : 'text-gray-300 hover:text-gray-600'
                        }`}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button> */}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg font-bold text-gray-900 tracking-tight mb-2 line-clamp-2 leading-snug group-hover:text-[#f06c25] transition-colors">
                      {paper.title}
                    </h3>

                    {/* Authors */}
                    <p className="text-xs text-gray-600 italic mb-4 line-clamp-1">
                      {paper.authors.join(', ')}
                    </p>
                  </div>

                  <div>
                    {/* Publisher & Year */}
                    <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs font-mono text-gray-500 mb-4">
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
                        className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-[#f06c25] hover:text-[#d65718] transition-colors cursor-pointer"
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
            {filteredPapers.map((paper) => {
              const isBookmarked = bookmarkedIds.includes(paper.id);
              return (
                <div
                  key={paper.id}
                  onClick={() => handleOpenPaperDetail(paper)}
                  className="bg-white border border-[#E2E1DF] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-gray-400 hover:shadow-sm transition-all cursor-pointer group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-1.5">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                          paper.authorType === 'Faculty'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-orange-100 text-orange-900'
                        }`}
                      >
                        {paper.authorType}
                      </span>
                      <span className="font-mono text-xs text-gray-500">
                        {paper.journal} • {paper.year}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-[#f06c25] transition-colors truncate">
                      {paper.title}
                    </h3>
                    <p className="text-xs text-gray-600 italic mt-0.5">
                      {paper.authors.join(', ')}
                    </p>
                  </div>

                  <div className="flex items-center space-x-6 self-end md:self-center">
                    <div className="text-right font-mono text-xs text-gray-600">
                      <strong>{paper.citations}</strong> Citations
                    </div>

                    <button
                      onClick={(e) => toggleBookmark(paper.id, e)}
                      className={`p-1.5 transition-colors ${
                        isBookmarked ? 'text-[#f06c25]' : 'text-gray-300 hover:text-gray-600'
                      }`}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenPaperDetail(paper);
                      }}
                      className="bg-[#1C1C1C] hover:bg-black text-white text-xs font-bold uppercase px-4 py-2 transition-all cursor-pointer"
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
        <div className="mt-12 text-center">
          <button
            onClick={() => alert("Showing all available database papers!")}
            className="border-2 border-gray-900 text-gray-900 font-bold text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-gray-900 hover:text-white transition-all duration-200 cursor-pointer"
          >
            Load More Publications
          </button>
          <p className="font-mono text-xs text-gray-500 mt-2">
            Showing {filteredPapers.length} of 120 papers
          </p>
        </div>
      </div>

      {/* 5. Submit Publication CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-[#f06c25] text-white p-8 sm:p-12 relative overflow-hidden shadow-xl border border-orange-600">
          
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
              onClick={() => setIsSubmitModalOpen(true)}
              className="bg-[#1C1C1C] hover:bg-black text-white px-8 py-4 font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Submit Your Publication
            </button>
          </div>

        </div>
      </div>

      {/* --- MODALS --- */}


      {/* B. Submit Paper Modal Form */}
      <AnimatePresence>
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white border border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 p-1"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center space-x-2 mb-2">
                <FileText className="w-5 h-5 text-[#f06c25]" />
                <h3 className="font-display text-2xl font-bold text-gray-900 tracking-tight">
                  Submit Research Publication
                </h3>
              </div>
              <p className="text-xs text-gray-600 mb-6">
                Submit your paper for review by the IT Research & Publications Committee.
              </p>

              {subSubmitSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 text-center text-emerald-800">
                  <Check className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-bold text-lg">Paper Submitted Successfully!</h4>
                  <p className="text-xs mt-1">Our review committee will verify your entry shortly.</p>
                </div>
              ) : (
                <form onSubmit={handlePaperFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                      Paper Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={subTitle}
                      onChange={(e) => setSubTitle(e.target.value)}
                      placeholder="e.g. Transformer Architectures for Edge Microservices"
                      className="w-full bg-[#F9F8F6] border border-[#E2E1DF] p-2.5 text-sm focus:outline-none focus:border-[#f06c25]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                        Primary Author Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={subAuthor}
                        onChange={(e) => setSubAuthor(e.target.value)}
                        placeholder="e.g. Dr. S. Priya"
                        className="w-full bg-[#F9F8F6] border border-[#E2E1DF] p-2.5 text-sm focus:outline-none focus:border-[#f06c25]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                        Author Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={subEmail}
                        onChange={(e) => setSubEmail(e.target.value)}
                        placeholder="author@drmcet.ac.in"
                        className="w-full bg-[#F9F8F6] border border-[#E2E1DF] p-2.5 text-sm focus:outline-none focus:border-[#f06c25]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                        Author Type
                      </label>
                      <select
                        value={subType}
                        onChange={(e) => setSubType(e.target.value as any)}
                        className="w-full bg-[#F9F8F6] border border-[#E2E1DF] p-2.5 text-sm focus:outline-none focus:border-[#f06c25]"
                      >
                        <option value="Faculty">Faculty</option>
                        <option value="Student">Student</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                        Research Domain
                      </label>
                      <select
                        value={subDomain}
                        onChange={(e) => setSubDomain(e.target.value)}
                        className="w-full bg-[#F9F8F6] border border-[#E2E1DF] p-2.5 text-sm focus:outline-none focus:border-[#f06c25]"
                      >
                        <option value="AI">AI / Machine Learning</option>
                        <option value="Networking">Networking / 6G</option>
                        <option value="IoT">IoT / Sensors</option>
                        <option value="Cloud">Cloud & Microservices</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                        Journal / Publisher *
                      </label>
                      <input
                        type="text"
                        required
                        value={subJournal}
                        onChange={(e) => setSubJournal(e.target.value)}
                        placeholder="e.g. IEEE / Springer"
                        className="w-full bg-[#F9F8F6] border border-[#E2E1DF] p-2.5 text-sm focus:outline-none focus:border-[#f06c25]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                      Paper Abstract *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={subAbstract}
                      onChange={(e) => setSubAbstract(e.target.value)}
                      placeholder="Brief summary of your research methodology, findings, and conclusions..."
                      className="w-full bg-[#F9F8F6] border border-[#E2E1DF] p-2.5 text-sm focus:outline-none focus:border-[#f06c25]"
                    />
                  </div>

                  <div className="pt-2 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsSubmitModalOpen(false)}
                      className="px-5 py-2.5 text-xs font-bold uppercase text-gray-600 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#f06c25] hover:bg-[#d65718] text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 shadow-sm transition-all"
                    >
                      Submit Paper
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
