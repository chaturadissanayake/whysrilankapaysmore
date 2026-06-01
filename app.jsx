const { useState, useEffect, useRef } = React;
const { 
  ComposedChart, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ReferenceLine,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} = Recharts;

// ==========================================
// DATA STORE GLOBALS
// ==========================================
const CHART_1_DATA = [
  { date: "2020-01", pump: 119, formula: 137 },
  { date: "2020-03", pump: 119, formula: null },
  { date: "2021-01", pump: 119, formula: 180 },
  { date: "2021-08", pump: 119, formula: 210 },
  { date: "2022-01", pump: 148, formula: 300 },
  { date: "2022-03", pump: 198, formula: null },
  { date: "2022-06", pump: 460, formula: 500 },
  { date: "2022-08", pump: 400, formula: null },
  { date: "2022-10", pump: 390, formula: null },
  { date: "2023-01", pump: 370, formula: 380 },
  { date: "2023-09", pump: 341, formula: null },
  { date: "2023-11", pump: 356, formula: null },
  { date: "2023-12", pump: 329, formula: null },
  { date: "2024-01", pump: 358, formula: 300 },
  { date: "2024-06", pump: 317, formula: null },
  { date: "2024-09", pump: 307, formula: null },
  { date: "2024-12", pump: 286, formula: null },
  { date: "2025-01", pump: 286, formula: 280 },
  { date: "2025-04", pump: 286, formula: null },
  { date: "2025-09", pump: 283, formula: null },
  { date: "2025-11", pump: 277, formula: null },
  { date: "2026-01", pump: 279, formula: 400 },
  { date: "2026-02", pump: 277, formula: null },
  { date: "2026-03", pump: 382, formula: 600 },
  { date: "2026-04", pump: 382, formula: null },
  { date: "2026-05", pump: 407, formula: 720 }
];

const CHART_2_DATA = [
  { date: "2020-01", sriLanka: 100, india: 100, pakistan: 100, malaysia: 100, thailand: 100, nepal: 100, philippines: 100 },
  { date: "2021-01", sriLanka: 100, india: 114, pakistan: 118, malaysia: 100, thailand: 108, nepal: 112, philippines: 110 },
  { date: "2022-01", sriLanka: 129, india: 129, pakistan: 150, malaysia: 100, thailand: 122, nepal: 130, philippines: 122 },
  { date: "2022-06", sriLanka: 343, india: 138, pakistan: 193, malaysia: 100, thailand: 137, nepal: 149, philippines: 147 },
  { date: "2023-01", sriLanka: 292, india: 133, pakistan: 214, malaysia: 100, thailand: 132, nepal: 139, philippines: 140 },
  { date: "2024-01", sriLanka: 241, india: 128, pakistan: 236, malaysia: 100, thailand: 127, nepal: 134, philippines: 137 },
  { date: "2025-01", sriLanka: 215, india: 124, pakistan: 225, malaysia: 100, thailand: 125, nepal: 128, philippines: 132 },
  { date: "2026-01", sriLanka: 215, india: 124, pakistan: 246, malaysia: 102, thailand: 132, nepal: 132, philippines: null },
  { date: "2026-06", sriLanka: 317, india: 129, pakistan: 263, malaysia: 108, thailand: 141, nepal: 136, philippines: null }
];

const CHART_3_DATA = [
  { date: "2020-01", rate: 182.0 },
  { date: "2020-12", rate: 185.0 },
  { date: "2021-06", rate: 200.0 },
  { date: "2021-12", rate: 200.0 },
  { date: "2022-03", rate: 290.0 },
  { date: "2022-05", rate: 360.0 },
  { date: "2022-12", rate: 365.0 },
  { date: "2023-06", rate: 320.0 },
  { date: "2023-12", rate: 324.0 },
  { date: "2024-06", rate: 300.0 },
  { date: "2024-12", rate: 293.0 },
  { date: "2025-06", rate: 299.0 },
  { date: "2025-12", rate: 307.0 },
  { date: "2026-01", rate: 310.0 },
  { date: "2026-03", rate: 315.0 },
  { date: "2026-05", rate: 345.4 },
  { date: "2026-06", rate: 332.0 }
];

const CHART_4_DATA = [
  { country: "Sri Lanka", days: 30, highlight: true },
  { country: "Philippines", days: 30, highlight: false },
  { country: "Thailand", days: 65, highlight: false },
  { country: "Malaysia", days: 72, highlight: false },
  { country: "India", days: 74, highlight: false }
];

const CHART_5_DATA = [
  { name: "Wealthiest 30%", value: 70, highlight: true },
  { name: "Remaining 70%", value: 30, highlight: false }
];

const CHART_CPC_DEBT = [
  { year: "2019", debt: 550 },
  { year: "2020", debt: 750 },
  { year: "2021", debt: 1100 },
  { year: "2022", debt: 1700 },
  { year: "2023", debt: 900 },
  { year: "2024", debt: 200 },
  { year: "2026", debt: 84 }
];

const CHART_AFFORDABILITY = [
  { year: "2020", fuelPerDay: 3.6 },
  { year: "2022", fuelPerDay: 1.2 },
  { year: "2024", fuelPerDay: 2.0 },
  { year: "2025", fuelPerDay: 3.5 },
  { year: "2026", fuelPerDay: 2.8 }
];

const BRENT_VS_PUMP_DATA = [
  { date: "2020-01", brent: 64, pump: 137 },
  { date: "2021-01", brent: 55, pump: 137 },
  { date: "2022-01", brent: 87, pump: 177 },
  { date: "2022-06", brent: 122, pump: 470 },
  { date: "2023-01", brent: 83, pump: 400 },
  { date: "2024-01", brent: 80, pump: 330 },
  { date: "2025-01", brent: 65, pump: 300 },
  { date: "2026-01", brent: 65, pump: 330 },
  { date: "2026-03", brent: 103, pump: 360 },
  { date: "2026-04", brent: 117, pump: 392 },
  { date: "2026-06", brent: 93, pump: 407 }
];

const VOICES = [
  { platform: "Reddit · r/srilanka", upvotes: 79, highlight: true, text: "Are you that disconnected from reality? Do you really think most people have enough money to just buy an EV? I can safely bet 99% of Sri Lankans cannot do that." },
  { platform: "News Interview · Transport Union", upvotes: null, highlight: true, text: "They publish global prices but never show how much they tax us. We are not just paying for oil, we are paying the sins of the CPC and the government's borrowing." },
  { platform: "Reddit · r/srilanka", upvotes: 27, highlight: false, text: "If global fuel prices are increasing, and we buy our fuel from the same global market, why would prices at the pump not increase? Sometimes shit just sucks and it's out of anyone's control." },
  { platform: "Instagram · [Anonymised]", upvotes: null, highlight: false, text: "The unfortunate situation is this affects different people differently. If you own assets you are a beneficiary. If you are a retiree with LKR savings, your quality of life will consistently collapse." },
  { platform: "Reddit · r/srilanka", upvotes: 17, highlight: false, text: "Waiting to see the day we invite the old corrupt thugs back - the way these guys are running the show." },
  { platform: "Reddit · r/srilanka", upvotes: 12, highlight: false, text: "Yeah, local fuel price should reflect global price. But to say 'to curb consumption' - that's a bad intent." },
  { platform: "Reddit · r/srilanka", upvotes: 7, highlight: false, text: "Unfortunately paying back loans - mostly taken by previous governments - eats up like 50% of tax revenue. If we built renewable energy infrastructure instead of highways we wouldn't be in this mess." },
];

