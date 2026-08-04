import React, { useState } from 'react';
import Hero from './Hero';
import Events from './Events';
import About from './About';
import Gallery from './Gallery';
import Programs from './Programs';
import Contact from './Contact';
import { RegisterModal, DetailsModal } from '../../components/Modals';
import { EventItem, ContactSubmission } from '../../types';

interface HomeProps {
  onNewContactSubmission: (submission: ContactSubmission) => void;
  registeredEventIds: string[];
  onRegisterSuccess: (eventId: string, ticketCode: string) => void;
  onNewRegistration: (eventId: string, ticketCode: string, name: string, email: string) => void;
  onOpenCalendar: () => void;
}

export default function Home({
  onNewContactSubmission,
  registeredEventIds,
  onRegisterSuccess,
  onNewRegistration,
  onOpenCalendar
}: HomeProps) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedEventForRegister, setSelectedEventForRegister] = useState<EventItem | null>(null);
  const [selectedEventForDetails, setSelectedEventForDetails] = useState<EventItem | null>(null);

  const handleRegisterClick = (event: EventItem) => {
    setSelectedEventForRegister(event);
    setIsRegisterOpen(true);
  };

  const handleViewDetailsClick = (event: EventItem) => {
    setSelectedEventForDetails(event);
    setIsDetailsOpen(true);
  };

  return (
    <>
      <Hero
        onExploreEventsClick={() => {
          document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onLearnMoreClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <Events
        onRegisterClick={handleRegisterClick}
        onCalendarClick={onOpenCalendar}
        onViewDetailsClick={handleViewDetailsClick}
        registeredEventIds={registeredEventIds}
      />

      <About
        onExploreEventsClick={() => {
          document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <Gallery />

      <Programs />

      <Contact onNewSubmission={onNewContactSubmission} />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        event={selectedEventForRegister}
        onRegisterSuccess={(eventId, code) => {
          onRegisterSuccess(eventId, code);
          if (selectedEventForRegister) {
            onNewRegistration(eventId, code, 'Attendee Student', 'student@mcet.in');
          }
        }}
      />

      <DetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        event={selectedEventForDetails}
      />
    </>
  );
}
