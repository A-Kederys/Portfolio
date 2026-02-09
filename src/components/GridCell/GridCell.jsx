import React, { useRef, useEffect } from 'react';
import NavButton from '../NavButton/NavButton';
import layoutStyles from '../../Layout.module.css';

function GridCell({ cellX, cellY, targets, moveTo, hideNavButtons, animateNavIn, children }) {
  const navButtonsRef = useRef(null);

  useEffect(() => {
    if (hideNavButtons && navButtonsRef.current?.contains(document.activeElement)) {
      document.activeElement?.blur();
    }
  }, [hideNavButtons]);

  return (
    <div
      className={layoutStyles.cell}
      style={{ left: `${cellX * 100}vw`, top: `${cellY * 100}vh` }}
    >
      <div className={layoutStyles.cellContent}>
        {children}
      </div>
      <div
        ref={navButtonsRef}
        className={`${layoutStyles.navButtons} ${hideNavButtons ? layoutStyles.navButtonsHidden : ''} ${animateNavIn ? layoutStyles.navButtonsFadeIn : ''}`}
        aria-hidden={hideNavButtons}
      >
        {targets.map(({ corner, label, x, y }) => (
          <NavButton
            key={`${x}-${y}`}
            position={corner}
            label={label}
            onClick={() => moveTo(x, y)}
          />
        ))}
      </div>
    </div>
  );
}

export default GridCell;
