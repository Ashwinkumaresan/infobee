import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Mail, Send, CheckCircle, Globe, Share2, Copy, Sparkles, Navigation, Info } from 'lucide-react';
import { ContactSubmission } from '../../types';

interface ContactProps {
  onNewSubmission: (submission: ContactSubmission) => void;
}

export default function Contact({ onNewSubmission }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    // Simulate network submission
    setTimeout(() => {
      const submission: ContactSubmission = {
        id: `sub-${Date.now()}`,
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      };

      onNewSubmission(submission);
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setName('');
      setEmail('');
      setMessage('');

      // Clear success banner after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText('Dr. Mahalingam College of Engineering and Technology, Pollachi, Tamil Nadu - 642003');
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <section id="contact" className="py-10 sm:py-16 bg-base border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <span className="text-xs font-bold font-mono tracking-widest text-brand-orange uppercase">
                GET IN TOUCH
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-none mt-2 mb-4">
                Connect With Us
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm font-sans mt-1">
                Have a question or want to collaborate? Reach out to the Infobee core committee.
              </p>
            </div>

            {/* Success Notification */}
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-sm flex items-start space-x-3"
              >
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Message Transmitted!</h4>
                  <p className="text-xs text-emerald-700 mt-1">
                    Your inquiry has been successfully logged. The Infobee core committee will reach out to you shortly.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name field */}
              <div className="relative border-b border-neutral-300 py-2 focus-within:border-brand-orange transition-colors">
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm font-sans text-gray-900 placeholder-neutral-400 mt-1"
                />
              </div>

              {/* Email field */}
              <div className="relative border-b border-neutral-300 py-2 focus-within:border-brand-orange transition-colors">
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@mcet.in"
                  className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm font-sans text-gray-900 placeholder-neutral-400 mt-1"
                />
              </div>

              {/* Message field */}
              <div className="relative border-b border-neutral-300 py-2 focus-within:border-brand-orange transition-colors">
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help?"
                  className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm font-sans text-gray-900 placeholder-neutral-400 mt-1 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold tracking-widest px-6 py-4 rounded-sm uppercase shadow-brutal transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>TRANSMITTING MESSAGE...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>SEND MESSAGE</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-xl font-bold text-gray-900 tracking-tight mb-6">
                  Department Details
                </h3>

                <ul className="space-y-5">
                  {/* Location address */}
                  <li className="flex items-start space-x-3.5 text-xs text-gray-600 leading-relaxed">
                    <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-semibold text-gray-900 font-display">Campus Location</span>
                      <span>Dr. Mahalingam College of Engineering and Technology, Pollachi, Tamil Nadu - 642003</span>
                    </div>
                  </li>

                  {/* Club Email */}
                  <li className="flex items-start space-x-3.5 text-xs text-gray-600">
                    <Mail className="w-5 h-5 text-brand-orange shrink-0" />
                    <div>
                      <span className="block font-semibold text-gray-900 font-display">Email Address</span>
                      <a href="mailto:infobee@drmcet.ac.in" className="hover:text-brand-orange transition-colors font-mono">
                        infobee@drmcet.ac.in
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