const CHANGES = [
  { num: "01", title: "Publish the real math. Every month. In plain language.", text: "Before every price revision, release a simple breakdown: how much is the actual cost of the oil, how much is tax, how much is CPC operating cost, how much is debt repayment or subsidy recovery. The public has a right to see the math before they are asked to pay it.", ask: "Ask: Ministry of Petroleum and PUCSL should publish a plain-language cost breakdown with every fuel price revision." },
  { num: "02", title: "Stop the monthly price shocks.", text: "Sri Lanka adjusts prices once a month, creating sudden large changes that trigger panic buying. India adjusts daily - the change is so small nobody panics. Moving to weekly or fortnightly revisions would reduce the shock cycle and break the panic loop.", ask: null },
  { num: "03", title: "Fill the reserve tanks.", text: "Sri Lanka holds roughly 30 days of fuel in reserve. The IEA minimum is 90 days. A country with 90 days can wait out a global price spike. Sri Lanka cannot. Closing that gap is the single most direct way to reduce vulnerability to the next crisis.", ask: null },
  { num: "04", title: "Target the subsidy at the people who need it.", text: "Right now, fuel subsidies go to everyone equally - which means 70% of the money goes to the wealthiest 30% of households, who consume the most fuel. A targeted cash transfer to low-income households would cost less, help more people, and stop the CPC bleeding money on subsidies for people who do not need them.", ask: "Ask: Replace the blanket fuel subsidy with a direct cash support programme for households below the poverty line." },
];

const CHAPTERS = [
  { id: "viral",   label: "The Viral Number" },
  { id: "heroViz", label: "Six Years of Data" },
  { id: "trap",    label: "The Structural Trap" },
  { id: "context", label: "The Domino Effect" },
  { id: "voices",  label: "Public Conversation" },
  { id: "change",  label: "What Needs to Change" },
];

// ==========================================
// UTILITY COMPONENTS
// ==========================================

// Reusable chart legend - shows line swatches or bar swatches
const ChartLegend = ({ items, style }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', paddingTop: '10px', ...style }}>
    {items.map((item, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        {item.type === 'line' ? (
          <div style={{
            width: '22px',
            height: '0px',
            borderTop: `2px ${item.dashed ? 'dashed' : 'solid'} ${item.color}`,
            flexShrink: 0
          }} />
        ) : (
          <div style={{
            width: '10px',
            height: '10px',
            background: item.color,
            borderRadius: '1px',
            flexShrink: 0
          }} />
        )}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-tertiary)',
          lineHeight: 1
        }}>{item.label}</span>
      </div>
    ))}
  </div>
);

// Year-only tick formatter - only shows label on January entries (date ends in -01)
const yearTickFormatter = (val) => {
  if (val && val.endsWith('-01')) return val.split('-')[0];
  return '';
};

const CopiedButton = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button className={`btn ${copied ? 'btn-copied' : ''}`} style={{ padding: '6px 12px', fontSize: '0.65rem' }} onClick={handleCopy} disabled={copied}>
      {copied ? 'COPIED' : 'COPY QUOTE'}
    </button>
  );
};

const Navigation = ({ activeId, isDesktop }) => {
  const hideNav = activeId === 'cta' || activeId === 'footer';
  if (isDesktop) {
    return (
      <nav className="desktop-sidebar-nav" style={{ opacity: hideNav ? 0 : 1, pointerEvents: hideNav ? 'none' : 'auto', transition: 'opacity 0.3s' }}>
        {CHAPTERS.map(chapter => (
          <a key={chapter.id} href={`#${chapter.id}`} className={`desktop-nav-item ${activeId === chapter.id ? 'active' : ''}`}>
            <div className="nav-dot"></div>
            <span className="desktop-nav-label">{chapter.label}</span>
          </a>
        ))}
      </nav>
    );
  }
  return (
    <nav className="mobile-bottom-nav">
      {CHAPTERS.map(chapter => (
        <a key={chapter.id} href={`#${chapter.id}`} className={`nav-item ${activeId === chapter.id ? 'active' : ''}`} aria-label={chapter.label}>
          <div className="nav-dot"></div>
        </a>
      ))}
    </nav>
  );
};

const TopProgress = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setWidth((winScroll / height) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '3px', background: 'var(--bg-tertiary)', zIndex: 1000 }}>
      <div style={{ height: '100%', width: `${width}%`, background: 'var(--accent-red)', transition: 'width 0.1s' }} />
    </div>
  );
};

const MinimalTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p style={{ color: 'var(--text-tertiary)', marginBottom: '8px' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, margin: '4px 0' }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(0) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ==========================================
// SECTIONS
// ==========================================
const Hero = () => (
  <section className="section-pad container" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <span className="label-mono" style={{ color: 'var(--accent-red)', marginBottom: 'var(--space-md)' }}></span>
    <h1>Why Sri Lanka <br />Pays More</h1>
    <div style={{ maxWidth: '600px', borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        Six years of numbers. A system built to fail. A global crisis that hit us five times harder than the countries next to us.
      </p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: 'var(--space-md)' }}>
        By Chatura Dissanayake · Published May 31, 2026 · 8 min read
      </p>
    </div>
  </section>
);

const Lede = () => (
  <section className="container section-pad">
    <div className="content-container">
      <span className="label-mono" style={{ marginBottom: 'var(--space-lg)' }}>THE STORY</span>
      <p className="body-text">In January 2020, a litre of petrol cost Rs. 137. Today it costs Rs. 407.</p>
      <p className="body-text">That is not just a number going up. It is a three-wheeler driver recalculating every morning whether the day is worth starting. It is your grocery bill climbing even when you did not change what you buy.</p>
      <p className="body-text">When fuel prices go up, the government says "global oil prices." The opposition says "mismanagement." Social media says both, and neither. All three are partially right. This story shows you the actual math.</p>
      <p className="body-text">Six years of data shows that global events matter - but Sri Lanka consistently pays more than the countries around it for the same barrel of oil. This is not because we are unlucky. It is because of how our own system is built.</p>
      <p className="body-text">Here is how it works. Where the money goes. And what it would take to change it.</p>
    </div>
  </section>
);

// ---- BREAKDOWN VISUAL (Chapter 01 sub-component) ----
// Fix: replaced near-indistinguishable greys with semantically distinct colours.
// Bar 1 = what it costs to import. Bar 2 = how that cost is shared.
const BREAKDOWN_COST_COLORS = {
  cif:  '#1A3A5C',  // deep navy - the dominant global oil cost
  tax:  '#B7791F',  // amber   - government levy
  dist: '#718096',  // slate   - distribution / handling
};
const BREAKDOWN_PAY_COLORS = {
  you:  '#1A1A1A',              // near-black - consumer payment
  govt: '#D4AF37',              // gold      - government subsidy
  loss: '#D2222D',              // red       - CPC unrecovered loss
};

const BreakdownVisual = () => (
  <div style={{ margin: 'var(--space-xl) 0', padding: 'var(--space-lg)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
    <h3 style={{ marginBottom: 'var(--space-lg)' }}>The Real Math (Current Breakdown)</h3>

    {/* ---------- BAR 1: cost components ---------- */}
    <span className="label-mono" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-sm)', display: 'block' }}>WHAT IT COSTS TO DELIVER ONE LITRE - RS. 720</span>
    <ChartLegend style={{ marginBottom: '10px' }} items={[
      { label: 'CIF cost  Rs. 580', color: BREAKDOWN_COST_COLORS.cif,  type: 'bar' },
      { label: 'Taxes  Rs. 110',    color: BREAKDOWN_COST_COLORS.tax,  type: 'bar' },
      { label: 'Distribution  Rs. 30', color: BREAKDOWN_COST_COLORS.dist, type: 'bar' },
    ]} />
    <div className="breakdown-bar">
      <div className="breakdown-segment" style={{ flex: 580, background: BREAKDOWN_COST_COLORS.cif,  color: '#FFF' }}><span>CIF</span></div>
      <div className="breakdown-segment" style={{ flex: 110, background: BREAKDOWN_COST_COLORS.tax,  color: '#FFF' }}><span>TAX</span></div>
      <div className="breakdown-segment" style={{ flex: 30,  background: BREAKDOWN_COST_COLORS.dist, color: '#FFF' }}><span>DIST</span></div>
    </div>

    {/* ---------- BAR 2: who pays what ---------- */}
    <span className="label-mono" style={{ color: 'var(--text-tertiary)', marginTop: 'var(--space-lg)', marginBottom: 'var(--space-sm)', display: 'block' }}>HOW THAT RS. 720 IS ABSORBED</span>
    <ChartLegend style={{ marginBottom: '10px' }} items={[
      { label: 'You pay  Rs. 407',          color: BREAKDOWN_PAY_COLORS.you,  type: 'bar' },
      { label: 'Govt absorbs  Rs. 100',     color: BREAKDOWN_PAY_COLORS.govt, type: 'bar' },
      { label: 'CPC loss  Rs. 213',         color: BREAKDOWN_PAY_COLORS.loss, type: 'bar' },
    ]} />
    <div className="breakdown-bar" style={{ minHeight: '50px' }}>
      <div className="breakdown-segment" style={{ flex: 407, background: BREAKDOWN_PAY_COLORS.you,  color: '#fff', padding: '4px' }}>
        <span style={{ whiteSpace: 'normal', textAlign: 'center', lineHeight: '1.2', fontSize: 'clamp(0.55rem, 2vw, 0.75rem)' }}>YOU PAY<br/>Rs. 407</span>
      </div>
      <div className="breakdown-segment" style={{ flex: 100, background: BREAKDOWN_PAY_COLORS.govt, color: '#000', padding: '4px' }}>
        <span style={{ whiteSpace: 'normal', textAlign: 'center', lineHeight: '1.2', fontSize: 'clamp(0.55rem, 2vw, 0.75rem)' }}>GOVT<br/>Rs. 100</span>
      </div>
      <div className="breakdown-segment" style={{ flex: 213, background: BREAKDOWN_PAY_COLORS.loss, color: '#fff', padding: '4px' }}>
        <span style={{ whiteSpace: 'normal', textAlign: 'center', lineHeight: '1.2', fontSize: 'clamp(0.55rem, 2vw, 0.75rem)' }}>CPC LOSS<br/>Rs. 213</span>
      </div>
    </div>
    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '10px' }}>
      Total cost: Rs. 720. You pay Rs. 407. Government absorbs Rs. 100. CPC still loses Rs. 213 per litre.
    </p>
  </div>
);

const Chapter01 = () => (
  <section id="viral" className="container section-divider section-pad">
    <div className="content-container">
      <span className="chapter-marker">CHAPTER 01</span>
      <h2>The number that started a fight.</h2>
      <p className="body-text">On May 14, 2026, speaking at the Nuwara Eliya District Coordinating Committee meeting, President Dissanayake disclosed that the actual cost to import one litre of diesel had reached Rs. 720. At the time, diesel was being sold at Rs. 392. The government was absorbing Rs. 100 per litre, and the Ceylon Petroleum Corporation was still losing money on every litre it sold.</p>
      <p className="body-text">On May 31, the price was revised upward to Rs. 407 - a partial correction, but still well below the real cost. As of that revision, the gap between cost and pump price narrows but does not close. The CPC continues to absorb heavy losses on every litre sold.</p>

      <BreakdownVisual />

      <p className="body-text">That is a genuine loss. The Rs. 720 figure is not an exaggeration - it reflects the real cost of buying oil at USD 100+ per barrel, converting at Rs. 325 to the dollar, shipping it here, and adding taxes and handling. The conflict in the Middle East caused the oil price spike. Sri Lanka's own structural problems explain why the rupee conversion makes it so much worse. When you buy fuel today, you are paying for oil that genuinely costs that much to bring here.</p>
      <p className="body-text">But the question this story is asking is different. Why does it cost more to bring oil here than to the countries next to us? And why, when the world crisis eventually calms down, do our prices not come back down the way other countries' prices do?</p>
    </div>

    <div className="grid-3-col" style={{ margin: 'var(--space-xl) 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="stat-block" style={{ borderTop: 'none' }}>
        <span className="stat-value">Rs. 720</span>
        <span className="label-mono">Cost to bring 1L of diesel to SL today</span>
      </div>
      <div className="stat-block" style={{ borderTop: 'none' }}>
        <span className="stat-value" style={{ color: 'var(--text-secondary)' }}>Rs. 407</span>
        <span className="label-mono">What you pay at the pump</span>
      </div>
      <div className="stat-block" style={{ borderTop: 'none' }}>
        <span className="stat-value alert">Rs. 213</span>
        <span className="label-mono">CPC loss per litre after govt subsidy</span>
      </div>
    </div>

    <div className="content-container">
      <p className="body-text">Sri Lanka's oil import bill tells you how fast this crisis moved.</p>
      <div className="stat-strip">
        {[{m: "Feb 2026", v: "USD 98M"}, {m: "Mar", v: "USD 216M"}, {m: "Apr", v: "USD 368M"}, {m: "May", v: "USD 522M", highlight: true}].map((item, idx, arr) => (
          <React.Fragment key={idx}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', minHeight: '50px' }}>
              <span className="label-mono" style={{ marginBottom: 'auto' }}>{item.m}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: item.highlight ? 'var(--accent-red)' : 'var(--text-primary)' }}>{item.v}</span>
            </div>
            {idx < arr.length - 1 && <span style={{ color: 'var(--text-tertiary)', alignSelf: 'flex-end', marginBottom: '4px', fontSize: '1.2rem', lineHeight: '1.2rem' }}>›</span>}
          </React.Fragment>
        ))}
      </div>
      <p className="label-mono" style={{ textAlign: 'right', marginBottom: 'var(--space-lg)' }}>CBSL TRADE DATA · CPC PROCUREMENT REPORTS</p>
      <p className="body-text">That is more than five times February's bill in three months - the President called it six times, comparing against the projected May figure of USD 522 million. For a country still recovering from a debt crisis, this kind of shock is not simple to absorb.</p>
      <p className="body-text">So the question is not whether the crisis is real. It is. The question is whether Sri Lanka was built to handle it. The answer, based on six years of data, is no.</p>
    </div>
  </section>
);

