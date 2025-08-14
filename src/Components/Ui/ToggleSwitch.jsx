export const ToggleSwitch = ({ checked, onChange, activeColor, inactiveColor }) => {
    return (
      <div
        onClick={onChange}
        style={{
          width: "30px",
          height: "18px",
          background: checked ? activeColor : inactiveColor,
          borderRadius: "20px",
          position: "relative",
          cursor: "pointer",
          transition: "background 0.3s ease"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "2px",
            left: checked ? "14px" : "2px",
            width: "14px",
            height: "14px",
            background: "#fff",
            borderRadius: "50%",
            transition: "left 0.3s ease"
          }}
        />
      </div>
    );
  };
  