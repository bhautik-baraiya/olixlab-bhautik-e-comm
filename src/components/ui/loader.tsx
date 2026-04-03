export default function Loader() {
  const delays = [0, 110, 220, 330, 440, 330, 220, 110, 0];
  const colors = [
    "#6d28d9", "#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd",
    "#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9",
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-7">
      <div className="flex flex-col items-center gap-0.5">
        <div className="flex gap-[5px] items-end h-[52px]">
          {delays.map((delay, i) => (
            <div
              key={i}
              className="w-[5px] rounded-full"
              style={{
                height: "6px",
                background: colors[i],
                animation: `wave 1.1s ease-in-out ${delay}ms infinite`,
                boxShadow: `0 0 8px 2px ${colors[i]}55`,
              }}
            />
          ))}
        </div>
        <div className="flex gap-[5px] items-start h-4 opacity-15 scale-y-[-1]">
          {delays.map((_, i) => (
            <div key={i} className="w-[5px] h-2.5 rounded-full bg-violet-400" />
          ))}
        </div>
      </div>
      <span className="text-[11px] tracking-[0.18em] uppercase text-violet-400/40 font-sans">
        Loading
      </span>
    </div>
  );
}