// ---- CHAPTER 02: THE FULL PICTURE ----
// Fix: XAxis now uses dataKey="date" with yearTickFormatter so year labels appear
// cleanly at January boundaries regardless of how many data points are in the set.
const Chapter02 = ({ isDesktop }) => {
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: isDesktop ? '-40% 0px -40% 0px' : '0px -40% 0px -40%',
      threshold: 0
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveStep(Number(entry.target.dataset.step));
      });
    }, options);
    stepsRef.current.forEach((step) => { if (step) observer.observe(step); });
    return () => observer.disconnect();
  }, [isDesktop]);

  const getScrollyChartData = () => {
    if (!isDesktop) return CHART_1_DATA;
    if (activeStep === 0) return CHART_1_DATA.filter(d => d.date <= "2021-06");
    if (activeStep === 1) return CHART_1_DATA.filter(d => d.date <= "2022-12");
    if (activeStep === 2) return CHART_1_DATA.filter(d => d.date <= "2025-12");
    return CHART_1_DATA;
  };

  const steps = [
    { title: "The hidden debt (2020 – 2021)", text: "In 2020, global oil prices crashed due to COVID-19. Sri Lanka's government froze the pump price at Rs. 137, and kept it there even as global prices recovered. The difference was covered by borrowing money inside the Ceylon Petroleum Corporation. The debt accumulated silently. No announcement. No public debate." },
    { title: "The bill arrives (2022)", text: "By early 2022, Sri Lanka had run out of foreign currency. The rupee lost more than 40% of its value in three months. The real cost of a litre in rupees exploded - and the hidden debt could no longer be hidden. Petrol stations ran dry. Queues stretched for kilometres. People waited days for a tank of fuel." },
    { title: "The reset (2023 – 2025)", text: "A market-linked pricing formula was introduced - tying pump prices to real global costs and the exchange rate. Prices were high but they reflected reality. By 2025, the economy was stabilising. For a brief period, the system worked." },
    { title: "A new shock (2026)", text: "On February 28, 2026, the United States and Israel launched strikes on Iran. Iran responded by closing the Strait of Hormuz - the narrow waterway through which around 20 percent of the world's oil supply passes. Brent crude jumped from USD 65 to over USD 117 per barrel in five weeks. Sri Lanka, which imports all its oil and holds only 30 days of reserves, had no buffer. The import bill multiplied more than five times in three months. The weak rupee and empty reserves meant every dollar of global price increase landed on Sri Lanka harder than any country around it." }
  ];

  return (
    <section id="heroViz" className="container section-divider section-pad">
      <div className="content-container">
        <span className="chapter-marker">CHAPTER 02</span>
        <h2 style={{ marginBottom: 'var(--space-xxl)' }}>The Full Picture.</h2>
      </div>

      <div className="scrolly-container">
        <div className="scrolly-chart-mobile">
          <div className="chart-wrapper" style={{ padding: isDesktop ? '0' : '0 var(--space-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-xs)' }}>
              <span className="label-mono">PUMP PRICE VS REAL COST (LKR / LITRE)</span>
            </div>
            {/* Legend placed above the chart, outside the fixed-height ResponsiveContainer */}
            <ChartLegend style={{ marginBottom: '8px' }} items={[
              { label: 'Pump Price (you pay)',       color: 'var(--accent-red)',     type: 'line', dashed: false },
              { label: 'Real / Formula Cost',        color: 'var(--text-secondary)', type: 'line', dashed: true  },
            ]} />
            <ResponsiveContainer width="100%" height="82%">
              <LineChart data={getScrollyChartData()} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                {/* FIX: use date field + yearTickFormatter so years appear correctly
                    at January boundaries for every step's filtered data set */}
                <XAxis
                  dataKey="date"
                  tickFormatter={yearTickFormatter}
                  interval={0}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--text-tertiary)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
                />
                <YAxis domain={[0, 800]} axisLine={false} tickLine={false} tick={{ fill: 'var(--text-tertiary)', fontSize: 10, fontFamily: 'var(--font-mono)' }} />
                <Tooltip content={<MinimalTooltip />} />
                {activeStep >= 1 && (
                  <Line type="monotone" dataKey="formula" name="Real Cost" stroke="var(--text-secondary)" strokeWidth={2} strokeDasharray="4 4" dot={false} connectNulls={true} isAnimationActive={true} animationDuration={1200} animationEasing="ease-in-out" />
                )}
                <Line type="monotone" dataKey="pump" name="Pump Price" stroke="var(--accent-red)" strokeWidth={4} dot={false} isAnimationActive={true} animationDuration={1500} animationEasing="ease-out" />
              </LineChart>
            </ResponsiveContainer>
            <span className="label-mono" style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)', marginTop: '8px', textAlign: 'right', display: 'block' }}>SOURCE: CEYPETCO / PUBLICFINANCE.LK</span>
          </div>
        </div>

        <div className={isDesktop ? "scrolly-text-mobile" : ""} style={{ paddingTop: isDesktop ? 'var(--space-md)' : 'var(--space-lg)', display: isDesktop ? 'block' : 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          {steps.map((step, i) => (
            <div key={i} ref={el => stepsRef.current[i] = el} data-step={i} className={isDesktop ? "scrolly-step" : "stat-block"} style={{ borderTop: isDesktop ? 'none' : '1px solid var(--border-color)', padding: isDesktop ? '' : 'var(--space-md) 0' }}>
              <div className={isDesktop ? "scrolly-card" : ""}>
                <span className="label-mono" style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-sm)' }}>STEP 0{i+1}</span>
                <h3 style={{ marginBottom: 'var(--space-md)' }}>{step.title}</h3>
                <p className="body-text" style={{ fontSize: '1rem', margin: 0 }}>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="content-container" style={{ marginTop: 'var(--space-xxl)' }}>
        <p className="body-text">Six years. Two completely different kinds of crisis. The same result: Sri Lanka's people pay more than they should.</p>
        <p className="body-text">In 2020, the government made prices look cheap by hiding the cost inside debt. In 2026, the cost is genuinely high because of global events.</p>
      </div>

      {/* ---------- Brent Crude vs Pump Price ---------- */}
      <div style={{ width: '100%', margin: 'var(--space-xl) 0' }}>
        <span className="label-mono" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>BRENT CRUDE (USD) VS SL PUMP PRICE (LKR)</span>
        <ChartLegend style={{ marginBottom: 'var(--space-sm)' }} items={[
          { label: 'Brent Crude (USD, left axis)',  color: 'var(--text-secondary)', type: 'line', dashed: false },
          { label: 'Pump Price (LKR, right axis)', color: 'var(--accent-red)',     type: 'line', dashed: false },
        ]} />
        <div className="chart-wrapper" style={{ height: '38vh', minHeight: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={BRENT_VS_PUMP_DATA} margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={yearTickFormatter}
                interval={0}
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--text-tertiary)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
              />
              <YAxis yAxisId="left"  domain={[0, 150]} axisLine={false} tickLine={false} tick={{ fill: 'var(--text-tertiary)', fontSize: 10, fontFamily: 'var(--font-mono)' }} width={40} tickMargin={8} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 600]} axisLine={false} tickLine={false} tick={{ fill: 'var(--text-tertiary)', fontSize: 10, fontFamily: 'var(--font-mono)' }} width={40} tickMargin={8} />
              <Tooltip content={<MinimalTooltip />} />
              <Line yAxisId="left"  type="monotone" dataKey="brent" name="Brent Crude (USD)" stroke="var(--text-secondary)" strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={2000} animationEasing="ease-out" />
              <Line yAxisId="right" type="monotone" dataKey="pump"  name="Pump Price (LKR)"  stroke="var(--accent-red)"     strokeWidth={3} dot={false} isAnimationActive={true} animationDuration={2000} animationEasing="ease-out" />
            </ComposedChart>
          </ResponsiveContainer>
          <span className="label-mono" style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)', marginTop: '8px', textAlign: 'right', display: 'block' }}>SOURCE: EIA BRENT CRUDE / CEYPETCO</span>
        </div>
      </div>

      {/* ---------- Transition ---------- */}
      <div className="content-container" style={{ margin: 'var(--space-xxl) auto var(--space-xl) 0' }}>
        <h3>But did everyone suffer equally?</h3>
        <p className="body-text">Global prices dictate the baseline, but local policy decides the final blow. When we compare Sri Lanka's pump prices to our immediate neighbors - who all buy from the exact same global market - the structural failure becomes obvious.</p>
      </div>

      {/* ---------- Regional comparison ---------- */}
      <div style={{ width: '100%', margin: 'var(--space-xl) 0' }}>
        <span className="label-mono" style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>SRI LANKA VS THE REGION - INDEXED TO JAN 2020 = 100</span>
        {/* Custom legend replaces default Recharts Legend which was unstyled */}
        <ChartLegend style={{ marginBottom: 'var(--space-sm)' }} items={[
          { label: 'Sri Lanka',   color: 'var(--accent-red)', type: 'line', dashed: false },
          { label: 'India',       color: '#3366CC',           type: 'line', dashed: false },
          { label: 'Pakistan',    color: '#109618',           type: 'line', dashed: false },
          { label: 'Malaysia',    color: '#FF9900',           type: 'line', dashed: false },
          { label: 'Thailand',    color: '#990099',           type: 'line', dashed: false },
          { label: 'Nepal',       color: '#0099C6',           type: 'line', dashed: false },
          { label: 'Philippines', color: '#7B8C9A',           type: 'line', dashed: false },
        ]} />
        <div className="chart-wrapper" style={{ height: '48vh', minHeight: '360px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={CHART_2_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={yearTickFormatter}
                interval={0}
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--text-tertiary)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
              />
              <YAxis domain={[50, 400]} axisLine={false} tickLine={false} tick={{ fill: 'var(--text-tertiary)', fontSize: 10, fontFamily: 'var(--font-mono)' }} width={45} tickMargin={8} />
              <Tooltip content={<MinimalTooltip />} />
              <Line type="monotone" dataKey="india"       name="India"       stroke="#3366CC"           strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={1800} />
              <Line type="monotone" dataKey="pakistan"    name="Pakistan"    stroke="#109618"           strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={1800} />
              <Line type="monotone" dataKey="malaysia"    name="Malaysia"    stroke="#FF9900"           strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={1800} />
              <Line type="monotone" dataKey="thailand"    name="Thailand"    stroke="#990099"           strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={1800} />
              <Line type="monotone" dataKey="nepal"       name="Nepal"       stroke="#0099C6"           strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={1800} />
              <Line type="monotone" dataKey="philippines" name="Philippines" stroke="#7B8C9A"           strokeWidth={2} dot={false} connectNulls={false} isAnimationActive={true} animationDuration={1800} />
              <Line type="monotone" dataKey="sriLanka"    name="Sri Lanka"   stroke="var(--accent-red)" strokeWidth={4} dot={{ r: 4, fill: 'var(--bg-primary)', stroke: 'var(--accent-red)', strokeWidth: 2 }} activeDot={{ r: 6 }} isAnimationActive={true} animationDuration={2500} animationEasing="ease-out" />
            </LineChart>
          </ResponsiveContainer>
          <span className="label-mono" style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)', marginTop: '8px', textAlign: 'right', display: 'block' }}>SOURCE: GLOBALPETROLPRICES.COM / CBSL</span>
        </div>
      </div>

      <div className="pull-quote">
        "Every country in the region felt this crisis. Sri Lanka felt it five times harder. That gap is not bad luck. It is the product of decisions made over twenty years."
      </div>
    </section>
  );
};

