import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState('Education History');
  const navigate = useNavigate();

  const tabs = [
    'Personal Info',
    'Education History',
    'Coding & Portfolio',
    'Resume'
  ];

  return (
    <div className="min-h-screen bg-[#fbf9f8] font-['Poppins',_sans-serif] text-[#1b1c1c]">
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
        .crease-line {
            background: linear-gradient(135deg, transparent 45%, rgba(141, 113, 102, 0.2) 50%, transparent 55%);
        }
      `}</style>
      
      {/* Student Hero Banner Section */}
      <section className="bg-[#f5f3f3] pt-12 pb-6 border-b border-[#e0c0b3] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 crease-line opacity-20 rotate-12"></div>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Profile Image */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#fbf9f8] shadow-md">
                  <img 
                    alt="A professional studio portrait of a young South Asian male college student" 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJEQaxG887T14aYjKF6wjRe0ba-oPsmUL7lndhjHuzoHL-AGuJbUo2H8Y1aeJ0yz80qCItvcgz5hppsZRatIveGTv6Lq1TR_aJLRCHguCaudNi-7T0OOG7PGuHcVzIv6p7CfmyEuBGvCglMyoMSsghBGXvSjG1QCjgQQbWDQZXSSX2UrttSOPNrv-mv0G2bSRF6kwcifgdUItrIi2jCAzivdnHWRym2r93EJytoDZO9gVNZz0Drf90ZjsR5sGSAoXa80c_v00B2js" 
                  />
                </div>
                <button className="absolute bottom-0 right-0 bg-[#f46b24] text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>edit</span>
                </button>
              </div>
              
              {/* Basic Info */}
              <div className="space-y-1">
                <h1 className="font-['Poppins',_sans-serif] text-3xl font-bold tracking-tight text-[#1b1c1c]">Aravind Kumar</h1>
                <p className="font-['JetBrains_Mono',_monospace] text-[#f46b24] font-medium tracking-wider">ROLL NO: 22BIT088</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="bg-[#e4e2e2] px-3 py-1 font-['JetBrains_Mono',_monospace] text-xs uppercase border border-[#e0c0b3]">B.Tech IT</span>
                  <span className="bg-[#e4e2e2] px-3 py-1 font-['JetBrains_Mono',_monospace] text-xs uppercase border border-[#e0c0b3]">3rd Year</span>
                  <span className="bg-[#e4e2e2] px-3 py-1 font-['JetBrains_Mono',_monospace] text-xs uppercase border border-[#e0c0b3]">Batch 2022-26</span>
                </div>
              </div>
            </div>
            <button className="bg-[#f46b24] text-white px-8 py-3 font-['Poppins',_sans-serif] text-sm uppercase tracking-widest block-shadow hover:bg-[#f46b24] transition-colors">
              Edit Profile
            </button>
          </div>

          {/* Profile Tabs */}
          <nav className="mt-12 flex overflow-x-auto no-scrollbar border-b border-[#e0c0b3]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-4 font-['Poppins',_sans-serif] text-xs md:text-sm uppercase tracking-widest whitespace-nowrap transition-colors ${
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
      </section>

      {/* Main Content Area */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {activeTab === 'Personal Info' && (
            <>
              {/* Left Column: Personal Info */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Personal Information Card */}
                <div className="bg-[#ffffff] border border-[#e0c0b3] block-shadow relative">
                  <div className="absolute left-0 top-0 w-1.5 h-16 bg-[#f46b24]"></div>
                  <div className="p-6 border-b border-[#e0c0b3] flex items-center justify-between">
                    <div className="flex items-center gap-3 pl-2">
                      <h2 className="font-['Poppins',_sans-serif] text-lg font-bold uppercase tracking-widest text-[#1b1c1c]">Personal Information</h2>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                      <div className="border-b border-[#e0c0b3] pb-4">
                        <label className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] mb-1 block">Gender</label>
                        <p className="font-['Poppins',_sans-serif] text-lg text-[#1b1c1c] font-medium">Male</p>
                      </div>
                      <div className="border-b border-[#e0c0b3] pb-4">
                        <label className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] mb-1 block">Age</label>
                        <p className="font-['Poppins',_sans-serif] text-lg text-[#1b1c1c] font-medium">21 Years</p>
                      </div>
                      
                      <div className="bg-[#f5f3f3] p-6 border border-[#e0c0b3]">
                        <label className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] mb-1 block">Mentor Name</label>
                        <p className="font-['Poppins',_sans-serif] text-lg text-[#1b1c1c] font-medium mt-1">Dr. Kavitha S.</p>
                        <p className="font-['JetBrains_Mono',_monospace] text-[10px] text-[#f46b24] uppercase mt-2 tracking-widest">Department of IT</p>
                      </div>
                      <div className="bg-[#f5f3f3] p-6 border border-[#e0c0b3]">
                        <label className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] mb-1 block">Class Coordinator</label>
                        <p className="font-['Poppins',_sans-serif] text-lg text-[#1b1c1c] font-medium mt-1">Prof. Rajesh Kumar</p>
                        <p className="font-['JetBrains_Mono',_monospace] text-[10px] text-[#f46b24] uppercase mt-2 tracking-widest">Assistant Professor</p>
                      </div>
                      
                      <div className="md:col-span-2 mt-2">
                        <label className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] mb-2 block">Permanent Address</label>
                        <p className="font-['Poppins',_sans-serif] text-lg text-[#1b1c1c] font-medium leading-relaxed">
                          12/B, Green Valley Apartments, Saravanampatti, Coimbatore - 641035, Tamil Nadu, India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Card */}
                <div className="bg-[#f0f6fa] border border-[#e0c0b3] p-8 relative overflow-hidden" style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 98% 100%, 0 100%)", borderLeftWidth: '0' }}>
                  <div className="absolute left-0 top-0 w-1.5 h-full bg-[#276483]"></div>
                  <div className="flex items-start gap-4 pl-2 justify-between">
                    <div className="flex-1 max-w-xl">
                      <h4 className="font-['Poppins',_sans-serif] font-bold text-[#004c69] uppercase tracking-wider mb-3">Student Identity</h4>
                      <p className="font-['Poppins',_sans-serif] text-[#004c69] text-sm leading-relaxed opacity-90">
                        Your profile is managed by the Department of IT. Any changes to core personal data must be verified through the department office.
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-[#004c69] text-4xl opacity-50" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>folder_managed</span>
                  </div>
                </div>
              </div>

              {/* Right Column (Sidebar) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Score Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#ffffff] border border-[#e0c0b3] p-6 block-shadow text-center">
                    <span className="font-['JetBrains_Mono',_monospace] text-[10px] uppercase text-[#8d7166] block mb-2">Total CGPA</span>
                    <span className="text-3xl font-['Poppins',_sans-serif] font-bold text-[#f46b24]">8.92</span>
                  </div>
                  <div className="bg-[#ffffff] border border-[#e0c0b3] p-6 block-shadow text-center">
                    <span className="font-['JetBrains_Mono',_monospace] text-[10px] uppercase text-[#8d7166] block mb-2">Last SGPA</span>
                    <span className="text-3xl font-['Poppins',_sans-serif] font-bold text-[#276483]">9.10</span>
                  </div>
                </div>

                {/* Department Badge */}
                <div className="bg-[#1b1c1c] text-[#fbf9f8] p-6 border-l-8 border-[#f46b24] relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                    <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>terminal</span>
                  </div>
                  <p className="font-['JetBrains_Mono',_monospace] text-xs text-[#ffb596] uppercase tracking-widest mb-1">Affiliation</p>
                  <h4 className="font-['Poppins',_sans-serif] font-bold text-lg mb-2">Department of IT</h4>
                  <p className="text-xs opacity-70 leading-relaxed">Dr. Mahalingam College of Engineering and Technology, Pollachi.</p>
                </div>

                {/* Documented Info */}
                <div className="text-center pt-8">
                  <div className="w-12 h-1 bg-[#e0c0b3] mx-auto mb-4"></div>
                  <p className="font-['JetBrains_Mono',_monospace] text-[10px] text-[#8d7166] uppercase tracking-[0.2em]">Documented Verification History</p>
                </div>
                
              </div>
            </>
          )}

          {activeTab === 'Education History' && (
            <>
              {/* Left Column: Education Cards */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* 10TH GRADE CARD */}
                <div className="bg-[#ffffff] border border-[#e0c0b3] block-shadow relative">
                  <div className="absolute left-0 top-0 w-1.5 h-16 bg-[#f46b24]"></div>
                  <div className="p-6 border-b border-[#e0c0b3] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#f46b24]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>school</span>
                      <h2 className="font-['Poppins',_sans-serif] text-lg font-bold uppercase tracking-widest text-[#1b1c1c]">10th Grade</h2>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                      <div className="border-b border-[#e0c0b3] pb-4">
                        <label className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] mb-1 block">Institution</label>
                        <p className="font-['Poppins',_sans-serif] text-lg text-[#1b1c1c] font-medium">St. Jude's Higher Secondary School</p>
                      </div>
                      <div className="border-b border-[#e0c0b3] pb-4">
                        <label className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] mb-1 block">Final Score</label>
                        <p className="font-['Poppins',_sans-serif] text-3xl font-bold text-[#f46b24]">94.2%</p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] mb-1 block">Location</label>
                        <p className="font-['Poppins',_sans-serif] text-[#594238]">Coimbatore, Tamil Nadu</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 12TH GRADE CARD */}
                <div className="bg-[#ffffff] border border-[#e0c0b3] block-shadow relative">
                  <div className="absolute left-0 top-0 w-1.5 h-16 bg-[#f46b24]"></div>
                  <div className="p-6 border-b border-[#e0c0b3] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#f46b24]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>workspace_premium</span>
                      <h2 className="font-['Poppins',_sans-serif] text-lg font-bold uppercase tracking-widest text-[#1b1c1c]">12th Grade</h2>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                      <div className="border-b border-[#e0c0b3] pb-4">
                        <label className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] mb-1 block">Institution</label>
                        <p className="font-['Poppins',_sans-serif] text-lg text-[#1b1c1c] font-medium">Bharathi Matriculation School</p>
                      </div>
                      <div className="border-b border-[#e0c0b3] pb-4">
                        <label className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] mb-1 block">Final Score</label>
                        <p className="font-['Poppins',_sans-serif] text-3xl font-bold text-[#f46b24]">96.5%</p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="font-['JetBrains_Mono',_monospace] text-xs uppercase text-[#8d7166] mb-1 block">Location</label>
                        <p className="font-['Poppins',_sans-serif] text-[#594238]">Pollachi, Tamil Nadu</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column (Sidebar) */}
              <div className="lg:col-span-4 space-y-6">
            
            {/* Score Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#ffffff] border border-[#e0c0b3] p-6 block-shadow text-center">
                <span className="font-['JetBrains_Mono',_monospace] text-[10px] uppercase text-[#8d7166] block mb-2">Total CGPA</span>
                <span className="text-3xl font-['Poppins',_sans-serif] font-bold text-[#f46b24]">8.92</span>
              </div>
              <div className="bg-[#ffffff] border border-[#e0c0b3] p-6 block-shadow text-center">
                <span className="font-['JetBrains_Mono',_monospace] text-[10px] uppercase text-[#8d7166] block mb-2">Last SGPA</span>
                <span className="text-3xl font-['Poppins',_sans-serif] font-bold text-[#276483]">9.10</span>
              </div>
            </div>

            {/* Department Badge */}
            <div className="bg-[#1b1c1c] text-[#fbf9f8] p-6 border-l-8 border-[#f46b24] relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>terminal</span>
              </div>
              <p className="font-['JetBrains_Mono',_monospace] text-xs text-[#ffb596] uppercase tracking-widest mb-1">Affiliation</p>
              <h4 className="font-['Poppins',_sans-serif] font-bold text-lg mb-2">Department of IT</h4>
              <p className="text-xs opacity-70 leading-relaxed">Dr. Mahalingam College of Engineering and Technology, Pollachi.</p>
            </div>

            {/* Documented Info */}
            <div className="text-center pt-8">
              <div className="w-12 h-1 bg-[#e0c0b3] mx-auto mb-4"></div>
              <p className="font-['JetBrains_Mono',_monospace] text-[10px] text-[#8d7166] uppercase tracking-[0.2em]">Documented Verification History</p>
            </div>
            
              </div>
            </>
          )}

          {activeTab === 'Resume' && (
            <>
              {/* Left Column: Main Resume Content */}
              <div className="lg:col-span-8 space-y-8">
                {/* Resume Card */}
                <div className="bg-[#ffffff] border border-[#e0c0b3] block-shadow relative overflow-hidden">
                  <div className="absolute left-0 top-0 w-1.5 h-16 bg-[#f46b24]"></div>
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-[#f46b24] flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>description</span>
                        </div>
                        <div>
                          <h2 className="font-['Poppins',_sans-serif] text-2xl font-bold text-[#276483] tracking-tight">Resume</h2>
                          <p className="font-['JetBrains_Mono',_monospace] text-sm text-[#594238] opacity-70 mt-1 uppercase">LAST_UPDATED: Oct 2023</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 w-full md:w-auto">
                        <button className="flex-grow md:flex-none bg-[#f46b24] text-white px-8 py-3 font-bold uppercase text-xs tracking-widest block-shadow hover:bg-[#f46b24] transition-all flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-sm">visibility</span>
                          View Resume
                        </button>
                        <button className="flex-grow md:flex-none border-2 border-[#8d7166] text-[#1b1c1c] px-8 py-3 font-bold uppercase text-xs tracking-widest hover:bg-[#f5f3f3] transition-all flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-sm">download</span>
                          Download
                        </button>
                      </div>
                    </div>
                    {/* Decorative Divider */}
                    <div className="my-10 h-[1px] bg-[#e0c0b3] w-full relative">
                      <div className="absolute top-0 left-1/4 w-4 h-4 border-t border-l border-[#e0c0b3] -translate-y-1/2 rotate-45 bg-[#ffffff]"></div>
                    </div>
                    {/* Resume Insights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="border-l-4 border-[#a3dcff] pl-4">
                        <span className="font-['JetBrains_Mono',_monospace] text-[10px] uppercase text-[#594238]">Profile Strength</span>
                        <div className="text-3xl font-bold text-[#1b1c1c] mt-1">88%</div>
                        <div className="w-full h-1 bg-[#efeded] mt-2">
                          <div className="h-full bg-[#a3dcff]" style={{ width: '88%' }}></div>
                        </div>
                      </div>
                      <div className="border-l-4 border-[#f46b24] pl-4">
                        <span className="font-['JetBrains_Mono',_monospace] text-[10px] uppercase text-[#594238]">View Count</span>
                        <div className="text-3xl font-bold text-[#1b1c1c] mt-1">24</div>
                        <p className="text-xs text-[#594238] mt-1">In the last 30 days</p>
                      </div>
                      <div className="border-l-4 border-[#c9855f] pl-4">
                        <span className="font-['JetBrains_Mono',_monospace] text-[10px] uppercase text-[#594238]">File Type</span>
                        <div className="text-3xl font-bold text-[#1b1c1c] mt-1">PDF</div>
                        <p className="text-xs text-[#594238] mt-1">1.2 MB Optimized</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Portfolio Upload */}
                <div className="mt-12">
                  <h3 className="font-['Poppins',_sans-serif] text-lg font-bold text-[#1b1c1c] mb-4 uppercase tracking-wider">Portfolio Resume</h3>
                  <div className="border-2 border-dashed border-[#e0c0b3] p-12 bg-[#ffffff] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white hover:border-[#f46b24] transition-all group">
                    <div className="w-16 h-16 rounded-full border-2 border-[#e0c0b3] flex items-center justify-center mb-4 group-hover:border-[#f46b24] group-hover:bg-[#ffdbcd] transition-colors">
                      <span className="material-symbols-outlined text-[#8d7166] group-hover:text-[#f46b24] transition-colors text-3xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>add</span>
                    </div>
                    <h4 className="font-['Poppins',_sans-serif] text-xl font-bold text-[#594238] group-hover:text-[#f46b24] transition-colors">+ Upload Resume</h4>
                    <p className="font-['Poppins',_sans-serif] text-sm text-[#594238] max-w-xs mt-2">Drag and drop your document here or browse your files. Supported: PDF, DOCX (Max 5MB)</p>
                  </div>
                </div>
              </div>

              {/* Right Column (Sidebar) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Tip Card */}
                <div className="bg-[#276483] text-[#fbf9f8] p-8 border-l-8 border-[#f46b24] relative overflow-hidden block-shadow">
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                    <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>lightbulb</span>
                  </div>
                  <p className="font-['JetBrains_Mono',_monospace] text-xs text-[#95cef1] uppercase tracking-widest mb-2">Resource</p>
                  <h4 className="font-['Poppins',_sans-serif] font-bold text-xl mb-3">Resume Tip</h4>
                  <p className="text-sm opacity-90 leading-relaxed">
                    Your resume is the blueprint of your career. Keep it updated with your latest IT certifications and hackathon wins to increase visibility among recruiters.
                  </p>
                </div>

                {/* Guidelines */}
                <div className="bg-[#ffffff] border border-[#e0c0b3] p-6 block-shadow">
                  <h4 className="font-['Poppins',_sans-serif] text-sm font-bold uppercase tracking-widest text-[#1b1c1c] mb-6 border-b border-[#e0c0b3] pb-2">Infobee Guidelines</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#f46b24] text-xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>check_circle</span>
                      <span className="text-xs font-['Poppins',_sans-serif] leading-relaxed">Ensure your file name follows: <code className="font-['JetBrains_Mono',_monospace] bg-[#efeded] px-1">Name_ID_Resume.pdf</code></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#f46b24] text-xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>check_circle</span>
                      <span className="text-xs font-['Poppins',_sans-serif] leading-relaxed">Mention your specialized domain (e.g., AI/ML, DevOps).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#f46b24] text-xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>check_circle</span>
                      <span className="text-xs font-['Poppins',_sans-serif] leading-relaxed">Update your GitHub links and portfolio projects.</span>
                    </li>
                  </ul>
                </div>

                {/* Affiliation */}
                <div className="bg-[#1b1c1c] text-[#fbf9f8] p-6 border-l-8 border-[#f46b24] relative overflow-hidden block-shadow">
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                    <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>terminal</span>
                  </div>
                  <p className="font-['JetBrains_Mono',_monospace] text-xs text-[#ffb596] uppercase tracking-widest mb-1">Affiliation</p>
                  <h4 className="font-['Poppins',_sans-serif] font-bold text-lg mb-2">Department of IT</h4>
                  <p className="text-xs opacity-70 leading-relaxed">Dr. Mahalingam College of Engineering and Technology, Pollachi.</p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'Coding & Portfolio' && (
            <>
              {/* Left Side: Technical Stats */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-[#ffffff] border border-[#e0c0b3] block-shadow relative overflow-hidden">
                  <div className="absolute left-0 top-0 w-1.5 h-16 bg-[#f46b24]"></div>
                  <div className="p-6 border-b border-[#e0c0b3] flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#f46b24]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>terminal</span>
                    <h2 className="font-['Poppins',_sans-serif] text-lg font-bold uppercase tracking-widest text-[#1b1c1c]">Technical Stats</h2>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="space-y-4 font-['JetBrains_Mono',_monospace] text-sm">
                      <div className="flex justify-between items-center border-b border-[#e0c0b3] pb-2">
                        <span className="text-[#594238]">Primary Language</span>
                        <span className="text-[#f46b24] font-bold">TypeScript / Python</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-[#e0c0b3] pb-2">
                        <span className="text-[#594238]">Global Rank</span>
                        <span className="text-[#f46b24] font-bold">Top 5%</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-[#e0c0b3] pb-2">
                        <span className="text-[#594238]">Open Source</span>
                        <span className="text-[#f46b24] font-bold">12 Contribs</span>
                      </div>
                    </div>
                    <button className="w-full bg-[#f46b24] text-[#ffffff] px-6 py-4 font-['Poppins',_sans-serif] font-bold uppercase text-sm tracking-widest block-shadow hover:brightness-105 transition-all flex justify-between items-center">
                      View Portfolio
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                </div>
                {/* Profile Summary / Project Core Decorative Card */}
                <div className="bg-[#276483] text-[#ffffff] p-8 border border-[#e0c0b3] block-shadow relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                    <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>dataset</span>
                  </div>
                  <div className="font-['JetBrains_Mono',_monospace] text-xs uppercase tracking-widest mb-4 opacity-70">Project Core</div>
                  <h3 className="font-['Poppins',_sans-serif] font-bold text-xl mb-4">Transforming digital identity through paper-logic architecture.</h3>
                  <p className="font-['Poppins',_sans-serif] text-sm opacity-90 leading-relaxed">Implementing zero-knowledge proofs in a Rust environment for high-security campus elections.</p>
                </div>
              </div>
              
              {/* Right Side: Platform Grid & Featured Project */}
              <div className="lg:col-span-8 space-y-8">
                {/* Platform Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* LinkedIn */}
                  <div className="bg-[#ffffff] border border-[#e0c0b3] p-6 flex flex-col justify-between block-shadow group hover:translate-y-[-2px] transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <span className="material-symbols-outlined text-[#f46b24] text-3xl">account_circle</span>
                      <span className="font-['JetBrains_Mono',_monospace] text-[10px] bg-[#a3dcff] text-[#236180] px-2 py-0.5 uppercase">Professional</span>
                    </div>
                    <div>
                      <h4 className="font-['Poppins',_sans-serif] font-extrabold text-[#276483] text-lg uppercase tracking-tight">LinkedIn</h4>
                      <a className="font-['JetBrains_Mono',_monospace] text-sm text-[#276483] opacity-70 hover:opacity-100 hover:text-[#f46b24] transition-all" href="#">in/arjun-k-prasad</a>
                    </div>
                  </div>
                  {/* GitHub */}
                  <div className="bg-[#ffffff] border border-[#e0c0b3] p-6 flex flex-col justify-between block-shadow group hover:translate-y-[-2px] transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <span className="material-symbols-outlined text-[#f46b24] text-3xl">code</span>
                      <span className="font-['JetBrains_Mono',_monospace] text-[10px] bg-[#ffdbcd] text-[#360f00] px-2 py-0.5 uppercase">Development</span>
                    </div>
                    <div>
                      <h4 className="font-['Poppins',_sans-serif] font-extrabold text-[#276483] text-lg uppercase tracking-tight">GitHub</h4>
                      <p className="font-['JetBrains_Mono',_monospace] text-xs text-[#594238] font-bold uppercase tracking-wider mb-1">42 repositories</p>
                      <a className="font-['JetBrains_Mono',_monospace] text-sm text-[#276483] opacity-70 hover:opacity-100 hover:text-[#f46b24] transition-all" href="#">@arjun-codes</a>
                    </div>
                  </div>
                  {/* LeetCode */}
                  <div className="bg-[#ffffff] border border-[#e0c0b3] p-6 flex flex-col justify-between block-shadow group hover:translate-y-[-2px] transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <span className="material-symbols-outlined text-[#f46b24] text-3xl">functions</span>
                      <span className="font-['JetBrains_Mono',_monospace] text-[10px] bg-[#a3dcff] text-[#236180] px-2 py-0.5 uppercase">Algorithms</span>
                    </div>
                    <div>
                      <h4 className="font-['Poppins',_sans-serif] font-extrabold text-[#276483] text-lg uppercase tracking-tight">LeetCode</h4>
                      <p className="font-['JetBrains_Mono',_monospace] text-xs text-[#594238] font-bold uppercase tracking-wider mb-1">320 solved</p>
                      <a className="font-['JetBrains_Mono',_monospace] text-sm text-[#276483] opacity-70 hover:opacity-100 hover:text-[#f46b24] transition-all" href="#">leetcode.com/u/arjun_prasad</a>
                    </div>
                  </div>
                  {/* HackerRank */}
                  <div className="bg-[#ffffff] border border-[#e0c0b3] p-6 flex flex-col justify-between block-shadow group hover:translate-y-[-2px] transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <span className="material-symbols-outlined text-[#f46b24] text-3xl">military_tech</span>
                      <span className="font-['JetBrains_Mono',_monospace] text-[10px] bg-[#ffdbcd] text-[#360f00] px-2 py-0.5 uppercase">Certification</span>
                    </div>
                    <div>
                      <h4 className="font-['Poppins',_sans-serif] font-extrabold text-[#276483] text-lg uppercase tracking-tight">HackerRank</h4>
                      <p className="font-['JetBrains_Mono',_monospace] text-xs text-[#594238] font-bold uppercase tracking-wider mb-1">12 Badges</p>
                      <a className="font-['JetBrains_Mono',_monospace] text-sm text-[#276483] opacity-70 hover:opacity-100 hover:text-[#f46b24] transition-all" href="#">hackerrank.com/arjun_p</a>
                    </div>
                  </div>
                  {/* CodeChef (Empty State) */}
                  <div className="bg-[#fbf9f8] border-2 border-dashed border-[#e0c0b3] p-6 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-[#f46b24] transition-colors min-h-[140px]">
                    <div className="w-10 h-10 bg-[#eae8e7] flex items-center justify-center mb-2 group-hover:bg-[#f46b24] transition-colors">
                      <span className="material-symbols-outlined text-[#8d7166] group-hover:text-[#ffffff] transition-colors">add</span>
                    </div>
                    <h4 className="font-['Poppins',_sans-serif] font-bold text-[#8d7166] group-hover:text-[#f46b24] uppercase text-xs tracking-widest">Connect CodeChef</h4>
                  </div>
                  {/* Kaggle */}
                  <div className="bg-[#ffffff] border border-[#e0c0b3] p-6 flex flex-col justify-between block-shadow group hover:translate-y-[-2px] transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <span className="material-symbols-outlined text-[#f46b24] text-3xl">analytics</span>
                      <span className="font-['JetBrains_Mono',_monospace] text-[10px] bg-[#a3dcff] text-[#236180] px-2 py-0.5 uppercase">Data Science</span>
                    </div>
                    <div>
                      <h4 className="font-['Poppins',_sans-serif] font-extrabold text-[#276483] text-lg uppercase tracking-tight">Kaggle</h4>
                      <p className="font-['JetBrains_Mono',_monospace] text-xs text-[#594238] font-bold uppercase tracking-wider mb-1">Expert Notebooks</p>
                      <a className="font-['JetBrains_Mono',_monospace] text-sm text-[#276483] opacity-70 hover:opacity-100 hover:text-[#f46b24] transition-all" href="#">kaggle.com/arjunkp</a>
                    </div>
                  </div>
                </div>
                {/* Featured Repository Bento Item */}
                <div className="bg-[#ffffff] border border-[#e0c0b3] block-shadow relative overflow-hidden group">
                  <div className="aspect-video w-full relative">
                    <img className="w-full h-full object-cover" data-alt="Featured project dashboard mockup" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8LMHzNSPH97YeSYdY-v8_rZkbgXiLmGl9L2u2hC6Ft23FrGJ3x6PhaC_mHFC2tF-GVcDCzwCVGmJVuYmMlhTaEPBMJOi5J1cxYqro4yaGBujXyhNvb7di6kgnv5m2eYks2xW23jbi5flBp9aciv9ygJgXWodQPkS_Epd-4vtHCc8wKyk7QxeOGNvjUdp5TfCJooRBBmtvI7h5sEDAL68AheCta8HIkcEe54Lwu7v_l3Soxf4Jxmn19_uhFmUUqTwTmEfteIesTKw" />
                    <div className="absolute bottom-0 left-0 bg-[#f46b24] text-[#ffffff] p-6 pr-12" style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 95% 100%, 0 100%)" }}>
                      <span className="font-['JetBrains_Mono',_monospace] text-[10px] uppercase font-bold tracking-widest block mb-1 opacity-80">Featured Repository</span>
                      <h2 className="font-['Poppins',_sans-serif] font-extrabold text-xl uppercase tracking-tight">DeVote - Secure Gov</h2>
                    </div>
                  </div>
                  <div className="p-6 bg-[#ffdbcd] hover:bg-[#f46b24] hover:text-[#ffffff] transition-all cursor-pointer text-center group/btn">
                    <span className="font-['Poppins',_sans-serif] font-bold uppercase tracking-widest text-xs">Explore All Projects</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
