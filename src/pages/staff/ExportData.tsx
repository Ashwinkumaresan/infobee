import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ChevronLeft, Search, Loader2, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_URL } from '../../api';

export default function ExportData() {
  const navigate = useNavigate();
  
  const [columns, setColumns] = useState<any[]>([]);
  const [target, setTarget] = useState<'all' | 'mentees' | 'specific' | 'range'>('all');
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startRoll, setStartRoll] = useState('');
  const [endRoll, setEndRoll] = useState('');
  
  // State for selected columns - start empty, will be set when categories load
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showRangeModal, setShowRangeModal] = useState(false);
  const [rangeStep, setRangeStep] = useState<'start' | 'end'>('start');

  const rangeCount = useMemo(() => {
    if (!startRoll || !endRoll || students.length === 0) return 0;
    const start = startRoll < endRoll ? startRoll : endRoll;
    const end = startRoll > endRoll ? startRoll : endRoll;
    return students.filter(s => s.register_number >= start && s.register_number <= end).length;
  }, [startRoll, endRoll, students]);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const token = getCookie('access_token');
        const res = await fetch(`${API_URL}/staff/export/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setStudents(data.students || []);
          const fetchedColumns = data.columns || [];
          setColumns(fetchedColumns);
          if (fetchedColumns.length > 0) {
            setSelectedColumns(fetchedColumns.map((c: any) => c.id));
          }
        } else if (res.status === 401) {
          navigate('/staff/signin');
        }
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [navigate]);

  const filteredStudents = useMemo(() => {
    if (!searchQuery) return students;
    const lowerQ = searchQuery.toLowerCase();
    return students.filter(s => 
      s.name.toLowerCase().includes(lowerQ) || 
      s.register_number.toLowerCase().includes(lowerQ)
    );
  }, [students, searchQuery]);

  const toggleColumn = (id: string) => {
    setSelectedColumns(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleAllColumns = () => {
    const allIds = columns.map(c => c.id);
    const allSelected = allIds.every(id => selectedColumns.includes(id));
    
    if (allSelected) {
      setSelectedColumns([]);
    } else {
      setSelectedColumns(allIds);
    }
  };

  const toggleStudent = (regNo: string) => {
    setSelectedStudents(prev => 
      prev.includes(regNo) ? prev.filter(r => r !== regNo) : [...prev, regNo]
    );
  };

  const handleExport = async () => {
    if (selectedColumns.length === 0) {
      toast.error("Please select at least one column to export.");
      return;
    }
    if (target === 'specific' && selectedStudents.length === 0) {
      toast.error("Please select at least one student.");
      return;
    }
    if (target === 'range' && (!startRoll || !endRoll)) {
      toast.error("Please select both a start and end roll number.");
      return;
    }

    setExporting(true);
    try {
      const token = getCookie('access_token');
      const response = await fetch(`${API_URL}/staff/export/`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          target,
          selected_students: selectedStudents,
          selected_columns: selectedColumns,
          start_roll: startRoll,
          end_roll: endRoll
        })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `students_export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success("Export successful!");
      } else {
        toast.error("Failed to export data.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during export.");
    } finally {
      setExporting(false);
    }
  };

  // If specific target is selected but modal isn't open, ensure they can open it
  useEffect(() => {
    if (target === 'specific' && selectedStudents.length === 0) {
      setShowStudentModal(true);
    }
    if (target === 'range' && !startRoll && !endRoll) {
      setRangeStep('start');
      setShowRangeModal(true);
    }
  }, [target]);

  const handleRangeStudentSelect = (registerNumber: string) => {
    if (rangeStep === 'start') {
      setStartRoll(registerNumber);
      setSearchQuery('');
      setRangeStep('end');
    } else {
      setEndRoll(registerNumber);
      setShowRangeModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3f3] text-[#1b1c1c] pb-32 lg:pb-20">
      <style>{`
        .block-shadow {
            box-shadow: 4px 4px 0px 0px rgba(27, 28, 28, 0.1);
        }
      `}</style>
      
      <header className="bg-white border-b-4 border-[#1b1c1c] pt-6 md:pt-10 pb-6 md:pb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1b1c1c_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button 
            onClick={() => navigate('/staff/profile')}
            className="flex items-center gap-2 text-[#594238] hover:text-[#f46b24] mb-4 md:mb-6 font-bold text-xs md:text-sm tracking-wider uppercase transition-colors"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            Back to Staff Dashboard
          </button>
          
          <h1 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-[#1b1c1c] flex items-center gap-3 md:gap-4">
            <Download className="w-8 h-8 md:w-10 md:h-10 text-[#f46b24]" />
            Export Data
          </h1>
          <p className="mt-3 md:mt-4 text-[#8d7166] text-sm md:text-lg max-w-2xl font-medium">
            Select students and data columns to generate a custom CSV spreadsheet report.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Left Column: Target Selection */}
          <div className="lg:col-span-1 space-y-6 md:space-y-8">
            <div className="bg-white border border-[#e0c0b3] p-4 sm:p-6 lg:p-8 block-shadow">
              <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-[#1b1c1c] mb-6 border-b border-[#e0c0b3] pb-2">Target Audience</h2>
              
              <div className="space-y-4">
                <label className={`flex items-start gap-3 p-4 border transition-colors cursor-pointer ${target === 'all' ? 'border-[#f46b24] bg-[#fbf9f8]' : 'border-[#e0c0b3] hover:border-[#1b1c1c]'}`}>
                  <input type="radio" name="target" value="all" checked={target === 'all'} onChange={() => setTarget('all')} className="mt-1" />
                  <div>
                    <span className="block font-bold text-[#1b1c1c] uppercase tracking-wider text-sm mb-1">All Students</span>
                    <span className="block text-xs text-[#8d7166]">Export data for all students in the database.</span>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 border transition-colors cursor-pointer ${target === 'mentees' ? 'border-[#f46b24] bg-[#fbf9f8]' : 'border-[#e0c0b3] hover:border-[#1b1c1c]'}`}>
                  <input type="radio" name="target" value="mentees" checked={target === 'mentees'} onChange={() => setTarget('mentees')} className="mt-1" />
                  <div>
                    <span className="block font-bold text-[#1b1c1c] uppercase tracking-wider text-sm mb-1">My Mentees Only</span>
                    <span className="block text-xs text-[#8d7166]">Auto-select all students assigned to you as a mentor.</span>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-4 border transition-colors cursor-pointer ${target === 'specific' ? 'border-[#f46b24] bg-[#fbf9f8]' : 'border-[#e0c0b3] hover:border-[#1b1c1c]'}`}>
                  <input type="radio" name="target" value="specific" checked={target === 'specific'} onChange={() => setTarget('specific')} className="mt-1" />
                  <div>
                    <span className="block font-bold text-[#1b1c1c] uppercase tracking-wider text-sm mb-1">Specific Students</span>
                    <span className="block text-xs text-[#8d7166]">Search and manually select individual students.</span>
                  </div>
                </label>
                
                {target === 'specific' && (
                  <div className="pl-8">
                    <button
                      onClick={() => setShowStudentModal(true)}
                      className="bg-[#1b1c1c] text-white px-4 py-2 font-bold uppercase tracking-widest text-xs hover:bg-[#f46b24] transition-colors"
                    >
                      Select Students ({selectedStudents.length})
                    </button>
                  </div>
                )}
              </div>

              <div className={`border transition-colors ${target === 'range' ? 'border-[#f46b24] bg-[#fbf9f8]' : 'border-[#e0c0b3] hover:border-[#1b1c1c]'}`}>
                <label className="flex items-start gap-3 p-4 cursor-pointer">
                  <input type="radio" name="target" value="range" checked={target === 'range'} onChange={() => setTarget('range')} className="mt-1" />
                  <div>
                    <span className="block font-bold text-[#1b1c1c] uppercase tracking-wider text-sm mb-1">Roll Number Range</span>
                    <span className="block text-xs text-[#8d7166]">Export students between a start and end roll number.</span>
                  </div>
                </label>
                
                {target === 'range' && (
                  <div className="pl-8">
                    <button
                      onClick={() => {
                        setRangeStep('start');
                        setStartRoll('');
                        setEndRoll('');
                        setShowRangeModal(true);
                      }}
                      className="bg-[#1b1c1c] text-white px-4 py-2 font-bold uppercase tracking-widest text-xs hover:bg-[#f46b24] transition-colors"
                    >
                      Select Range {startRoll && endRoll ? `(${startRoll} - ${endRoll} : ${rangeCount} students)` : ''}
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Desktop Export Button */}
            <button 
              onClick={handleExport}
              disabled={exporting}
              className="hidden lg:flex w-full bg-[#f46b24] text-white py-4 font-sans font-bold uppercase tracking-widest block-shadow hover:bg-[#d55a1e] transition-colors items-center justify-center gap-2 disabled:opacity-70"
            >
              {exporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
              {exporting ? "Generating..." : "Generate CSV Report"}
            </button>
          </div>

          {/* Right Column: Column Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#e0c0b3] p-4 sm:p-6 lg:p-8 block-shadow">
              <div className="flex items-center justify-between mb-6 border-b border-[#e0c0b3] pb-2">
                <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-[#1b1c1c]">Data Columns</h2>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={toggleAllColumns}
                    className="text-[10px] uppercase font-bold tracking-wider text-[#f46b24] hover:underline"
                  >
                    {columns.length > 0 && columns.every(c => selectedColumns.includes(c.id)) ? "Deselect All" : "Select All"}
                  </button>
                  <span className="font-['JetBrains_Mono',_monospace] text-xs text-[#8d7166] font-bold">
                    {selectedColumns.length} / {columns.length} Selected
                  </span>
                </div>
              </div>
              
              {columns.length === 0 ? (
                <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-[#f46b24]" /></div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                  {columns.map((col: any) => (
                    <label key={col.id} className="flex items-center gap-3 cursor-pointer group" onClick={(e) => { e.preventDefault(); toggleColumn(col.id); }}>
                      <div className={`w-5 h-5 shrink-0 border flex items-center justify-center transition-colors ${selectedColumns.includes(col.id) ? 'bg-[#f46b24] border-[#f46b24]' : 'border-[#1b1c1c] group-hover:border-[#f46b24]'}`}>
                        {selectedColumns.includes(col.id) && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm font-medium text-[#594238] group-hover:text-[#1b1c1c] truncate" title={col.label}>{col.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          
        </div>
      </main>

      {/* Mobile Fixed Export Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t-2 border-[#1b1c1c] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-40">
        <button 
          onClick={handleExport}
          disabled={exporting}
          className="w-full bg-[#f46b24] text-white py-4 font-sans font-bold uppercase tracking-widest block-shadow hover:bg-[#d55a1e] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {exporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
          {exporting ? "Generating..." : "Generate CSV Report"}
        </button>
      </div>

      {/* Student Selection Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 bg-[#1b1c1c]/50 backdrop-blur-sm z-50 flex items-center justify-center p-0 sm:p-4">
          <div className="bg-white sm:border-2 border-[#1b1c1c] w-full h-full sm:h-auto sm:max-h-[85vh] sm:max-w-2xl flex flex-col sm:block-shadow">
            <div className="flex justify-between items-center p-6 border-b border-[#e0c0b3] bg-[#fbf9f8]">
              <h2 className="font-display font-bold text-2xl uppercase tracking-wider text-[#1b1c1c]">Select Students</h2>
              <button 
                onClick={() => setShowStudentModal(false)}
                className="text-[#8d7166] hover:text-[#f46b24] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 border-b border-[#e0c0b3]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8d7166] w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search by name or roll no..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f5f3f3] border border-[#e0c0b3] py-3 pl-12 pr-4 focus:outline-none focus:border-[#f46b24] font-['JetBrains_Mono',_monospace] text-sm"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-[#fbf9f8]">
              {loading ? (
                <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-[#f46b24]" /></div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredStudents.length === 0 ? (
                    <div className="col-span-full p-4 text-center text-sm text-[#8d7166]">No students found.</div>
                  ) : (
                    filteredStudents.map(student => (
                      <div 
                        key={student.register_number}
                        onClick={() => toggleStudent(student.register_number)}
                        className={`p-3 border cursor-pointer flex items-center justify-between transition-colors bg-white ${selectedStudents.includes(student.register_number) ? 'border-[#f46b24]' : 'border-[#e0c0b3] hover:border-[#1b1c1c]'}`}
                      >
                        <div className="overflow-hidden">
                          <div className="font-bold text-[#1b1c1c] text-sm truncate" title={student.name}>{student.name}</div>
                          <div className="font-['JetBrains_Mono',_monospace] text-xs text-[#8d7166]">{student.register_number}</div>
                        </div>
                        <div className={`w-5 h-5 shrink-0 border flex items-center justify-center transition-colors ${selectedStudents.includes(student.register_number) ? 'bg-[#f46b24] border-[#f46b24]' : 'border-[#1b1c1c]'}`}>
                          {selectedStudents.includes(student.register_number) && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-[#e0c0b3] flex justify-between items-center bg-white">
              <div className="text-sm font-bold text-[#8d7166]">
                <span className="text-[#f46b24] text-lg">{selectedStudents.length}</span> students selected
              </div>
              <button 
                onClick={() => setShowStudentModal(false)}
                className="bg-[#f46b24] text-white px-8 py-3 font-bold uppercase tracking-widest block-shadow hover:bg-[#d55a1e] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Range Selection Modal */}
      {showRangeModal && (
        <div className="fixed inset-0 bg-[#1b1c1c]/50 backdrop-blur-sm z-50 flex items-center justify-center p-0 sm:p-4">
          <div className="bg-white sm:border-2 border-[#1b1c1c] w-full h-full sm:h-auto sm:max-h-[85vh] sm:max-w-2xl flex flex-col sm:block-shadow">
            <div className="flex justify-between items-center p-6 border-b border-[#e0c0b3] bg-[#fbf9f8]">
              <h2 className="font-display font-bold text-xl uppercase tracking-wider text-[#1b1c1c]">
                {rangeStep === 'start' ? 'Select START Roll Number' : 'Select END Roll Number'}
              </h2>
              <button 
                onClick={() => setShowRangeModal(false)}
                className="text-[#8d7166] hover:text-[#f46b24] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 border-b border-[#e0c0b3]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8d7166] w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search by name or roll no..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f5f3f3] border border-[#e0c0b3] py-3 pl-12 pr-4 focus:outline-none focus:border-[#f46b24] font-['JetBrains_Mono',_monospace] text-sm"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-[#fbf9f8]">
              {loading ? (
                <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-[#f46b24]" /></div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredStudents.length === 0 ? (
                    <div className="col-span-full p-4 text-center text-sm text-[#8d7166]">No students found.</div>
                  ) : (
                    filteredStudents.map(student => {
                      const isStart = student.register_number === startRoll;
                      const isEnd = student.register_number === endRoll;
                      const isSelected = 
                        (rangeStep === 'start' && isStart) ||
                        (rangeStep === 'end' && isEnd);
                      
                      let borderClass = 'border-[#e0c0b3] hover:border-[#1b1c1c]';
                      if (isStart) borderClass = 'border-[#f46b24] bg-[#fbf9f8]';
                      else if (isSelected) borderClass = 'border-[#f46b24] bg-[#fbf9f8]';
                      
                      return (
                        <div 
                          key={student.register_number}
                          onClick={() => handleRangeStudentSelect(student.register_number)}
                          className={`p-3 border cursor-pointer flex items-center justify-between transition-colors bg-white ${borderClass}`}
                        >
                          <div className="overflow-hidden">
                            <div className="font-bold text-[#1b1c1c] text-sm truncate flex items-center gap-2" title={student.name}>
                              {student.name}
                              {isStart && <span className="text-[9px] bg-[#f46b24] text-white px-1.5 py-0.5 uppercase tracking-wider font-bold">Start</span>}
                            </div>
                            <div className="font-['JetBrains_Mono',_monospace] text-xs text-[#8d7166]">{student.register_number}</div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
