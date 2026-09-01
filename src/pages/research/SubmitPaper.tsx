import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Trash2, ArrowLeft, Check, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_URL } from '../../api';

interface Author {
  name: string;
  email: string;
  roll_no: string;
  type: string;
}

export default function SubmitPaper() {
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Paper details
  const [title, setTitle] = useState('');
  const [journal, setJournal] = useState('');
  const [publisher, setPublisher] = useState('');
  const [domain, setDomain] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [abstract, setAbstract] = useState('');
  const [keywords, setKeywords] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isDownloadable, setIsDownloadable] = useState(false);
  
  // Authors
  const [authors, setAuthors] = useState<Author[]>([
    { name: '', email: '', roll_no: '', type: 'Student' }
  ]);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = '';

    const fetchProfile = async () => {
      const token = getCookie('access_token');
      if (!token) return;
      try {
        const response = await fetch(`${API_URL}/student/profile/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const apiData = await response.json();
          setAuthors(prev => {
            const newAuthors = [...prev];
            newAuthors[0] = {
              name: apiData.name || '',
              email: apiData.official_email || '',
              roll_no: apiData.register_number || '',
              type: 'Student'
            };
            return newAuthors;
          });
        }
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    };
    fetchProfile();
  }, []);

  const handleAddAuthor = () => {
    setAuthors([...authors, { name: '', email: '', roll_no: '', type: 'Student' }]);
  };

  const handleRemoveAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  const handleAuthorChange = (index: number, field: keyof Author, value: string) => {
    const newAuthors = [...authors];
    newAuthors[index] = { ...newAuthors[index], [field]: value };
    setAuthors(newAuthors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const token = getCookie('access_token');
    
    // The model uses primary_author, author_email, author_type for the first author,
    // and authors_list for the dynamic list.
    const primaryAuthor = authors[0] || { name: 'Unknown', email: '', type: 'Student' };
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('primary_author', primaryAuthor.name || 'Unknown');
    formData.append('author_email', primaryAuthor.email || '');
    formData.append('author_type', primaryAuthor.type || 'Student');
    formData.append('authors_list', JSON.stringify(authors));
    formData.append('domain', domain);
    formData.append('journal', journal);
    formData.append('publisher', publisher);
    formData.append('abstract', abstract);
    formData.append('keywords', keywords);
    formData.append('pdf_url', pdfUrl);
    formData.append('year', year.toString());
    formData.append('is_downloadable', isDownloadable.toString());
    if (pdfFile) {
      formData.append('pdf_file', pdfFile);
    }

    try {
      const response = await fetch(`${API_URL}/research/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      if (response.ok) {
        toast.success('Paper submitted successfully!');
        setSuccess(true);
      } else {
        const data = await response.json();
        toast.error(data.detail || 'Failed to submit paper.');
      }
    } catch (err) {
      toast.error('Connection error while submitting.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base font-sans text-[#1b1c1c] pb-20">
      <div className="bg-neutral-900 text-white pt-20 pb-8 sm:pt-24 sm:pb-12 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
          <button onClick={() => navigate('/research')} className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Back to Research</span>
          </button>
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-8 h-8 text-brand-orange" />
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Submit Publication
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl">
            Submit your research paper for review by the IT Research & Publications Committee.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mt-12">
        {success ? (
          <div className="bg-white border-2 border-emerald-500 p-12 text-center max-w-2xl mx-auto shadow-[8px_8px_0px_0px_rgba(27,28,28,0.1)]">
            <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="font-display text-3xl font-bold mb-4">Paper Submitted Successfully!</h2>
            <p className="text-gray-600 mb-8">
              Your research paper has been securely recorded and is currently <span className="font-bold text-gray-900">under review</span>.
              You will be notified once it is published on the portal.
            </p>
            <button
              onClick={() => navigate('/research')}
              className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-4 font-bold text-sm uppercase tracking-widest transition-all shadow-[4px_4px_0px_0px_rgba(27,28,28,0.1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(27,28,28,0.1)]"
            >
              Return to Research
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-[#e0c0b3] p-5 sm:p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(27,28,28,0.1)] max-w-4xl mx-auto space-y-10">

            {/* Basic Paper Info */}
            <div>
              <h3 className="font-display text-xl font-bold uppercase tracking-widest text-[#1b1c1c] mb-6 border-b border-[#e0c0b3] pb-2">Paper Details</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Paper Title *</label>
                  <input
                    type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Transformer Architectures for Edge Microservices"
                    className="w-full bg-base border border-[#e0c0b3] p-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Journal / Publisher *</label>
                    <input
                      type="text" required value={journal} onChange={(e) => setJournal(e.target.value)}
                      placeholder="e.g. IEEE / Springer"
                      className="w-full bg-base border border-[#e0c0b3] p-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Publisher Name (Optional)</label>
                    <input
                      type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)}
                      placeholder="e.g. IEEE Xplore"
                      className="w-full bg-base border border-[#e0c0b3] p-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Research Domain *
                  </label>
                  <input
                    type="text"
                    required
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="e.g. AI / Machine Learning"
                    className="w-full bg-base border border-neutral-200 p-3 text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Year *</label>
                    <input
                      type="number" required value={year} onChange={(e) => setYear(parseInt(e.target.value))}
                      className="w-full bg-base border border-[#e0c0b3] p-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Author List */}
            <div>
              <div className="flex justify-between items-end mb-6 border-b border-[#e0c0b3] pb-2">
                <h3 className="font-display text-xl font-bold uppercase tracking-widest text-[#1b1c1c]">Authors</h3>
                <button
                  type="button"
                  onClick={handleAddAuthor}
                  className="flex items-center space-x-1 text-brand-orange hover:text-brand-orange-hover font-bold text-xs uppercase tracking-wider"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Co-Author</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {authors.map((author, index) => (
                  <div key={index} className="border border-neutral-200 p-4 bg-base relative">
                    {authors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAuthor(index)}
                        className="absolute -top-3 -right-3 bg-white border border-neutral-200 text-gray-400 hover:text-red-500 rounded-full p-1.5 shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-2">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">Name</label>
                        <input
                          type="text" required value={author.name}
                          onChange={(e) => handleAuthorChange(index, 'name', e.target.value)}
                          className="w-full bg-white border border-[#e0c0b3] px-3 h-10 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">Roll No / Staff ID</label>
                        <input
                          type="text" value={author.roll_no}
                          onChange={(e) => handleAuthorChange(index, 'roll_no', e.target.value)}
                          className="w-full bg-white border border-[#e0c0b3] px-3 h-10 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">Email</label>
                        <input
                          type="email" required value={author.email}
                          onChange={(e) => handleAuthorChange(index, 'email', e.target.value)}
                          className="w-full bg-white border border-[#e0c0b3] px-3 h-10 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">Type</label>
                        <select
                          value={author.type}
                          onChange={(e) => handleAuthorChange(index, 'type', e.target.value)}
                          className="w-full bg-white border border-[#e0c0b3] px-3 h-10 text-sm"
                        >
                          <option value="Student">Student</option>
                          <option value="Faculty">Faculty</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <h3 className="font-display text-xl font-bold uppercase tracking-widest text-[#1b1c1c] mb-6 border-b border-[#e0c0b3] pb-2">Abstract & Links</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Paper Abstract *</label>
                  <textarea
                    rows={5} required value={abstract} onChange={(e) => setAbstract(e.target.value)}
                    placeholder="Brief summary of your research methodology, findings, and conclusions..."
                    className="w-full bg-base border border-[#e0c0b3] p-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Keywords (Optional)</label>
                  <input
                    type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g. Edge Computing, Transformers, 6G"
                    className="w-full bg-base border border-[#e0c0b3] p-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                  />
                  <p className="text-[10px] text-gray-500 mt-1 uppercase">Comma separated values</p>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Paper PDF Link (Optional)</label>
                  <input
                    type="url" value={pdfUrl} onChange={(e) => setPdfUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-base border border-[#e0c0b3] p-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Paper PDF File (Optional)</label>
                  <input
                    type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                    className="w-full bg-base border border-[#e0c0b3] p-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isDownloadable"
                    checked={isDownloadable}
                    onChange={(e) => setIsDownloadable(e.target.checked)}
                    className="w-4 h-4 text-brand-orange focus:ring-[#f06c25] border-[#e0c0b3] rounded-sm"
                  />
                  <label htmlFor="isDownloadable" className="text-sm font-bold uppercase text-gray-700">
                    Allow Public Download
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-neutral-900 hover:bg-black text-white w-full sm:w-auto justify-center px-6 sm:px-10 py-4 font-bold text-sm uppercase tracking-widest transition-all shadow-[4px_4px_0px_0px_#f06c25] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#f06c25] disabled:opacity-70 flex items-center space-x-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Publication</span>
                )}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
