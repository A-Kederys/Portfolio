import { useState, useCallback, useRef, useEffect } from 'react';
import styles from './App.module.css';
import layoutStyles from './Layout.module.css';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import GridCell from './components/GridCell/GridCell';
import Profile from './components/Profile/Profile';
import Projects from './components/Projects/Projects';

const SECTIONS = [
  { x: 0, y: 0, label: 'Almantas K.' },
  { x: 1, y: 0, label: 'About' },
  { x: 0, y: 1, label: 'Contact' },
  { x: 1, y: 1, label: 'Projects' },
];

// Scroll flow: Hero → About → Projects → Contact → Hero
const SCROLL_ORDER = [
  { x: 0, y: 0 }, // Hero
  { x: 1, y: 0 }, // About
  { x: 1, y: 1 }, // Projects
  { x: 0, y: 1 }, // Contact
];

function getScrollIndex(x, y) {
  return SCROLL_ORDER.findIndex((s) => s.x === x && s.y === y);
}

const TRANSITION_MS = 1200;

const CORNER_BY_POS = {
  '0-0': 'topLeft',
  '1-0': 'topRight',
  '0-1': 'bottomLeft',
  '1-1': 'bottomRight',
};

function getTargets(cellX, cellY) {
  return SECTIONS.filter((s) => s.x !== cellX || s.y !== cellY).map((s) => ({
    corner: CORNER_BY_POS[`${s.x}-${s.y}`],
    label: s.label,
    x: s.x,
    y: s.y,
  }));
}

function App() {
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitioningFrom, setTransitioningFrom] = useState(null); // { x, y } - section we're leaving
  const viewportRef = useRef(null);
  const scrollCooldownRef = useRef(0);
  const transitionTimerRef = useRef(null);

  const moveTo = useCallback((x, y) => {
    if (x === currentX && y === currentY) return;
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    setTransitioningFrom({ x: currentX, y: currentY });
    setIsTransitioning(true);
    setCurrentX(x);
    setCurrentY(y);
    transitionTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setTransitioningFrom(null);
      transitionTimerRef.current = null;
    }, TRANSITION_MS);
  }, [currentX, currentY]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleWheel = (e) => {
      if (Date.now() < scrollCooldownRef.current) {
        e.preventDefault();
        return;
      }
      const idx = getScrollIndex(currentX, currentY);
      if (idx === -1) return;

      let nextX = currentX;
      let nextY = currentY;

      if (e.deltaY > 0) {
        // Scroll down: next section (Hero→About→Projects→Contact→Hero)
        const nextIdx = (idx + 1) % SCROLL_ORDER.length;
        nextX = SCROLL_ORDER[nextIdx].x;
        nextY = SCROLL_ORDER[nextIdx].y;
      } else if (e.deltaY < 0) {
        // Scroll up: previous section
        const prevIdx = idx === 0 ? SCROLL_ORDER.length - 1 : idx - 1;
        nextX = SCROLL_ORDER[prevIdx].x;
        nextY = SCROLL_ORDER[prevIdx].y;
      }

      if (nextX !== currentX || nextY !== currentY) {
        e.preventDefault();
        scrollCooldownRef.current = Date.now() + 300;
        moveTo(nextX, nextY);
      }
    };

    viewport.addEventListener('wheel', handleWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', handleWheel);
  }, [currentX, currentY, moveTo]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  const sliderStyle = {
    transform: `translate(-${currentX * 100}vw, -${currentY * 100}vh)`,
  };

  return (
    <div className={styles.App}>
      <div className={styles.mobileOverlay} aria-hidden="true">
        <div className={styles.mobileMessage}>
          <span className={styles.mobileIcon}>💻</span>
          <h2 className={styles.mobileTitle}>Designed for desktop</h2>
          <p className={styles.mobileText}>
            This portfolio is best viewed on a larger screen. Please open it on a desktop or tablet in landscape mode.
          </p>
          <p className={styles.mobileHint}>Peržiūrėkite didesniame ekrane</p>
        </div>
      </div>
      <div ref={viewportRef} className={`${layoutStyles.viewport} ${styles.viewportWrapper}`}>
        <div className={layoutStyles.slider} style={sliderStyle}>
          <GridCell
            cellX={0}
            cellY={0}
            targets={getTargets(0, 0)}
            moveTo={moveTo}
            hideNavButtons={isTransitioning && transitioningFrom?.x === 0 && transitioningFrom?.y === 0}
            animateNavIn={isTransitioning && currentX === 0 && currentY === 0}
          >
            <Profile moveTo={moveTo} />
          </GridCell>
          <GridCell
            cellX={1}
            cellY={0}
            targets={getTargets(1, 0)}
            moveTo={moveTo}
            hideNavButtons={isTransitioning && transitioningFrom?.x === 1 && transitioningFrom?.y === 0}
            animateNavIn={isTransitioning && currentX === 1 && currentY === 0}
          >
            <About cellX={1} cellY={0} />
          </GridCell>
          <GridCell
            cellX={0}
            cellY={1}
            targets={getTargets(0, 1)}
            moveTo={moveTo}
            hideNavButtons={isTransitioning && transitioningFrom?.x === 0 && transitioningFrom?.y === 1}
            animateNavIn={isTransitioning && currentX === 0 && currentY === 1}
          >
            <Contact cellX={0} cellY={1} />
          </GridCell>
          <GridCell
            cellX={1}
            cellY={1}
            targets={getTargets(1, 1)}
            moveTo={moveTo}
            hideNavButtons={isTransitioning && transitioningFrom?.x === 1 && transitioningFrom?.y === 1}
            animateNavIn={isTransitioning && currentX === 1 && currentY === 1}
          >
            <Projects cellX={1} cellY={1} />
          </GridCell>
        </div>
      </div>
    </div>
  );
}

export default App;
