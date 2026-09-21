import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ExternalLink, Github, Linkedin, Code2, Terminal, FileText, Globe, Loader2, X, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_URL, BASE_URL } from '../../api';

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState('Hackathon Details');
  const navigate = useNavigate();

  const tabs = [
    'Hackathon Details',
    // 'Personal & Family Info',
    // 'Education History',
    // 'Academic Performance',
    // 'Coding & Links',
    // 'Research Papers'
  ];

  const [hackathonData, setHackathonData] = useState<any>(null);
  const [uploadingPpt, setUploadingPpt] = useState(false);
  const [pptFile, setPptFile] = useState<File | null>(null);

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
    window.location.href = '/';
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

    const fetchHackathonData = async () => {
      const token = getCookie('access_token');
      if (!token) return;
      try {
        const response = await fetch(`${API_URL}/hackathon/my-team/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setHackathonData(data);
        }
      } catch (err) {
        console.error('Failed to fetch hackathon data:', err);
      }
    };

    fetchProfile();
    fetchStats();
    fetchHackathonData();
  }, [navigate]);

  const handlePptUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validExtensions = ['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
    if (!validExtensions.includes(file.type)) {
      toast.error('Only PDF and PPT/PPTX files are allowed.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds the 5MB limit.');
      return;
    }

    setPptFile(file);
    setUploadingPpt(true);
    const token = getCookie('access_token');
    if (!token) return;

    const formData = new FormData();
    formData.append('ppt_file', file);

    try {
      const response = await fetch(`${API_URL}/hackathon/my-team/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setHackathonData((prev: any) => ({ ...prev, ppt_file: data.ppt_file }));
      } else {
        const errData = await response.json();
        toast.error(errData.error || 'Upload failed');
      }
    } catch (err) {
      toast.error('Network error during upload');
    } finally {
      setUploadingPpt(false);
    }
  };

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
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="animate-spin h-12 w-12 text-primary-container" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
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
    <div className="border-b border-gray-100 pb-2">
      <label className="text-xs text-gray-500 font-semibold mb-1 block">{label}</label>
      <p className="font-sans text-base text-gray-900 font-medium break-words">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <style>{`
        .shadow-sm rounded-xl {
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
      <section className="bg-white pt-8 pb-4 border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              {/* Basic Info */}
              <div className="space-y-1">
                <h1 className="font-display-hero text-3xl md:text-4xl font-bold tracking-tight text-[#1B1C1C] leading-tight break-words">{data.name}</h1>
                <p className="text-sm font-medium text-gray-500 mt-1">Reg No: {data.registerNumber} • Yr: {data.year} • Sec: {data.section}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="bg-gray-100 px-2 py-1 text-xs font-semibold rounded text-gray-800">B.Tech IT</span>
                  {/* <span className="bg-gray-100 px-2 py-1 text-xs font-semibold rounded text-gray-800">CGPA: {data.cgpa}</span> */}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
              <button
                onClick={() => setIsUpdateModalOpen(true)}
                className="bg-[#F46B24] text-white text-sm font-semibold px-4 py-2 rounded hover:bg-[#d55a1e] transition-colors whitespace-nowrap"
              >
                Request Update
              </button>
              <button
                onClick={handleLogout}
                className="bg-[#1B1C1C] text-white text-sm font-semibold px-4 py-2 rounded hover:bg-black transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Tabs - Sticky (Commented out as there's only one tab now) */}
      <div className="sticky top-0 z-40 bg-surface-container-lowest border-b border-outline-variant shadow-sm">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <nav className="flex overflow-x-auto no-scrollbar pt-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-4 font-sans text-sm font-medium tracking-wide whitespace-nowrap transition-colors ${isActive ? 'text-[#F46B24] font-bold' : 'text-gray-500 hover:text-[#F46B24]'}`}
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
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 py-8">

        {/* TAB 0: Hackathon Details */}
        {activeTab === 'Hackathon Details' && (
          <div className="grid grid-cols-1 gap-6 w-full">
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 relative">
              <h2 className="font-display-hero text-2xl font-bold text-[#1B1C1C] mb-4 tracking-tight">Hackathon Team Details</h2>

              {!hackathonData || !hackathonData.registered ? (
                <div className="text-gray-600 p-6 bg-gray-50 border border-gray-100 rounded-xl text-center">
                  <p className="text-sm font-medium mb-4">You have not registered for the hackathon yet.</p>
                  <Link to="/hackathon" className="inline-block px-4 py-2 bg-[#1B1C1C] text-white text-sm font-semibold rounded hover:bg-black transition-colors">
                    Go to Hackathon Page
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Team Info */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 bg-gray-50 border border-gray-100 rounded-xl">
                    <Field label="Team Name" value={hackathonData.team_name} />
                    <Field label="Scenario Allocated" value={hackathonData.scenario_allocated || 'Pending Allocation'} />
                    <Field label="Leader Name" value={hackathonData.leader_name} />
                    <Field label="Leader Roll No" value={hackathonData.leader_roll} />
                  </div>

                  {/* Team Members */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 border-b border-gray-100 pb-2 mb-3">Team Members</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {hackathonData.team_members && hackathonData.team_members.map((member: any, i: number) => (
                        <div key={i} className="flex flex-col p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                          <span className="font-medium text-[#1B1C1C] text-sm">{member.name}</span>
                          <span className="text-xs text-gray-500 mt-1">{member.roll}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress & Status */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 border-b border-gray-100 pb-2 mb-3">Team Progress</h3>
                    <div className="flex flex-wrap gap-2">
                      <div className={`px-3 py-1 rounded-full font-semibold text-xs ${hackathonData.is_round_1_selected ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-100'}`}>
                        Round 1 {hackathonData.is_round_1_selected ? 'Selected' : 'Pending'}
                      </div>
                      <div className={`px-3 py-1 rounded-full font-semibold text-xs ${hackathonData.is_round_2_selected ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-100'}`}>
                        Round 2 {hackathonData.is_round_2_selected ? 'Selected' : 'Pending'}
                      </div>
                      <div className={`px-3 py-1 rounded-full font-semibold text-xs ${hackathonData.is_round_3_selected ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-100'}`}>
                        Round 3 {hackathonData.is_round_3_selected ? 'Selected' : 'Pending'}
                      </div>
                      {hackathonData.is_winner && (
                        <div className="px-3 py-1 rounded-full font-semibold text-xs bg-yellow-50 text-yellow-700 border border-yellow-200 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                          Winner
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submission */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 border-b border-gray-100 pb-2 mb-3">Presentation Submission</h3>
                    {hackathonData.ppt_file ? (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-orange-50 border border-orange-100 rounded-xl">
                        <div className="flex items-center gap-3 mb-3 sm:mb-0">
                          <FileText className="w-5 h-5 text-[#F46B24]" />
                          <div>
                            <p className="font-semibold text-[#1B1C1C] text-sm">Presentation Uploaded</p>
                            <a href={BASE_URL + hackathonData.ppt_file} target="_blank" rel="noopener noreferrer" className="text-xs text-[#F46B24] hover:underline font-medium">View File</a>
                          </div>
                        </div>
                        {hackathonData.is_leader && !hackathonData.is_ppt_time_end && (
                          <label className="cursor-pointer bg-white border border-[#F46B24] text-[#F46B24] text-xs font-semibold px-4 py-2 rounded hover:bg-orange-50 transition-colors">
                            {uploadingPpt ? 'Uploading...' : 'Re-upload PPT (Max 5MB)'}
                            <input type="file" className="hidden" accept=".ppt,.pptx,.pdf" onChange={handlePptUpload} disabled={uploadingPpt} />
                          </label>
                        )}
                      </div>
                    ) : (
                      <div className="p-5 border border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-center">
                        {hackathonData.is_leader && !hackathonData.is_ppt_time_end ? (
                          <>
                            <FileText className="w-6 h-6 text-gray-400 mb-2" />
                            <p className="text-sm font-medium text-gray-600 mb-3">No presentation uploaded yet.</p>
                            <label className="cursor-pointer bg-[#F46B24] text-white text-xs font-semibold px-4 py-2 rounded hover:bg-[#d55a1e] transition-colors flex items-center">
                              {uploadingPpt ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...
                                </>
                              ) : 'Upload Presentation (Max 5MB)'}
                              <input type="file" className="hidden" accept=".ppt,.pptx,.pdf" onChange={handlePptUpload} disabled={uploadingPpt} />
                            </label>
                          </>
                        ) : (
                          <p className="text-sm font-medium text-gray-500">
                            {hackathonData.is_ppt_time_end 
                              ? "Presentation submission time has ended." 
                              : `Only the team leader (${hackathonData.leader_name}) can upload the presentation file.`}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 1: Personal & Family Info */}
        {activeTab === 'Personal & Family Info' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {/* Student Info Card */}
            <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100 relative">
              <h2 className="font-display-hero text-2xl font-bold text-[#1B1C1C] mb-4 tracking-tight">Student Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100 relative">
              <h2 className="font-display-hero text-2xl font-bold text-[#1B1C1C] mb-4 tracking-tight">Family &amp; Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <h3 className="font-semibold text-sm mb-3 text-gray-500">Father's Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Name" value={data.fatherName} />
                    <Field label="Occupation" value={data.fatherOccupation} />
                    <div className="sm:col-span-2">
                      <Field label="Mobile Number" value={data.fatherMobile} />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 bg-gray-50 p-5 rounded-xl border border-gray-100">
                  <h3 className="font-semibold text-sm mb-3 text-gray-500">Mother's Details</h3>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
              <h2 className="font-display-hero text-2xl font-bold text-[#1B1C1C] mb-4 border-b border-gray-100 pb-2">10th Grade (X)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Field label="Name of the School" value={data.school10th} />
                </div>
                <Field label="Board of Studies" value={data.board10th} />
                <Field label="Mark Secured" value={data.mark10th} />
                <Field label="Percentage" value={data.percentage10th} />
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
              <h2 className="font-display-hero text-2xl font-bold text-[#1B1C1C] mb-4 border-b border-gray-100 pb-2">12th Grade (XII)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Field label="Name of the School" value={data.school12th} />
                </div>
                <Field label="Board of Studies" value={data.board12th} />
                <Field label="Mark Secured" value={data.mark12th} />
                <Field label="Percentage" value={data.percentage12th} />
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
              <h2 className="font-display-hero text-2xl font-bold text-[#1B1C1C] mb-4 border-b border-gray-100 pb-2">Diploma / Polytechnic</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Field label="Name of the Polytechnic" value={data.polytechnicName} />
                </div>
                <Field label="Department" value={data.polytechnicDept} />
                <Field label="Percentage" value={data.diplomaPercentage} />
              </div>
            </div>

            <div className="bg-white border border-gray-100 p-6 shadow-sm rounded-2xl">
              <h2 className="font-display-hero text-2xl font-bold text-[#1B1C1C] mb-4 border-b border-gray-100 pb-2">Other Details</h2>
              <Field label="Educational Gap (If any)" value={data.educationalGap} />
            </div>
          </div>
        )}

        {/* TAB 3: Academic Performance */}
        {activeTab === 'Academic Performance' && (
          <div className="space-y-6 w-full">
            <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
              <h2 className="font-display-hero text-2xl font-bold text-[#1B1C1C] mb-4">Semester-wise SGPA</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.entries(data.sgpa).map(([sem, score], idx) => (
                  <div key={sem} className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-center">
                    <span className="font-semibold text-xs text-gray-500 block mb-1">Sem {idx + 1} SGPA</span>
                    <span className="text-2xl font-sans font-bold text-[#1B1C1C]">{score}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-100 p-6 shadow-sm rounded-2xl text-center">
                <span className="font-semibold text-xs text-gray-500 block mb-1">UG (CGPA)</span>
                <span className="text-3xl font-sans font-bold text-[#F46B24]">{data.cgpa}</span>
              </div>
              <div className="bg-white border border-gray-100 p-6 shadow-sm rounded-2xl text-center">
                <span className="font-semibold text-xs text-gray-500 block mb-1">Current Arrears</span>
                <span className="text-3xl font-sans font-bold text-[#1B1C1C]">{data.currentArrears}</span>
              </div>
              <div className="bg-white border border-gray-100 p-6 shadow-sm rounded-2xl text-center">
                <span className="font-semibold text-xs text-gray-500 block mb-1">History of Arrears</span>
                <span className="text-3xl font-sans font-bold text-[#1B1C1C]">{data.historyOfArrears}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Coding & Links */}
        {activeTab === 'Coding & Links' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100 relative">
              <h2 className="font-display-hero text-2xl font-bold text-[#1B1C1C] mb-4 flex items-center gap-3">
                <Terminal className="w-6 h-6 text-[#1B1C1C]" />
                Coding Profiles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href={formatUrl(data.githubId)} target="_blank" rel="noopener noreferrer" className="group bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col gap-1 hover:border-[#F46B24] hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2 text-gray-500 group-hover:text-[#F46B24] transition-colors">
                    <Github className="w-4 h-4" />
                    <span className="text-xs font-semibold">GitHub</span>
                  </div>
                  <span className="font-sans text-sm text-[#1B1C1C] font-semibold break-all">{data.githubId}</span>
                </a>

                <a href={formatUrl(data.leetcodeId)} target="_blank" rel="noopener noreferrer" className="group bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col gap-1 hover:border-[#F46B24] hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2 text-gray-500 group-hover:text-[#F46B24] transition-colors">
                    <Code2 className="w-4 h-4" />
                    <span className="text-xs font-semibold">LeetCode</span>
                  </div>
                  <span className="font-sans text-sm text-[#1B1C1C] font-semibold break-all">{data.leetcodeId}</span>
                </a>

                <a href={formatUrl(data.hackerrankId)} target="_blank" rel="noopener noreferrer" className="group bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col gap-1 hover:border-[#F46B24] hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2 text-gray-500 group-hover:text-[#F46B24] transition-colors">
                    <Terminal className="w-4 h-4" />
                    <span className="text-xs font-semibold">HackerRank</span>
                  </div>
                  <span className="font-sans text-sm text-[#1B1C1C] font-semibold break-all">{data.hackerrankId}</span>
                </a>

                <a href={formatUrl(data.hackerearthId)} target="_blank" rel="noopener noreferrer" className="group bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col gap-1 hover:border-[#F46B24] hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2 text-gray-500 group-hover:text-[#F46B24] transition-colors">
                    <Code2 className="w-4 h-4" />
                    <span className="text-xs font-semibold">HackerEarth</span>
                  </div>
                  <span className="font-sans text-sm text-[#1B1C1C] font-semibold break-all">{data.hackerearthId}</span>
                </a>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100 relative">
              <h2 className="font-display-hero text-2xl font-bold text-[#1B1C1C] mb-4 flex items-center gap-3">
                <LinkIcon className="w-6 h-6 text-[#1B1C1C]" />
                Professional Links
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href={formatUrl(data.linkedInId)} target="_blank" rel="noopener noreferrer" className="group bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col gap-1 hover:border-[#F46B24] hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2 text-gray-500 group-hover:text-[#F46B24] transition-colors">
                    <Linkedin className="w-4 h-4" />
                    <span className="text-xs font-semibold">LinkedIn</span>
                  </div>
                  <span className="font-sans text-sm text-[#1B1C1C] font-semibold break-all">{data.linkedInId}</span>
                </a>

                <a href={formatUrl(data.portfolio)} target="_blank" rel="noopener noreferrer" className="group bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col gap-1 hover:border-[#F46B24] hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2 text-gray-500 group-hover:text-[#F46B24] transition-colors">
                    <Globe className="w-4 h-4" />
                    <span className="text-xs font-semibold">Portfolio</span>
                  </div>
                  <span className="font-sans text-sm text-[#1B1C1C] font-semibold break-all">{data.portfolio}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white border border-gray-100 p-6 shadow-sm rounded-2xl relative">
              <h2 className="font-display-hero text-2xl font-bold text-[#1B1C1C] mb-4 border-b border-gray-100 pb-2">
                Live Stats
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center shadow-sm">
                  <span className="font-semibold text-xs text-gray-500 block mb-1">GitHub Repos</span>
                  <span className="text-3xl font-sans font-bold text-[#1B1C1C]">{stats.githubRepos}</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center shadow-sm">
                  <span className="font-semibold text-xs text-gray-500 block mb-1">LeetCode Solved</span>
                  <span className="text-3xl font-sans font-bold text-[#F46B24]">{stats.leetcodeSolved}</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center shadow-sm">
                  <span className="font-semibold text-xs text-gray-500 block mb-1">HackerRank Badges</span>
                  <span className="text-3xl font-sans font-bold text-[#1B1C1C]">{stats.hackerrankBadges}</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center shadow-sm">
                  <span className="font-semibold text-xs text-gray-500 block mb-1">HackerEarth Count</span>
                  <span className="text-3xl font-sans font-bold text-[#F46B24]">{stats.hackerearthCount}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Research Papers */}
        {activeTab === 'Research Papers' && (
          <div className="space-y-6 w-full">

            {/* Authored Papers (Published) */}
            <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100 relative">
              <h2 className="font-display-hero text-2xl font-bold text-[#1B1C1C] mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#1B1C1C]" />
                My Publications
              </h2>
              {data.authoredPapers?.filter((p: any) => p.status === 'published' || p.status === 'unpublished').length > 0 ? (
                <div className="grid gap-4">
                  {data.authoredPapers.filter((p: any) => p.status === 'published' || p.status === 'unpublished').map((paper: any) => (
                    <Link key={paper.id} to={`/research/${paper.id}`} className="block border border-gray-100 rounded-xl p-4 bg-gray-50 hover:border-[#F46B24] transition-colors relative">
                      {paper.status === 'unpublished' && (
                        <span className="absolute top-4 right-4 bg-gray-200 text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                          Internal
                        </span>
                      )}
                      <div className="text-xs font-semibold text-[#F46B24] mb-1">{paper.domain}</div>
                      <h3 className="font-bold text-[#1B1C1C] text-base leading-snug mb-1">{paper.title}</h3>
                      <p className="text-xs text-gray-500 font-medium">{paper.authors.map((a: any) => a.name).join(', ')}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm font-medium text-gray-500">No published publications found for this profile.</p>
              )}
            </div>

            {/* Submission Requested (Under Review) */}
            <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100 relative">
              <h2 className="font-display-hero text-2xl font-bold text-[#1B1C1C] mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#1B1C1C]" />
                Submission Requested
              </h2>
              {data.authoredPapers?.filter((p: any) => p.status === 'under_review').length > 0 ? (
                <div className="grid gap-4">
                  {data.authoredPapers.filter((p: any) => p.status === 'under_review').map((paper: any) => (
                    <Link key={paper.id} to={`/research/${paper.id}`} className="block border border-gray-100 rounded-xl p-4 bg-orange-50 hover:border-[#F46B24] transition-colors relative">
                      <span className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 text-[10px] font-semibold px-2 py-0.5 rounded">
                        Under Review
                      </span>
                      <div className="text-xs font-semibold text-gray-700 mb-1">{paper.domain}</div>
                      <h3 className="font-bold text-[#1B1C1C] text-base leading-snug mb-1 pr-24">{paper.title}</h3>
                      <p className="text-xs text-gray-500 font-medium">{paper.authors.map((a: any) => a.name).join(', ')}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm font-medium text-gray-500">No pending submissions.</p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Saved Papers */}
              <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100 relative">
                <h2 className="font-display-hero text-2xl font-bold text-[#1B1C1C] mb-4 border-b border-gray-100 pb-2">
                  Saved Papers
                </h2>
                {data.savedPapers?.length > 0 ? (
                  <div className="grid gap-3">
                    {data.savedPapers.map((paper: any) => (
                      <Link key={paper.id} to={`/research/${paper.id}`} className="block border border-gray-100 rounded-lg p-3 bg-gray-50 hover:border-[#F46B24] transition-colors">
                        <h3 className="font-bold text-[#1B1C1C] text-sm leading-snug mb-1 line-clamp-2">{paper.title}</h3>
                        <p className="text-xs text-gray-500 font-medium line-clamp-1">{paper.authors.map((a: any) => a.name).join(', ')}</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm font-medium text-gray-500">No saved papers.</p>
                )}
              </div>

              {/* Cited Papers */}
              <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100 relative">
                <h2 className="font-display-hero text-2xl font-bold text-[#1B1C1C] mb-4 border-b border-gray-100 pb-2">
                  Cited Papers
                </h2>
                {data.citedPapers?.length > 0 ? (
                  <div className="grid gap-3">
                    {data.citedPapers.map((paper: any) => (
                      <Link key={paper.id} to={`/research/${paper.id}`} className="block border border-gray-100 rounded-lg p-3 bg-gray-50 hover:border-[#F46B24] transition-colors">
                        <h3 className="font-bold text-[#1B1C1C] text-sm leading-snug mb-1 line-clamp-2">{paper.title}</h3>
                        <p className="text-xs text-gray-500 font-medium line-clamp-1">{paper.authors.map((a: any) => a.name).join(', ')}</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm font-medium text-gray-500">No cited papers.</p>
                )}
              </div>
            </div>

          </div>
        )}
      </section>

      {/* Update Request Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg shadow-sm rounded-2xl border border-gray-100 relative overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-[#1B1C1C] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-sans font-semibold tracking-wide text-sm">Request Profile Update</h3>
              <button
                onClick={() => !isSendingUpdate && setIsUpdateModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                disabled={isSendingUpdate}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="font-mono text-sm text-gray-500 mb-6">
                Please describe the details you want to update in your profile. An email will be sent to the association staff.
              </p>

              <form onSubmit={handleSendUpdate}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Details to Update</label>
                    <textarea
                      value={updateMessage}
                      onChange={(e) => setUpdateMessage(e.target.value)}
                      required
                      placeholder="E.g., I want to update my mobile number to 9876543210..."
                      className="w-full px-4 py-3 bg-white border border-outline-variant focus:border-primary-container focus:ring-1 focus:ring-[#f46b24] outline-none transition-all resize-none min-h-[120px] font-sans text-sm text-[#333]"
                      disabled={isSendingUpdate}
                    />
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsUpdateModalOpen(false)}
                      disabled={isSendingUpdate}
                      className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded font-sans text-xs font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSendingUpdate || !updateMessage.trim()}
                      className="bg-[#F46B24] text-white px-6 py-2.5 rounded font-sans text-xs font-semibold shadow-sm hover:bg-[#d55a1e] transition-colors disabled:opacity-70 flex items-center gap-2"
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