// ---- CHAPTER 03: THE STRUCTURAL TRAP ----
// Fix: Trap 01 XAxis corrected. Trap 02 reference line labelled. Trap 03 pie labels added as legend.
const Chapter03 = () => (
  <section id="trap" className="container section-divider section-pad">
    <div className="content-container">
      <span className="chapter-marker">CHAPTER 03</span>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>
        Five reasons we always take the biggest hit. <span style={{ color: 'var(--text-tertiary)' }}>And none of them are global wars.</span>
      </h2>
      <p className="body-text" style={{ marginBottom: 'var(--space-xl)' }}>The Middle East conflict hit every country in the region. Most absorbed it. Sri Lanka's import bill went up five times in three months. This is why.</p>
    </div>

    <div className="horizontal-scroll-container">

      {/* TRAP 01 - Weaker Rupee */}
      <div className="snap-card">
        <span className="label-mono" style={{ color: 'var(--accent-red)' }}>TRAP 01</span>
        <h3 style={{ margin: 'var(--space-md) 0' }}>A Weaker Rupee</h3>
        <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>In 2020, one US dollar cost about Rs. 185. Today it costs around Rs. 325. Since Sri Lanka buys all its oil in US dollars, this single fact makes fuel more expensive for us even when the world oil price stays exactly the same. When the world price goes up too - as it has sharply in 2026 - the two effects multiply each other.</p>
        <p className="body-text" style={{ fontSize: '0.95rem', color: 'var(--text-primary)', borderLeft: '2px solid var(--accent-red)', paddingLeft: 'var(--space-sm)' }}>
          <strong>The impact:</strong> The weaker rupee alone adds more than Rs. 100 to a litre compared to 2020 - before the oil price spike is even counted.
        </p>
        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-lg)' }}>
          <ChartLegend style={{ marginBottom: '6px' }} items={[
            { label: 'LKR / USD exchange rate', color: 'var(--accent-red)', type: 'line', dashed: false }
          ]} />
          <div style={{ height: '160px' }} className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CHART_3_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                {/* FIX: use date field + yearTickFormatter */}
                <XAxis
                  dataKey="date"
                  tickFormatter={yearTickFormatter}
                  interval={0}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }}
                />
                <YAxis domain={[150, 400]} axisLine={false} tickLine={false} tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} width={45} tickMargin={8} />
                <Tooltip content={<MinimalTooltip />} />
                <Line type="monotone" dataKey="rate" name="LKR / USD" stroke="var(--accent-red)" strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={1500} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <span className="label-mono" style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)', marginTop: '8px', display: 'block' }}>SOURCE: CENTRAL BANK OF SRI LANKA</span>
        </div>
      </div>

      {/* TRAP 02 - Empty Tank */}
      <div className="snap-card">
        <span className="label-mono" style={{ color: 'var(--accent-red)' }}>TRAP 02</span>
        <h3 style={{ margin: 'var(--space-md) 0' }}>An Empty Tank</h3>
        <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>Sri Lanka holds around 30 days of fuel in storage. The global minimum standard set by the IEA is 90 days. India meets it. Malaysia holds over 70. When a supply shock hits a country with 90 days of reserves, they can wait. They buy slowly, at planned prices. When it hits a country with 30 days, the government has to move immediately - buying whatever is available, at whatever price is being charged that week.</p>
        <p className="body-text" style={{ fontSize: '0.95rem', color: 'var(--text-primary)', borderLeft: '2px solid var(--accent-red)', paddingLeft: 'var(--space-sm)' }}>
          <strong>The impact:</strong> Every global disruption forces Sri Lanka to buy emergency fuel at peak prices. That cost reaches your pump price the very next month.
        </p>
        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-lg)' }}>
          <ChartLegend style={{ marginBottom: '6px' }} items={[
            { label: 'Days of fuel reserves', color: 'var(--border-color)',  type: 'bar' },
            { label: 'Sri Lanka',             color: 'var(--accent-red)',    type: 'bar' },
            { label: 'IEA minimum - 90 days', color: 'var(--accent-gold)',   type: 'line', dashed: true },
          ]} />
          <div style={{ height: '160px' }} className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_4_DATA} layout="vertical" margin={{ top: 10, right: 60, left: 0, bottom: 10 }}>
                <XAxis type="number" domain={[0, 110]} axisLine={false} tickLine={false} tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} />
                <YAxis dataKey="country" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} width={75} tickMargin={8} />
                <Tooltip content={<MinimalTooltip />} cursor={{ fill: 'var(--bg-tertiary)' }} />
                {/* FIX: labelled reference line so the 90-day standard is explicit */}
                <ReferenceLine x={90} yAxisId={0} stroke="var(--accent-gold)" strokeDasharray="4 2" label={{ value: 'IEA min.', position: 'right', fill: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', fontSize: 9 }} />
                <Bar dataKey="days" name="Days of Reserves" barSize={16} isAnimationActive={true} animationDuration={1500}>
                  {CHART_4_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.highlight ? 'var(--accent-red)' : 'var(--border-color)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <span className="label-mono" style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)', marginTop: '8px', display: 'block' }}>SOURCE: IEA / GLOBAL ENERGY MONITOR</span>
        </div>
      </div>

      {/* TRAP 03 - Subsidies Help the Rich */}
      <div className="snap-card">
        <span className="label-mono" style={{ color: 'var(--accent-red)' }}>TRAP 03</span>
        <h3 style={{ margin: 'var(--space-md) 0' }}>Subsidies Help the Rich</h3>
        <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>When the government lowers fuel prices to "protect the public," it sounds fair. But fuel consumption is not spread evenly. The wealthiest 30% of households consume around 70% of all fuel. They own more vehicles. They drive further. A blanket fuel price cut sends most of the money to households that need it least.</p>
        <p className="body-text" style={{ fontSize: '0.95rem', color: 'var(--text-primary)', borderLeft: '2px solid var(--accent-red)', paddingLeft: 'var(--space-sm)' }}>
          <strong>The impact:</strong> The government loses billions a month giving cheap fuel to people who can afford the real price - money that could go to targeted support.
        </p>
        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-lg)' }}>
          {/* FIX: removed broken inline pie labels; replaced with explicit legend */}
          <ChartLegend style={{ marginBottom: '6px' }} items={[
            { label: 'Wealthiest 30%  ·  uses 70% of fuel', color: 'var(--accent-red)',    type: 'bar' },
            { label: 'Remaining 70%  ·  uses 30% of fuel',  color: 'var(--border-color)',  type: 'bar' },
          ]} />
          <div style={{ height: '160px' }} className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<MinimalTooltip />} />
                <Pie
                  data={CHART_5_DATA}
                  cx="50%" cy="50%"
                  innerRadius={42} outerRadius={66}
                  dataKey="value"
                  stroke="none"
                  label={false}
                  labelLine={false}
                  isAnimationActive={true}
                  animationDuration={1500}
                >
                  {CHART_5_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.highlight ? 'var(--accent-red)' : 'var(--border-color)'} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <span className="label-mono" style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)', marginTop: '8px', display: 'block' }}>SOURCE: ADVOCATA INSTITUTE / WORLD BANK</span>
        </div>
      </div>

      {/* TRAP 04 - The Silent Debt */}
      <div className="snap-card">
        <span className="label-mono" style={{ color: 'var(--accent-red)' }}>TRAP 04</span>
        <h3 style={{ margin: 'var(--space-md) 0' }}>The Silent Debt</h3>
        <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>When the government froze pump prices between 2020 and 2022, the cost didn't disappear. It was loaded onto the Ceylon Petroleum Corporation's balance sheet. CPC's debt to state banks skyrocketed to 1.7 Trillion LKR, effectively risking the entire banking sector. We didn't pay at the pump, but we paid in inflation and economic collapse.</p>
        <p className="body-text" style={{ fontSize: '0.95rem', color: 'var(--text-primary)', borderLeft: '2px solid var(--accent-red)', paddingLeft: 'var(--space-sm)' }}>
          <strong>The impact:</strong> Hidden fuel subsidies created an unsustainable debt bomb that we are still aggressively paying off today in taxes.
        </p>
        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-lg)' }}>
          <ChartLegend style={{ marginBottom: '6px' }} items={[
            { label: 'CPC debt to state banks (Bn LKR)', color: 'var(--text-secondary)', type: 'bar' }
          ]} />
          <div style={{ height: '160px' }} className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_CPC_DEBT} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} width={45} tickMargin={8} />
                <Tooltip content={<MinimalTooltip />} cursor={{ fill: 'var(--bg-tertiary)' }} />
                <Bar dataKey="debt" name="CPC Debt (Bn LKR)" fill="var(--text-secondary)" isAnimationActive={true} animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <span className="label-mono" style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)', marginTop: '8px', display: 'block' }}>SOURCE: MINISTRY OF FINANCE</span>
        </div>
      </div>

      {/* TRAP 05 - Wages Left Behind */}
      <div className="snap-card">
        <span className="label-mono" style={{ color: 'var(--accent-red)' }}>TRAP 05</span>
        <h3 style={{ margin: 'var(--space-md) 0' }}>Wages Left Behind</h3>
        <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>Rs. 137 vs Rs. 407 is only half the story. The real metric is affordability. In 2020, an average daily wage earner could buy 5.5 litres of petrol with a day's work. Today, even with nominal wage increases, they can barely buy 3.5 litres. The price has decoupled from people's earning power.</p>
        <p className="body-text" style={{ fontSize: '0.95rem', color: 'var(--text-primary)', borderLeft: '2px solid var(--accent-red)', paddingLeft: 'var(--space-sm)' }}>
          <strong>The impact:</strong> The true cost of fuel is measured in the standard of living, which has steadily collapsed.
        </p>
        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-lg)' }}>
          <ChartLegend style={{ marginBottom: '6px' }} items={[
            { label: 'Litres affordable per day\'s wage', color: 'var(--text-secondary)', type: 'bar' }
          ]} />
          <div style={{ height: '160px' }} className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_AFFORDABILITY} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} width={45} tickMargin={8} />
                <Tooltip content={<MinimalTooltip />} cursor={{ fill: 'var(--bg-tertiary)' }} />
                <Bar dataKey="fuelPerDay" name="Litres per Day's Wage" fill="var(--text-secondary)" isAnimationActive={true} animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <span className="label-mono" style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)', marginTop: '8px', display: 'block' }}>SOURCE: DEPT OF CENSUS &amp; STATISTICS</span>
        </div>
      </div>

    </div>
  </section>
);

