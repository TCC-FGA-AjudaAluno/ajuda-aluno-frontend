import { Fragment } from "react";
import "./overlayRecovery.css";

export function OverlayRecovery({ isOpen, onClose, children }) {
  return (
    <Fragment>
      {isOpen && (
        <div className="overlayRecovery">
          <div className="overlayRecovery__background" onClick={onClose} />
          <div className="overlayRecovery__container">
            <div className="overlayRecovery__controls">
              <button
                className="overlayRecovery__close"
                type="button"
                onClick={onClose}
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default OverlayRecovery;