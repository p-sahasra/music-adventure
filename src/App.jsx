import { useState, useEffect, useRef } from "react";

// ─── Data ───────────────────────────────────────────────
const CHORDS = {
  C: {
    uke: { frets: [0, 0, 0, 3], fingers: ["", "", "", "3"], color: "#FF6B6B" },
    guitar: { frets: [-1, 3, 2, 0, 1, 0], fingers: ["x", "3", "2", "", "1", ""], color: "#FF6B6B" },
    emoji: "🌈",
    funName: "The Rainbow Chord",
    tip: "On ukulele, just ONE finger! Press your ring finger on the very last string, 3rd fret. Easy peasy!",
    guitarTip: "Three fingers in a diagonal line. Skip the thickest string when you strum!",
  },
  G: {
    uke: { frets: [0, 2, 3, 2], fingers: ["", "1", "3", "2"], color: "#4ECDC4" },
    guitar: { frets: [3, 2, 0, 0, 0, 3], fingers: ["2", "1", "", "", "", "3"], color: "#4ECDC4" },
    emoji: "🌊",
    funName: "The Ocean Chord",
    tip: "Three fingers on the ukulele — pointer, middle, and ring. It's like making a little claw!",
    guitarTip: "Fingers stretch wide — one on the thickest string, one on the next, and one on the thinnest!",
  },
  Am: {
    uke: { frets: [2, 0, 0, 0], fingers: ["2", "", "", ""], color: "#A78BFA" },
    guitar: { frets: [-1, 0, 2, 2, 1, 0], fingers: ["x", "", "2", "3", "1", ""], color: "#A78BFA" },
    emoji: "🌙",
    funName: "The Moonlight Chord",
    tip: "Another one-finger chord on uke! Middle finger, top string, 2nd fret. Sounds a little dreamy.",
    guitarTip: "Looks almost like C but shifted! Same shape, different strings.",
  },
  F: {
    uke: { frets: [2, 0, 1, 0], fingers: ["2", "", "1", ""], color: "#F59E0B" },
    guitar: { frets: [-1, -1, 3, 2, 1, 0], fingers: ["x", "x", "3", "2", "1", ""], color: "#F59E0B" },
    emoji: "☀️",
    funName: "The Sunshine Chord",
    tip: "Two fingers! Index on the second string, middle on the top string. Bright and happy!",
    guitarTip: "We play the easy version (Fmaj7). Only strum the thinnest 4 strings!",
  },
};