const ContextBridge = () => {
  const cascadeStages = [
    { label: "Fuel prices rise",    time: "Day 1" },
    { label: "Transport adjusts",   time: "Day 3" },
    { label: "Food costs up",       time: "Week 2" },
    { label: "Market prices rise",  time: "Week 4" },
    { label: "Goods follow",        time: "Month 2" },
    { label: "Utilities adjust",    time: "Month 3" }
  ];

  return (
    <section id="context" className="container section-divider section-pad">
      <div className="content-container">
        <span className="chapter-marker">CHAPTER 03b - THE DOMINO EFFECT</span>
        <h2 style={{ marginBottom: 'var(--space-lg)' }}>
          This is not a story about cars. <span style={{ color: 'var(--text-tertiary)' }}>It is a story about everything you buy.</span>
        </h2>

        <p className="body-text">Most people in Sri Lanka do not own a car. But everyone eats. And the moment diesel goes up, the cost of getting food from the farm to your plate goes up too. Here is how it travels:</p>

        <div className="hide-scrollbar" style={{ display: 'flex', overflowX: 'auto', gap: 'var(--space-sm)', margin: 'var(--space-xl) 0', paddingBottom: 'var(--space-md)', WebkitOverflowScrolling: 'touch' }}>
          {cascadeStages.map((stage, idx) => (
            <div key={idx} style={{ minWidth: '140px', flex: 1, backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: 'var(--space-md)', display: 'flex', flexDirection: 'column' }}>
              <span className="label-mono" style={{ color: 'var(--accent-red)', marginBottom: 'var(--space-sm)' }}>{stage.time}</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.4, fontWeight: 500 }}>{stage.label}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: 'var(--bg-secondary)', borderLeft: '2px solid var(--accent-gold)', padding: 'var(--space-lg)', margin: 'var(--space-xl) 0' }}>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--accent-gold)', marginBottom: 'var(--space-sm)' }}>Why Panic Buying Makes It Worse</h4>
          <p className="body-text" style={{ margin: 0 }}>When a price hike rumour spreads, everyone fills up immediately. The tanks, already at only 30 days, go empty in days. The government orders emergency fuel on short notice, at peak spot prices. That extra cost appears in next month's revision. The panic you were trying to outrun contributed to causing the next one.</p>
        </div>

        <p className="body-text">The problem underneath all of this is transparency. Because the pricing formula is not published in plain language, nobody knows whether a hike is driven by global oil prices, government debt, tax adjustments, or something else entirely.</p>
        <p className="body-text">Without that information, every revision becomes a rumour before it becomes a fact.</p>
      </div>
    </section>
  );
};

