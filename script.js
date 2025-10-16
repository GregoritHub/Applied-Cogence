// ===== Config =====
const START_YEAR = new Date().getFullYear();        // change if you want a fixed start (e.g., 2025)
const START_MONTH = 0;                               // 0 = January
const START_DAY = 6;                                 // pick a consistent week start

// ===== Helpers =====
function iso(d){ return d.toISOString().slice(0,10); }
function addMonths(d, m){ const x=new Date(d); x.setMonth(x.getMonth()+m); return x; }
function addDays(d, n){ const x=new Date(d); x.setDate(x.getDate()+n); return x; }

// Build quarters across 7 years with your exact spec
function buildSevenYearEvents(){
  const events = [];
  let cursor = new Date(START_YEAR, START_MONTH, START_DAY);

  const Q = (title, desc, months) => {
    const start = new Date(cursor);
    const end = addDays(addMonths(start, months), -1);
    events.push({
      title, start: iso(start), end: iso(end),
      extendedProps: { desc }
    });
    cursor = addMonths(cursor, months);
  };

  // YEAR 1 — Foundation
  Q("Y1 Q1 — I: Authentic Resonance",
    "SEP/IEP; Jung Platform; MDR; daily dream log; 12 typed summaries; 4 active-imagination transcripts. Due: End Q1. Why: Establish personal resonance and self-awareness.",
    3);
  Q("Y1 Q2 — We: Moral Truth",
    "John; Romans 1–12; Athanasius; Augustine VIII & XIX; Aquinas I (sel.); 12 moral case briefs; ≥20 service hours. Due: End Q2. Why: Ground moral understanding in classical texts.",
    3);
  Q("Y1 Q3 — It: Aesthetic Truth",
    "Plato Symposium/Philebus; Plotinus I.6; Aquinas ST I Q5/Q39; Kant §§1–22; 12 object sketches; 4 museum studies. Due: End Q3. Why: Explore beauty and form.",
    3);
  Q("Y1 Q4 — Its: Semantic Truth",
    "Bertalanffy; Wiener ch.1–3; Bateson essays; Foerster; 2 small data models; 1 interface wireframe. Due: End Q4. Why: Introduce systems thinking.",
    3);

  // YEAR 2 — Operation
  Q("Y2 Q1 — Jungian Typology",
    "Psychological Types I–XI; 8-function map (self + 3 interlocutors); weekly dream-type correlation; Beebe/von Franz selections. Due: End Q1. Why: Operationalize functions.",
    3);
  Q("Y2 Q2 — Virtue Ethics",
    "Aristotle NE I–II, III–V, X; Aquinas I–II Q55–70; 2-virtue habit protocol (micro-drills + weekly examen); 8 dilemma write-ups. Due: End Q2. Why: Habituate virtues.",
    3);
  Q("Y2 Q3 — Aesthetic Judgment",
    "Kant §§30–60; Ruskin; SEP ‘Aesthetic Judgment’; 4 formal critiques; type drills (spacing, grids); 1 poster system. Due: End Q3. Why: Refine judgment.",
    3);
  Q("Y2 Q4 — Cybernetics",
    "Wiener ch.4–8; Ashby Intro to Cybernetics; Shannon; Beer lectures; build 1 feedback loop in code; run 2 usability tests. Due: End Q4. Why: Implement feedback.",
    3);

  // YEAR 3 — Mechanism
  Q("Y3 Q1 — Socionics",
    "Augusta → Gulenko; Model A; intertype relations; 10 type interviews; 20-page synthesis. Due: End Q1. Why: Mechanize typology.",
    3);
  Q("Y3 Q2 — Applied Ethics",
    "Markkula → SEP domain entries; Sandel lectures; 6 case memos (bio/war/tech/env/business/privacy). Due: End Q2. Why: Apply techniques.",
    3);
  Q("Y3 Q3 — Typography/Design",
    "Müller-Brockmann → Tschichold → Lupton; grid library; type scale; publish 12-page booklet. Due: End Q3. Why: Craft design mechanisms.",
    3);
  Q("Y3 Q4 — UX/IA",
    "Garrett (abr.) → NN/guides; Krug; Norman (rev.); 1 study (n≥8), card-sort, IA tree, interactive prototype. Due: End Q4. Why: Build UX mechanisms.",
    3);

  // YEAR 4 — Expression (full stack; year-long outcomes across quarters)
  Q("Y4 — I: Typological Practice",
    "10 pro-bono sessions; consented notes; outcome measures; counter-transference log. Due: End Year. Why: Express typology in practice.",
    12);

  // YEAR 5 — Consolidation
  Q("Y5 — Consolidation",
    "I: CW9i; MC selections; von Franz/Hillman; 2 symbol studies. We: Aquinas I–II Q90–97; O’Donovan or Ratzinger; 1 moral ontology essay. It: Balthasar I or Gilson; Heidegger essay; 1 curatorial essay + photo series. Its: Rosenfeld/Morville & Arango; Cooper; Young; ship IA for real domain; 6-week longitudinal study (n≥12). Due: End Year.",
    12);

  // YEAR 6 — Synthesis
  Q("Y6 — Synthesis",
    "Theme A (mid-year): ‘Authority & Symbol’ — CW14 ↔ constitutional design, 25-page white paper + seminar. Theme B (end-year): ‘Form & Justice’ — digital artifact + ethical audit.",
    12);

  // YEAR 7 — Transmission
  Q("Y7 — Transmission",
    "Teach 4 short courses (1/quarter); publish notes/templates. Compile Methods Handbook (typology intake, virtue drills, design grids, IA checklists) — versioned release. Due: End Year.",
    12);

  return events;
}

// ===== UI: Calendar init =====
document.addEventListener('DOMContentLoaded', () => {
  const calEl = document.getElementById('calendar');

  if (typeof FullCalendar === 'undefined' || !FullCalendar.Calendar) {
    calEl.innerHTML = `
      <div class="alert alert-warning">
        FullCalendar failed to load. Check your internet connection.
      </div>`;
    return;
  }

  const calendar = new FullCalendar.Calendar(calEl, {
    initialView: 'dayGridMonth',
    height: 'auto',
    firstDay: 1, // Monday
    nowIndicator: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listMonth'
    },
    events: buildSevenYearEvents(),
    eventClick: (info) => {
      const { title, extendedProps } = info.event;
      document.getElementById('detailTitle').textContent = title;
      document.getElementById('detailBody').innerHTML = `
        <p>${(extendedProps && extendedProps.desc) ? extendedProps.desc : ""}</p>
        <p><strong>Start:</strong> ${info.event.startStr} &nbsp; <strong>End:</strong> ${info.event.endStr || "—"}</p>
        <hr/>
        <p class="mb-1"><strong>Why</strong> and <strong>Due</strong> are embedded in the description above.</p>
        <p class="small text-muted">Progress tracking persists in your browser via localStorage.</p>
      `;
      const modal = new bootstrap.Modal(document.getElementById('detailModal'));
      modal.show();
    }
  });

  calendar.render();
});
