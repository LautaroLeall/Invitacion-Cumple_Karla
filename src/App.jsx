// src/App.jsx
import { useState } from 'react';
import useAudio from './hooks/useAudio';
import ModalWelcome from './components/ModalWelcome/ModalWelcome';
import HeaderBanner from './components/HeaderBanner/HeaderBanner';
import SecondaryBanner from './components/SecondaryBanner/SecondaryBanner';
import SectionDay from './components/SectionDay/SectionDay';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import SectionPlace from './components/SectionPlace/SectionPlace';
import SectionLocation from './components/SectionLocation/SectionLocation';
import SectionGifts from './components/SectionGifts/SectionGifts';
import Footer from './components/Footer/Footer';
import FormModal from './components/FormModal/FormModal';
import MapModal from './components/MapModal/MapModal';
import GiftsModal from './components/GiftsModal/GiftsModal';
import InfoModal from './components/InfoModal/InfoModal';

function App() {
  const [modalOpen, setModalOpen] = useState(true);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [giftsOpen, setGiftsOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const { playing, play, toggle } = useAudio('/Enredados.mp3');

  const handleChooseMusic = (playMusic) => {
    if (playMusic) play();
    setModalOpen(false);
  };

  return (
    <div>
      <ModalWelcome isOpen={modalOpen} onChooseMusic={handleChooseMusic} />

      <HeaderBanner
        name="Karla"
        dateString="11 - 10 - 2025"
        subtitle="Se acerca el gran día, ¡no te lo pierdas!"
        targetDate="2025-10-11T11:00:00"
        backgroundImage="/banner-home.jpg"
      />

      <SecondaryBanner
        title="¡LLEGÓ EL GRAN DÍA!"
        subtitle="Mis 15 años"
      />

      <SectionDay
        title="Dia"
        startDate="2025-10-11T11:00:00"
        durationMinutes={180}
        location="Camino a San Agustin - Una Casa"
      />

      <AudioPlayer playing={playing} toggle={toggle} />

      <SectionPlace
        title="Lugar"
        placeName="Camino a San Agustin"
        address="Una Casa"
        onOpenRsvp={() => setRsvpOpen(true)}
      />

      <SectionLocation
        title="Ubicación"
        placeName="Camino a San Agustin"
        address="Una Casa"
        onOpenMap={() => setMapOpen(true)}
      />

      <SectionGifts
        headline="¡Tu presencia es el regalo más importante!"
        sub="Pero si deseas hacerme un obsequio podrás depositar en la siguiente cuenta:"
        btnText="VER CUENTA BANCARIA"
        onOpen={() => setGiftsOpen(true)}
      />

      <Footer
        phone="+54 9 3874 57-9414"
        placeName="Fiesta al mediodía"
        onOpenGifts={() => setGiftsOpen(true)}
        onOpenInfo={() => setInfoOpen(true)}
      />

      <FormModal isOpen={rsvpOpen} onClose={() => setRsvpOpen(false)} />
      <MapModal isOpen={mapOpen} onClose={() => setMapOpen(false)} />

      <GiftsModal isOpen={giftsOpen} onClose={() => setGiftsOpen(false)} />
      <InfoModal isOpen={infoOpen} onClose={() => setInfoOpen(false)} />
    </div>
  );
}

export default App;
