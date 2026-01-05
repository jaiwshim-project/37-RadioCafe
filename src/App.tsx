import React, { useState } from 'react';
import { STATIONS } from './data/stations';

export interface RadioStation {
  id: string;
  name: string;
  url: string;
  freq: string;
  color: string;
  logoText: string;
  provider: string;
}

import { useAudioPlayer } from './hooks/useAudioPlayer';
import {
  Play,
  Pause,
  Volume2,
  Heart,
  Loader2,
  Palette,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ThemeType = 'navy' | 'classic' | 'mono' | 'dark' | 'lineart' | 'gold' | 'forest';

const App: React.FC = () => {
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null);
  const [themeIndex, setThemeIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const themes: ThemeType[] = ['navy', 'classic', 'mono', 'dark', 'lineart', 'gold', 'forest'];
  const currentTheme = themes[themeIndex];

  const {
    isPlaying,
    togglePlay,
    volume,
    setVolume,
    isLoading,
    error
  } = useAudioPlayer(currentStation?.url || null);

  React.useEffect(() => {
    const body = document.body;
    themes.forEach(t => body.classList.remove(`theme-${t}`));
    if (currentTheme !== 'navy') {
      body.classList.add(`theme-${currentTheme}`);
    }
  }, [currentTheme]);

  const cycleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  const getThemeClass = () => {
    if (currentTheme === 'navy') return '';
    return `theme-${currentTheme}`;
  };

  return (
    <div className={`player-layout ${getThemeClass()}`}>
      {/* Dynamic Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '900', margin: 0, letterSpacing: '1px', color: 'var(--text-main)', cursor: 'default' }}>
          <span onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer', color: 'var(--accent)' }}>K</span>-RADIO
        </h2>
        <button
          onClick={cycleTheme}
          style={{
            background: 'var(--accent-muted)',
            border: 'none',
            color: 'var(--text-main)',
            padding: '10px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}
        >
          <Palette size={20} />
        </button>
      </div>

      {/* Tagline / Theme Name */}
      <div style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)', marginBottom: '20px' }}>
        Theme: {currentTheme}
      </div>

      {/* Main Content Area (Now largely empty or used for visuals) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 0.5 }}>
        {!currentStation && (
          <div style={{ textAlign: 'center', color: 'var(--text-main)' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '10px' }}>K-RADIO</h1>
            <p>방송국을 선택하여 청취하세요</p>
          </div>
        )}
      </div>

      {/* Bottom Player Area */}
      <div className="fixed-controls">
        {/* Horizontal Station Selector */}
        <div className="station-mini-grid">
          {STATIONS.map((station: RadioStation) => (
            <div
              key={station.id}
              className={`station-grid-item ${currentStation?.id === station.id ? 'active' : ''}`}
              onClick={() => setCurrentStation(station)}
            >
              <div className="icon-circle">
                <span style={{ fontSize: '10px', fontWeight: '900' }}>{station.logoText}</span>
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '9px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {station.provider}
              </div>
            </div>
          ))}
        </div>

        {currentStation && (
          <div className="control-card">
            {/* Track Info */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '10px', color: 'var(--accent)', letterSpacing: '2px', marginBottom: '4px', fontWeight: 'bold' }}>
                {currentStation.provider}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{currentStation.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-main)', opacity: 0.7 }}>{currentStation.freq}</div>
            </div>

            {/* Equalizer Animation Area */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <div className="wave-static">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                  <motion.div
                    key={i}
                    animate={isPlaying ? {
                      height: [
                        Math.random() * 10 + 5,
                        Math.random() * 25 + 5,
                        Math.random() * 10 + 5
                      ]
                    } : { height: 10 }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.5 + Math.random() * 0.4,
                      ease: "easeInOut"
                    }}
                    style={{
                      width: '4px',
                      background: 'var(--accent)',
                      borderRadius: '2px',
                      margin: '0 2px',
                      boxShadow: (currentTheme === 'dark' || currentTheme === 'mono' || currentTheme === 'lineart') ? 'none' : '0 0 8px var(--accent)'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Controls Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button style={{ background: 'none', border: 'none', color: 'var(--accent)' }}><Heart /></button>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  onClick={togglePlay}
                  className="play-main-btn"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : (isPlaying ? <Pause size={32} /> : <Play size={32} />)}
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Volume2 size={16} style={{ color: 'var(--accent)' }} />
                <input
                  type="range"
                  className="custom-slider"
                  style={{ width: '60px' }}
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                />
              </div>
            </div>

            {error && (
              <div style={{ color: '#ff4b4b', fontSize: '10px', textAlign: 'center', marginTop: '10px' }}>{error}</div>
            )}
          </div>
        )}

        {/* Footer info */}
        <footer className="player-footer">
          <div className="footer-line">
            <strong>K-RADIO</strong> | {' '}
            <a href="https://reactjs.org" target="_blank" rel="noreferrer" className="footer-link">React</a> • {' '}
            <a href="https://www.typescriptlang.org" target="_blank" rel="noreferrer" className="footer-link">TypeScript</a> • {' '}
            <a href="https://vitejs.dev" target="_blank" rel="noreferrer" className="footer-link">Vite</a> • {' '}
            <a href="https://www.framer.com/motion/" target="_blank" rel="noreferrer" className="footer-link">Framer Motion</a>
          </div>
          <div className="footer-line">
            © 2026 Developed by <a href="mailto:jvisualschool@gmail.com" className="footer-link"><strong>Jinho Jung</strong></a>
          </div>
        </footer>
      </div>

      {/* Splash Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <img src="splash.jpg" alt="Splash" className="splash-img" />
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '5px', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
              <div className="modal-body">
                <h2 className="modal-title">K-RADIO</h2>
                <div className="modal-text">
                  <p style={{ fontSize: '12px' }}>
                    <a href="https://reactjs.org" target="_blank" rel="noreferrer" className="footer-link">React</a> • {' '}
                    <a href="https://www.typescriptlang.org" target="_blank" rel="noreferrer" className="footer-link">TypeScript</a> • {' '}
                    <a href="https://vitejs.dev" target="_blank" rel="noreferrer" className="footer-link">Vite</a> • {' '}
                    <a href="https://www.framer.com/motion/" target="_blank" rel="noreferrer" className="footer-link">Framer Motion</a>
                  </p>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                  © 2026 Developed by <a href="mailto:jvisualschool@gmail.com" className="footer-link"><strong>Jinho Jung</strong></a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
