import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Image as ImageIcon, X } from 'lucide-react';
import { API_URL } from '../../api';

interface EventImage {
  id: number;
  image: string;
}

interface GalleryEvent {
  id: number;
  name: string;
  event_type: string;
  date: string;
  description: string;
  images: EventImage[];
}

export default function EventGallery() {
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/gallery/`);
      if (!res.ok) throw new Error('Failed to fetch events');
      const data = await res.json();
      setEvents(data);
      setError('');
    } catch (err: any) {
      console.error('Failed to fetch events', err);
      setError('Failed to load gallery events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getFullImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/media/')) {
      return imagePath;
    }
    return `/media/${imagePath}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-base-muted">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 bg-base-muted">

      {/* Dark Hero Section */}
      <div className="relative bg-neutral-900 text-white py-10 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-800 overflow-hidden mb-8 sm:mb-12">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#F06C2510_1px,transparent_1px),linear-gradient(to_bottom,#F06C2510_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent"></div>
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[150px] sm:h-[300px] bg-brand-orange rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-brand-orange text-white text-[10px] sm:text-xs font-mono tracking-widest font-bold px-3 py-1 uppercase mb-3 sm:mb-4">
            <ImageIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
            <span>MEMORIES & MILESTONES</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-2 sm:mb-3">
            Event Gallery
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm md:text-base max-w-3xl leading-relaxed">
            A visual journey through the events, workshops, and milestones of the IT Student Association.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 mb-6 sm:mb-8">
            <p className="text-red-700 text-sm sm:text-base">{error}</p>
          </div>
        )}

        {/* Gallery Grid */}
        {events.length === 0 && !error ? (
          <div className="bg-white border border-neutral-200 p-8 sm:p-12 text-center shadow-card">
            <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2">No Events Found</h3>
            <p className="text-xs sm:text-sm text-gray-500">Check back later for photos from our upcoming events.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer bg-white border border-neutral-200 shadow-card hover:shadow-card-hover hover:border-brand-orange/50 transition-all duration-300 flex flex-col"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="relative aspect-video overflow-hidden border-b border-neutral-200 bg-neutral-100">
                  {event.images && event.images.length > 0 ? (
                    <img
                      src={getFullImageUrl(event.images[0].image)}
                      alt={event.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-100">
                      <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-300" />
                    </div>
                  )}
                  {/* Photo count badge */}
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white border border-neutral-200 text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:py-1 flex items-center shadow-card">
                    <ImageIcon className="w-3 h-3 mr-1" />
                    {event.images ? event.images.length : 0}
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                  <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-brand-orange mb-2">
                    {event.event_type}
                  </span>
                  <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 line-clamp-2 uppercase font-display tracking-tight">
                    {event.name}
                  </h3>
                  <div className="flex items-center text-[10px] sm:text-xs text-gray-500 mt-auto font-mono">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    {new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Event Images */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-white/95 backdrop-blur-md overflow-y-auto"
          >
            <div className="min-h-screen px-3 sm:px-4 py-6 sm:py-8 md:p-12 flex flex-col">
              {/* Modal Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 sticky top-0 z-10 bg-white/90 backdrop-blur p-3 sm:p-4 border border-neutral-200 shadow-card">
                <div className="flex-1 pr-4 min-w-0">
                  <h2 className="text-lg sm:text-xl md:text-3xl font-display font-extrabold text-gray-900 uppercase tracking-tight mb-1 sm:mb-2 break-words">
                    {selectedEvent.name}
                  </h2>
                  <div className="flex flex-wrap items-center text-neutral-500 font-mono text-[10px] sm:text-xs gap-2">
                    <span className="text-brand-orange font-bold">{selectedEvent.event_type}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                      {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="bg-neutral-900 text-white p-1.5 sm:p-2 hover:bg-brand-orange transition-colors shadow-brutal flex-shrink-0"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Images Grid */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
                {selectedEvent.images && selectedEvent.images.length > 0 ? (
                  selectedEvent.images.map((img, idx) => (
                    <motion.div
                      key={img.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="break-inside-avoid relative group"
                    >
                      <div className="border border-neutral-200 sm:border-2 sm:border-neutral-900 shadow-card sm:shadow-brutal-orange bg-white overflow-hidden">
                        <img
                          src={getFullImageUrl(img.image)}
                          alt={`${selectedEvent.name} photo ${idx + 1}`}
                          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
                          }}
                        />
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-16 sm:py-20 text-center text-neutral-400">
                    <ImageIcon className="w-10 h-10 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-sm sm:text-lg font-bold">No images uploaded for this event yet.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
