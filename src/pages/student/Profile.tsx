import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ExternalLink, Github, Linkedin, Code2, Terminal, FileText, Globe, Loader2, X, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_URL, BASE_URL } from '../../api';

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState('Personal & Family Info');
  const navigate = useNavigate();

  const tabs = [
    'Personal & Family Info',
    'Education History',
    'Academic Performance',
    'Coding & Links',
    'Research Papers'
  ];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState<any>(null);
  const [stats, setStats] = useState({
    githubRepos: "N/A",
    leetcodeSolved: "N/A",
    hackerrankBadges: "N/A",
    hackerearthCount: "N/A"
  });

  // Modal State
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [isSendingUpdate, setIsSendingUpdate] = useState(false);

  // Read cookie helper
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
    toast.success('Logged out successfully');
    navigate('/');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getCookie('access_token');
      if (!token) {
        navigate('/student/signin');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/student/profile/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const apiData = await response.json();
          
          // Map backend snake_case to frontend camelCase
          const mappedData = {
            // 1. Personal Info
            registerNumber: apiData.register_number || "N/A",
            name: apiData.name || "N/A",
            year: apiData.student_class_details?.year_name || "N/A",
            section: apiData.student_class_details?.section_name || "N/A",
            gender: apiData.gender || "N/A",
            ccName: apiData.student_class_details?.class_coordinator_name || "N/A",
            mentorName: apiData.mentor_name || "N/A",
            mobileNumber: apiData.mobile_number || "N/A",
            personalEmail: apiData.personal_email || "N/A",
            officialEmail: apiData.official_email || "N/A",
            
            // Parents & Address
            fatherName: apiData.father_name || "N/A",
            fatherOccupation: apiData.father_occupation || "N/A",
            fatherMobile: apiData.father_mobile || "N/A",
            motherName: apiData.mother_name || "N/A",
            motherOccupation: apiData.mother_occupation || "N/A",
            motherMobile: apiData.mother_mobile || "N/A",
            nativeLocation: apiData.native_location || "N/A",
            communicationAddress: apiData.communication_address || "N/A",
            permanentAddress: apiData.permanent_address || "N/A",
          
            // 2. Education History
            school10th: apiData.school_10th || "N/A",
            board10th: apiData.board_10th || "N/A",
            mark10th: apiData.mark_10th || "N/A",
            percentage10th: apiData.percentage_10th || "N/A",
            school12th: apiData.school_12th || "N/A",
            board12th: apiData.board_12th || "N/A",
            mark12th: apiData.mark_12th || "N/A",
            percentage12th: apiData.percentage_12th || "N/A",
            polytechnicName: apiData.polytechnic_name || "N/A",
            polytechnicDept: apiData.polytechnic_dept || "N/A",
            diplomaPercentage: apiData.diploma_percentage || "N/A",
            educationalGap: apiData.educational_gap || "N/A",
          
            // 3. Academic Performance
            sgpa: {
              sem1: apiData.sem1_sgpa || "N/A", 
              sem2: apiData.sem2_sgpa || "N/A", 
              sem3: apiData.sem3_sgpa || "N/A", 
              sem4: apiData.sem4_sgpa || "N/A",
              sem5: apiData.sem5_sgpa || "N/A", 
              sem6: apiData.sem6_sgpa || "N/A", 
              sem7: apiData.sem7_sgpa || "N/A", 
              sem8: apiData.sem8_sgpa || "N/A"
            },
            cgpa: apiData.cgpa || "N/A",
            currentArrears: apiData.current_arrears || "0",
            historyOfArrears: apiData.history_of_arrears || "0",
          
            // 4. Coding & Links
            linkedinId: apiData.linkedin_id || "",
            githubId: apiData.github_id || "",
            leetcodeId: apiData.leetcode_id || "",
            hackerrankId: apiData.hackerrank_id || "",
            hackerearthId: apiData.hackerearth_id || "",
            portfolioLink: apiData.portfolio_link || "",
            resumeLink: apiData.resume_file || "",

            // 5. Research Papers
            authoredPapers: apiData.authored_papers || [],
            savedPapers: apiData.saved_papers || [],
            citedPapers: apiData.cited_papers || []
          };
          setProfileData(mappedData);
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

    const fetchStats = async () => {
      const token = getCookie('access_token');
      if (!token) return;
      try {
        const response = await fetch(`${API_URL}/student/profile/stats/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const statsData = await response.json();
          setStats({
            githubRepos: statsData.github_repos,
            leetcodeSolved: statsData.leetcode_solved,
            hackerrankBadges: statsData.hackerrank_badges,
            hackerearthCount: statsData.hackerearth_count
          });
        }
      } catch (err) {
        console.error(`Failed to fetch stats:`, err);
      }
    };

    fetchProfile();
    fetchStats();
  }, [navigate]);

  const handleSendUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateMessage.trim()) return;
    
    setIsSendingUpdate(true);
    
    try {
      const token = getCookie('access_token');
      const res = await fetch(`${API_URL}/student/request-update/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: updateMessage })
      });
      
      const data = await res.json();
      if (res.ok) {
        toast.success('Update request sent successfully!');
        setIsUpdateModalOpen(false);
        setUpdateMessage('');
      } else {
        toast.error(data.detail || 'Failed to send update request.');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSendingUpdate(false);
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

  const data = profileData;

  // Helper component for formatting external links
  const formatUrl = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    if (url.startsWith('/')) {
      // It`s a media or static file path
      return `${BASE_URL}${url}`;
    }
    return `https://${url}`;
  };

  // Helper component for fields
  const Field = ({ label, value }: { label: string, value: string }) => (
    <div className="border-b border-[#e0c0b3] pb-4">
      <label className="font-[`JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] mb-1 block">{label}</label>
      <p className="font-sans text-lg text-[#1b1c1c] font-medium break-words">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fbf9f8] font-sans text-[#1b1c1c]">
      <style>{`
        .block-shadow {
            box-shadow: 4px 4px 0px 0px rgba(27, 28, 28, 0.1);
        }
        .active-tab-indicator {
            height: 4px;
            background-color: #f46b24;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
        }
      `}</style>
      
      {/* Student Hero Banner Section */}
      <section className="bg-[#f5f3f3] pt-12 pb-6 border-b border-[#e0c0b3] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Basic Info */}
              <div className="space-y-1">
                <h1 className="font-sans text-3xl font-bold tracking-tight text-[#1b1c1c]">{data.name}</h1>
                <p className="font-['JetBrains_Mono',_monospace] text-[#f46b24] font-medium tracking-wider">REG NO: {data.registerNumber} • YR: {data.year} • SEC: {data.section}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="bg-[#e4e2e2] px-3 py-1 font-['JetBrains_Mono',_monospace] text-xs uppercase border border-[#e0c0b3]">B.Tech IT</span>
                  <span className="bg-[#e4e2e2] px-3 py-1 font-['JetBrains_Mono',_monospace] text-xs uppercase border border-[#e0c0b3]">CGPA: {data.cgpa}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
              <button 
                onClick={() => setIsUpdateModalOpen(true)}
                className="bg-[#f46b24] text-white px-6 py-3 font-sans text-sm uppercase tracking-widest block-shadow hover:bg-[#d55a1e] transition-colors whitespace-nowrap"
              >
                Request Update
              </button>
              <button 
                onClick={handleLogout}
                className="bg-[#1b1c1c] text-white px-6 py-3 font-sans text-sm uppercase tracking-widest block-shadow hover:bg-[#333] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Tabs - Sticky */}
      <div className="sticky top-0 z-40 bg-[#f5f3f3] border-b border-[#e0c0b3] shadow-sm">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <nav className="flex overflow-x-auto no-scrollbar pt-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-4 font-sans text-xs md:text-sm uppercase tracking-widest whitespace-nowrap transition-colors ${
                    isActive ? 'text-[#f46b24] font-bold' : 'text-[#594238] hover:text-[#f46b24]'
                  }`}
                >
                  {tab}
                  {isActive && <div className="active-tab-indicator"></div>}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-12">
        
        {/* TAB 1: Personal & Family Info */}
        {activeTab === 'Personal & Family Info' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Info Card */}
            <div className="bg-white border border-[#e0c0b3] p-8 block-shadow relative">
              <div className="absolute left-0 top-0 w-1.5 h-16 bg-[#f46b24]"></div>
              <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-[#1b1c1c] mb-6">Student Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Register Number" value={data.registerNumber} />
                <Field label="Name of the Student" value={data.name} />
                <Field label="Year" value={data.year} />
                <Field label="Section" value={data.section} />
                <Field label="Gender" value={data.gender} />
                <Field label="CC Name" value={data.ccName} />
                <div className="md:col-span-2">
                  <Field label="Mentor Name" value={data.mentorName} />
                </div>
                <div className="md:col-span-2">
                  <Field label="Student Mobile Number" value={data.mobileNumber} />
                </div>
                <div className="md:col-span-2">
                  <Field label="Student Personal Email ID" value={data.personalEmail} />
                </div>
                <div className="md:col-span-2">
                  <Field label="Student Official Email ID" value={data.officialEmail} />
                </div>
              </div>
            </div>

            {/* Parent & Address Card */}
            <div className="bg-white border border-[#e0c0b3] p-8 block-shadow relative">
              <div className="absolute left-0 top-0 w-1.5 h-16 bg-[#276483]"></div>
              <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-[#1b1c1c] mb-6">Family &amp; Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 bg-[#f5f3f3] p-4 border border-[#e0c0b3]">
                  <h3 className="font-bold uppercase text-sm mb-3">Father's Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Name" value={data.fatherName} />
                    <Field label="Occupation" value={data.fatherOccupation} />
                    <div className="sm:col-span-2">
                      <Field label="Mobile Number" value={data.fatherMobile} />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 bg-[#f5f3f3] p-4 border border-[#e0c0b3]">
                  <h3 className="font-bold uppercase text-sm mb-3">Mother's Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Name" value={data.motherName} />
                    <Field label="Occupation" value={data.motherOccupation} />
                    <div className="sm:col-span-2">
                      <Field label="Mobile Number" value={data.motherMobile} />
                    </div>
                  </div>
                </div>
                
                <Field label="Native Location" value={data.nativeLocation} />
                
                <div className="md:col-span-2">
                  <Field label="Communication Address" value={data.communicationAddress} />
                </div>
                <div className="md:col-span-2">
                  <Field label="Permanent Address" value={data.permanentAddress} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Education History */}
        {activeTab === 'Education History' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-[#e0c0b3] p-8 block-shadow">
              <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-[#1b1c1c] mb-6 border-b border-[#e0c0b3] pb-2">10th Grade (X)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <Field label="Name of the School" value={data.school10th} />
                </div>
                <Field label="Board of Studies" value={data.board10th} />
                <Field label="Mark Secured" value={data.mark10th} />
                <Field label="Percentage" value={data.percentage10th} />
              </div>
            </div>

            <div className="bg-white border border-[#e0c0b3] p-8 block-shadow">
              <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-[#1b1c1c] mb-6 border-b border-[#e0c0b3] pb-2">12th Grade (XII)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <Field label="Name of the School" value={data.school12th} />
                </div>
                <Field label="Board of Studies" value={data.board12th} />
                <Field label="Mark Secured" value={data.mark12th} />
                <Field label="Percentage" value={data.percentage12th} />
              </div>
            </div>

            <div className="bg-white border border-[#e0c0b3] p-8 block-shadow">
              <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-[#1b1c1c] mb-6 border-b border-[#e0c0b3] pb-2">Diploma / Polytechnic</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <Field label="Name of the Polytechnic" value={data.polytechnicName} />
                </div>
                <Field label="Department" value={data.polytechnicDept} />
                <Field label="Percentage" value={data.diplomaPercentage} />
              </div>
            </div>

            <div className="bg-[#f0f6fa] border border-[#e0c0b3] p-8 block-shadow">
              <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-[#1b1c1c] mb-6 border-b border-[#e0c0b3] pb-2">Other Details</h2>
              <Field label="Educational Gap (If any)" value={data.educationalGap} />
            </div>
          </div>
        )}

        {/* TAB 3: Academic Performance */}
        {activeTab === 'Academic Performance' && (
          <div className="space-y-8">
            <div className="bg-white border border-[#e0c0b3] p-8 block-shadow">
              <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-[#1b1c1c] mb-8">Semester-wise SGPA</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {Object.entries(data.sgpa).map(([sem, score], idx) => (
                  <div key={sem} className="bg-[#f5f3f3] p-4 border border-[#e0c0b3] text-center">
                    <span className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] block mb-2">Sem {idx + 1} SGPA</span>
                    <span className="text-2xl font-sans font-bold text-[#1b1c1c]">{score}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#ffffff] border border-[#f46b24] p-8 block-shadow text-center">
                <span className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#f46b24] block mb-2">UG (CGPA)</span>
                <span className="text-5xl font-sans font-bold text-[#1b1c1c]">{data.cgpa}</span>
              </div>
              <div className="bg-[#ffffff] border border-[#e0c0b3] p-8 block-shadow text-center">
                <span className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] block mb-2">Current Arrears</span>
                <span className="text-5xl font-sans font-bold text-[#1b1c1c]">{data.currentArrears}</span>
              </div>
              <div className="bg-[#ffffff] border border-[#e0c0b3] p-8 block-shadow text-center">
                <span className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] block mb-2">History of Arrears</span>
                <span className="text-5xl font-sans font-bold text-[#1b1c1c]">{data.historyOfArrears}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Coding & Links */}
        {activeTab === 'Coding & Links' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-[#e0c0b3] p-8 block-shadow relative">
              <div className="absolute left-0 top-0 w-1.5 h-16 bg-[#276483]"></div>
              <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-[#1b1c1c] mb-6 flex items-center gap-3">
                <Terminal className="w-6 h-6 text-[#276483]" />
                Coding Profiles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href={formatUrl(data.githubId)} target="_blank" rel="noopener noreferrer" className="group bg-[#f5f3f3] border border-[#e0c0b3] p-4 flex flex-col gap-2 hover:border-[#f46b24] hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2 text-[#8d7166] group-hover:text-[#f46b24] transition-colors">
                    <Github className="w-5 h-5" />
                    <span className="font-['JetBrains_Mono',_monospace] text-xs uppercase font-bold">GitHub</span>
                  </div>
                  <span className="font-sans text-sm text-[#1b1c1c] font-medium break-all">{data.githubId}</span>
                </a>

                <a href={formatUrl(data.leetcodeId)} target="_blank" rel="noopener noreferrer" className="group bg-[#f5f3f3] border border-[#e0c0b3] p-4 flex flex-col gap-2 hover:border-[#f46b24] hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2 text-[#8d7166] group-hover:text-[#f46b24] transition-colors">
                    <Code2 className="w-5 h-5" />
                    <span className="font-['JetBrains_Mono',_monospace] text-xs uppercase font-bold">LeetCode</span>
                  </div>
                  <span className="font-sans text-sm text-[#1b1c1c] font-medium break-all">{data.leetcodeId}</span>
                </a>

                <a href={formatUrl(data.hackerrankId)} target="_blank" rel="noopener noreferrer" className="group bg-[#f5f3f3] border border-[#e0c0b3] p-4 flex flex-col gap-2 hover:border-[#f46b24] hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2 text-[#8d7166] group-hover:text-[#f46b24] transition-colors">
                    <Terminal className="w-5 h-5" />
                    <span className="font-['JetBrains_Mono',_monospace] text-xs uppercase font-bold">HackerRank</span>
                  </div>
                  <span className="font-sans text-sm text-[#1b1c1c] font-medium break-all">{data.hackerrankId}</span>
                </a>

                <a href={formatUrl(data.hackerearthId)} target="_blank" rel="noopener noreferrer" className="group bg-[#f5f3f3] border border-[#e0c0b3] p-4 flex flex-col gap-2 hover:border-[#f46b24] hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2 text-[#8d7166] group-hover:text-[#f46b24] transition-colors">
                    <Code2 className="w-5 h-5" />
                    <span className="font-['JetBrains_Mono',_monospace] text-xs uppercase font-bold">HackerEarth</span>
                  </div>
                  <span className="font-sans text-sm text-[#1b1c1c] font-medium break-all">{data.hackerearthId}</span>
                </a>
              </div>
            </div>

            <div className="bg-white border border-[#e0c0b3] p-8 block-shadow relative">
              <div className="absolute left-0 top-0 w-1.5 h-16 bg-[#f46b24]"></div>
              <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-[#1b1c1c] mb-6 flex items-center gap-3">
                <Globe className="w-6 h-6 text-[#f46b24]" />
                Professional Links
              </h2>
              <div className="flex flex-col gap-4">
                <a href={formatUrl(data.linkedinId)} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between bg-[#f5f3f3] border border-[#e0c0b3] p-4 hover:border-[#276483] hover:shadow-sm transition-all">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#276483] text-white p-2 rounded-sm">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] font-bold">LinkedIn</span>
                      <span className="font-sans text-sm text-[#1b1c1c] font-medium break-all">{data.linkedinId}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-[#8d7166] group-hover:text-[#276483] transition-colors" />
                </a>

                <a href={formatUrl(data.portfolioLink)} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between bg-[#f5f3f3] border border-[#e0c0b3] p-4 hover:border-[#f46b24] hover:shadow-sm transition-all">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#f46b24] text-white p-2 rounded-sm">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] font-bold">Portfolio Website</span>
                      <span className="font-sans text-sm text-[#1b1c1c] font-medium break-all">{data.portfolioLink}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-[#8d7166] group-hover:text-[#f46b24] transition-colors" />
                </a>

                <a href={formatUrl(data.resumeLink)} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between bg-[#f5f3f3] border border-[#e0c0b3] p-4 hover:border-[#1b1c1c] hover:shadow-sm transition-all">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#1b1c1c] text-white p-2 rounded-sm">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] font-bold">Resume / CV</span>
                      <span className="font-sans text-sm text-[#1b1c1c] font-medium break-all line-clamp-1">{data.resumeLink}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-[#8d7166] group-hover:text-[#1b1c1c] transition-colors" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-2 bg-[#f0f6fa] border border-[#e0c0b3] p-8 block-shadow relative">
              <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-[#1b1c1c] mb-6 border-b border-[#e0c0b3] pb-2">
                Live Stats
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div className="bg-white border border-[#e0c0b3] p-6 text-center shadow-sm">
                  <span className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] block mb-2">GitHub Repos</span>
                  <span className="text-4xl font-sans font-bold text-[#1b1c1c]">{stats.githubRepos}</span>
                </div>
                <div className="bg-white border border-[#e0c0b3] p-6 text-center shadow-sm">
                  <span className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] block mb-2">LeetCode Solved</span>
                  <span className="text-4xl font-sans font-bold text-[#f46b24]">{stats.leetcodeSolved}</span>
                </div>
                <div className="bg-white border border-[#e0c0b3] p-6 text-center shadow-sm">
                  <span className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] block mb-2">HackerRank Badges</span>
                  <span className="text-4xl font-sans font-bold text-[#276483]">{stats.hackerrankBadges}</span>
                </div>
                <div className="bg-white border border-[#e0c0b3] p-6 text-center shadow-sm">
                  <span className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] block mb-2">HackerEarth Count</span>
                  <span className="text-4xl font-sans font-bold text-[#f46b24]">{stats.hackerearthCount}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Research Papers */}
        {activeTab === 'Research Papers' && (
          <div className="space-y-8">
            
            {/* Authored Papers (Published) */}
            <div className="bg-white border border-[#e0c0b3] p-8 block-shadow relative">
              <div className="absolute left-0 top-0 w-1.5 h-16 bg-[#f46b24]"></div>
              <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-[#1b1c1c] mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#f46b24]" />
                My Publications
              </h2>
              {data.authoredPapers?.filter((p: any) => p.status === 'published' || p.status === 'unpublished').length > 0 ? (
                <div className="grid gap-4">
                  {data.authoredPapers.filter((p: any) => p.status === 'published' || p.status === 'unpublished').map((paper: any) => (
                    <Link key={paper.id} to={`/research/${paper.id}`} className="block border border-[#e0c0b3] p-4 bg-[#f5f3f3] hover:border-[#f46b24] transition-colors relative">
                      {paper.status === 'unpublished' && (
                        <span className="absolute top-4 right-4 bg-gray-200 text-gray-700 text-[9px] font-bold px-2 py-1 uppercase tracking-wider">
                          Internal
                        </span>
                      )}
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#f46b24] mb-1">{paper.domain}</div>
                      <h3 className="font-bold text-[#1b1c1c] text-lg leading-snug mb-1">{paper.title}</h3>
                      <p className="text-sm text-[#8d7166]">{paper.authors.map((a: any) => a.name).join(', ')}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#8d7166]">No published publications found for this profile.</p>
              )}
            </div>

            {/* Submission Requested (Under Review) */}
            <div className="bg-white border border-[#e0c0b3] p-8 block-shadow relative">
              <div className="absolute left-0 top-0 w-1.5 h-16 bg-[#276483]"></div>
              <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-[#1b1c1c] mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#276483]" />
                Submission Requested
              </h2>
              {data.authoredPapers?.filter((p: any) => p.status === 'under_review').length > 0 ? (
                <div className="grid gap-4">
                  {data.authoredPapers.filter((p: any) => p.status === 'under_review').map((paper: any) => (
                    <Link key={paper.id} to={`/research/${paper.id}`} className="block border border-[#e0c0b3] p-4 bg-[#f9f8f6] hover:border-[#276483] transition-colors relative">
                      <span className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                        Under Review
                      </span>
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#276483] mb-1">{paper.domain}</div>
                      <h3 className="font-bold text-[#1b1c1c] text-lg leading-snug mb-1 pr-24">{paper.title}</h3>
                      <p className="text-sm text-[#8d7166]">{paper.authors.map((a: any) => a.name).join(', ')}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#8d7166]">No pending submissions.</p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Saved Papers */}
              <div className="bg-white border border-[#e0c0b3] p-8 block-shadow relative">
                <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-[#1b1c1c] mb-6 border-b border-[#e0c0b3] pb-2">
                  Saved Papers
                </h2>
                {data.savedPapers?.length > 0 ? (
                  <div className="grid gap-3">
                    {data.savedPapers.map((paper: any) => (
                      <Link key={paper.id} to={`/research/${paper.id}`} className="block border border-[#e0c0b3] p-3 bg-[#f5f3f3] hover:border-[#f46b24] transition-colors">
                        <h3 className="font-bold text-[#1b1c1c] text-sm leading-snug mb-1 line-clamp-2">{paper.title}</h3>
                        <p className="text-xs text-[#8d7166] line-clamp-1">{paper.authors.map(a => a.name).join(', ')}</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#8d7166]">No saved papers.</p>
                )}
              </div>

              {/* Cited Papers */}
              <div className="bg-white border border-[#e0c0b3] p-8 block-shadow relative">
                <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-[#1b1c1c] mb-6 border-b border-[#e0c0b3] pb-2">
                  Cited Papers
                </h2>
                {data.citedPapers?.length > 0 ? (
                  <div className="grid gap-3">
                    {data.citedPapers.map((paper: any) => (
                      <Link key={paper.id} to={`/research/${paper.id}`} className="block border border-[#e0c0b3] p-3 bg-[#f5f3f3] hover:border-[#f46b24] transition-colors">
                        <h3 className="font-bold text-[#1b1c1c] text-sm leading-snug mb-1 line-clamp-2">{paper.title}</h3>
                        <p className="text-xs text-[#8d7166] line-clamp-1">{paper.authors.map(a => a.name).join(', ')}</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#8d7166]">No cited papers.</p>
                )}
              </div>
            </div>

          </div>
        )}
      </section>

      {/* Update Request Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#fbf9f8] w-full max-w-lg block-shadow border border-[#e0c0b3] relative overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-[#1b1c1c] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-sans font-bold tracking-widest uppercase text-sm">Request Profile Update</h3>
              <button 
                onClick={() => !isSendingUpdate && setIsUpdateModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                disabled={isSendingUpdate}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 md:p-8">
              <p className="font-['JetBrains_Mono',_monospace] text-sm text-[#594238] mb-6">
                Please describe the details you want to update in your profile. An email will be sent to the association staff.
              </p>
              
              <form onSubmit={handleSendUpdate}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold tracking-widest text-[#1b1c1c] uppercase mb-2">Details to Update</label>
                    <textarea
                      value={updateMessage}
                      onChange={(e) => setUpdateMessage(e.target.value)}
                      required
                      placeholder="E.g., I want to update my mobile number to 9876543210..."
                      className="w-full px-4 py-3 bg-white border border-[#e0c0b3] focus:border-[#f46b24] focus:ring-1 focus:ring-[#f46b24] outline-none transition-all resize-none min-h-[120px] font-sans text-sm text-[#333]"
                      disabled={isSendingUpdate}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsUpdateModalOpen(false)}
                      disabled={isSendingUpdate}
                      className="px-6 py-3 border border-[#e0c0b3] text-[#594238] font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#e0c0b3]/20 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSendingUpdate || !updateMessage.trim()}
                      className="bg-[#f46b24] text-white px-8 py-3 font-sans text-xs font-bold uppercase tracking-widest block-shadow hover:bg-[#d55a1e] transition-colors disabled:opacity-70 flex items-center gap-2"
                    >
                      {isSendingUpdate ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Request'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
