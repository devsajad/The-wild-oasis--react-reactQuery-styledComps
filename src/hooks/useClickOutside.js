import { useEffect, useRef } from "react";

function useClickOutside(action, capturePhase) {
  const ref = useRef();

  useEffect(() => {
    function handleCloseModal(e) {
      if (!ref.current || ref.current.contains(e.target)) return;
      console.log("click outside close menu");
      action();
    }

    document.addEventListener("click", handleCloseModal, capturePhase);

    return () => {
      document.removeEventListener("click", handleCloseModal, capturePhase);
    };
  }, [action, capturePhase]);

  return ref;
}

export default useClickOutside;
