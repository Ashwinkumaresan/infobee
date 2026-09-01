import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, User, FileText, LogOut, ChevronRight, ChevronLeft, Users, Download } from 'lucide-react';
import { API_URL } from '../../api';

export default function StaffProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState<any>(null);
  const [requestedPapers, setRequestedPapers] = useState<any[]>([]);

  // Dashboard state from URL
  const { tab } = useParams<{ tab: string }>();
  const activeTab = tab || null;
  const [searchQuery, setSearchQuery] = useState('');

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  const handleLogout = () => {
    document.cookie = 'access_token=; path=/; max-age=0';
    document.cookie = 'refresh_token=; path=/; max-age=0';
    localStorage.removeItem('user_role');
    navigate('/student/signin', { replace: true });
    window.location.reload();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getCookie('access_token');
      if (!token) {
        navigate('/student/signin'); // Reusing signin
        return;
      }

      try {
        const response = await fetch(`${API_URL}/staff/profile/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const apiData = await response.json();
          setProfileData({
            staffId: apiData.staff_id,
            name: apiData.name,
            designation: apiData.designation,
            collegeEmail: apiData.college_email || 'N/A',
            personalEmail: apiData.personal_email || 'N/A',
            ccDetails: apiData.cc_details || [],
            mentorDetails: apiData.mentor_details || { student_count: 0, paper_count: 0 }
          });

          setRequestedPapers(apiData.requested_papers || []);
        } else if (response.status === 401) {
          navigate('/student/signin');
        } else {
          setError('Failed to fetch profile.');
        }
      } catch (err) {
        setError('Connection error.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleStatusUpdate = async (e: React.MouseEvent, paperId: number, status: string) => {
    e.stopPropagation();
    const token = getCookie('access_token');
    if (!token) return;
    
    if (!window.confirm(`Are you sure you want to change the status to ${status}?`)) return;
    
    try {
      const res = await fetch(`${API_URL}/research/${paperId}/status/`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setRequestedPapers(prev => prev.filter(p => p.id !== paperId));
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbf9f8]">
        <Loader2 className="animate-spin h-12 w-12 text-[#f46b24]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbf9f8]">
        <div className="text-red-600 p-4 border border-red-300 bg-red-50 rounded-lg">{error}</div>
      </div>
    );
  }

  const defaultTab = profileData?.mentorDetails?.student_count > 0 ? 'mentees' : 'requests';
  const currentTab = activeTab || defaultTab;

  return (
    <div className="min-h-screen bg-[#fbf9f8] font-sans text-[#1b1c1c] flex flex-col md:flex-row">



      {/* Sidebar Navigation - Desktop Only */}
      <div className="hidden md:flex md:w-72 md:shrink-0 bg-white border-r border-[#e0c0b3] sticky top-0 h-screen flex-col justify-between overflow-y-auto">
        <div>
          {/* Profile Details in Sidebar */}
          <div className="p-6 border-b border-[#e0c0b3] bg-[#faf6f4] relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-[#f46b24]"></div>
            <div className="w-16 h-16 bg-[#1b1c1c] text-white font-bold flex items-center justify-center font-display text-xl mb-4">
              {profileData.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
            </div>
            <h2 className="text-xl font-bold font-display leading-tight">{profileData.name}</h2>
            <p className="text-[#f46b24] font-bold text-sm tracking-wider uppercase mt-1">{profileData.staffId}</p>
            <p className="text-xs text-[#594238] font-medium mt-1 uppercase tracking-wider">{profileData.designation}</p>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-2">
            <button
              onClick={() => navigate('/staff/profile/overview')}
              className={`w-full flex items-center justify-between p-3 font-bold uppercase tracking-wider text-sm transition-all ${currentTab === 'overview'
                  ? 'bg-[#f46b24] text-white'
                  : 'text-[#594238] hover:bg-[#f46b24]/10 hover:text-[#f46b24]'
                }`}
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4" />
                <span>Overview</span>
              </div>
              {currentTab === 'overview' && <ChevronRight className="w-4 h-4" />}
            </button>

            <button
              onClick={() => navigate('/staff/profile/requests')}
              className={`w-full flex items-center justify-between p-3 font-bold uppercase tracking-wider text-sm transition-all ${currentTab === 'requests'
                  ? 'bg-[#f46b24] text-white'
                  : 'text-[#594238] hover:bg-[#f46b24]/10 hover:text-[#f46b24]'
                }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Requested Papers</span>
              </div>
              {requestedPapers.length > 0 && (
                <span className={`px-2 py-0.5 text-xs ${currentTab === 'requests' ? 'bg-white text-[#f46b24]' : 'bg-[#f46b24] text-white'}`}>
                  {requestedPapers.length}
                </span>
              )}
            </button>

            {profileData?.mentorDetails?.student_count > 0 && (
              <button
                onClick={() => navigate('/staff/profile/mentees')}
                className={`w-full flex items-center justify-between p-3 font-bold uppercase tracking-wider text-sm transition-all ${currentTab === 'mentees'
                    ? 'bg-[#f46b24] text-white'
                    : 'text-[#594238] hover:bg-[#f46b24]/10 hover:text-[#f46b24]'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4" />
                  <span>My Mentees</span>
                </div>
                {currentTab === 'mentees' && <ChevronRight className="w-4 h-4" />}
              </button>
            )}

            {profileData?.ccDetails?.length > 0 && (
              <button
                onClick={() => navigate('/staff/profile/class_students')}
                className={`w-full flex items-center justify-between p-3 font-bold uppercase tracking-wider text-sm transition-all ${currentTab === 'class_students'
                    ? 'bg-[#f46b24] text-white'
                    : 'text-[#594238] hover:bg-[#f46b24]/10 hover:text-[#f46b24]'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4" />
                  <span>Class Students</span>
                </div>
                {currentTab === 'class_students' && <ChevronRight className="w-4 h-4" />}
              </button>
            )}
            
            <button
              onClick={() => navigate('/staff/export')}
              className={`w-full flex items-center justify-between p-3 font-bold uppercase tracking-wider text-sm transition-all text-[#594238] hover:bg-[#f46b24]/10 hover:text-[#f46b24]`}
            >
              <div className="flex items-center gap-3">
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </div>
            </button>
          </div>
        </div>

        {/* Logout at bottom of sidebar */}
        <div className="p-4 border-t border-[#e0c0b3]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-[#1b1c1c] text-white px-4 py-3 font-bold uppercase tracking-widest hover:bg-[#f46b24] transition-colors shadow-2xs"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 md:h-screen overflow-y-auto relative bg-[#faf6f4] md:bg-transparent">
        
        {/* Mobile Navigation Grid */}
        <div className={`md:hidden ${activeTab === null ? 'flex-1 flex flex-col justify-start p-6' : 'hidden'}`}>
          <div className="w-full mb-8 text-left border-b-2 border-[#1b1c1c] pb-6 relative">
            <div className="w-16 h-16 bg-[#1b1c1c] text-white font-bold flex items-center justify-center font-display text-xl mb-4 shadow-[4px_4px_0px_0px_rgba(244,107,36,1)]">
              {profileData?.name ? profileData.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2) : 'SM'}
            </div>
            <h2 className="text-2xl font-bold font-display leading-tight">{profileData?.name}</h2>
            <p className="text-[#f46b24] font-bold tracking-wider uppercase mt-1">{profileData?.staffId}</p>
            <p className="text-sm text-[#594238] font-medium mt-1 uppercase tracking-wider">{profileData?.designation}</p>
          </div>
          
          <div className="w-full grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/staff/profile/overview')} 
              className="p-6 border-2 bg-white text-[#594238] border-[#e0c0b3] hover:border-[#f46b24] hover:shadow-[4px_4px_0px_0px_rgba(244,107,36,0.2)] flex flex-col items-center justify-center gap-3 transition-all"
            >
              <User className="w-8 h-8" />
              <span className="text-xs font-bold uppercase tracking-wider">Overview</span>
            </button>
            
            <button 
              onClick={() => navigate('/staff/profile/requests')} 
              className="p-6 border-2 bg-white text-[#594238] border-[#e0c0b3] hover:border-[#f46b24] hover:shadow-[4px_4px_0px_0px_rgba(244,107,36,0.2)] flex flex-col items-center justify-center gap-3 transition-all"
            >
              <div className="relative">
                <FileText className="w-8 h-8" />
                {requestedPapers.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#f46b24] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                    {requestedPapers.length}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">Requests</span>
            </button>
            
            {profileData?.mentorDetails?.student_count > 0 && (
              <button 
                onClick={() => navigate('/staff/profile/mentees')} 
                className="p-6 border-2 bg-white text-[#594238] border-[#e0c0b3] hover:border-[#f46b24] hover:shadow-[4px_4px_0px_0px_rgba(244,107,36,0.2)] flex flex-col items-center justify-center gap-3 transition-all"
              >
                <Users className="w-8 h-8" />
                <span className="text-xs font-bold uppercase tracking-wider">Mentees</span>
              </button>
            )}
            
            {profileData?.ccDetails?.length > 0 && (
              <button 
                onClick={() => navigate('/staff/profile/class_students')} 
                className="p-6 border-2 bg-white text-[#594238] border-[#e0c0b3] hover:border-[#f46b24] hover:shadow-[4px_4px_0px_0px_rgba(244,107,36,0.2)] flex flex-col items-center justify-center gap-3 transition-all"
              >
                <Users className="w-8 h-8" />
                <span className="text-xs font-bold uppercase tracking-wider">Class</span>
              </button>
            )}
            
            <button 
              onClick={() => navigate('/staff/export')} 
              className="p-6 border-2 bg-white text-[#594238] border-[#e0c0b3] hover:border-[#f46b24] hover:shadow-[4px_4px_0px_0px_rgba(244,107,36,0.2)] flex flex-col items-center justify-center gap-3 transition-all col-span-2"
            >
              <Download className="w-8 h-8" />
              <span className="text-xs font-bold uppercase tracking-wider">Export Data</span>
            </button>
          </div>
          
          <div className="mt-8">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-[#1b1c1c] text-white px-4 py-4 font-bold uppercase tracking-widest hover:bg-[#f46b24] transition-colors shadow-[4px_4px_0px_0px_rgba(244,107,36,1)]"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        <div className={`flex-1 p-4 sm:p-6 md:p-10 lg:p-14 ${activeTab === null ? 'hidden md:block' : 'block'}`}>
          <div className="md:hidden mb-6">
            <button 
              onClick={() => navigate('/staff/profile')} 
              className="flex items-center gap-2 text-[#594238] hover:text-[#f46b24] font-bold uppercase tracking-wider text-xs transition-colors bg-white px-4 py-2 border border-[#e0c0b3] rounded shadow-sm inline-flex"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Menu
            </button>
          </div>
          
          <div className="max-w-5xl mx-auto">

          {currentTab === 'overview' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-display font-bold uppercase tracking-widest mb-8 border-b-2 border-[#1b1c1c] pb-4 inline-block">Staff Overview</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Contact Information */}
                <div className="bg-white border border-[#e0c0b3] p-4 sm:p-6 shadow-2xs">
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-4 text-[#f46b24]">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="font-mono text-[10px] uppercase text-[#8d7166] mb-1 block font-bold">College Email</label>
                      <p className="font-medium text-[#1b1c1c]">{profileData.collegeEmail}</p>
                    </div>
                    <div>
                      <label className="font-mono text-[10px] uppercase text-[#8d7166] mb-1 block font-bold">Personal Email</label>
                      <p className="font-medium text-[#1b1c1c]">{profileData.personalEmail}</p>
                    </div>
                  </div>
                </div>

                {/* Mentor Details */}
                <div className="bg-[#faf6f4] border border-[#e0c0b3] p-4 sm:p-6 shadow-2xs relative">
                  <div className="absolute right-0 top-0 w-16 h-16 bg-[#f46b24]/10 rounded-bl-full flex items-start justify-end p-3 pointer-events-none">
                    <User className="w-5 h-5 text-[#f46b24]" />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-4 text-[#1b1c1c]">Mentorship</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 border border-[#e0c0b3] text-center">
                      <p className="text-3xl font-display font-bold text-[#f46b24]">{profileData.mentorDetails.student_count}</p>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#8d7166] mt-1">Mentees</p>
                    </div>
                    <div className="bg-white p-4 border border-[#e0c0b3] text-center">
                      <p className="text-3xl font-display font-bold text-[#f46b24]">{profileData.mentorDetails.paper_count}</p>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#8d7166] mt-1">Publications</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CC Details */}
              {profileData.ccDetails && profileData.ccDetails.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-[#1b1c1c]"></span>
                    Class Coordinator Roles
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {profileData.ccDetails.map((cc: any, idx: number) => (
                      <div key={idx} className="bg-white border-2 border-[#1b1c1c] p-4 sm:p-6 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(27,28,28,1)] transition-all">
                        <div className="inline-block bg-[#1b1c1c] text-white px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4">
                          {cc.year_name} YEAR
                        </div>
                        <h4 className="text-xl font-display font-bold mb-4 border-b border-gray-100 pb-4">
                          IT - SECTION {cc.section_name}
                        </h4>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8d7166] mb-1">Students</p>
                            <p className="font-bold text-lg">{cc.student_count}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8d7166] mb-1">Papers</p>
                            <p className="font-bold text-lg text-[#f46b24]">{cc.paper_count}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentTab === 'requests' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b-2 border-[#1b1c1c]">
                <div>
                  <h2 className="text-3xl font-display font-bold uppercase tracking-widest mb-2">Paper Reviews</h2>
                  <p className="text-[#594238] text-sm">Review and approve research papers submitted by your students.</p>
                </div>
                <div className="mt-4 sm:mt-0 bg-[#f46b24] text-white px-4 py-2 font-bold text-sm tracking-wider uppercase inline-flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  {requestedPapers.length} Pending
                </div>
              </div>

              {requestedPapers.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-[#e0c0b3] p-12 text-center">
                  <FileText className="w-12 h-12 text-[#e0c0b3] mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">All Caught Up!</h3>
                  <p className="text-[#594238]">There are currently no research papers pending your review.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {requestedPapers.map((paper) => (
                    <div
                      key={paper.id}
                      className="bg-white border-2 border-[#e0c0b3] p-4 sm:p-6 hover:border-[#f46b24] hover:shadow-[4px_4px_0px_0px_rgba(244,107,36,0.2)] transition-all cursor-pointer group flex flex-col sm:flex-row justify-between sm:items-center gap-4"
                      onClick={() => navigate(`/research/${paper.id}`)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                            Under Review
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8d7166]">
                            {paper.domain}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-xl text-[#1b1c1c] mb-2 group-hover:text-[#f46b24] transition-colors leading-tight">
                          {paper.title}
                        </h3>
                        <p className="text-sm text-[#594238]">
                          Submitted by <span className="font-bold text-[#1b1c1c]">{paper.primary_author}</span>
                        </p>
                      </div>
                      <div className="shrink-0 flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
                        <button
                          onClick={(e) => handleStatusUpdate(e, paper.id, 'published')}
                          className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition-colors flex-1"
                        >
                          Approve
                        </button>
                        <button
                          onClick={(e) => handleStatusUpdate(e, paper.id, 'rejected')}
                          className="bg-red-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors flex-1"
                        >
                          Reject
                        </button>
                        <button className="bg-[#1b1c1c] text-white p-2 hover:bg-[#f46b24] transition-colors flex items-center justify-center flex-1 sm:flex-none">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentTab === 'mentees' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b-2 border-[#1b1c1c]">
                <h2 className="text-3xl font-display font-bold uppercase tracking-widest mb-2 sm:mb-0">My Mentees</h2>
                <div className="relative w-full sm:w-64">
                  <input 
                    type="text" 
                    placeholder="Search mentees..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-[#e0c0b3] px-4 py-2 text-sm focus:outline-none focus:border-[#f46b24] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {profileData?.mentorDetails?.students
                  ?.filter((s: any) => 
                    (s.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                    (s.register_number || '').toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((student: any) => (
                  <div
                    key={student.id}
                    onClick={() => navigate(`/staff/student/${student.register_number}`)}
                    className="bg-white border border-[#e0c0b3] p-4 flex items-center justify-between cursor-pointer hover:border-[#f46b24] hover:shadow-[4px_4px_0px_0px_rgba(244,107,36,0.15)] transition-all group"
                  >
                    <div>
                      <h3 className="font-bold text-lg">{student.name || 'Unnamed Student'}</h3>
                      <p className="text-[#8d7166] text-sm uppercase tracking-widest font-mono mt-1">{student.register_number}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#8d7166] group-hover:text-[#f46b24] group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
                {profileData?.mentorDetails?.students?.filter((s: any) => (s.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || (s.register_number || '').toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                  <div className="text-center py-8 text-[#8d7166]">No mentees found matching your search.</div>
                )}
              </div>
            </div>
          )}

          {currentTab === 'class_students' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b-2 border-[#1b1c1c]">
                <h2 className="text-3xl font-display font-bold uppercase tracking-widest mb-2 sm:mb-0">Class Students</h2>
                <div className="relative w-full sm:w-64">
                  <input 
                    type="text" 
                    placeholder="Search students..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-[#e0c0b3] px-4 py-2 text-sm focus:outline-none focus:border-[#f46b24] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-8">
                {profileData?.ccDetails?.map((cc: any, idx: number) => {
                  const filteredStudents = cc.students?.filter((s: any) => 
                    (s.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                    (s.register_number || '').toLowerCase().includes(searchQuery.toLowerCase())
                  ) || [];

                  return (
                    <div key={idx}>
                      <h3 className="text-xl font-bold uppercase tracking-wider mb-4 bg-[#1b1c1c] text-white inline-block px-4 py-2">
                        {cc.year_name} YEAR IT - {cc.section_name}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {filteredStudents.map((student: any) => (
                          <div
                            key={student.id}
                            onClick={() => navigate(`/staff/student/${student.register_number}`)}
                            className="bg-white border border-[#e0c0b3] p-4 flex items-center justify-between cursor-pointer hover:border-[#f46b24] hover:shadow-[4px_4px_0px_0px_rgba(244,107,36,0.15)] transition-all group"
                          >
                            <div>
                              <h4 className="font-bold">{student.name || 'Unnamed Student'}</h4>
                              <p className="text-[#8d7166] text-xs uppercase tracking-widest font-mono mt-1">{student.register_number}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-[#8d7166] group-hover:text-[#f46b24] group-hover:translate-x-1 transition-all" />
                          </div>
                        ))}
                      </div>
                      
                      {filteredStudents.length === 0 && (
                        <div className="text-center py-4 text-[#8d7166] text-sm italic">No students found in this class matching your search.</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