const WEEKS = [
  {
    id: 1,
    title: "The First Sound",
    subtitle: "Learn to hold, tune & strum + your first chord!",
    color: "#FF6B6B",
    bgLight: "#FFF1F0",
    chords: ["C"],
    emoji: "🎸",
    steps: [
      { icon: "🎵", title: "Tune Up!", text: "Use the free app GuitarTuna on a phone. It works for both instruments! Always tune before you play." },
      { icon: "🤗", title: "Hold Your Instrument", text: "Sit in a chair. Ukulele: rest it on your tummy, right arm holds it. Guitar: rest it on your right leg." },
      { icon: "👇", title: "First Strum!", text: "Don't press any strings yet. Just brush your finger (uke) or a pick (guitar) DOWN across all the strings. Count: 1-2-3-4!" },
      { icon: "🌈", title: "Learn C Major", text: "Your very first chord! Check the chord picture below. Press, strum, listen. Does it sound clear? Try again!" },
    ],
    practice: "Press the C chord → Strum 4 times → Lift your fingers → Put them back → Strum 4 more times. Repeat 5 times. Done!",
    songs: [],
  },
  {
    id: 2,
    title: "Your First Songs!",
    subtitle: "Add a second chord & play real music!",
    color: "#4ECDC4",
    bgLight: "#F0FFFE",
    chords: ["C", "G"],
    emoji: "🎶",
    steps: [
      { icon: "🌊", title: "Learn G (or G7)", text: "Check the chord picture. On ukulele it's 3 fingers — like a little claw shape!" },
      { icon: "🔄", title: "The Switch Game!", text: "C-C-C-C then switch to G-G-G-G then back to C-C-C-C. The switch will be slow and messy. That's perfect!" },
      { icon: "🎤", title: "Sing Along!", text: "Pick a song below. Strum the chord shown and SING. It doesn't matter if it sounds wobbly!" },
    ],
    practice: "Play the Switch Game for 3 minutes: C → G → C → G. Then pick ONE song and play it through twice.",
    songs: [
      { name: "Twinkle Twinkle", parts: [["C","Twinkle twinkle"],["G","little star,"],["C","How I wonder"],["G","what you are"]] },
      { name: "Row Your Boat", parts: [["C","Row, row, row your boat,"],["C","gently down the stream."],["G","Merrily merrily merrily merrily,"],["C","life is but a dream!"]] },
      { name: "Happy Birthday", parts: [["C","Happy birthday to"],["G","you, happy birthday to"],["C","you! Happy birthday dear"],["G","someone, happy birthday to"],["C","you!"]] },
    ],
  },
  {
    id: 3,
    title: "The Moonlight Chord",
    subtitle: "Am makes everything sound magical",
    color: "#A78BFA",
    bgLight: "#F5F0FF",
    chords: ["C", "G", "Am"],
    emoji: "✨",
    steps: [
      { icon: "🌙", title: "Learn Am", text: "On ukulele: just ONE finger on the top string! It sounds dreamy and a little mysterious." },
      { icon: "🔄", title: "Three-Way Switch", text: "C → G → Am → C → G → Am. Round and round! Go slow." },
      { icon: "🎵", title: "Feel the Mood", text: "Notice how Am sounds different from C? It's called a minor chord — it sounds like a cloudy day. C sounds sunny!" },
    ],
    practice: "Switch Game with all three: C → G → Am, 4 strums each. Then try a song!",
    songs: [
      { name: "You Are My Sunshine", parts: [["C","You are my"],["G","sunshine, my only"],["C","sunshine. You make me"],["G","happy when skies are"],["C","grey."]] },
    ],
  },
  {
    id: 4,
    title: "The Magic Four!",
    subtitle: "With F, you can play almost ANY song!",
    color: "#F59E0B",
    bgLight: "#FFFBEB",
    chords: ["C", "G", "Am", "F"],
    emoji: "🏆",
    steps: [
      { icon: "☀️", title: "Learn F", text: "The Sunshine Chord! Two fingers on ukulele. On guitar we play the easy version (Fmaj7)." },
      { icon: "🎯", title: "The Magic Pattern", text: "C → G → Am → F. This pattern is in HUNDREDS of famous songs. Once you know it, you have superpowers!" },
      { icon: "🌟", title: "You Did It!", text: "You know FOUR chords. That's enough to play along to almost anything on the radio. Seriously!" },
    ],
    practice: "The Magic Pattern: C → G → Am → F, strum each 4 times. Loop it! Try singing along to any song.",
    songs: [
      { name: "Let It Be", parts: [["C","When I find myself in"],["G","times of trouble,"],["Am","Mother Mary"],["F","comes to me,"],["C","Speaking words of"],["G","wisdom, let it"],["F","be."],["C",""]] },
      { name: "Somewhere Over the Rainbow", parts: [["C","Somewhere"],["G","over the rainbow,"],["Am","way up"],["F","high..."]] },
    ],
  },
];

const STRING_NAMES_UKE = ["G", "C", "E", "A"];
const STRING_NAMES_GTR = ["E", "A", "D", "G", "B", "e"];

// ─── Components ─────────────────────────────────────────

