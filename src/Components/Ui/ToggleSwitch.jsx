export const ToggleSwitch = ({ 
    checked, 
    onChange, 
    activeColor, 
    inactiveColor, 
    width = 30, 
    height = 18 
}) => {
    const knobSize = height - 4;
    const knobOffset = 2;
    const activePosition = width - knobSize - knobOffset;

    return (
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: checked ? activeColor : inactiveColor,
          borderRadius: `${height}px`,
          position: "relative",
          cursor: "pointer",
          transition: "background 0.3s ease"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: `${knobOffset}px`,
            left: checked ? `${activePosition}px` : `${knobOffset}px`,
            width: `${knobSize}px`,
            height: `${knobSize}px`,
            background: "#fff",
            borderRadius: "50%",
            transition: "left 0.3s ease",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)"
          }}
        />
      </div>
    );
  };