import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, FileText, Code2, ExternalLink, GraduationCap, Github, Linkedin, ChevronLeft, Loader2, User, Home, BookOpen, Activity, Download } from 'lucide-react';
import { API_URL } from '../../api';

export default function StudentDetail() {
  const { rollNo } = useParams<{ rollNo: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getCookie('access_token');
        const response = await fetch(`${API_URL}/staff/student/${rollNo}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error("Failed to fetch student profile");
        }
      } catch (error) {
        console.error("Error fetching student profile:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchStats = async () => {
      try {
        const token = getCookie('access_token');
        const response = await fetch(`${API_URL}/staff/student/${rollNo}/stats/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const result = await response.json();
          setStats(result);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    if (rollNo) {
      fetchProfile();
      fetchStats();
    }
  }, [rollNo]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface-container-lowest">
        <Loader2 className="w-8 h-8 animate-spin text-primary-container" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface-container-lowest">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Student Not Found</h2>
          <button 
            onClick={() => navigate('/staff/profile')}
            className="text-primary-container font-bold hover:underline"
          >
            Return to Staff Dashboard
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface pb-20">
      
      {/* Header */}
      <header className="bg-white border-b-4 border-outline pt-6 pb-8 md:pt-10 md:pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1b1c1c_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button 
            onClick={() => navigate('/staff/profile')}
            className="flex items-center gap-2 text-secondary hover:text-primary-container mb-8 font-bold text-sm tracking-wider uppercase transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Staff Dashboard
          </button>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center w-full">
            
            {/* Top Section (Mobile): Icon + Name Row */}
            <div className="flex flex-row items-center gap-4 md:gap-8 w-full md:w-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-40 md:h-40 bg-on-surface border-2 md:border-4 border-white shadow-sm rounded-xl shrink-0 flex items-center justify-center relative overflow-hidden group">
                <span className="text-4xl md:text-7xl font-display font-bold text-primary-container">
                  {data.name?.charAt(0) || '?'}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight leading-none mb-1 md:mb-2 truncate whitespace-normal">
                  {data.name}
                </h1>
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-xs md:text-base font-bold text-primary-container uppercase tracking-widest font-mono">
                  <span>{data.register_number}</span>
                  {data.student_class_details && (
                    <span className="block md:inline">
                      <span className="hidden md:inline-block w-1.5 h-1.5 bg-on-surface rounded-full mr-4 align-middle"></span>
                      {data.student_class_details.year_name} YR IT - SEC {data.student_class_details.section_name}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Section (Mobile): Contact + Resume */}
            <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:items-center justify-between w-full border-t border-outline-variant pt-4 md:border-none md:pt-0">
              <div className="flex flex-col gap-2 text-secondary text-sm md:text-base">
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-outline shrink-0" />
                  <span className="truncate">{data.official_email || 'N/A'}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-outline shrink-0" />
                  {data.mobile_number || 'N/A'}
                </span>
              </div>
              
              {data.resume_file && (
                <a href={data.resume_file} target="_blank" rel="noopener noreferrer" download
                  className="bg-on-surface text-white p-3 md:p-4 shadow-sm rounded-xl flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shrink-0 w-full sm:w-auto mt-2 lg:mt-0"
                >
                  <FileText className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-bold tracking-widest uppercase text-xs md:text-sm">Download Resume</span>
                  <Download className="w-4 h-4" />
                </a>
              )}
            </div>

          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Personal & Parent Info Section */}
        <section>
          <h2 className="text-3xl font-display font-bold uppercase tracking-widest mb-8 border-b-2 border-outline pb-4 inline-block">Personal Information</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="bg-white border border-outline-variant p-4 sm:p-8 shadow-sm rounded-xl relative">
              <h3 className="font-display text-headline-sm font-bold text-on-surface mb-6 flex items-center gap-3">
                <User className="w-6 h-6 text-primary-container" />
                Basic Details
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-[10px] uppercase text-outline block mb-1">Gender</label>
                  <p className="font-medium text-on-surface">{data.gender || '-'}</p>
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase text-outline block mb-1">Personal Email</label>
                  <p className="font-medium text-on-surface break-all">{data.personal_email || '-'}</p>
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase text-outline block mb-1">Native Location</label>
                  <p className="font-medium text-on-surface">{data.native_location || '-'}</p>
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase text-outline block mb-1">Mentor</label>
                  <p className="font-medium text-on-surface">{data.mentor_name || 'Not Assigned'}</p>
                </div>
                <div className="col-span-2">
                  <label className="font-mono text-[10px] uppercase text-outline block mb-1">Communication Address</label>
                  <p className="font-medium text-on-surface whitespace-pre-wrap">{data.communication_address || '-'}</p>
                </div>
                <div className="col-span-2">
                  <label className="font-mono text-[10px] uppercase text-outline block mb-1">Permanent Address</label>
                  <p className="font-medium text-on-surface whitespace-pre-wrap">{data.permanent_address || '-'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-outline-variant p-4 sm:p-8 shadow-sm rounded-xl relative">
              <h3 className="font-display text-headline-sm font-bold text-on-surface mb-6 flex items-center gap-3">
                <Home className="w-6 h-6 text-primary-container" />
                Parent Details
              </h3>
              
              <div className="space-y-6">
                <div className="border-b border-outline-variant pb-6">
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-4 text-outline">Father's Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] uppercase text-outline block mb-1">Name</label>
                      <p className="font-medium text-on-surface">{data.father_name || '-'}</p>
                    </div>
                    <div>
                      <label className="font-mono text-[10px] uppercase text-outline block mb-1">Phone</label>
                      <p className="font-medium text-on-surface">{data.father_mobile || '-'}</p>
                    </div>
                    <div className="col-span-2">
                      <label className="font-mono text-[10px] uppercase text-outline block mb-1">Occupation</label>
                      <p className="font-medium text-on-surface">{data.father_occupation || '-'}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-4 text-outline">Mother's Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] uppercase text-outline block mb-1">Name</label>
                      <p className="font-medium text-on-surface">{data.mother_name || '-'}</p>
                    </div>
                    <div>
                      <label className="font-mono text-[10px] uppercase text-outline block mb-1">Phone</label>
                      <p className="font-medium text-on-surface">{data.mother_mobile || '-'}</p>
                    </div>
                    <div className="col-span-2">
                      <label className="font-mono text-[10px] uppercase text-outline block mb-1">Occupation</label>
                      <p className="font-medium text-on-surface">{data.mother_occupation || '-'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Education Section */}
        <section>
          <h2 className="text-3xl font-display font-bold uppercase tracking-widest mb-8 border-b-2 border-outline pb-4 inline-block">Education History</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-outline-variant p-4 sm:p-8 shadow-sm rounded-xl relative h-full">
              <h3 className="font-display text-headline-sm font-bold text-on-surface mb-8 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-primary-container" />
                Schooling / Polytechnic
              </h3>
              
              <div className="space-y-8 pl-6 border-l-2 border-dashed border-outline-variant">
                {/* 10th */}
                <div className="relative">
                  <div className="absolute -left-[35px] top-1 w-4 h-4 bg-white border-4 border-outline-variant rounded-full"></div>
                  <h4 className="font-bold text-on-surface text-lg mb-1">{data.school_10th || '10th Standard'}</h4>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div>
                      <label className="font-mono text-[10px] uppercase text-outline block mb-1">Board</label>
                      <p className="font-medium text-sm text-on-surface">{data.board_10th || '-'}</p>
                    </div>
                    <div>
                      <label className="font-mono text-[10px] uppercase text-outline block mb-1">Mark</label>
                      <p className="font-medium text-sm text-on-surface">{data.mark_10th || '-'}</p>
                    </div>
                    <div>
                      <label className="font-mono text-[10px] uppercase text-outline block mb-1">Percentage</label>
                      <p className="font-bold text-sm text-primary-container">{data.percentage_10th ? `${data.percentage_10th}%` : '-'}</p>
                    </div>
                  </div>
                </div>

                {/* 12th */}
                {(data.school_12th || data.board_12th) && (
                  <div className="relative pt-4 border-t border-gray-100">
                    <div className="absolute -left-[35px] top-5 w-4 h-4 bg-white border-4 border-outline-variant rounded-full"></div>
                    <h4 className="font-bold text-on-surface text-lg mb-1">{data.school_12th || '12th Standard'}</h4>
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <div>
                        <label className="font-mono text-[10px] uppercase text-outline block mb-1">Board</label>
                        <p className="font-medium text-sm text-on-surface">{data.board_12th || '-'}</p>
                      </div>
                      <div>
                        <label className="font-mono text-[10px] uppercase text-outline block mb-1">Mark</label>
                        <p className="font-medium text-sm text-on-surface">{data.mark_12th || '-'}</p>
                      </div>
                      <div>
                        <label className="font-mono text-[10px] uppercase text-outline block mb-1">Percentage</label>
                        <p className="font-bold text-sm text-primary-container">{data.percentage_12th ? `${data.percentage_12th}%` : '-'}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Polytechnic */}
                {(data.polytechnic_name) && (
                  <div className="relative pt-4 border-t border-gray-100">
                    <div className="absolute -left-[35px] top-5 w-4 h-4 bg-white border-4 border-outline-variant rounded-full"></div>
                    <h4 className="font-bold text-on-surface text-lg mb-1">{data.polytechnic_name}</h4>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div>
                        <label className="font-mono text-[10px] uppercase text-outline block mb-1">Department</label>
                        <p className="font-medium text-sm text-on-surface">{data.polytechnic_dept || '-'}</p>
                      </div>
                      <div>
                        <label className="font-mono text-[10px] uppercase text-outline block mb-1">Percentage</label>
                        <p className="font-bold text-sm text-primary-container">{data.diploma_percentage ? `${data.diploma_percentage}%` : '-'}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Educational Gap */}
                {data.educational_gap && (
                  <div className="relative pt-4 border-t border-gray-100">
                    <div className="absolute -left-[35px] top-5 w-4 h-4 bg-red-100 border-4 border-red-500 rounded-full"></div>
                    <h4 className="font-bold text-on-surface text-sm mb-1 uppercase tracking-widest">Educational Gap</h4>
                    <p className="text-sm text-secondary">{data.educational_gap}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white border border-outline-variant p-4 sm:p-8 shadow-sm rounded-xl relative h-full">
              <h3 className="font-display text-headline-sm font-bold text-on-surface mb-8 flex items-center gap-3">
                <Activity className="w-6 h-6 text-primary-container" />
                Academic Performance
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[1,2,3,4,5,6,7,8].map(sem => {
                  const val = data[`sem${sem}_sgpa`] || 'N/A';
                  return (
                    <div key={sem} className="bg-surface-container-low border border-transparent rounded-xl p-3 text-center">
                      <span className="font-mono text-[10px] uppercase text-outline block mb-1">Sem {sem}</span>
                      <span className={`font-bold ${val === 'N/A' || val === '' ? 'text-outline' : 'text-on-surface'}`}>
                        {val || 'N/A'}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-outline-variant pt-6">
                <div>
                  <span className="font-mono text-[10px] uppercase text-outline block mb-1">Current Arrears</span>
                  <span className={`text-2xl font-bold ${Number(data.current_arrears) > 0 ? 'text-red-600' : 'text-on-surface'}`}>
                    {data.current_arrears || '0'}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-outline block mb-1">History of Arrears</span>
                  <span className="text-2xl font-bold text-on-surface">{data.history_of_arrears || '0'}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[10px] uppercase text-outline block mb-1">Overall CGPA</span>
                  <span className="text-3xl font-display font-bold text-primary-container">{data.cgpa || '-'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Profiles Section */}
        <section>
          <h2 className="text-3xl font-display font-bold uppercase tracking-widest mb-8 border-b-2 border-outline pb-4 inline-block">Coding Profiles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-4">
              <div className="space-y-4">
                <a href={data.github_id || '#'} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-between p-4 bg-white border border-outline-variant shadow-sm rounded-xl group transition-all ${data.github_id ? 'hover:-translate-y-1 hover:border-outline' : 'opacity-50 pointer-events-none'}`}>
                  <div className="flex items-center gap-4">
                    <Github className="w-6 h-6 text-on-surface" />
                    <div>
                      <h4 className="font-bold text-on-surface">GitHub</h4>
                      <p className="text-xs text-outline">Version Control</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-outline group-hover:text-on-surface transition-colors" />
                </a>

                <a href={data.linkedin_id || '#'} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-between p-4 bg-white border border-outline-variant shadow-sm rounded-xl group transition-all ${data.linkedin_id ? 'hover:-translate-y-1 hover:border-[#0a66c2]' : 'opacity-50 pointer-events-none'}`}>
                  <div className="flex items-center gap-4">
                    <Linkedin className="w-6 h-6 text-[#0a66c2]" />
                    <div>
                      <h4 className="font-bold text-on-surface">LinkedIn</h4>
                      <p className="text-xs text-outline">Professional Network</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-outline group-hover:text-on-surface transition-colors" />
                </a>

                <a href={data.leetcode_id || '#'} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-between p-4 bg-white border border-outline-variant shadow-sm rounded-xl group transition-all ${data.leetcode_id ? 'hover:-translate-y-1 hover:border-primary-container' : 'opacity-50 pointer-events-none'}`}>
                  <div className="flex items-center gap-4">
                    <Code2 className="w-6 h-6 text-primary-container" />
                    <div>
                      <h4 className="font-bold text-on-surface">LeetCode</h4>
                      <p className="text-xs text-outline">Competitive Coding</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-outline group-hover:text-on-surface transition-colors" />
                </a>

                <a href={data.hackerrank_id || '#'} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-between p-4 bg-white border border-outline-variant shadow-sm rounded-xl group transition-all ${data.hackerrank_id ? 'hover:-translate-y-1 hover:border-blue-600' : 'opacity-50 pointer-events-none'}`}>
                  <div className="flex items-center gap-4">
                    <Code2 className="w-6 h-6 text-blue-600" />
                    <div>
                      <h4 className="font-bold text-on-surface">HackerRank</h4>
                      <p className="text-xs text-outline">Skill Assessments</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-outline group-hover:text-on-surface transition-colors" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-2 bg-surface-container border border-outline-variant p-4 sm:p-8 shadow-sm rounded-xl relative flex flex-col justify-center">
              <h3 className="font-display text-headline-sm font-bold text-on-surface mb-6 border-b border-outline-variant pb-2">
                Live Stats
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats ? (
                  <>
                    <div className="bg-white border border-outline-variant p-6 text-center shadow-sm">
                      <span className="font-mono text-[10px] uppercase text-outline block mb-2">GitHub Repos</span>
                      <span className="text-4xl font-sans font-bold text-on-surface">{stats.github_repos}</span>
                    </div>
                    <div className="bg-white border border-outline-variant p-6 text-center shadow-sm">
                      <span className="font-mono text-[10px] uppercase text-outline block mb-2">LeetCode</span>
                      <span className="text-4xl font-sans font-bold text-primary-container">{stats.leetcode_solved}</span>
                    </div>
                    <div className="bg-white border border-outline-variant p-6 text-center shadow-sm">
                      <span className="font-mono text-[10px] uppercase text-outline block mb-2">HackerRank</span>
                      <span className="text-4xl font-sans font-bold text-blue-600">{stats.hackerrank_badges}</span>
                    </div>
                    <div className="bg-white border border-outline-variant p-6 text-center shadow-sm">
                      <span className="font-mono text-[10px] uppercase text-outline block mb-2">HackerEarth</span>
                      <span className="text-4xl font-sans font-bold text-primary-container">{stats.hackerearth_count}</span>
                    </div>
                  </>
                ) : (
                  <div className="col-span-full flex items-center justify-center p-8">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-container" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section>
          <h2 className="text-3xl font-display font-bold uppercase tracking-widest mb-8 border-b-2 border-outline pb-4 inline-block">Research Papers</h2>
          <div className="bg-white border border-outline-variant p-4 sm:p-8 shadow-sm rounded-xl relative">
            <div className="absolute left-0 top-0 w-1.5 h-16 bg-primary-container"></div>
            <h3 className="font-display text-headline-sm font-bold text-on-surface mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary-container" />
              Publications
            </h3>
            {data.authored_papers?.filter((p: any) => p.status === 'published' || p.status === 'unpublished').length > 0 ? (
              <div className="grid gap-4">
                {data.authored_papers.filter((p: any) => p.status === 'published' || p.status === 'unpublished').map((paper: any) => (
                  <Link key={paper.id} to={`/research/${paper.id}`} className="block border border-outline-variant p-4 bg-surface-container-lowest hover:border-primary-container transition-colors relative">
                    {paper.status === 'unpublished' && (
                      <span className="absolute top-4 right-4 bg-gray-200 text-gray-700 text-[9px] font-bold px-2 py-1 uppercase tracking-wider">
                        Internal
                      </span>
                    )}
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary-container mb-1">{paper.domain}</div>
                    <h4 className="font-bold text-on-surface text-lg leading-snug mb-1">{paper.title}</h4>
                    <p className="text-sm text-outline">{paper.authors.map((a: any) => a.name).join(', ')}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-outline">No published publications found for this student.</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