function ChordDiagram({ chord, instrument, size = "normal" }) {
  const data = CHORDS[chord];
  const inst = data[instrument === "guitar" ? "guitar" : "uke"];
  const numStrings = instrument === "guitar" ? 6 : 4;
  const stringNames = instrument === "guitar" ? STRING_NAMES_GTR : STRING_NAMES_UKE;
  const [plucked, setPlucked] = useState(null);

  const w = size === "small" ? 120 : (instrument === "guitar" ? 200 : 160);
  const h = size === "small" ? 150 : 200;
  const padding = size === "small" ? 20 : 30;
  const topY = size === "small" ? 35 : 45;
  const fretH = size === "small" ? 22 : 30;
  const strW = (w - padding * 2) / (numStrings - 1);
  const dotR = size === "small" ? 7 : 10;

  const handlePluck = (i) => {
    setPlucked(i);
    setTimeout(() => setPlucked(null), 400);
  };

  return (
    <div style={{ textAlign: "center", margin: size === "small" ? "4px" : "8px" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 4,
        background: inst.color + "22", padding: "4px 12px", borderRadius: 20,
      }}>
        <span style={{ fontSize: size === "small" ? 18 : 22 }}>{data.emoji}</span>
        <span style={{
          fontFamily: "'Fredoka', sans-serif", fontWeight: 600,
          fontSize: size === "small" ? 20 : 26, color: inst.color,
        }}>{chord}</span>
      </div>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block", margin: "0 auto" }}>
        {/* Nut */}
        <rect x={padding - 2} y={topY - 3} width={strW * (numStrings - 1) + 4} height={6} rx={3} fill="#5D4037" />
        {/* Fret lines */}
        {[1, 2, 3, 4].map(f => (
          <line key={f} x1={padding} y1={topY + f * fretH} x2={padding + strW * (numStrings - 1)} y2={topY + f * fretH} stroke="#D7CCC8" strokeWidth={2} />
        ))}
        {/* Strings */}
        {Array.from({ length: numStrings }).map((_, i) => (
          <g key={i} onClick={() => handlePluck(i)} style={{ cursor: "pointer" }}>
            <line
              x1={padding + i * strW} y1={topY}
              x2={padding + i * strW} y2={topY + 4 * fretH}
              stroke={plucked === i ? inst.color : "#8D6E63"}
              strokeWidth={plucked === i ? 3 : (instrument === "guitar" ? (2.5 - i * 0.3) : 1.8)}
            />
            {/* Tap area */}
            <rect x={padding + i * strW - 12} y={topY - 5} width={24} height={4 * fretH + 10} fill="transparent" />
          </g>
        ))}
        {/* Finger dots */}
        {inst.frets.map((fret, i) => {
          const x = padding + i * strW;
          if (fret === 0) {
            return <circle key={i} cx={x} cy={topY - 12} r={dotR - 3} fill="none" stroke="#66BB6A" strokeWidth={2} />;
          }
          if (fret === -1) {
            return <text key={i} x={x} y={topY - 7} textAnchor="middle" fontSize={size === "small" ? 10 : 13} fill="#EF5350" fontWeight={700}>✕</text>;
          }
          if (fret > 0) {
            const y = topY + (fret - 0.5) * fretH;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={dotR} fill={inst.color} />
                <text x={x} y={y + 4} textAnchor="middle" fontSize={size === "small" ? 9 : 11} fill="white" fontWeight={700}>
                  {inst.fingers[i]}
                </text>
              </g>
            );
          }
          return null;
        })}
        {/* String names */}
        {stringNames.map((name, i) => (
          <text key={i} x={padding + i * strW} y={topY + 4 * fretH + 16} textAnchor="middle" fontSize={10} fill="#8D6E63" fontFamily="'Fredoka', sans-serif">
            {name}
          </text>
        ))}
      </svg>
      <div style={{
        fontSize: 15, color: "#8D6E63", fontFamily: "'Fredoka', sans-serif",
        marginTop: -4,
      }}>
        {instrument === "guitar" ? "🎸 Guitar" : "🪕 Ukulele"} · tap a string!
      </div>
    </div>
  );
}

