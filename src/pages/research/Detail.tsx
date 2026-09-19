import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
import { ResearchPaper } from '../../types';
import { API_URL } from '../../api';

export default function Detail() {
  const { paperId } = useParams<{ paperId: string }>();
  const navigate = useNavigate();
  const [paper, setPaper] = useState<ResearchPaper | null>(null);
  const [relatedPapers, setRelatedPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(true);

  const [userRole, setUserRole] = useState<string | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<any | null>(null);
  const [authorProfileData, setAuthorProfileData] = useState<any | null>(null);
  const [authorProfileLoading, setAuthorProfileLoading] = useState(false);

  const openAuthorProfile = (author: any) => {
    if (!author.roll_no) return;
    setSelectedAuthor(author);
    setAuthorProfileLoading(true);
    fetch(`${API_URL}/research/author/${author.roll_no}/`)
      .then(res => res.json())
      .then(data => {
        setAuthorProfileData(data);
        setAuthorProfileLoading(false);
      })
      .catch(err => {
        console.error(err);
        setAuthorProfileLoading(false);
      });
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = '';
    setLoading(true);

    const getToken = () => {
      const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
      return match ? match[2] : null;
    };
    const token = getToken();

    // Check user role
    if (token) {
      fetch(`${API_URL}/user/me/`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => setUserRole(data.role))
        .catch(err => console.error(err));
    }


    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    fetch(`${API_URL}/research/${paperId}/`, { headers })
      .then(res => {
        if (!res.ok) throw new Error("Not Found");
        return res.json();
      })
      .then(data => {
        setPaper(data);
        setLoading(false);
        // Fetch related papers
        fetch(`${API_URL}/research/`)
          .then(res => res.json())
          .then(allPapers => {
            const related = allPapers
              .filter((p: ResearchPaper) => p.domain === data.domain && p.id !== data.id)
              .slice(0, 3);
            setRelatedPapers(related);
          })
          .catch(err => console.error(`Error fetching related papers:`, err));
      })
      .catch(err => {
        console.error(err);
        setPaper(null);
        setLoading(false);
      });
  }, [paperId]);
  
  const [copiedDoiId, setCopiedDoiId] = useState<string | null>(null);
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  
  // Auth & Actions
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  
  const [isSaved, setIsSaved] = useState(false);
  const [isCited, setIsCited] = useState(false);
  const [citeCount, setCiteCount] = useState(0);

  useEffect(() => {
    if (paper) {
      setIsSaved(paper.is_saved || false);
      setIsCited(paper.is_cited || false);
      setCiteCount(paper.citations || 0);
    }
  }, [paper]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    // Clear old data first
    document.cookie = 'access_token=; path=/; max-age=0';
    document.cookie = 'refresh_token=; path=/; max-age=0';
    localStorage.clear();
    sessionStorage.clear();

    try {
      const response = await fetch(`${API_URL}/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginEmail.split('@')[0].toUpperCase(), password: loginPassword }),
      });
      if (response.ok) {
        const data = await response.json();
        document.cookie = `access_token=${data.access}; path=/; max-age=86400`;
        setShowLoginModal(false);
        // Refresh paper data to get correct state
        window.location.reload();
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (err) {
      setLoginError('Server connection error.');
    } finally {
      setLoginLoading(false);
    }
  };

  const getToken = () => {
    const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
    return match ? match[2] : null;
  };

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>, url: string, title: string) => {
    e.preventDefault();
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      link.download = `${safeTitle}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error(`Download failed, opening in new tab instead`, err);
      window.open(url, '_blank');
    }
  };

  const handleAction = async (type: 'save' | 'cite') => {
    const token = getToken();
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    
    if (type === 'cite' && isCited) return; // Prevent multiple cites
    
    try {
      const res = await fetch(`${API_URL}/research/${paper?.id}/${type}/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        if (type === 'save') setIsSaved(data.is_saved);
        if (type === 'cite') {
          setIsCited(true);
          setCiteCount(data.citations);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusUpdate = async (status: string) => {
    const token = getToken();
    if (!token) return;
    
    if (!window.confirm(`Are you sure you want to change the status to ${status}?`)) return;
    
    try {
      const res = await fetch(`${API_URL}/research/${paper?.id}/status/`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setPaper(prev => prev ? { ...prev, status } : null);
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <section className="pt-24 pb-16 bg-base min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-4 w-40 bg-neutral-200 mb-8" />
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-2/3">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-6 w-20 bg-neutral-200" />
                  <div className="h-6 w-24 bg-neutral-200" />
                </div>
                <div className="h-12 w-full bg-neutral-200 mb-4" />
                <div className="h-12 w-3/4 bg-neutral-200 mb-8" />
                
                <div className="h-4 w-48 bg-neutral-200 mb-8" />
                <div className="space-y-3 mb-12">
                  <div className="h-4 w-full bg-neutral-200" />
                  <div className="h-4 w-full bg-neutral-200" />
                  <div className="h-4 w-full bg-neutral-200" />
                  <div className="h-4 w-3/4 bg-neutral-200" />
                </div>
              </div>
              <div className="lg:w-1/3 space-y-6">
                <div className="bg-white border border-neutral-200 p-8 h-72">
                  <div className="h-6 w-1/2 bg-neutral-200 mx-auto mb-8" />
                  <div className="h-12 w-full bg-neutral-200 mb-4" />
                  <div className="h-12 w-full bg-neutral-200" />
                </div>
                <div className="bg-white border border-neutral-200 p-8 h-48">
                  <div className="h-4 w-3/4 bg-neutral-200 mb-4" />
                  <div className="h-4 w-1/2 bg-neutral-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!paper) {
    return (
      <section className="pt-32 pb-16 min-h-screen text-center">
        <h2 className="text-2xl font-bold">Paper Not Found</h2>
        <Link to="/research" className="text-brand-orange hover:underline mt-4 inline-block">
          Return to Research Papers
        </Link>
      </section>
    );
  }



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
    const firstAuthorName = paper.authors[0]?.name || 'author';
    const firstAuthorLastName = firstAuthorName.split(' ').pop()?.toLowerCase() || 'author';
    const authorNames = paper.authors.map(a => a.name).join(' and ');
    return `@article{${firstAuthorLastName}${paper.year},
  title={${paper.title}},
  author={${authorNames}},
  journal={${paper.journal}},
  year={${paper.year}},
  publisher={${paper.publisher || 'Publisher'}}
}`;
  };

  return (
    <>
      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border-2 border-neutral-900 p-8 w-full max-w-sm shadow-brutal relative">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold text-xl leading-none cursor-pointer"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold font-display uppercase tracking-widest text-gray-900 mb-2">Login Required</h2>
            <p className="text-sm text-gray-600 mb-6">Please sign in to cite or save this research paper.</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && <p className="text-red-600 text-xs font-bold uppercase">{loginError}</p>}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-700 mb-1">College Email</label>
                <input 
                  type="email" 
                  className="w-full border-2 border-neutral-200 focus:border-brand-orange outline-none px-3 py-2 rounded-none text-sm"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-700 mb-1">Password</label>
                <input 
                  type="password" 
                  className="w-full border-2 border-neutral-200 focus:border-brand-orange outline-none px-3 py-2 rounded-none text-sm"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={loginLoading}
                className="w-full bg-brand-orange text-white font-bold uppercase tracking-widest text-xs py-3 hover:bg-brand-orange-hover transition-colors cursor-pointer"
              >
                {loginLoading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      )}

    <section id="research-detail" className="pt-24 pb-16 bg-base min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 mb-6 border-b border-neutral-200/80 gap-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-gray-500 uppercase tracking-wider overflow-x-auto">
            <Link to="/" className="hover:text-brand-orange transition-colors whitespace-nowrap">HOME</Link>
            <span>&gt;</span>
            <Link to="/research" className="hover:text-brand-orange transition-colors whitespace-nowrap">
              RESEARCH &amp; PUBLICATIONS
            </Link>
            <span>&gt;</span>
            <span className="text-brand-orange font-bold whitespace-nowrap">PAPER DETAIL</span>
          </div>

          <Link
            to="/research"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-orange hover:text-brand-orange-hover transition-colors self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Publications</span>
          </Link>
        </div>

        {/* Main Paper Display Card */}
        <div className="bg-white border border-neutral-200 p-4 sm:p-10 relative shadow-card">
          
          {/* Publication Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-neutral-100 text-gray-800 text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1">
              {paper.author_type.toUpperCase()} PUBLICATION
            </span>
            <span className="bg-orange-50 text-brand-orange-hover border border-orange-200 text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1">
              {paper.domain.toUpperCase()}
            </span>
            {paper.keywords?.[0] && (
              <span className="bg-orange-50 text-brand-orange-hover border border-orange-200 text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1">
                {paper.keywords[0].toUpperCase()}
              </span>
            )}
          </div>

          {/* Paper Title */}
          <h1 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight leading-snug mb-4 sm:mb-6 break-words">
            {paper.title}
          </h1>

          {/* Authors List with Avatars */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 mb-6 pb-6 border-b border-neutral-100">
            {paper.authors.map((author, index) => {
              const initials = author.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2);
              return (
                <div key={author.name} className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-neutral-900 text-white font-bold flex items-center justify-center font-display text-sm border border-neutral-200">
                    {initials}
                  </div>
                  <div>
                    <div className="font-display font-bold text-gray-900 text-sm tracking-tight uppercase flex items-center gap-2">
                      {author.name} 
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {author.description || 'Research Associate'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Bar */}
          <div className="bg-base-subtle border border-neutral-200 p-4 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row flex-wrap sm:items-center gap-3 w-full sm:w-auto">
              {paper.is_downloadable && (paper.pdf_file || paper.pdf_url) && (
                <a
                  href={paper.pdf_file || paper.pdf_url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => handleDownload(e, paper.pdf_file || paper.pdf_url || '', paper.title)}
                  className="inline-flex items-center justify-center space-x-2 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold uppercase tracking-widest px-5 py-3 shadow-card transition-all cursor-pointer w-full sm:w-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD PDF</span>
                </a>
              )}

              {paper.doi && (
                <button
                  onClick={() => copyToClipboard(`https://doi.org/${paper.doi}`, 'doi', paper.id)}
                  className="inline-flex items-center justify-center space-x-2 bg-white border border-neutral-200 hover:bg-neutral-50 text-gray-900 text-xs font-bold uppercase tracking-widest px-4 py-3 shadow-card transition-all cursor-pointer w-full sm:w-auto"
                >
                  <LinkIcon className="w-4 h-4 text-gray-600" />
                  <span>{copiedDoiId === paper.id ? 'DOI COPIED' : 'VIEW DOI'}</span>
                </button>
              )}

              <button
                onClick={() => {
                  copyToClipboard(generateBibtex(), 'bibtex');
                  handleAction('cite');
                }}
                disabled={isCited}
                className={`inline-flex items-center justify-center space-x-2 border text-xs font-bold uppercase tracking-widest px-4 py-3 shadow-card transition-all w-full sm:w-auto ${
                  isCited 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 cursor-default'
                    : 'bg-white border-neutral-200 hover:bg-neutral-50 text-gray-900 cursor-pointer'
                }`}
              >
                <Quote className="w-4 h-4" />
                <span>{copiedBibtex ? 'BIBTEX COPIED' : isCited ? 'CITED' : 'CITE THIS PAPER'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between sm:justify-start space-x-2 w-full sm:w-auto mt-2 sm:mt-0">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Paper URL copied to clipboard!');
                }}
                className="flex-1 sm:flex-none flex justify-center p-3 border border-neutral-200 bg-white hover:bg-neutral-100 text-gray-700 transition-colors cursor-pointer"
                title="Share paper"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleAction('save')}
                className={`flex-1 sm:flex-none flex justify-center p-3 border border-neutral-200 transition-colors cursor-pointer ${
                  isSaved ? 'bg-amber-50 text-brand-orange border-amber-200' : 'bg-white text-gray-700 hover:text-black hover:bg-neutral-50'
                }`}
                title={isSaved ? "Remove from Saved" : "Save paper"}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
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
                <div className="flex-1 h-px bg-neutral-200" />
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-6 font-sans">
                {paper.abstract}
              </p>

              {/* KEYWORDS */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono">
                <span className="font-bold text-gray-500 uppercase">KEYWORDS:</span>
                {paper.keywords?.map((kw) => (
                  <span
                    key={kw}
                    className="bg-neutral-100 border border-neutral-200 text-gray-800 px-3 py-1 font-sans text-xs"
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
                <div className="flex-1 h-px bg-neutral-200" />
              </div>

              <div className="border border-neutral-200 bg-base-subtle p-5 sm:p-12 text-center flex flex-col items-center justify-center relative">
                <div className="w-16 h-16 bg-neutral-100 border border-neutral-200 flex items-center justify-center text-brand-orange mb-4 shadow-card">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="font-display text-lg font-bold text-gray-900 mb-2">
                  Technical Documentation Preview
                </h3>
                
                {paper.is_downloadable && (paper.pdf_file || paper.pdf_url) ? (
                  <>
                    <p className="text-xs text-gray-600 max-w-md mx-auto mb-6 leading-relaxed">
                      The full technical manuscript is available for open access.
                    </p>
                    <a
                      href={paper.pdf_file || paper.pdf_url || '#'}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => handleDownload(e, paper.pdf_file || paper.pdf_url || '', paper.title)}
                      className="border-2 border-brand-orange bg-brand-orange text-white font-bold px-6 py-3 text-xs tracking-widest uppercase hover:bg-brand-orange-hover hover:border-brand-orange-hover transition-all cursor-pointer shadow-card"
                    >
                      DOWNLOAD FULL PAPER
                    </a>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-gray-600 max-w-md mx-auto mb-6 leading-relaxed">
                      The full technical manuscript is available for authenticated university members, faculty researchers, and institutional subscribers.
                    </p>
                    <button
                      onClick={() => alert('Access Request submitted to the Dr. MCET IT Research Committee!')}
                      className="border-2 border-brand-orange text-brand-orange font-bold px-6 py-3 text-xs tracking-widest uppercase hover:bg-brand-orange hover:text-white transition-all cursor-pointer shadow-card"
                    >
                      REQUEST FULL ACCESS
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* ABOUT AUTHORS */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <h2 className="font-display text-lg font-bold text-gray-900 tracking-wider uppercase">
                  ABOUT AUTHORS
                </h2>
                <div className="flex-1 h-px bg-neutral-200" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paper.authors.map((author, index) => {
                  const initials = author.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2);
                  return (
                    <div
                      key={author.name + index}
                      className="border border-neutral-200 bg-white p-5 flex items-start space-x-4 shadow-card"
                    >
                      <div className="w-12 h-12 bg-neutral-900 text-white font-bold flex items-center justify-center font-display text-sm shrink-0">
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-bold text-gray-900 text-sm tracking-tight truncate uppercase">
                          {author.name}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1 leading-normal line-clamp-2">
                          {author.description}
                        </p>
                        {author.roll_no && (
                          <button
                            onClick={() => openAuthorProfile(author)}
                            className="inline-flex items-center space-x-1 text-[11px] font-bold text-brand-orange uppercase tracking-wider mt-3 hover:underline cursor-pointer"
                          >
                            <span>VIEW PROFILE</span>
                            <span>→</span>
                          </button>
                        )}
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
            <div className="bg-white border border-neutral-200 p-6 shadow-card">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
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

                <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
                  <span className="text-gray-500 font-mono uppercase font-medium">YEAR</span>
                  <span className="font-bold text-gray-900">{paper.year}</span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
                  <span className="text-gray-500 font-mono uppercase font-medium">TYPE</span>
                  <span className="font-bold text-gray-900">Journal Article</span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
                  <span className="text-gray-500 font-mono uppercase font-medium">CITATIONS</span>
                  <span className="bg-brand-orange text-white px-2 py-0.5 font-mono text-xs font-bold">
                    {citeCount}
                  </span>
                </div>

                {paper.doi && (
                  <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
                    <span className="text-gray-500 font-mono uppercase font-medium">DOI</span>
                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-orange hover:underline font-mono font-bold text-[11px]"
                    >
                      {paper.doi}
                    </a>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
                  <span className="text-gray-500 font-mono uppercase font-medium">STATUS</span>
                  <span className="inline-flex items-center space-x-1.5 text-emerald-700 font-bold uppercase tracking-wider text-[11px]">
                    <span className={`w-2 h-2 rounded-none inline-block ${paper.status === 'published' ? 'bg-emerald-600' : paper.status === 'rejected' ? 'bg-red-600' : paper.status === 'under_review' ? 'bg-yellow-500' : 'bg-neutral-500'}`} />
                    <span>{paper.status?.replace('_', ' ') || 'Published'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* STAFF ACTIONS BOX */}
            {paper.can_approve && (
              <div className="bg-yellow-50 border border-yellow-200 p-6 shadow-card">
                <h3 className="font-display font-bold text-yellow-900 tracking-wider uppercase text-sm mb-4">
                  STAFF ACTIONS
                </h3>
                <p className="text-xs text-yellow-800 mb-4 font-medium">Current Status: <span className="font-bold uppercase">{paper.status?.replace('_', ' ')}</span></p>
                <div className="flex flex-col gap-2">
                  <button onClick={() => handleStatusUpdate('published')} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer">
                    Approve & Publish
                  </button>
                  <button onClick={() => handleStatusUpdate('unpublished')} className="w-full bg-neutral-600 hover:bg-neutral-700 text-white py-2 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer">
                    Unpublish
                  </button>
                  <button onClick={() => handleStatusUpdate('rejected')} className="w-full bg-red-600 hover:bg-red-700 text-white py-2 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer">
                    Reject
                  </button>
                </div>
              </div>
            )}

            {/* RELATED PAPERS BOX */}
            <div className="bg-base border border-neutral-200 p-6">
              <h3 className="font-display font-bold text-gray-900 tracking-wider uppercase text-sm mb-4">
                RELATED PAPERS
              </h3>

              <div className="space-y-4 divide-y divide-gray-200/80">
                {relatedPapers.length > 0 ? (
                  relatedPapers.map(rp => (
                    <Link
                      key={rp.id}
                      to={`/research/${rp.id}`}
                      className="block pt-4 first:pt-0 group cursor-pointer"
                    >
                      <h4 className="font-display font-bold text-gray-900 text-sm leading-snug group-hover:text-brand-orange transition-colors line-clamp-2 mb-1">
                        {rp.title}
                      </h4>
                      <p className="text-xs text-gray-600 italic line-clamp-1">
                        {rp.authors[0]?.name}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="text-xs text-gray-500 pt-2">No related papers found in this domain.</p>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>

    {/* AUTHOR PROFILE MODAL */}
    {selectedAuthor && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-base-subtle border border-neutral-200 w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="bg-neutral-900 text-white px-6 py-4 flex justify-between items-center shrink-0">
            <h2 className="font-display font-bold tracking-widest uppercase text-sm">Author Profile</h2>
            <button
              onClick={() => {
                setSelectedAuthor(null);
                setAuthorProfileData(null);
              }}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="p-6 overflow-y-auto">
            {/* Author Basic Info */}
            <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-neutral-200">
              <div className="w-16 h-16 bg-brand-orange text-white font-bold flex items-center justify-center font-display text-xl shrink-0">
                {selectedAuthor.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-gray-900 uppercase tracking-tight">
                  {selectedAuthor.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1 font-medium">{selectedAuthor.description}</p>
                <div className="mt-2 inline-block bg-neutral-200 text-gray-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                  {selectedAuthor.type}
                </div>
              </div>
            </div>

            {/* Authored Papers */}
            <div>
              <h4 className="font-display text-sm font-bold text-gray-900 tracking-widest uppercase mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-orange" />
                Other Publications
              </h4>
              
              {authorProfileLoading ? (
                <div className="text-sm text-gray-500 italic">Loading publications...</div>
              ) : authorProfileData?.papers?.length > 0 ? (
                <div className="space-y-3">
                  {authorProfileData.papers.map((p: any) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedAuthor(null);
                        navigate(`/research/${p.id}`);
                      }}
                      className="bg-white border border-neutral-200 p-4 hover:border-brand-orange hover:shadow-sm cursor-pointer transition-all group"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider">
                          {p.domain}
                        </span>
                        {p.status === 'unpublished' && (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-neutral-100 text-gray-600">
                            Internal
                          </span>
                        )}
                      </div>
                      <h5 className="font-display font-bold text-gray-900 text-sm group-hover:text-brand-orange transition-colors leading-tight mb-1">
                        {p.title}
                      </h5>
                      <p className="text-xs text-gray-500 italic line-clamp-1">
                        {p.authors.map((a: any) => a.name).join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-neutral-100 border border-dashed border-neutral-200 p-6 text-center">
                  <p className="text-sm text-gray-500">No other publications found for this author.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
