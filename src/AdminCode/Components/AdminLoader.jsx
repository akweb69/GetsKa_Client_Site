const AdminLoader = () => {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@300;400&display=swap');

        .loader-root {
          width: 100%;
          height: 90vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #0a0a0f;
          font-family: 'Syne', sans-serif;
          overflow: hidden;
          position: relative;
        }

        /* Background grid */
        .loader-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(232,255,71,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,255,71,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          animation: gridPulse 3s ease-in-out infinite;
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        /* Radial glow behind text */
        .loader-glow {
          position: absolute;
          width: 500px;
          height: 300px;
          background: radial-gradient(ellipse, rgba(232,255,71,0.08) 0%, transparent 70%);
          border-radius: 50%;
          animation: glowPulse 2.5s ease-in-out infinite;
        }
        @keyframes glowPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 1; }
        }

        .loader-center {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        /* Brand name */
        .loader-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .loader-name {
          font-size: clamp(42px, 8vw, 72px);
          font-weight: 800;
          letter-spacing: -2px;
          color: #f0f0f5;
          line-height: 1;
          animation: fadeSlideUp 0.6s ease both;
        }

        .loader-name span {
          color: #e8ff47;
        }

        .loader-sub {
          font-family: 'DM Mono', monospace;
          font-size: clamp(10px, 1.5vw, 13px);
          letter-spacing: 6px;
          color: #6b6b80;
          text-transform: uppercase;
          animation: fadeSlideUp 0.6s 0.15s ease both;
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Progress bar */
        .loader-bar-wrap {
          width: clamp(180px, 30vw, 280px);
          height: 2px;
          background: rgba(255,255,255,0.07);
          border-radius: 2px;
          overflow: hidden;
          animation: fadeSlideUp 0.6s 0.3s ease both;
        }

        .loader-bar {
          height: 100%;
          width: 0%;
          background: #e8ff47;
          border-radius: 2px;
          box-shadow: 0 0 12px rgba(232,255,71,0.6);
          animation: barFill 2.2s 0.4s cubic-bezier(0.4,0,0.2,1) forwards;
        }

        @keyframes barFill {
          0%   { width: 0%; }
          40%  { width: 55%; }
          70%  { width: 75%; }
          90%  { width: 90%; }
          100% { width: 100%; }
        }

        /* Status text */
        .loader-status {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          color: #6b6b80;
          text-transform: uppercase;
          animation: fadeSlideUp 0.6s 0.45s ease both, blink 1.4s 0.6s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* Corner decorations */
        .corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: rgba(232,255,71,0.3);
          border-style: solid;
          animation: fadeSlideUp 0.5s 0.6s ease both;
        }
        .corner-tl { top: -16px; left: -16px; border-width: 1.5px 0 0 1.5px; }
        .corner-tr { top: -16px; right: -16px; border-width: 1.5px 1.5px 0 0; }
        .corner-bl { bottom: -16px; left: -16px; border-width: 0 0 1.5px 1.5px; }
        .corner-br { bottom: -16px; right: -16px; border-width: 0 1.5px 1.5px 0; }

        /* Orbiting dots */
        .orbit {
          position: absolute;
          width: 320px;
          height: 320px;
          animation: spin 6s linear infinite;
          pointer-events: none;
        }

        .orbit-dot {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #e8ff47;
          box-shadow: 0 0 8px rgba(232,255,71,0.8);
          top: 0; left: 50%;
          transform: translateX(-50%);
        }

        .orbit-2 {
          width: 240px; height: 240px;
          animation: spin 4s linear infinite reverse;
          opacity: 0.4;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

            <div className="loader-root">
                <div className="loader-grid" />
                <div className="loader-glow" />

                {/* Orbit rings */}
                <div className="orbit" style={{ position: "absolute" }}>
                    <span className="orbit-dot" />
                </div>
                <div className="orbit orbit-2" style={{ position: "absolute" }}>
                    <span className="orbit-dot" />
                </div>

                <div className="loader-center">
                    {/* Corner brackets */}
                    <span className="corner corner-tl" />
                    <span className="corner corner-tr" />
                    <span className="corner corner-bl" />
                    <span className="corner corner-br" />

                    {/* Brand */}
                    <div className="loader-brand">
                        <div className="loader-name">
                            Gets<span>Ka</span>
                        </div>
                        <div className="loader-sub">Admin Panel</div>
                    </div>

                    {/* Progress */}
                    <div className="loader-bar-wrap">
                        <div className="loader-bar" />
                    </div>

                    {/* Status */}
                    <div className="loader-status">Initializing system...</div>
                </div>
            </div>
        </>
    );
};

export default AdminLoader;