function SongCard({ song, expanded, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        background: "white", borderRadius: 20, padding: "16px 20px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)", cursor: "pointer",
        border: "2px solid " + (expanded ? "#4ECDC4" : "#F0F0F0"),
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 22, fontWeight: 600, color: "#2D3436" }}>
          🎵 {song.name}
        </span>
        <span style={{
          fontSize: 24, transition: "transform 0.3s",
          transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
        }}>▾</span>
      </div>
      {expanded && (
        <div style={{ marginTop: 12, lineHeight: 2.2 }}>
          {song.parts.map((part, i) => (
            <span key={i}>
              <span style={{
                display: "inline-block",
                background: CHORDS[part[0]]?.uke.color + "22",
                color: CHORDS[part[0]]?.uke.color,
                fontWeight: 700, borderRadius: 8, padding: "2px 8px",
                fontFamily: "'Fredoka', sans-serif", fontSize: 19,
                marginRight: 2,
              }}>{part[0]}</span>
              <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 20, color: "#2D3436", marginRight: 8 }}>
                {part[1]}{" "}
              </span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ProgressSticker({ weekId, dayIndex, completed, onToggle }) {
  const stickers = ["⭐", "🌟", "💫", "✨", "🎵", "🎶", "🎸"];
  return (
    <button
      onClick={onToggle}
      style={{
        width: 56, height: 56, borderRadius: 16,
        border: completed ? "none" : "2px dashed #DDD",
        background: completed ? "#FFF9C4" : "#FAFAFA",
        fontSize: completed ? 28 : 18,
        cursor: "pointer", transition: "all 0.3s ease",
        transform: completed ? "scale(1.1)" : "scale(1)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {completed ? stickers[dayIndex % stickers.length] : <span style={{ color: "#CCC" }}>○</span>}
    </button>
  );
}

function PracticeTracker({ week, progress, setProgress }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const key = `week${week.id}`;
  const weekProgress = progress[key] || Array(7).fill(false);
  const count = weekProgress.filter(Boolean).length;

  const toggle = (i) => {
    const updated = [...weekProgress];
    updated[i] = !updated[i];
    setProgress({ ...progress, [key]: updated });
  };

  return (
    <div style={{
      background: week.bgLight, borderRadius: 24, padding: "20px 24px",
      border: `2px solid ${week.color}33`,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 20, fontWeight: 600, color: week.color }}>
          Week {week.id} Practice
        </span>
        <span style={{
          background: count === 7 ? "#66BB6A" : week.color,
          color: "white", borderRadius: 20, padding: "4px 12px",
          fontFamily: "'Fredoka', sans-serif", fontSize: 17, fontWeight: 600,
        }}>
          {count === 7 ? "🏆 PERFECT WEEK!" : `${count}/7 days`}
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 4 }}>
        {days.map((day, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 15, color: "#999", fontFamily: "'Fredoka', sans-serif", marginBottom: 4 }}>{day}</div>
            <ProgressSticker weekId={week.id} dayIndex={i} completed={weekProgress[i]} onToggle={() => toggle(i)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function WeekPage({ week, progress, setProgress }) {
  const [expandedSong, setExpandedSong] = useState(null);
  const [showInstrument, setShowInstrument] = useState("uke");

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 20px 40px" }}>
      {/* Week Header */}
      <div style={{
        textAlign: "center", padding: "32px 20px 24px",
        background: `linear-gradient(135deg, ${week.color}15, ${week.color}08)`,
        borderRadius: 32, marginBottom: 24,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -20, right: -20, fontSize: 110, opacity: 0.08,
          transform: "rotate(15deg)",
        }}>{week.emoji}</div>
        <div style={{
          fontSize: 56, marginBottom: 8,
          animation: "bounce 2s ease infinite",
        }}>{week.emoji}</div>
        <h2 style={{
          fontFamily: "'Fredoka', sans-serif", fontSize: 34, fontWeight: 700,
          color: week.color, margin: "0 0 4px",
        }}>
          Week {week.id}: {week.title}
        </h2>
        <p style={{
          fontFamily: "'Nunito', sans-serif", fontSize: 20,
          color: "#666", margin: 0,
        }}>{week.subtitle}</p>
      </div>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        {week.steps.map((step, i) => (
          <div key={i} style={{
            display: "flex", gap: 16, alignItems: "flex-start",
            background: "white", borderRadius: 20, padding: "16px 20px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            borderLeft: `4px solid ${week.color}`,
          }}>
            <div style={{
              fontSize: 34, minWidth: 60, height: 60,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: week.bgLight, borderRadius: 14,
            }}>{step.icon}</div>
            <div>
              <div style={{
                fontFamily: "'Fredoka', sans-serif", fontSize: 20, fontWeight: 600,
                color: "#2D3436", marginBottom: 2,
              }}>{step.title}</div>
              <div style={{
                fontFamily: "'Nunito', sans-serif", fontSize: 18, lineHeight: 1.5,
                color: "#636E72",
              }}>{step.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Chord Diagrams */}
      {week.chords.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h3 style={{
            fontFamily: "'Fredoka', sans-serif", fontSize: 24, fontWeight: 600,
            color: "#2D3436", textAlign: "center", marginBottom: 12,
          }}>
            {week.chords.length === 1 ? "Your Chord" : "Your Chords"}
          </h3>

          {/* Instrument toggle */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 16 }}>
            {[
              { key: "uke", label: "🪕 Ukulele" },
              { key: "guitar", label: "🎸 Guitar" },
            ].map(opt => (
              <button
                key={opt.key}
                onClick={() => setShowInstrument(opt.key)}
                style={{
                  fontFamily: "'Fredoka', sans-serif", fontSize: 18, fontWeight: 600,
                  padding: "8px 20px", borderRadius: 20, border: "none", cursor: "pointer",
                  background: showInstrument === opt.key ? week.color : "#F0F0F0",
                  color: showInstrument === opt.key ? "white" : "#999",
                  transition: "all 0.2s ease",
                }}
              >{opt.label}</button>
            ))}
          </div>

          <div style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12,
            background: "white", borderRadius: 24, padding: 20,
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}>
            {week.chords.map(ch => (
              <div key={ch}>
                <ChordDiagram
                  chord={ch}
                  instrument={showInstrument}
                  size={week.chords.length > 2 ? "small" : "normal"}
                />
              </div>
            ))}
          </div>

          {/* Chord tips */}
          {week.chords.length <= 2 && (
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              {week.chords.map(ch => (
                <div key={ch} style={{
                  background: CHORDS[ch].uke.color + "11",
                  borderRadius: 16, padding: "12px 16px",
                  fontFamily: "'Nunito', sans-serif", fontSize: 18, color: "#555", lineHeight: 1.5,
                }}>
                  <strong style={{ color: CHORDS[ch].uke.color }}>{CHORDS[ch].emoji} {CHORDS[ch].funName}:</strong>{" "}
                  {showInstrument === "guitar" ? CHORDS[ch].guitarTip : CHORDS[ch].tip}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Daily Practice */}
      <div style={{
        background: `linear-gradient(135deg, ${week.color}12, ${week.color}06)`,
        borderRadius: 24, padding: "20px 24px", marginBottom: 28,
        border: `2px dashed ${week.color}44`,
      }}>
        <div style={{
          fontFamily: "'Fredoka', sans-serif", fontSize: 20, fontWeight: 600,
          color: week.color, marginBottom: 8,
        }}>📋 Daily Practice (10–15 min)</div>
        <div style={{
          fontFamily: "'Nunito', sans-serif", fontSize: 19, color: "#444", lineHeight: 1.6,
        }}>{week.practice}</div>
      </div>

      {/* Songs */}
      {week.songs.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h3 style={{
            fontFamily: "'Fredoka', sans-serif", fontSize: 24, fontWeight: 600,
            color: "#2D3436", textAlign: "center", marginBottom: 12,
          }}>🎵 Songs to Try</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {week.songs.map((song, i) => (
              <SongCard
                key={i}
                song={song}
                expanded={expandedSong === i}
                onToggle={() => setExpandedSong(expandedSong === i ? null : i)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Progress Tracker */}
      <PracticeTracker week={week} progress={progress} setProgress={setProgress} />
    </div>
  );
}

// ─── Tuning Reference ───────────────────────────────────
function TuningPage() {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 20px 40px" }}>
      <div style={{
        textAlign: "center", padding: "32px 20px 24px",
        background: "linear-gradient(135deg, #FF6B6B15, #4ECDC415)",
        borderRadius: 32, marginBottom: 24,
      }}>
        <div style={{ fontSize: 56, marginBottom: 8 }}>🎵</div>
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 34, fontWeight: 700, color: "#2D3436", margin: "0 0 4px" }}>
          Before We Play!
        </h2>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 20, color: "#666", margin: 0 }}>
          Tuning, holding &amp; strumming basics
        </p>
      </div>

      {/* Tuning */}
      <div style={{ background: "white", borderRadius: 24, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.04)", marginBottom: 16 }}>
        <h3 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 24, color: "#FF6B6B", margin: "0 0 12px" }}>🎯 Step 1: Tune Up!</h3>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 19, color: "#555", lineHeight: 1.6, margin: "0 0 16px" }}>
          Download the free app <strong>GuitarTuna</strong> on a phone. It works for both instruments! Tune together every time.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: "#FFF1F0", borderRadius: 16, padding: "14px 18px" }}>
            <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 19, fontWeight: 600, color: "#FF6B6B", marginBottom: 4 }}>🪕 Ukulele Strings</div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", margin: "8px 0" }}>
              {["G", "C", "E", "A"].map((s, i) => (
                <div key={i} style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: "white", display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Fredoka', sans-serif", fontSize: 24, fontWeight: 700, color: "#FF6B6B",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}>{s}</div>
              ))}
            </div>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 17, color: "#999", textAlign: "center" }}>
              Remember: <strong>G</strong>oats <strong>C</strong>an <strong>E</strong>at <strong>A</strong>nything 🐐
            </div>
          </div>
          <div style={{ background: "#F0FFFE", borderRadius: 16, padding: "14px 18px" }}>
            <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 19, fontWeight: 600, color: "#4ECDC4", marginBottom: 4 }}>🎸 Guitar Strings</div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "8px 0" }}>
              {["E", "A", "D", "G", "B", "e"].map((s, i) => (
                <div key={i} style={{
                  width: 46, height: 46, borderRadius: 12,
                  background: "white", display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Fredoka', sans-serif", fontSize: 22, fontWeight: 700, color: "#4ECDC4",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}>{s}</div>
              ))}
            </div>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 17, color: "#999", textAlign: "center" }}>
              <strong>E</strong>very <strong>A</strong>mazing <strong>D</strong>og <strong>G</strong>oes <strong>B</strong>arking <strong>E</strong>verywhere 🐕
            </div>
          </div>
        </div>
      </div>

      {/* Holding */}
      <div style={{ background: "white", borderRadius: 24, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.04)", marginBottom: 16 }}>
        <h3 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 24, color: "#A78BFA", margin: "0 0 12px" }}>🤗 Step 2: How to Hold It</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { inst: "🪕 Ukulele", text: "Sit in a chair. Rest the ukulele on your tummy. Your right arm hugs it gently. Left hand wraps around the neck — thumb goes behind!", color: "#FF6B6B" },
            { inst: "🎸 Guitar", text: "Sit in a chair. The guitar body sits on your right leg. Your right arm rests over the top. Left hand wraps around the neck — thumb behind!", color: "#4ECDC4" },
          ].map((item, i) => (
            <div key={i} style={{ background: item.color + "11", borderRadius: 16, padding: "12px 16px" }}>
              <div style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600, color: item.color, marginBottom: 4 }}>{item.inst}</div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 18, color: "#555", lineHeight: 1.5 }}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Strumming */}
      <div style={{ background: "white", borderRadius: 24, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.04)", marginBottom: 16 }}>
        <h3 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 24, color: "#F59E0B", margin: "0 0 12px" }}>👇 Step 3: First Strum!</h3>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 19, color: "#555", lineHeight: 1.6, margin: "0 0 12px" }}>
          Don't press any strings yet! Just strum down across all the strings.
        </p>
        <div style={{
          background: "#FFFBEB", borderRadius: 16, padding: 16, textAlign: "center",
          border: "2px dashed #F59E0B44",
        }}>
          <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 28, color: "#F59E0B", fontWeight: 700 }}>
            ⬇️ 1 &nbsp; ⬇️ 2 &nbsp; ⬇️ 3 &nbsp; ⬇️ 4
          </div>
          <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 18, color: "#999", marginTop: 6 }}>
            Count out loud and strum DOWN on each number!
          </div>
        </div>
      </div>

      {/* Sore fingers note */}
      <div style={{
        background: "linear-gradient(135deg, #FF6B6B11, #A78BFA11)",
        borderRadius: 20, padding: "16px 20px",
        border: "2px solid #FF6B6B22",
      }}>
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 19, fontWeight: 600, color: "#FF6B6B", marginBottom: 4 }}>
          🩹 About Sore Fingers...
        </div>
        <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 18, color: "#666", lineHeight: 1.5 }}>
          Your fingertips will feel sore for the first couple of weeks. That's totally normal!
          Your fingers are building tougher skin called <strong>calluses</strong>.
          Don't push through real pain — just practise for 10 minutes and stop. It gets easier every day!
        </div>
      </div>
    </div>
  );
}