const Chapter04 = ({ isDesktop }) => (
  <section id="voices" className="container section-divider section-pad">
    <div className="content-container" style={{ marginBottom: 'var(--space-xl)' }}>
      <span className="chapter-marker">CHAPTER 04</span>
      <h2>What people are actually saying.</h2>
      <p className="body-text">When the government releases a price revision without explaining the math, the public fills the gap. Some people get it right. Some get it wrong. Everyone is angry for a reason.</p>
    </div>

    <div className={isDesktop ? "voices-grid" : "horizontal-scroll-container"}>
      {VOICES.map((voice, idx) => (
        <div key={idx} className="snap-card" style={{ borderTop: voice.highlight ? '2px solid var(--accent-red)' : '1px solid var(--border-color)' }}>
          <p className="label-mono" style={{ marginBottom: 'var(--space-md)' }}>{voice.platform}</p>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: 1.5, flexGrow: 1 }}>
            "{voice.text}"
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-lg)', borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-md)' }}>
            <span className="label-mono">{voice.upvotes ? `▲ ${voice.upvotes}` : ' '}</span>
            <CopiedButton textToCopy={`"${voice.text}"`} />
          </div>
        </div>
      ))}
    </div>

    <div className="content-container" style={{ marginTop: 'var(--space-xl)' }}>
      <p className="body-text">The frustration in these conversations is real - and it is pointed in every direction at once, because the information gap leaves people filling in the blanks themselves.</p>
      <p className="body-text">That is what this story is trying to fix.</p>
    </div>
  </section>
);

