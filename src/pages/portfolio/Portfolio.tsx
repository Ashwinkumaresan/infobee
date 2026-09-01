import React, { useState } from 'react';
import { Github, TerminalSquare, Globe, Link as LinkIcon, ChevronDown, Plus, Minus, Lightbulb, Zap, Copy, Check } from 'lucide-react';

export default function PortfolioLanding() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const gitCommands = [
    { cmd: "git init", desc: "Initialize a new Git repository in your folder." },
    { cmd: "git add .", desc: "Stage all your project files." },
    { cmd: "git commit -m \"Initial portfolio commit\"", desc: "Commit the staged files." },
    { cmd: "git branch -M main", desc: "Ensure your primary branch is named 'main'." },
    { cmd: "git remote add origin https://github.com/yourusername/portfolio.git", desc: "Link your local code to your new GitHub repository.", note: "Important: Replace the URL above with your actual GitHub repository link!" },
    { cmd: "git push -u origin main", desc: "Push the code up to GitHub." }
  ];

  return (
    <div className="bg-white text-gray-900 font-poppins antialiased min-h-screen flex flex-col selection:bg-brand-orange selection:text-white">
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <section className="relative pt-20 sm:pt-24 pb-16 bg-white">
          <div className="relative bg-neutral-900 text-white py-10 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-800 overflow-hidden">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#F06C2510_1px,transparent_1px),linear-gradient(to_bottom,#F06C2510_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent"></div>
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[150px] sm:h-[300px] bg-brand-orange rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
              <div className="inline-flex items-center space-x-2 bg-brand-orange text-white text-[10px] sm:text-xs font-mono tracking-widest font-bold px-3 py-1 uppercase mb-3 sm:mb-4">
                <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                <span>INFOBEE • INFORMATION TECHNOLOGY</span>
              </div>
              <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
                Build Your Own <br /> <span className="text-brand-orange">Developer Portfolio</span>
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm md:text-md max-w-2xl leading-relaxed mb-8">
                Code it. Push it to GitHub. Host it live. This is the tangible proof of skill that modern tech recruiters are actually looking for.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <a className="inline-flex items-center justify-center bg-brand-orange text-white font-poppins font-bold uppercase tracking-wider px-6 py-3 text-xs sm:text-sm shadow-brutal hover:-translate-x-px hover:-translate-y-px transition-all w-full sm:w-auto" href="/Student_Portfolio_Guide.docx" download>
                  Start Building
                </a>
                <a className="inline-flex items-center justify-center bg-neutral-800 text-white font-poppins font-bold uppercase tracking-wider px-6 py-3 text-xs sm:text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-neutral-700 hover:bg-neutral-700 hover:-translate-x-px hover:-translate-y-px transition-all w-full sm:w-auto" href="#submit">
                  Submit Portfolio
                </a>
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 font-mono text-[10px] sm:text-xs text-gray-400 max-w-md">
                <span>⟨/⟩</span>
                <span>No drag-and-drop builders. Real code required.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. "Why Code This" Section */}
        <section className="py-10 sm:py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Text Block */}
              <div className="md:col-span-5 order-2 md:order-1 relative">
                <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-neutral-200 hidden md:block"></div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 uppercase tracking-tight">
                  Why Hand-Code It?
                </h2>
                <div className="space-y-4 sm:space-y-6 font-sans text-sm sm:text-sm text-gray-500 leading-relaxed">
                  <p>
                    A developer portfolio built with a website builder is like a mechanic bringing their car to another shop for an oil change. It defeats the purpose.
                  </p>
                  <p>
                    By coding this yourself from scratch, you demonstrate foundational web development skills like semantic structure, responsive styling, and modern deployment workflows. This is not just a showcase. The site itself is your first project.
                  </p>
                </div>
                {/* Tip Banners */}
                <div className="mt-8 sm:mt-10 space-y-4">
                  <div className="bg-brand-orange-light border border-brand-orange/30 p-4 flex items-start gap-3 sm:gap-4">
                    <span className="text-brand-orange text-lg mt-0.5 shrink-0">⟨/⟩</span>
                    <div>
                      <h4 className="font-poppins text-xs sm:text-sm font-bold uppercase mb-1 text-gray-900">Frameworks Allowed</h4>
                      <p className="font-mono text-xs sm:text-sm text-gray-500">While raw HTML/CSS is great, using React, Vue, or Tailwind CSS is highly encouraged to show modern tooling.</p>
                    </div>
                  </div>
                  <div className="bg-base-subtle border border-neutral-200 p-4 flex items-start gap-3 sm:gap-4">
                    <span className="text-brand-orange text-lg mt-0.5 shrink-0">☁</span>
                    <div>
                      <h4 className="font-poppins text-xs sm:text-sm font-bold uppercase mb-1 text-gray-900">Free Hosting</h4>
                      <p className="font-mono text-xs sm:text-sm text-gray-500">Deploy using modern PaaS solutions like Vercel, Netlify, or GitHub Pages. Connect your repository for CI/CD.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Block */}
              <div className="md:col-span-7 order-1 md:order-2">
                <div className="relative w-full aspect-video bg-base-subtle border-2 border-neutral-900 shadow-brutal overflow-hidden group">
                  {/* Code Graphic Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-orange to-brand-orange-hover flex items-center justify-center overflow-hidden">
                    <svg className="w-48 sm:w-64 h-48 sm:h-64 text-white opacity-20 transform -rotate-6 group-hover:rotate-0 transition-transform duration-700 ease-out" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </div>

                  {/* Browser Chrome */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex justify-between items-center bg-white px-3 sm:px-4 py-2 opacity-90 backdrop-blur-sm border border-neutral-200">
                    <div className="flex gap-1.5 sm:gap-2">
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-red-400"></div>
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-amber-400"></div>
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-green-400"></div>
                    </div>
                    <span className="font-mono text-xs sm:text-sm text-gray-500">index.html</span>
                  </div>
                </div>

                {/* Outcome Cards */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
                  <div className="bg-white border border-neutral-200 p-3 sm:p-4 text-center hover:border-brand-orange transition-colors shadow-card">
                    <span className="text-brand-orange text-xl sm:text-2xl mb-2 block">⌨</span>
                    <p className="font-poppins text-[10px] sm:text-xs font-bold uppercase text-gray-900">A Real Coded Portfolio</p>
                  </div>
                  <div className="bg-white border border-neutral-200 p-3 sm:p-4 text-center hover:border-brand-orange transition-colors shadow-card">
                    <span className="text-brand-orange text-xl sm:text-2xl mb-2 block">📂</span>
                    <p className="font-poppins text-[10px] sm:text-xs font-bold uppercase text-gray-900">A Public GitHub Repo</p>
                  </div>
                  <div className="bg-white border border-neutral-200 p-3 sm:p-4 text-center hover:border-brand-orange transition-colors shadow-card">
                    <span className="text-brand-orange text-xl sm:text-2xl mb-2 block">🌐</span>
                    <p className="font-poppins text-[10px] sm:text-xs font-bold uppercase text-gray-900">A Live Hosted Link</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Architecture Blueprint */}
        <section className="py-10 sm:py-16 px-4 sm:px-6 bg-base-muted border-t border-neutral-200 relative" id="requirements">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ background: "repeating-linear-gradient(45deg, transparent, transparent 40px, #78716C 40px, #78716C 41px)" }}></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-12 sm:mb-16 text-center md:text-left">
              <div className="w-12 sm:w-16 h-1 bg-brand-orange mb-4 mx-auto md:mx-0"></div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900 uppercase mb-3 sm:mb-4 tracking-tight">Architecture Blueprint</h2>
              <p className="font-sans text-sm sm:text-sm text-gray-500 max-w-3xl leading-relaxed">
                Sections needed in your portfolio.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 sm:gap-6 auto-rows-auto">
              {/* 1. Header/Navbar */}
              <div className="md:col-span-2 bg-white border border-neutral-200 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform shadow-card hover:shadow-card-hover">
                <div className="absolute top-0 right-0 bg-brand-orange text-white font-mono text-xs sm:text-sm px-2.5 sm:px-3 py-1 font-bold">01</div>
                <div>
                  <span className="text-brand-orange text-2xl sm:text-3xl mb-3 sm:mb-4 block">☰</span>
                  <h3 className="font-poppins text-sm sm:text-lg font-bold uppercase mb-2 text-gray-900">Header / Navbar</h3>
                  <p className="font-sans text-xs sm:text-sm text-gray-500">Sticky navigation for easy access to sections.</p>
                </div>
              </div>

              {/* 2. About/Hero */}
              <div className="md:col-span-4 bg-white border border-neutral-200 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform shadow-card hover:shadow-card-hover">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-brand-orange-light opacity-50"></div>
                <div className="absolute top-0 right-0 bg-brand-orange text-white font-mono text-xs sm:text-sm px-2.5 sm:px-3 py-1 font-bold z-10">02</div>
                <div className="relative z-10 max-w-md">
                  <span className="text-brand-orange text-2xl sm:text-3xl mb-3 sm:mb-4 block">👤</span>
                  <h3 className="font-poppins text-sm sm:text-lg font-bold uppercase mb-2 text-gray-900">Hero &amp; About</h3>
                  <p className="font-sans text-xs sm:text-sm text-gray-500">Your name, a professional tagline, and a brief summary of who you are and what you build.</p>
                </div>
              </div>

              {/* 3. Skills */}
              <div className="md:col-span-3 bg-white border border-neutral-200 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform shadow-card hover:shadow-card-hover">
                <div className="absolute top-0 right-0 bg-brand-orange text-white font-mono text-xs sm:text-sm px-2.5 sm:px-3 py-1 font-bold">03</div>
                <div>
                  <span className="text-brand-orange text-2xl sm:text-3xl mb-3 sm:mb-4 block">🛠</span>
                  <h3 className="font-poppins text-sm sm:text-lg font-bold uppercase mb-2 text-gray-900">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
                    <span className="font-mono text-xs bg-base-subtle px-2 py-1 border border-neutral-200">HTML/CSS</span>
                    <span className="font-mono text-xs bg-base-subtle px-2 py-1 border border-neutral-200">JavaScript</span>
                    <span className="font-mono text-xs bg-base-subtle px-2 py-1 border border-neutral-200">Frameworks</span>
                    <span className="font-mono text-xs bg-base-subtle px-2 py-1 border border-neutral-200">Git</span>
                  </div>
                </div>
              </div>

              {/* 4. Projects */}
              <div className="md:col-span-3 bg-brand-orange border border-neutral-900 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform shadow-brutal">
                <div className="absolute top-0 right-0 bg-neutral-900 text-white font-mono text-xs sm:text-sm px-2.5 sm:px-3 py-1 font-bold">04</div>
                <div>
                  <span className="text-white text-2xl sm:text-3xl mb-3 sm:mb-4 block">💻</span>
                  <h3 className="font-poppins text-sm sm:text-lg font-bold uppercase text-white mb-2">Projects</h3>
                  <p className="font-sans text-xs sm:text-sm text-white/80">The core of the site. Display at least three projects with descriptions, tech stacks, and repo/live links.</p>
                </div>
              </div>

              {/* 5. Experience */}
              <div className="md:col-span-2 bg-white border border-neutral-200 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform shadow-card hover:shadow-card-hover">
                <div className="absolute top-0 right-0 bg-brand-orange text-white font-mono text-xs sm:text-sm px-2.5 sm:px-3 py-1 font-bold">05</div>
                <div>
                  <span className="text-brand-orange text-2xl sm:text-3xl mb-3 sm:mb-4 block">🎓</span>
                  <h3 className="font-poppins text-sm sm:text-lg font-bold uppercase mb-2 text-gray-900">Experience</h3>
                  <p className="font-sans text-xs sm:text-sm text-gray-500">Timeline of education, bootcamps, or relevant work history.</p>
                </div>
              </div>

              {/* 6. Contact */}
              <div className="md:col-span-2 bg-white border border-neutral-200 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform shadow-card hover:shadow-card-hover">
                <div className="absolute top-0 right-0 bg-brand-orange text-white font-mono text-xs sm:text-sm px-2.5 sm:px-3 py-1 font-bold">06</div>
                <div>
                  <span className="text-brand-orange text-2xl sm:text-3xl mb-3 sm:mb-4 block">✉</span>
                  <h3 className="font-poppins text-sm sm:text-lg font-bold uppercase mb-2 text-gray-900">Contact</h3>
                  <p className="font-sans text-xs sm:text-sm text-gray-500">Links to LinkedIn, GitHub, and an email address.</p>
                </div>
              </div>

              {/* 7. Footer */}
              <div className="md:col-span-2 bg-neutral-100 border border-neutral-200 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform shadow-card hover:shadow-card-hover">
                <div className="absolute top-0 right-0 bg-brand-orange text-white font-mono text-xs sm:text-sm px-2.5 sm:px-3 py-1 font-bold">07</div>
                <div>
                  <span className="text-brand-orange text-2xl sm:text-3xl mb-3 sm:mb-4 block">▬</span>
                  <h3 className="font-poppins text-sm sm:text-lg font-bold uppercase mb-2 text-gray-900">Footer</h3>
                  <p className="font-sans text-xs sm:text-sm text-gray-500">Copyright info and quick links anchored at the bottom.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Step-by-Step Walkthrough */}
        <section className="py-10 sm:py-16 px-4 sm:px-6 bg-white border-t border-neutral-200">
          <div className="max-w-4xl mx-auto">
            <div className="w-12 sm:w-16 h-1 bg-brand-orange mb-4"></div>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 uppercase mb-8 sm:mb-12 tracking-tight">Step-by-Step Walkthrough</h2>

            <div className="relative border-l-2 border-neutral-200 ml-3 sm:ml-4 md:ml-6 space-y-8 sm:space-y-12 pb-8">
              {/* Step 1 */}
              <div className="relative pl-6 sm:pl-8 md:pl-12">
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-brand-orange border-2 border-neutral-900 rotate-45"></div>
                <h3 className="font-poppins text-sm sm:text-lg md:text-xl font-bold uppercase mb-3 sm:mb-4 text-gray-900 flex items-center gap-2 sm:gap-3">
                  <Github className="w-5 h-5 sm:w-6 sm:h-6 text-brand-orange shrink-0" /> Step 1: Create GitHub Repository
                </h3>
                <details className="group bg-white border border-neutral-200 shadow-card mb-4" open>
                  <summary className="font-poppins text-xs sm:text-sm font-bold uppercase p-3 sm:p-4 cursor-pointer hover:bg-base-subtle transition-colors flex justify-between items-center">
                    Instructions
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 group-open:rotate-180 transition-transform shrink-0" />
                  </summary>
                  <div className="p-3 sm:p-4 border-t border-neutral-200 font-sans text-xs sm:text-sm text-gray-500 space-y-2">
                    <p>1. Log in to your GitHub account.</p>
                    <p>2. Click the '+' icon and select 'New repository'.</p>
                    <p>3. Name your repository (e.g., <code className="bg-base-subtle px-1 py-0.5 text-brand-orange font-mono text-xs">portfolio-website</code>).</p>
                    <p>4. Keep it Public so we can review your code.</p>
                    <p>5. Do NOT initialize with a README (we'll push existing code).</p>
                  </div>
                </details>

                <div className="bg-brand-orange-light border border-brand-orange/30 p-3 sm:p-4 flex items-start gap-3 sm:gap-4">
                  <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-poppins text-xs sm:text-sm font-bold uppercase mb-1 text-gray-900">Pro Tip: Username</h4>
                    <p className="font-mono text-xs sm:text-sm text-gray-500">Ensure your GitHub username is professional (ideally some variation of your real name). This is your digital resume.</p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative pl-6 sm:pl-8 md:pl-12">
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-brand-orange border-2 border-neutral-900 rotate-45"></div>
                <h3 className="font-poppins text-sm sm:text-lg md:text-xl font-bold uppercase mb-3 sm:mb-4 text-gray-900 flex items-center gap-2 sm:gap-3">
                  <TerminalSquare className="w-5 h-5 sm:w-6 sm:h-6 text-brand-orange shrink-0" /> Step 2: Push Your Code
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-500 mb-4">Open your terminal in your project directory and run the following commands to push your local code to GitHub.</p>
                <div className="space-y-4 sm:space-y-6">
                  {gitCommands.map((item, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <p className="font-sans text-xs sm:text-sm text-gray-500 font-medium">
                        {index + 1}. {item.desc}
                        {item.note && (
                          <span className="block mt-1 text-brand-orange font-bold text-xs">{item.note}</span>
                        )}
                      </p>
                      <div className="bg-neutral-900 border border-neutral-700 overflow-hidden shadow-card">
                        <div className="flex justify-between items-center bg-neutral-800 border-b border-neutral-700 px-3 sm:px-4 py-1.5 sm:py-2">
                          <span className="font-mono text-[10px] sm:text-xs text-gray-400">Terminal</span>
                          <button
                            onClick={() => handleCopy(item.cmd, index)}
                            className="text-gray-400 hover:text-brand-orange transition-colors flex items-center gap-1 font-mono text-[10px] sm:text-xs"
                          >
                            {copiedIndex === index ? (
                              <><Check className="w-3 h-3 text-green-400" /> Copied</>
                            ) : (
                              <><Copy className="w-3 h-3" /> Copy</>
                            )}
                          </button>
                        </div>
                        <div className="p-2.5 sm:p-3 overflow-x-auto">
                          <pre className="font-mono text-xs sm:text-sm text-green-400"><code>{item.cmd}</code></pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative pl-6 sm:pl-8 md:pl-12">
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-brand-orange border-2 border-neutral-900 rotate-45"></div>
                <h3 className="font-poppins text-sm sm:text-lg md:text-xl font-bold uppercase mb-3 sm:mb-4 text-gray-900 flex items-center gap-2 sm:gap-3">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-brand-orange shrink-0" /> Step 3: Host with Vercel
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">Deploy your site globally in seconds using Vercel's free Hobby plan. Your approach depends on how you built your portfolio.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="bg-white border border-neutral-200 p-4 sm:p-6 shadow-card">
                    <h4 className="font-poppins text-sm sm:text-sm font-bold uppercase mb-2 sm:mb-3 text-brand-orange">Plain HTML/CSS/JS</h4>
                    <ul className="list-disc list-outside font-sans text-xs sm:text-sm text-gray-500 space-y-2 ml-4">
                      <li>Create an account at vercel.com with GitHub.</li>
                      <li>Click 'Add New Project' and import your repository.</li>
                      <li>Vercel will detect it's a static site. <strong className="text-gray-700">Leave all settings as default</strong>.</li>
                      <li>Click 'Deploy'. Your <code className="bg-base-subtle px-1 py-0.5 text-brand-orange font-mono text-xs">index.html</code> will be served instantly.</li>
                    </ul>
                  </div>

                  <div className="bg-base-subtle border border-neutral-200 p-4 sm:p-6 shadow-card">
                    <h4 className="font-poppins text-sm sm:text-sm font-bold uppercase mb-2 sm:mb-3 text-gray-700">Framework (React/Vite/Next)</h4>
                    <ul className="list-disc list-outside font-sans text-xs sm:text-sm text-gray-500 space-y-2 ml-4">
                      <li>Import your repository into Vercel.</li>
                      <li>Vercel usually auto-detects your framework. If not, select it from the Framework Preset dropdown.</li>
                      <li>Ensure the <strong className="text-gray-700">Build Command</strong> and <strong className="text-gray-700">Output Directory</strong> are correct.</li>
                      <li>Click 'Deploy' to build and host your app.</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-base-subtle border border-neutral-200 p-3 sm:p-4 flex items-start gap-3 sm:gap-4">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-poppins text-xs sm:text-sm font-bold uppercase mb-1 text-gray-900">Auto-Redeploy</h4>
                    <p className="font-mono text-xs sm:text-sm text-gray-500">Once connected, every time you <code className="bg-white px-1 py-0.5 text-brand-orange text-xs">git push</code> to your main branch, Vercel will automatically rebuild and update your live site!</p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative pl-6 sm:pl-8 md:pl-12">
                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-brand-orange border-2 border-neutral-900 rotate-45"></div>
                <h3 className="font-poppins text-sm sm:text-lg md:text-xl font-bold uppercase mb-3 sm:mb-4 text-gray-900 flex items-center gap-2 sm:gap-3">
                  <LinkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-orange shrink-0" /> Step 4: Add Links &amp; Submit
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed">Update your portfolio's Contact or Footer section to include the link to your GitHub repository. Once everything is live and working, submit your Vercel URL to the assignment portal below.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Final Checklist & FAQ */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-base-muted border-t border-neutral-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {/* Checklist */}
            <div>
              <div className="w-12 sm:w-16 h-1 bg-brand-orange mb-4"></div>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 uppercase mb-6 sm:mb-8 tracking-tight">Final Checklist</h2>
              <div className="bg-white border-l-4 border-brand-orange border border-neutral-200 p-6 sm:p-8 shadow-card">
                <ul className="space-y-3 sm:space-y-4">
                  {['All 7 sections present', 'Hand-coded', 'Projects showcased', 'Public repo', 'Live & loading', 'Links included'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-base-subtle border border-neutral-300 flex items-center justify-center shrink-0"></div>
                      <span className="font-poppins text-sm sm:text-sm font-bold uppercase text-gray-900">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <div className="w-12 sm:w-16 h-1 bg-neutral-300 mb-4"></div>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 uppercase mb-6 sm:mb-8 tracking-tight">Stuck? Common Fixes</h2>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { q: '"git command not found"', a: 'You need to install Git on your machine first. Download it from git-scm.com and restart your terminal.' },
                  { q: '"remote origin already exists"', a: 'Run git remote remove origin, then try adding the new remote URL again.' },
                  { q: 'Authentication / Token Rejection', a: 'GitHub requires a Personal Access Token (PAT) instead of a password for terminal pushes. Generate one in GitHub Settings > Developer Settings.' },
                  { q: 'Blank Vercel Deploy', a: 'Ensure your main HTML file is named exactly index.html and is in the root directory of your repository, not inside a subfolder.' },
                ].map((faq, i) => (
                  <details key={i} className="group bg-white border border-neutral-200 shadow-card">
                    <summary className="font-poppins text-xs sm:text-sm font-bold uppercase p-3 sm:p-4 cursor-pointer hover:bg-base-subtle transition-colors flex justify-between items-center">
                      <span className="pr-2">{faq.q}</span>
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-open:hidden shrink-0" />
                      <Minus className="w-4 h-4 sm:w-5 sm:h-5 hidden group-open:block shrink-0" />
                    </summary>
                    <div className="p-3 sm:p-4 border-t border-neutral-200 font-sans text-xs sm:text-sm text-gray-500 leading-relaxed">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Closing CTA */}
        <section className="relative py-10 sm:py-16 px-4 sm:px-6 bg-brand-orange text-white text-center border-t border-neutral-900 overflow-hidden" id="submit">
          {/* Coming Soon Overlay */}
          <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-md bg-black/5">
            <div className="bg-white/95 backdrop-blur-xl border-2 border-neutral-900 px-8 sm:px-12 py-6 sm:py-8 shadow-brutal flex flex-col items-center gap-3 mx-4">
              <span className="text-3xl sm:text-4xl">⏳</span>
              <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-widest">
                Coming Soon
              </span>
              <p className="font-sans text-xs sm:text-sm text-gray-500 max-w-xs text-center">
                The portfolio submission portal will open soon. Get your projects ready!
              </p>
            </div>
          </div>

          <div className="relative max-w-3xl mx-auto select-none pointer-events-none">
            <h2 className="font-display text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight uppercase mb-6 sm:mb-8">
              Ready to submit your portfolio?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <button className="bg-white text-brand-orange font-poppins font-bold uppercase tracking-wider px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base border-2 border-white opacity-70 w-full sm:w-auto" disabled>
                Submit Your Portfolio
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 sm:py-12 px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-8 max-w-7xl mx-auto">
        <div className="font-display text-lg sm:text-xl font-bold text-gray-900 uppercase tracking-widest">
          INFOBEE
        </div>
        <div className="font-sans text-xs sm:text-sm text-gray-500 text-center md:text-right font-mono">
          © {new Date().getFullYear()} Department of IT. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