// ─── Tips Page ──────────────────────────────────────────
function TipsPage() {
  const tips = [
    { emoji: "⏱️", title: "Keep it short", text: "10–15 minutes is plenty. Stop before she wants to stop — leaving her wanting more is better than pushing until she's frustrated." },
    { emoji: "📅", title: "Make it a routine", text: "\"After dinner, we do music\" works better than making it a reward. Like bedtime reading — it's just something you do together." },
    { emoji: "🎤", title: "Sing along!", text: "Play songs she already knows the words to. Singing while strumming even one chord feels like REAL music." },
    { emoji: "😂", title: "You don't need to be good", text: "Mess up. Laugh about it. Say \"Let me try that again.\" She's learning more from watching you handle difficulty than from any chord." },
    { emoji: "🎯", title: "One song at a time", text: "Don't jump between songs. Pick one, play it every day for a week. The sense of mastery builds motivation." },
    { emoji: "🤝", title: "\"Let's both check\"", text: "If something sounds off, say \"Let's both check our fingers\" instead of pointing out her mistakes. Self-correction builds more." },
    { emoji: "🛋️", title: "Leave it out", text: "Keep her ukulele somewhere she can grab it anytime — on the couch, her room, NOT in a case in a closet. Spontaneous noodling is where interest grows." },
    { emoji: "🔥", title: "Celebrate the streak", text: "\"We played 5 days in a row!\" matters more than \"You played that perfectly.\" Build the habit; skill follows." },
  ];

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 20px 40px" }}>
      <div style={{
        textAlign: "center", padding: "32px 20px 24px",
        background: "linear-gradient(135deg, #A78BFA15, #F59E0B15)",
        borderRadius: 32, marginBottom: 24,
      }}>
        <div style={{ fontSize: 56, marginBottom: 8 }}>💡</div>
        <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 34, fontWeight: 700, color: "#2D3436", margin: "0 0 4px" }}>
          Tips for Grown-Ups
        </h2>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 20, color: "#666", margin: 0 }}>
          How to keep music time fun, not a chore
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {tips.map((tip, i) => (
          <div key={i} style={{
            background: "white", borderRadius: 20, padding: "16px 20px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            display: "flex", gap: 14, alignItems: "flex-start",
          }}>
            <div style={{
              fontSize: 28, minWidth: 60, height: 60,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "#F8F8F8", borderRadius: 14,
            }}>{tip.emoji}</div>
            <div>
              <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 20, fontWeight: 600, color: "#2D3436", marginBottom: 2 }}>
                {tip.title}
              </div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 18, color: "#636E72", lineHeight: 1.5 }}>
                {tip.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shopping list */}
      <div style={{
        background: "#F0FFFE", borderRadius: 24, padding: "20px 24px", marginTop: 24,
        border: "2px solid #4ECDC433",
      }}>
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: 22, fontWeight: 600, color: "#4ECDC4", marginBottom: 12 }}>
          🛒 Quick Shopping List
        </div>
        {[
          { label: "FREE", item: "GuitarTuna app for tuning" },
          { label: "FREE", item: "Print chord charts from ukulele-chords.com" },
          { label: "$5–8", item: "Fret sticker dots for ukulele (Amazon)" },
          { label: "$5–10", item: "A soft guitar pick from any music shop" },
        ].map((row, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
            <span style={{
              fontFamily: "'Fredoka', sans-serif", fontSize: 16, fontWeight: 700,
              color: row.label === "FREE" ? "#66BB6A" : "#F59E0B",
              background: row.label === "FREE" ? "#E8F5E9" : "#FFF8E1",
              padding: "2px 8px", borderRadius: 8, minWidth: 48, textAlign: "center",
            }}>{row.label}</span>
            <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 18, color: "#555" }}>{row.item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main App ───────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [progress, setProgress] = useState({});
  const topRef = useRef(null);

  useEffect(() => {
    if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const navItems = [
    { id: "home", label: "Home", emoji: "🏠" },
    { id: "basics", label: "Basics", emoji: "🎵" },
    { id: "week1", label: "Wk 1", emoji: "🌈" },
    { id: "week2", label: "Wk 2", emoji: "🎶" },
    { id: "week3", label: "Wk 3", emoji: "✨" },
    { id: "week4", label: "Wk 4", emoji: "🏆" },
    { id: "tips", label: "Tips", emoji: "💡" },
  ];

  const totalDays = Object.values(progress).flat().filter(Boolean).length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #FAFBFE 0%, #F5F0FF 50%, #FFF8F0 100%)",
      fontFamily: "'Nunito', sans-serif",
      paddingBottom: 80,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }
      `}</style>

      <div ref={topRef} />

      {/* Header */}
      <div style={{
        textAlign: "center", padding: "24px 20px 16px",
        background: "linear-gradient(135deg, #FF6B6B08, #4ECDC408, #A78BFA08)",
      }}>
        <h1 style={{
          fontFamily: "'Fredoka', sans-serif", fontSize: 38, fontWeight: 700,
          background: "linear-gradient(135deg, #FF6B6B, #A78BFA, #4ECDC4)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          margin: 0,
        }}>
          🎸 Our Music Adventure 🪕
        </h1>
        {totalDays > 0 && (
          <div style={{
            fontFamily: "'Fredoka', sans-serif", fontSize: 18, color: "#F59E0B",
            marginTop: 4,
          }}>
            🔥 {totalDays} day{totalDays > 1 ? "s" : ""} practised so far!
          </div>
        )}
      </div>

      {/* Nav */}
      <div style={{
        display: "flex", gap: 6, padding: "8px 12px", overflowX: "auto",
        justifyContent: "center", flexWrap: "wrap",
      }}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            style={{
              fontFamily: "'Fredoka', sans-serif", fontSize: 17, fontWeight: 600,
              padding: "8px 14px", borderRadius: 16, border: "none", cursor: "pointer",
              background: currentPage === item.id ? "#2D3436" : "white",
              color: currentPage === item.id ? "white" : "#999",
              boxShadow: currentPage === item.id ? "0 4px 12px rgba(0,0,0,0.15)" : "0 1px 4px rgba(0,0,0,0.06)",
              transition: "all 0.2s ease", whiteSpace: "nowrap",
            }}
          >
            {item.emoji} {item.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ animation: "fadeIn 0.3s ease", marginTop: 16 }}>
        {currentPage === "home" && (
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 20px" }}>
            <div style={{
              textAlign: "center", padding: "40px 20px",
              background: "linear-gradient(135deg, #FF6B6B11, #4ECDC411, #A78BFA11)",
              borderRadius: 32, marginBottom: 24,
            }}>
              <div style={{ fontSize: 72, marginBottom: 12 }}>🎸🪕</div>
              <h2 style={{
                fontFamily: "'Fredoka', sans-serif", fontSize: 30, fontWeight: 700,
                color: "#2D3436", margin: "0 0 8px",
              }}>We're Learning Music Together!</h2>
              <p style={{
                fontFamily: "'Nunito', sans-serif", fontSize: 20, color: "#666",
                margin: "0 0 20px", lineHeight: 1.5,
              }}>
                Guitar + Ukulele, side by side. 4 weeks, 4 chords, tons of songs.
                No experience needed — we start from zero!
              </p>
              <button
                onClick={() => setCurrentPage("basics")}
                style={{
                  fontFamily: "'Fredoka', sans-serif", fontSize: 22, fontWeight: 700,
                  padding: "14px 36px", borderRadius: 20, border: "none", cursor: "pointer",
                  background: "linear-gradient(135deg, #FF6B6B, #FF8A80)",
                  color: "white", boxShadow: "0 4px 16px rgba(255,107,107,0.3)",
                }}
              >
                Let's Go! →
              </button>
            </div>

            {/* Week cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {WEEKS.map(week => {
                const key = `week${week.id}`;
                const done = (progress[key] || []).filter(Boolean).length;
                return (
                  <div
                    key={week.id}
                    onClick={() => setCurrentPage(`week${week.id}`)}
                    style={{
                      display: "flex", alignItems: "center", gap: 16,
                      background: "white", borderRadius: 20, padding: "16px 20px",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04)", cursor: "pointer",
                      border: `2px solid ${week.color}22`,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div style={{
                      fontSize: 38, minWidth: 60, height: 60,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: week.bgLight, borderRadius: 16,
                    }}>{week.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: "'Fredoka', sans-serif", fontSize: 21, fontWeight: 600, color: "#2D3436",
                      }}>Week {week.id}: {week.title}</div>
                      <div style={{
                        fontFamily: "'Nunito', sans-serif", fontSize: 17, color: "#999",
                      }}>
                        Chords: {week.chords.join(", ")} {done > 0 && `· ${done}/7 days ✓`}
                      </div>
                    </div>
                    <div style={{ fontSize: 24, color: "#CCC" }}>→</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {currentPage === "basics" && <TuningPage />}
        {currentPage === "week1" && <WeekPage week={WEEKS[0]} progress={progress} setProgress={setProgress} />}
        {currentPage === "week2" && <WeekPage week={WEEKS[1]} progress={progress} setProgress={setProgress} />}
        {currentPage === "week3" && <WeekPage week={WEEKS[2]} progress={progress} setProgress={setProgress} />}
        {currentPage === "week4" && <WeekPage week={WEEKS[3]} progress={progress} setProgress={setProgress} />}
        {currentPage === "tips" && <TipsPage />}
      </div>
    </div>
  );
}