const Chapter05 = () => (
  <section id="change" className="container section-divider section-pad">
    <div className="content-container">
      <span className="chapter-marker">CHAPTER 05</span>
      <h2>Four things that would actually fix this.</h2>
      <p className="body-text" style={{ marginBottom: 'var(--space-xl)' }}>None of these problems were discovered by this story. Sri Lanka's policy research community has been documenting them for years. What has been harder to find is a version that shows the whole system - the debt, the reserves, the exchange rate, and who bears the cost - in one place, without a policy background as a prerequisite. That is the gap this story is trying to close.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
        {CHANGES.map((item, idx) => (
          <div key={idx} style={{ position: 'relative', paddingLeft: 'clamp(40px, 6vw, 64px)' }}>
            <span style={{ position: 'absolute', top: 0, left: 0, fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--accent-red)', lineHeight: 1 }}>
              {item.num}
            </span>
            <h3 style={{ marginBottom: 'var(--space-sm)' }}>{item.title}</h3>
            <p className="body-text" style={{ marginBottom: item.ask ? 'var(--space-sm)' : '0' }}>{item.text}</p>
            {item.ask && <span className="label-mono" style={{ color: 'var(--accent-gold)' }}>{item.ask}</span>}
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid var(--border-color)', margin: 'var(--space-xxl) 0 var(--space-md) 0', paddingTop: 'var(--space-xl)' }}>
        <p className="body-text" style={{ fontSize: '1.15rem' }}>Global oil shocks are not going away. The Middle East crisis of 2026 will not be the last disruption Sri Lanka faces.</p>
        <p className="body-text" style={{ fontSize: '1.15rem' }}>The question is whether, when the next one comes, this country will have the reserves, the pricing transparency, and the exchange rate stability to absorb it - or whether it will once again multiply the impact on the people least able to bear it.</p>
        <p className="body-text" style={{ fontSize: '1.15rem' }}>Right now, a Sri Lankan paying Rs. 407 for diesel is paying more than a Malaysian, a Pakistani, a Thai, and a Filipino are paying in their own currencies for the same litre.</p>
        <p className="body-text" style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>It is the result of decisions made over two decades - by governments of every colour - to keep prices artificially low instead of building the reserves, the exchange rate stability, and the pricing transparency that would have protected everyone when the next crisis arrived. The next crisis is always coming.</p>
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section id="cta" className="container" style={{ textAlign: 'center', borderTop: '1px solid var(--border-color)', marginTop: 'var(--space-xxl)', paddingTop: 'var(--space-xxl)', paddingBottom: 'var(--space-xxl)' }}>
    <h2 style={{ marginBottom: 'var(--space-md)' }}>The public deserves the math.</h2>
    <div style={{ maxWidth: '600px', margin: '0 auto', marginBottom: 'var(--space-xl)' }}>
      <p className="body-text" style={{ margin: '0 auto var(--space-sm)' }}>If this made a complicated thing feel clear, send it to someone who has been arguing about fuel prices without the full picture.</p>
      <p className="body-text" style={{ margin: '0 auto' }}>Not to win the argument. To change what the argument is about.</p>
    </div>
    <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
      <button className="btn btn-primary" onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }}>SHARE THIS</button>
      <a href="mailto:?subject=Why Sri Lanka Pays More" className="btn">EMAIL IT</a>
      <a href="mailto:consultchatura@gmail.com?subject=Feedback" className="btn">SEND FEEDBACK</a>
    </div>
  </section>
);

// ---- METHODOLOGY AND FOOTER ----
// Fix: data.json download link is now a real file.
// Fix: sources.pdf replaced with an inline numbered source list in the footer.
const MethodologyAndFooter = () => (
  <footer id="footer" style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid #222222', padding: 'var(--space-xxl) 0 var(--space-xl) 0' }}>
    <div className="container">

      {/* Top grid: about / contact+data / methodology */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-xl)', marginBottom: 'var(--space-xxl)' }}>

        <div>
          <h3 style={{ color: '#FFFFFF', fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 300, marginBottom: 'var(--space-sm)' }}>Why Sri Lanka Pays More</h3>
          <p style={{ color: '#A0A0A0', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: 'var(--space-md)' }}>A data investigation into why Sri Lanka's fuel prices consistently outpace the region, the structural traps behind the numbers, and what needs to change.</p>
          <p style={{ color: '#666666', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', lineHeight: '1.6' }}>Published June 2026 · 8 min read</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <div>
            <span className="label-mono" style={{ color: '#666666', marginBottom: '8px', display: 'block' }}>AUTHOR AND CONTACT</span>
            <p style={{ color: '#E5E5E5', fontFamily: 'var(--font-sans)', fontSize: '0.95rem', marginBottom: '4px' }}>Chatura Dissanayake</p>
            <a href="mailto:consultchatura@gmail.com" style={{ color: '#888888', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>consultchatura@gmail.com</a>
          </div>
          <div>
            <span className="label-mono" style={{ color: '#666666', marginBottom: '8px', display: 'block' }}>DATA</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* data.json is a real file in the repo - see data.json */}
              <a href="data.json" download style={{ color: '#E5E5E5', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', alignSelf: 'flex-start' }}>Download Dataset (JSON)</a>
              {/* Anchor to inline sources section below */}
              <a href="#sources" style={{ color: '#E5E5E5', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', alignSelf: 'flex-start' }}>Full Source Citations</a>
            </div>
          </div>
        </div>

        <div>
          <span className="label-mono" style={{ color: '#666666', marginBottom: '8px', display: 'block' }}>METHODOLOGY</span>
          <p style={{ color: '#888888', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', lineHeight: '1.7', marginBottom: 'var(--space-md)' }}>Fuel price data is sourced from CEYPETCO official revision records and GlobalPetrolPrices.com. Regional comparisons use local currency prices indexed to January 2020. Exchange rate data is from the Central Bank of Sri Lanka. Brent crude data is from the U.S. Energy Information Administration. Import bill figures are from the President's address to the Nuwara Eliya District Coordinating Committee, May 14, 2026. All LKR figures refer to Auto Diesel (Octane 92 petrol where noted).</p>
          <p style={{ color: '#555555', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', lineHeight: '1.6' }}>Data current as of June 1, 2026. Some figures are official projections, noted in the source file.</p>
        </div>

      </div>

      {/* Sources section - full numbered list */}
      <div id="sources" style={{ borderTop: '1px solid #1A1A1A', paddingTop: 'var(--space-xl)', marginBottom: 'var(--space-xxl)' }}>
        <span className="label-mono" style={{ color: '#666666', marginBottom: 'var(--space-md)', display: 'block' }}>FULL SOURCE CITATIONS</span>
        <ol style={{ color: '#777777', fontFamily: 'var(--font-sans)', fontSize: '0.82rem', lineHeight: '2', paddingLeft: '1.4rem', columns: 'auto 340px', columnGap: 'var(--space-xl)' }}>
          <li>CEYPETCO, official fuel price revision records, 2020–2026. <span style={{ color: '#555' }}>ceypetco.gov.lk</span></li>
          <li>GlobalPetrolPrices.com, weekly retail fuel price data for South and Southeast Asia, 2020–2026.</li>
          <li>Central Bank of Sri Lanka, Daily Exchange Rate Statistics (LKR/USD), 2020–2026. <span style={{ color: '#555' }}>cbsl.gov.lk</span></li>
          <li>Central Bank of Sri Lanka, External Sector Statistics - monthly trade data, 2026.</li>
          <li>U.S. Energy Information Administration (EIA), Brent Crude Oil daily spot price, 2020–2026. <span style={{ color: '#555' }}>eia.gov</span></li>
          <li>International Energy Agency (IEA), "Oil Security Stocks and Emergency Reserves" - 90-day minimum standard guidance. <span style={{ color: '#555' }}>iea.org</span></li>
          <li>Global Energy Monitor, Asia-Pacific petroleum storage capacity database, 2025.</li>
          <li>Advocata Institute, "Fuel Subsidy Reform in Sri Lanka: Who Benefits?" - household consumption incidence analysis, 2023. <span style={{ color: '#555' }}>advocata.org</span></li>
          <li>World Bank, Sri Lanka Household Income and Expenditure Survey (HIES), 2019/2020.</li>
          <li>Ministry of Finance, Sri Lanka, CPC financial statements and state bank exposure reports, 2019–2026. <span style={{ color: '#555' }}>treasury.gov.lk</span></li>
          <li>Department of Census and Statistics, Sri Lanka Labour Force Survey - nominal daily wage data, 2020–2025. <span style={{ color: '#555' }}>statistics.gov.lk</span></li>
          <li>PublicFinance.lk, budget tracker and CPC subsidy expenditure data, 2020–2026.</li>
          <li>President Anura Kumara Dissanayake, address to the Nuwara Eliya District Coordinating Committee, May 14, 2026 - CPC cost of supply disclosure (Rs. 720/L).</li>
          <li>Public Utilities Commission of Sri Lanka (PUCSL), fuel pricing formula framework and CEYPETCO regulatory filings.</li>
        </ol>
      </div>

    </div>

    {/* Bottom bar */}
    <div className="container" style={{ borderTop: '1px solid #1A1A1A', paddingTop: 'var(--space-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
      <span className="label-mono" style={{ color: '#888888', fontSize: '0.7rem' }}>© 2026 Chatura Dissanayake. All rights reserved. · Data verified as of May 31, 2026.</span>
      <div style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'center' }}>
        <a href="#main-content" style={{ color: '#666666', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Back to top</a>
        <a href="mailto:consultchatura@gmail.com?subject=Feedback on Why Sri Lanka Pays More" style={{ color: '#666666', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Send feedback</a>
      </div>
    </div>
  </footer>
);

// ==========================================
// MAIN APP COMPONENT
// ==========================================
const App = () => {
  const [activeChapter, setActiveChapter] = useState('viral');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveChapter(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -40% 0px' });

    [...CHAPTERS, { id: 'cta' }, { id: 'footer' }].forEach(ch => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <TopProgress />
      <Navigation activeId={activeChapter} isDesktop={isDesktop} />

      <main id="main-content" style={{ paddingLeft: isDesktop ? '100px' : '0' }}>
        <Hero />
        <Lede />
        <Chapter01 />
        <Chapter02 isDesktop={isDesktop} />
        <Chapter03 />
        <ContextBridge />
        <Chapter04 isDesktop={isDesktop} />
        <Chapter05 />
        <CTA />
        <MethodologyAndFooter />
      </main>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);