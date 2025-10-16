/*
 * Applied Cogency Study Calendar – JavaScript
 *
 * This script initialises the FullCalendar instance, constructs the seven
 * year event schedule, and implements progress tracking.  Each event is
 * defined with a list of tasks and associated resources.  Completion of
 * tasks is persisted in localStorage so your progress will remain
 * intact between browser sessions.
 */

document.addEventListener('DOMContentLoaded', function () {
  // Set current year in footer
  const currentYearElem = document.getElementById('currentYear');
  if (currentYearElem) currentYearElem.textContent = new Date().getFullYear();

  // Plan start date – adjust this to change the seven‑year schedule
  const planStart = new Date('2026-01-01');

  /**
   * Convert a Date object to ISO date string (YYYY‑MM‑DD)
   * FullCalendar treats end dates as exclusive.
   * @param {Date} date
   * @returns {string}
   */
  function toISO(date) {
    return date.toISOString().split('T')[0];
  }

  /**
   * Build a start date for a given year index and quarter index.
   * @param {number} yearIdx - zero‑based year index (Year 1 → 0)
   * @param {number} quarterIdx - zero‑based quarter index (Q1 → 0)
   * @returns {Date}
   */
  function quarterStartDate(yearIdx, quarterIdx) {
    return new Date(planStart.getFullYear() + yearIdx, quarterIdx * 3, 1);
  }

  /**
   * Add a quarterly event to the event list.
   * @param {number} year - 1–7
   * @param {number} quarter - 1–4
   * @param {string} titleSuffix - descriptive title of the quadrant
   * @param {string[]} tasks - list of tasks to perform
   * @param {string[]} resources - list of key resources
   * @param {string} why - explanation of purpose
   */
  function addQuarter(year, quarter, titleSuffix, tasks, resources, why) {
    const yIdx = year - 1;
    const qIdx = quarter - 1;
    const start = quarterStartDate(yIdx, qIdx);
    const end = quarterStartDate(yIdx, qIdx + 1);
    // Due date is the last day of the quarter
    const due = new Date(end.getTime());
    due.setDate(due.getDate() - 1);
    events.push({
      id: `Y${year}Q${quarter}`,
      title: `Year ${year} Q${quarter} — ${titleSuffix}`,
      start: toISO(start),
      end: toISO(end),
      extendedProps: {
        year: year,
        quarter: quarter,
        tasks: tasks,
        resources: resources,
        why: why,
        due: toISO(due)
      }
    });
  }

  /**
   * Add a yearly event (full year) to the event list.
   * @param {number} year - 1–7
   * @param {string} title - descriptive title
   * @param {string[]} tasks - list of tasks
   * @param {string[]} resources - list of resources
   * @param {string} why - explanation of purpose
   */
  function addYearEvent(year, title, tasks, resources, why) {
    const yIdx = year - 1;
    const start = new Date(planStart.getFullYear() + yIdx, 0, 1);
    const end = new Date(planStart.getFullYear() + yIdx + 1, 0, 1);
    const due = new Date(end.getTime());
    due.setDate(due.getDate() - 1);
    events.push({
      id: `Y${year}${title.replace(/\s+/g, '')}`,
      title: `Year ${year} — ${title}`,
      start: toISO(start),
      end: toISO(end),
      extendedProps: {
        year: year,
        tasks: tasks,
        resources: resources,
        why: why,
        due: toISO(due)
      }
    });
  }

  /**
   * Add a half‑year event to the event list (used for synthesis themes).
   * @param {number} year - 1–7
   * @param {number} half - 1 or 2 (first or second half)
   * @param {string} title - descriptive title
   * @param {string[]} tasks - list of tasks
   * @param {string[]} resources - list of resources
   * @param {string} why - explanation of purpose
   */
  function addHalfYearEvent(year, half, title, tasks, resources, why) {
    const yIdx = year - 1;
    const startMonth = (half - 1) * 6;
    const start = new Date(planStart.getFullYear() + yIdx, startMonth, 1);
    const end = new Date(planStart.getFullYear() + yIdx, startMonth + 6, 1);
    const due = new Date(end.getTime());
    due.setDate(due.getDate() - 1);
    events.push({
      id: `Y${year}H${half}${title.replace(/\s+/g, '')}`,
      title: `Year ${year} ${half === 1 ? 'H1' : 'H2'} — ${title}`,
      start: toISO(start),
      end: toISO(end),
      extendedProps: {
        year: year,
        tasks: tasks,
        resources: resources,
        why: why,
        due: toISO(due)
      }
    });
  }

  // Event store
  const events = [];

  /**
   * Initialise all event data for the seven‑year plan.  Tasks and
   * resources are drawn directly from the specification.  Each call
   * populates the `events` array defined above.
   */
  function buildEvents() {
    // Year 1
    addQuarter(
      1,
      1,
      'Authentic Resonance',
      [
        'Read SEP/IEP entries',
        'Watch Jung Platform lectures',
        'Read “Memories, Dreams, Reflections”',
        'Maintain dream journal daily',
        'Write 12 typed summaries',
        'Write 4 active‑imagination transcripts'
      ],
      ['SEP/IEP entries', 'Jung Platform', 'Memories, Dreams, Reflections'],
      'Establish personal resonance and self‑awareness.'
    );
    addQuarter(
      1,
      2,
      'Moral Truth',
      [
        'Read the Gospel of John',
        'Read Romans 1–12',
        'Read Athanasius “On the Incarnation”',
        'Read Augustine Books VIII & XIX',
        'Read Aquinas Summa Theologiae I (selected)',
        'Write 12 moral case briefs',
        'Complete at least 20 service hours'
      ],
      ['Gospel of John', 'Romans 1–12', 'Athanasius “On the Incarnation”', 'Augustine “City of God” Books VIII & XIX', 'Aquinas Summa Theologiae I'],
      'Ground moral understanding in classical texts.'
    );
    addQuarter(
      1,
      3,
      'Aesthetic Truth',
      [
        'Read Plato “Symposium” and “Philebus”',
        'Read Plotinus “Enneads I.6 – On Beauty”',
        'Read Aquinas ST I Q5 & Q39',
        'Read Kant “Critique of Judgment” §§1–22',
        'Create 12 object sketches',
        'Conduct 4 museum studies'
      ],
      ['Plato (Symposium, Philebus)', 'Plotinus Enneads I.6', 'Aquinas ST I Q5/Q39', 'Kant “Critique of Judgment” §§1–22'],
      'Explore beauty and form.'
    );
    addQuarter(
      1,
      4,
      'Semantic Truth',
      [
        'Read Bertalanffy “General System Theory” excerpts',
        'Read Wiener “Cybernetics” chapters 1–3',
        'Read Bateson essays',
        'Read Heinz von Foerster essays',
        'Build 2 small data models',
        'Create 1 interface wireframe'
      ],
      ['Bertalanffy excerpts', 'Wiener ch.1–3', 'Bateson essays', 'Foerster essays'],
      'Introduce systems thinking.'
    );
    // Year 2
    addQuarter(
      2,
      1,
      'Operation – Typology',
      [
        'Read Jung’s “Psychological Types” Chapters I–XI',
        'Create 8‑function map (self + 3 interlocutors)',
        'Perform weekly dream‑type correlation',
        'Study John Beebe selections',
        'Study Marie‑Louise von Franz selections'
      ],
      ['Jung “Psychological Types”', 'Beebe “Energies and Patterns in Psychological Type”', 'von Franz “Psychological Types and the Individuation Process”'],
      'Operationalise psychological functions.'
    );
    addQuarter(
      2,
      2,
      'Operation – Virtue Ethics',
      [
        'Read Aristotle “Nicomachean Ethics” Books I–II',
        'Read Aristotle “Nicomachean Ethics” Books III–V',
        'Read Aristotle “Nicomachean Ethics” Book X',
        'Read Aquinas Summa Theologiae I–II Q55–70',
        'Implement habit protocol: choose 2 virtues, micro‑drills, weekly examen',
        'Write 8 dilemma write‑ups'
      ],
      ['Aristotle Nicomachean Ethics', 'Aquinas Summa Theologiae I–II Q55–70'],
      'Habituate virtues.'
    );
    addQuarter(
      2,
      3,
      'Operation – Aesthetics',
      [
        'Read Kant “Critique of Judgment” §§30–60',
        'Read John Ruskin “The Seven Lamps of Architecture” (selected)',
        'Read SEP entry “Aesthetic Judgment”',
        'Write 4 formal critiques',
        'Perform typographic drills: spacing & grids',
        'Create 1 poster system'
      ],
      ['Kant §§30–60', 'Ruskin “The Seven Lamps of Architecture”', 'SEP “Aesthetic Judgment”'],
      'Refine aesthetic judgment.'
    );
    addQuarter(
      2,
      4,
      'Operation – Cybernetics',
      [
        'Read Wiener “Cybernetics” Chapters 4–8',
        'Read Ross Ashby “An Introduction to Cybernetics”',
        'Read Claude Shannon “A Mathematical Theory of Communication”',
        'Watch Stafford Beer lectures',
        'Build 1 feedback loop in code',
        'Run 2 usability tests'
      ],
      ['Wiener ch.4–8', 'Ashby “Introduction to Cybernetics”', 'Shannon “A Mathematical Theory of Communication”', 'Stafford Beer lectures'],
      'Implement cybernetic feedback.'
    );
    // Year 3
    addQuarter(
      3,
      1,
      'Mechanism – Socionics',
      [
        'Study Aushra Augusta’s papers',
        'Study Victor Gulenko’s writings',
        'Study Socionics Model A',
        'Study intertype relations',
        'Conduct type‑interviews with 10 people',
        'Write 20‑page synthesis'
      ],
      ['Augusta & Gulenko works', 'Socionics Model A', 'Intertype relations'],
      'Mechanise typological models.'
    );
    addQuarter(
      3,
      2,
      'Mechanism – Applied Ethics',
      [
        'Study Markkula Center frameworks for ethical decision making',
        'Read SEP domain entries on applied ethics',
        'Watch Michael Sandel’s Justice lectures',
        'Write 6 case memos across bio, war, tech, env, business and privacy'
      ],
      ['Markkula Center frameworks', 'SEP applied ethics entries', 'Sandel “Justice” lectures'],
      'Apply ethical techniques.'
    );
    addQuarter(
      3,
      3,
      'Mechanism – Typography/Design',
      [
        'Read Josef Müller‑Brockmann “Grid Systems in Graphic Design”',
        'Read Jan Tschichold “The Form of the Book”',
        'Read Ellen Lupton “Thinking with Type”',
        'Build grid library',
        'Develop type scale',
        'Publish 12‑page booklet'
      ],
      ['Müller‑Brockmann “Grid Systems in Graphic Design”', 'Tschichold “The Form of the Book”', 'Lupton “Thinking with Type”'],
      'Craft design mechanisms.'
    );
    addQuarter(
      3,
      4,
      'Mechanism – UX/Information Architecture',
      [
        'Read Garrett “The Elements of User Experience” (abridged)',
        'Study Nielsen Norman Group guides',
        'Read Steve Krug “Don’t Make Me Think”',
        'Read Don Norman “The Design of Everyday Things” (revised)',
        'Conduct research study with ≥8 participants',
        'Conduct card‑sort',
        'Build information architecture tree',
        'Create interactive prototype'
      ],
      ['Garrett “The Elements of User Experience”', 'Nielsen Norman Group guides', 'Krug “Don’t Make Me Think”', 'Norman “The Design of Everyday Things”'],
      'Build UX mechanisms.'
    );
    // Year 4 (expression) – four quadrant‑wide events across the whole year
    addYearEvent(
      4,
      'Typological Practice',
      [
        'Offer 10 pro‑bono sessions',
        'Record consented notes',
        'Record outcome measures',
        'Maintain counter‑transference log'
      ],
      [],
      'Express typology in practice.'
    );
    addYearEvent(
      4,
      'Governance Survey',
      [
        'Read Plato',
        'Read the Federalist Papers',
        'Read the Universal Declaration of Human Rights',
        'Write three 1 200‑word policy briefs with virtue‑analysis rubric',
        'Run 2 dialogue circles'
      ],
      ['Plato', 'The Federalist Papers', 'UDHR'],
      'Express moral governance.'
    );
    addYearEvent(
      4,
      'Designed Artifact',
      [
        'Build a small type system (PDF + web)',
        'Gather open critique',
        'Release version 2 with revisions',
        'Document rationale'
      ],
      [],
      'Express aesthetic design.'
    );
    addYearEvent(
      4,
      'Interface/Comms System',
      [
        'Release a v1 productised tool (docs + onboarding)',
        'Collect telemetry',
        'Iterate twice'
      ],
      [],
      'Express semantic systems.'
    );
    // Year 5 – consolidation
    addYearEvent(
      5,
      'Archetypal Deepening',
      [
        'Read CW9i “Archetypes and the Collective Unconscious”',
        'Sample “Mysterium Coniunctionis”',
        'Read von Franz or Hillman',
        'Conduct 2 symbol studies with amplification'
      ],
      ['CW9i “Archetypes”', 'Mysterium Coniunctionis', 'von Franz/Hillman'],
      'Deepen archetypal understanding.'
    );
    addYearEvent(
      5,
      'Moral Depth',
      [
        'Read Aquinas I–II Q90–97',
        'Read O’Donovan “Resurrection & Moral Order” or Ratzinger “Introduction to Christianity”',
        'Write 1 moral ontology essay'
      ],
      ['Aquinas I–II Q90–97', 'O’Donovan “Resurrection & Moral Order”', 'Ratzinger “Introduction to Christianity”'],
      'Consolidate moral depth.'
    );
    addYearEvent(
      5,
      'Aesthetic Depth',
      [
        'Read Balthasar Volume I or Gilson',
        'Read a Heidegger essay',
        'Write 1 curatorial essay aligning beauty/being',
        'Produce photo series as accompaniment'
      ],
      ['Balthasar Volume I', 'Gilson', 'Heidegger essay'],
      'Deepen aesthetic philosophy.'
    );
    addYearEvent(
      5,
      'Information Architecture Consolidation',
      [
        'Read Rosenfeld/Morville & Arango',
        'Read Cooper',
        'Read Young',
        'Ship an information architecture for a real domain',
        'Run 1 longitudinal study (n ≥ 12, 6 weeks)'
      ],
      ['Rosenfeld/Morville & Arango', 'Cooper', 'Young'],
      'Consolidate information architecture.'
    );
    // Year 6 – synthesis (two half‑year events)
    addHalfYearEvent(
      6,
      1,
      'Authority & Symbol',
      [
        'Study CW14 passages',
        'Study constitutional design',
        'Write a 25‑page white paper',
        'Host a seminar with peers'
      ],
      ['CW14 passages', 'Constitutional design references'],
      'Synthesise authority across quadrants.'
    );
    addHalfYearEvent(
      6,
      2,
      'Form & Justice',
      [
        'Pair type/space decisions with procedural fairness',
        'Create a digital artifact',
        'Conduct an ethical audit'
      ],
      ['References on procedural fairness', 'Type and space design references'],
      'Synthesise form and justice.'
    );
    // Year 7 – transmission
    addYearEvent(
      7,
      'Transmission',
      [
        'Teach a short course per quadrant (4 × 90 min)',
        'Publish notes and templates',
        'Compile a methods handbook (typology intake, virtue drill sheets, design grids, IA checklists)',
        'Release versioned methods handbook'
      ],
      [],
      'Transmit knowledge and codify methods.'
    );
  }

  // Build events list
  buildEvents();

  /**
   * Load the progress array for a given event from localStorage.
   * If none exists, return a fresh array of booleans set to false.
   * @param {string} eventId
   * @param {number} length
   * @returns {boolean[]}
   */
  function loadProgress(eventId, length) {
    const key = `progress_${eventId}`;
    const data = localStorage.getItem(key);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length === length) {
          return parsed.map(Boolean);
        }
      } catch (e) {
        // ignore parse errors
      }
    }
    return new Array(length).fill(false);
  }

  /**
   * Save the progress array for a given event to localStorage.
   * @param {string} eventId
   * @param {boolean[]} progressArray
   */
  function saveProgress(eventId, progressArray) {
    const key = `progress_${eventId}`;
    localStorage.setItem(key, JSON.stringify(progressArray));
  }

  /**
   * Calculate and update the global progress bars for each year.
   * Iterates over all events and sums the completed tasks per year.
   */
  function updateYearProgress() {
    // Build a map year → {complete: number, total: number}
    const yearMap = {};
    events.forEach((evt) => {
      const year = evt.extendedProps.year;
      if (!yearMap[year]) {
        yearMap[year] = { complete: 0, total: 0 };
      }
      const tasks = evt.extendedProps.tasks || [];
      const progress = loadProgress(evt.id, tasks.length);
      yearMap[year].total += tasks.length;
      yearMap[year].complete += progress.filter(Boolean).length;
    });
    // Update progress bars
    Object.keys(yearMap).forEach((yearKey) => {
      const yearNum = parseInt(yearKey);
      const bar = document.querySelector(`#progress-year${yearNum} .progress-bar`);
      if (bar) {
        const { complete, total } = yearMap[yearKey];
        const percent = total > 0 ? Math.round((complete / total) * 100) : 0;
        bar.style.width = `${percent}%`;
        bar.innerText = `${percent}%`;
      }
    });
  }

  /**
   * Display the event details in the modal.
   * @param {object} eventInfo - FullCalendar event click info
   */
  function showEventDetails(eventInfo) {
    const eventId = eventInfo.event.id;
    const ext = eventInfo.event.extendedProps;
    // Set modal title and fields
    document.getElementById('eventTitle').textContent = eventInfo.event.title;
    document.getElementById('eventDue').textContent = ext.due;
    document.getElementById('eventWhy').textContent = ext.why;
    // Populate resources
    const resList = document.getElementById('eventResources');
    resList.innerHTML = '';
    (ext.resources || []).forEach((res) => {
      const li = document.createElement('li');
      li.textContent = res;
      resList.appendChild(li);
    });
    // Populate tasks with checkboxes
    const tasks = ext.tasks || [];
    const tasksContainer = document.getElementById('eventTasks');
    tasksContainer.innerHTML = '';
    const progress = loadProgress(eventId, tasks.length);
    tasks.forEach((task, idx) => {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = progress[idx];
      checkbox.addEventListener('change', () => {
        progress[idx] = checkbox.checked;
        saveProgress(eventId, progress);
        updateProgressBar();
        updateYearProgress();
      });
      const label = document.createElement('label');
      label.textContent = task;
      li.appendChild(checkbox);
      li.appendChild(label);
      tasksContainer.appendChild(li);
    });
    // Update progress bar inside modal
    function updateProgressBar() {
      const complete = progress.filter(Boolean).length;
      const total = progress.length;
      const percent = total > 0 ? Math.round((complete / total) * 100) : 0;
      const bar = document.getElementById('eventProgressBar');
      bar.style.width = `${percent}%`;
      bar.innerText = `${percent}%`;
    }
    updateProgressBar();
    // Show modal
    const modalElem = document.getElementById('eventModal');
    const modal = new bootstrap.Modal(modalElem);
    modal.show();
  }

  // Initialise FullCalendar
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridYear',
    height: 'auto',
    aspectRatio: 1.6,
    firstDay: 1,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridYear,dayGridMonth,listYear'
    },
    views: {
      dayGridYear: {
        type: 'dayGrid',
        duration: { years: 1 },
        buttonText: 'Year'
      }
    },
    events: events,
    eventClick: function (info) {
      showEventDetails(info);
    },
    eventDisplay: 'block'
  });
  calendar.render();

  // Initialise year progress bars on load
  updateYearProgress();
});