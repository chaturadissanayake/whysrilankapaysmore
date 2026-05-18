// ==========================================
// REACT & RECHARTS SETUP (CDN UMD Build)
// ==========================================
const { useState, useEffect, useRef } = React;
const { 
  ComposedChart, LineChart, Line, Area, AreaChart, ReferenceArea, ReferenceLine, 
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} = Recharts;

// ==========================================
// STATIC DATA STORE
// ==========================================
const TICKER_ITEMS = [
  { label: "Real cost per litre diesel",      val: "Rs. 720",   trend: null },
  { label: "Price increase since 2020",       val: "+199%",     trend: "up" },
  { label: "LP 92 Petrol — May 2026",         val: "Rs. 410",   trend: "up" },
  { label: "Auto Diesel — May 2026",          val: "Rs. 392",   trend: "up" },
  { label: "LP 95 Petrol — May 2026",         val: "Rs. 470",   trend: "up" },
  { label: "LP 92 — January 2020",            val: "Rs. 137",   trend: null },
  { label: "Government subsidy per litre",    val: "Rs. 100",   trend: null },
  { label: "CPC loss per litre",              val: "Rs. 228",   trend: "up" },
  { label: "Oil import bill — Feb 2026",      val: "USD 98M",   trend: null },
  { label: "LKR / USD — May 2026",            val: "~Rs. 325",  trend: "up" },
  { label: "LKR / USD — January 2020",        val: "Rs. 185",   trend: null },
  { label: "Strategic reserves",              val: "~30 days",  trend: null },
  { label: "IEA minimum standard",            val: "90 days",   trend: null },
  { label: "Oil import bill — May 2026",      val: "USD 522M",  trend: "up" },
];

const CHAPTERS = [
  { id: "viral",   label: "The Viral Number" },
  { id: "heroViz", label: "Six Years of Data" },
  { id: "trap",    label: "The Structural Trap" },
  { id: "voices",  label: "Public Conversation" },
  { id: "change",  label: "What Needs to Change" },
];

// ==========================================
// SECTION 0: PAGE CHROME COMPONENTS
// ==========================================

const ProgressBar = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setWidth(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '5px', backgroundColor: 'var(--cream-10)', zIndex: 1000 }}>
      <div 
        style={{ height: '100%', width: `${width}%`, backgroundColor: 'var(--orange)', transition: 'width 0.1s linear' }}
        aria-hidden="true"
      />
    </div>
  );
};

const DataTicker = () => {
  // Doubling the array to create a seamless infinite scroll effect
  const tickerData = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      backgroundColor: 'var(--bg-3)', 
      borderBottom: '1px solid var(--border)', 
      overflow: 'hidden', 
      padding: '8px 0',
      zIndex: 999 
    }}>
      <style>
        {`
          @keyframes tickerScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-track {
            display: flex;
            width: max-content;
            animation: tickerScroll 40s linear infinite;
          }
          .ticker-track:hover {
            animation-play-state: paused;
          }
          .ticker-item {
            font-family: var(--ff-mono);
            font-size: 11px;
            letter-spacing: 0.06em;
            color: var(--cream-60);
            padding: 0 24px;
            display: flex;
            align-items: center;
            gap: 8px;
            white-space: nowrap;
          }
        `}
      </style>
      <div className="ticker-track" aria-hidden="true">
        {tickerData.map((item, index) => (
          <div key={index} className="ticker-item">
            <span>{item.label}</span>
            <span style={{ color: item.trend === 'up' ? 'var(--orange)' : 'var(--cream)', fontWeight: 500 }}>
              {item.val}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChapterNav = ({ activeId }) => {
  return (
    <nav className="chapter-nav-container" style={{ zIndex: 900 }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .chapter-nav-container { position: fixed; left: 24px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 16px; }
        .nav-item { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .nav-label { font-family: var(--ff-ui); font-size: 11px; color: var(--cream-30); opacity: 0; transition: opacity 0.3s var(--ease-out); text-transform: uppercase; letter-spacing: 0.05em; }
        .nav-item:hover .nav-label, .nav-item.active .nav-label { opacity: 1; color: var(--cream); }
        .nav-dot { width: 4px; height: 4px; border-radius: 2px; background-color: var(--cream-30); transition: all 0.3s var(--ease-out); display: flex; align-items: center; justify-content: center; color: transparent; font-family: var(--ff-mono); font-size: 14px; }
        .nav-item.active .nav-dot { width: 20px; background-color: var(--orange); }
        
        @media (max-width: 768px) {
          .chapter-nav-container { left: 50%; top: auto; bottom: 24px; transform: translateX(-50%); flex-direction: row; gap: 8px; background: rgba(20, 18, 16, 0.8); backdrop-filter: blur(10px); padding: 8px; border-radius: 40px; border: 1px solid var(--border); }
          .nav-label { display: none; }
          .nav-item.active .nav-label { display: none; }
          .nav-dot { width: 44px; height: 44px; border-radius: 50%; background-color: transparent; border: 1px solid var(--border); color: var(--cream-60); transition: background-color 0.3s, color 0.3s; }
          .nav-item.active .nav-dot { width: 44px; background-color: var(--orange); border-color: var(--orange); color: var(--cream); }
        }
      `}} />
      {CHAPTERS.map((chapter, index) => {
        const isActive = activeId === chapter.id;
        return (
          <a 
            key={chapter.id} 
            href={`#${chapter.id}`}
            className={`nav-item ${isActive ? 'active' : ''}`}
            aria-label={`Go to chapter: ${chapter.label}`}
          >
            <div className="nav-dot">
              <span className="mobile-only-number">{index + 1}</span>
            </div>
            <span className="nav-label">
              {chapter.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
};

// ==========================================
// SECTION 1: HERO
// ==========================================
const Hero = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section style={{
      height: '100svh',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '48px 24px',
      position: 'relative',
      background: 'radial-gradient(circle at bottom left, rgba(196, 82, 42, 0.15) 0%, transparent 50%)'
    }}>
      <div className="col-read" style={{ margin: '0', paddingLeft: '48px' /* Offset for nav */ }}>
        <p style={{
          fontFamily: 'var(--ff-ui)',
          fontSize: '11px',
          color: 'var(--orange)',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          marginBottom: '24px'
        }}>
          DATA INVESTIGATION · SRI LANKA FUEL CRISIS · MAY 2026
        </p>
        
        <h1 className="hero-headline" style={{ marginBottom: '32px' }}>
          Why Sri Lanka<br />Pays More
        </h1>
        
        <p style={{
          fontFamily: 'var(--ff-body)',
          fontSize: '1.1rem',
          lineHeight: 1.6,
          color: 'var(--cream-60)',
          maxWidth: '480px',
          marginBottom: '32px'
        }}>
          Six years of data. A broken system. And a global crisis that is hitting us harder than it should.
        </p>
        
        <p style={{
          fontFamily: 'var(--ff-ui)',
          fontSize: '13px',
          color: 'var(--cream-30)'
        }}>
          By Chatura Dissanayake · May 2026 · 8 min read
        </p>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '48px',
        right: '48px',
        fontFamily: 'var(--ff-mono)',
        fontSize: '9px',
        color: 'var(--cream-30)',
        opacity: scrolled ? 0 : 1,
        transition: 'opacity 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span style={{ animation: 'bounce 2s infinite' }}>↓</span>
        SCROLL
        <style>
          {`
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-10px); }
              60% { transform: translateY(-5px); }
            }
          `}
        </style>
      </div>
    </section>
  );
};

// ==========================================
// SECTION 2: LEDE
// ==========================================
const Lede = () => {
  return (
    <section className="section-padding col-read">
      <span className="section-label">THE STORY</span>
      <p className="body-copy">
        In January 2020, a litre of petrol cost Rs.137. Today it costs Rs.410.
      </p>
      <p className="body-copy">
        That is not just a number going up. It is a three-wheeler driver recalculating every morning whether the day is worth starting. It is your grocery bill climbing even when you did not change what you buy.
      </p>
      <p className="body-copy">
        When we ask why fuel is so expensive, the answer is usually "global oil prices" or "the war in the Middle East." Those things are real. But they are not the whole story.
      </p>
      <p className="body-copy">
        We looked at six years of data to find out exactly what is going on. The numbers show that global events matter — but Sri Lanka is paying more than it should because of how our own system is built. Every time the world sneezes, we end up in hospital.
      </p>
      <p className="body-copy">
        Here is how it works, and what it would take to fix it.
      </p>
    </section>
  );
};

// ==========================================
// SECTION 3: CHAPTER 01 - THE VIRAL NUMBER
// ==========================================

// PLACEHOLDER DATA: Chart 1
// Note: REPLACE with Verité Research formula data when available.
const CHART_1_DATA = [
  { date: "2020-01", year: "2020", pump: 137, formula: 137 },
  { date: "2020-06", year: "",     pump: 137, formula: 145 },
  { date: "2021-01", year: "2021", pump: 137, formula: 180 },
  { date: "2021-06", year: "",     pump: 137, formula: 210 },
  { date: "2022-01", year: "2022", pump: 177, formula: 300 },
  { date: "2022-06", year: "",     pump: 470, formula: 500 },
  { date: "2022-12", year: "",     pump: 430, formula: 440 },
  { date: "2023-01", year: "2023", pump: 400, formula: 380 },
  { date: "2023-06", year: "",     pump: 350, formula: 320 },
  { date: "2024-01", year: "2024", pump: 330, formula: 300 },
  { date: "2025-01", year: "2025", pump: 300, formula: 280 },
  { date: "2025-12", year: "",     pump: 300, formula: 320 },
  { date: "2026-01", year: "2026", pump: 330, formula: 400 },
  { date: "2026-03", year: "",     pump: 360, formula: 600 },
  { date: "2026-05", year: "",     pump: 392, formula: 720 },
];

const Chapter01 = () => {
  return (
    <section id="viral" className="col-read" style={{ padding: '100px 0' }}>
      <span className="section-label">CHAPTER 01 · THE VIRAL NUMBER</span>
      <h2 className="h2-section">The Rs. 720 Question.</h2>
      
      <p className="body-copy">
        In May 2026, the President made a statement that spread fast. He said the actual cost to the government of importing one litre of diesel has hit Rs.720.
      </p>
      <p className="body-copy">
        But they are selling it to you for Rs.392. The government is absorbing Rs.100 of the gap itself. The state petroleum corporation is absorbing the rest — and losing Rs.228 on every single litre it sells.
      </p>
      <p className="body-copy">
        That is a genuine loss. The Rs.720 is not a trick or an exaggeration. Global oil prices have surged to over USD 100 per barrel because of the conflict in the Middle East. When you buy fuel today, you are paying for oil that genuinely costs that much to bring here.
      </p>
      <p className="body-copy" style={{ marginBottom: '48px' }}>
        But the question this story is asking is different. Why does it cost more to bring oil here than to the countries next to us? And why, when the world crisis eventually calms down, do our prices not come back down the way other countries' prices do?
      </p>

      {/* STAT CALLOUT COMPONENT */}
      <div style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'var(--bg-3)',
        padding: '48px 32px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        marginBottom: '48px'
      }}>
        <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: 'var(--ff-disp)', fontSize: 'clamp(2.8rem, 5vw, 5rem)', color: 'var(--cream)', lineHeight: 1 }}>Rs. 720</span>
          <span style={{ fontFamily: 'var(--ff-ui)', fontSize: '12px', color: 'var(--cream-30)', marginTop: '8px', lineHeight: 1.4 }}>
            What it costs to bring one litre of diesel to Sri Lanka today
          </span>
        </div>
        
        <div style={{ width: '1px', backgroundColor: 'var(--border)', display: 'block' }} className="desktop-divider"></div>
        
        <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: 'var(--ff-disp)', fontSize: 'clamp(2.8rem, 5vw, 5rem)', color: 'var(--cream-60)', lineHeight: 1 }}>Rs. 392</span>
          <span style={{ fontFamily: 'var(--ff-ui)', fontSize: '12px', color: 'var(--cream-30)', marginTop: '8px', lineHeight: 1.4 }}>
            What you pay at the pump
          </span>
        </div>

        <div style={{ width: '1px', backgroundColor: 'var(--border)', display: 'block' }} className="desktop-divider"></div>

        <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: 'var(--ff-disp)', fontSize: 'clamp(2.8rem, 5vw, 5rem)', color: 'var(--orange)', lineHeight: 1 }}>Rs. 228</span>
          <span style={{ fontFamily: 'var(--ff-ui)', fontSize: '12px', color: 'var(--cream-30)', marginTop: '8px', lineHeight: 1.4 }}>
            What CPC loses on every litre — after the government's Rs.100 subsidy is added
          </span>
        </div>
      </div>

      <p className="body-copy">
        Sri Lanka's oil import bill tells you how fast this crisis moved.
      </p>

      {/* INLINE STAT STRIP */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '24px',
        padding: '16px',
        backgroundColor: 'var(--bg-2)',
        borderRadius: '4px'
      }}>
        {[{m: "Feb 2026", v: "USD 98M"}, {m: "Mar", v: "USD 216M"}, {m: "Apr", v: "USD 368M"}, {m: "May", v: "USD 522M", highlight: true}].map((item, idx, arr) => (
          <React.Fragment key={idx}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', color: 'var(--cream-30)' }}>{item.m}</span>
              <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '13px', color: item.highlight ? 'var(--orange)' : 'var(--cream)' }}>{item.v}</span>
            </div>
            {idx < arr.length - 1 && <span style={{ color: 'var(--border)', fontFamily: 'var(--ff-mono)' }}>›</span>}
          </React.Fragment>
        ))}
      </div>

      <p className="body-copy">
        That is more than five times February's bill — in three months. For a country still recovering from a debt crisis, this kind of shock is not simple to absorb.
      </p>
      <p className="body-copy" style={{ marginBottom: '48px' }}>
        So the question is not whether the crisis is real. It is. The question is whether Sri Lanka was built to handle it. The answer, based on six years of data, is no.
      </p>

      {/* CHART 1 */}
      <div style={{ width: '100%', height: '400px', marginBottom: '16px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
          <h3 style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', color: 'var(--cream-30)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            PUMP PRICE VS REAL COST — DIESEL (Jan 2020 – May 2026)
          </h3>
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', color: 'var(--red)', textTransform: 'uppercase' }}>
            [PLACEHOLDER — pending real data]
          </span>
        </div>
        
        <div aria-label="Line chart comparing Diesel Pump Price vs Real Cost Formula from January 2020 to May 2026" tabIndex="0" style={{ height: '100%', width: '100%', outline: 'none' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={CHART_1_DATA} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis 
                dataKey="date" 
                tickFormatter={(val) => val.split('-')[0]} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--cream-30)', fontSize: 11, fontFamily: 'var(--ff-mono)' }}
              />
              <YAxis 
                domain={[0, 800]} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--cream-30)', fontSize: 11, fontFamily: 'var(--ff-mono)' }}
                label={{ value: 'LKR / litre', angle: -90, position: 'insideLeft', fill: 'var(--cream-30)', fontSize: 11, fontFamily: 'var(--ff-mono)' }}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const pump = payload.find(p => p.dataKey === 'pump')?.value || 0;
                    const formula = payload.find(p => p.dataKey === 'formula')?.value || 0;
                    const gap = formula - pump;
                    return (
                      <div style={{ backgroundColor: 'var(--bg-3)', border: '1px solid var(--border)', padding: '12px', borderRadius: '4px', fontFamily: 'var(--ff-mono)' }}>
                        <p style={{ fontSize: '11px', color: 'var(--cream-30)', marginBottom: '8px' }}>{label}</p>
                        <p style={{ fontSize: '12px', color: 'var(--blue)', marginBottom: '4px' }}>Real Cost: Rs. {formula}</p>
                        <p style={{ fontSize: '12px', color: 'var(--orange)', marginBottom: '8px' }}>Pump Price: Rs. {pump}</p>
                        {gap > 0 && <p style={{ fontSize: '11px', color: 'var(--red)', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>Gap: Rs. {gap} loss</p>}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              
              <ReferenceLine x="2020-01" stroke="var(--cream-10)" strokeDasharray="3 3" label={{ position: 'top', value: 'Price frozen', fill: 'var(--cream-30)', fontSize: 10, fontFamily: 'var(--ff-mono)' }} />
              <ReferenceLine x="2022-06" stroke="var(--cream-10)" strokeDasharray="3 3" label={{ position: 'top', value: 'Crisis peak', fill: 'var(--cream-30)', fontSize: 10, fontFamily: 'var(--ff-mono)' }} />
              <ReferenceLine x="2023-01" stroke="var(--cream-10)" strokeDasharray="3 3" label={{ position: 'top', value: 'Formula introduced', fill: 'var(--cream-30)', fontSize: 10, fontFamily: 'var(--ff-mono)' }} />
              <ReferenceLine x="2026-05" stroke="var(--cream-10)" strokeDasharray="3 3" label={{ position: 'left', value: 'USD 105/barrel', fill: 'var(--cream-30)', fontSize: 10, fontFamily: 'var(--ff-mono)' }} />

              <defs>
                <linearGradient id="gapGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--orange)" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="var(--blue)" stopOpacity={0.05}/>
                </linearGradient>
              </defs>

              <Area type="monotone" dataKey="formula" stroke="none" fill="url(#gapGradient)" />
              <Line type="monotone" dataKey="formula" name="Real Cost (Formula)" stroke="var(--blue)" strokeWidth={1.5} strokeDasharray="6 3" dot={false} />
              <Line type="monotone" dataKey="pump" name="Pump Price" stroke="var(--orange)" strokeWidth={2.5} dot={false} activeDot={{ r: 6, fill: 'var(--orange)', stroke: 'var(--bg)', strokeWidth: 2 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', color: 'var(--cream-30)', marginTop: '8px', textAlign: 'right' }}>
          Verité Research · CEYPETCO historical prices
        </p>
      </div>

    </section>
  );
};
// ==========================================
// SECTION 4: CHAPTER 02 - SIX YEARS OF DATA
// ==========================================

// PLACEHOLDER DATA: Chart 2 (Indexed Regional Divergence)
// Indexed to Jan 2020 = 100. Sri Lanka diverges highest.
const CHART_2_DATA = [
  { date: "2020-01", sriLanka: 100, india: 100, pakistan: 100, malaysia: 100, thailand: 100, nepal: 100, philippines: 100 },
  { date: "2021-01", sriLanka: 100, india: 115, pakistan: 110, malaysia: 105, thailand: 108, nepal: 112, philippines: 108 },
  { date: "2022-01", sriLanka: 129, india: 130, pakistan: 140, malaysia: 110, thailand: 125, nepal: 130, philippines: 120 },
  { date: "2022-06", sriLanka: 343, india: 140, pakistan: 180, malaysia: 110, thailand: 140, nepal: 150, philippines: 145 },
  { date: "2023-01", sriLanka: 291, india: 135, pakistan: 200, malaysia: 110, thailand: 135, nepal: 140, philippines: 138 },
  { date: "2024-01", sriLanka: 240, india: 130, pakistan: 220, malaysia: 110, thailand: 130, nepal: 135, philippines: 135 },
  { date: "2025-01", sriLanka: 218, india: 125, pakistan: 210, malaysia: 110, thailand: 128, nepal: 130, philippines: 130 },
  { date: "2026-01", sriLanka: 240, india: 125, pakistan: 230, malaysia: 110, thailand: 135, nepal: 140, philippines: null }, // Gap in Philippines data
  { date: "2026-05", sriLanka: 286, india: 130, pakistan: 245, malaysia: 112, thailand: 145, nepal: 145, philippines: null },
];

const Chapter02 = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef([]);

  useEffect(() => {
    // Intersection Observer to track which scrollytelling text step is currently in the middle of the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStep(Number(entry.target.dataset.step));
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' } 
    );

    stepsRef.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  // Filter Chart 1 data based on active scrollytelling step to simulate the build-up
  const getScrollyChartData = () => {
    switch (activeStep) {
      case 0: return CHART_1_DATA.filter(d => d.date <= "2021-06"); // Step 1: 2020-2021
      case 1: return CHART_1_DATA.filter(d => d.date <= "2022-12"); // Step 2: up to 2022
      case 2: return CHART_1_DATA.filter(d => d.date <= "2025-12"); // Step 3: up to 2025
      case 3: return CHART_1_DATA;                                  // Step 4: Full data
      default: return CHART_1_DATA;
    }
  };

  return (
    <section id="heroViz" style={{ padding: '100px 0' }}>
      <div className="col-read">
        <span className="section-label">CHAPTER 02 · SIX YEARS OF DATA</span>
      </div>

      {/* SCOLLLYTELLING CONTAINER */}
      <div className="col-wide" style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        position: 'relative',
        marginTop: '48px'
      }}>
        
        {/* TEXT COLUMN (Scrolls) */}
        <div style={{ flex: '1 1 300px', paddingRight: '48px', zIndex: 2 }}>
          
          <div ref={el => stepsRef.current[0] = el} data-step="0" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', color: 'var(--cream-30)', marginBottom: '16px' }}>STEP 1 OF 4</span>
            <h3 className="h3-card" style={{ marginBottom: '16px' }}>The price freeze (2020–2021)</h3>
            <p className="body-copy">
              In 2020, the world price of oil collapsed because of COVID-19. Sri Lanka's government froze the pump price at Rs.137 anyway — and kept it there even as global prices recovered.
            </p>
            <p className="body-copy">
              They paid the gap by quietly borrowing money inside the petroleum corporation. Nobody announced it.
            </p>
          </div>

          <div ref={el => stepsRef.current[1] = el} data-step="1" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', color: 'var(--cream-30)', marginBottom: '16px' }}>STEP 2 OF 4</span>
            <h3 className="h3-card" style={{ marginBottom: '16px' }}>The rupee falls, the system breaks (2022)</h3>
            <p className="body-copy">
              By early 2022, the country had run out of foreign currency. The rupee lost more than 40% of its value in months. The real cost of a litre in rupees exploded.
            </p>
            <p className="body-copy">
              Stations ran out of fuel. Long queues formed across the country. The government could no longer hide the gap.
            </p>
          </div>

          <div ref={el => stepsRef.current[2] = el} data-step="2" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', color: 'var(--cream-30)', marginBottom: '16px' }}>STEP 3 OF 4</span>
            <h3 className="h3-card" style={{ marginBottom: '16px' }}>The reset (2023–2025)</h3>
            <p className="body-copy">
              A market-linked pricing formula was introduced — tying pump prices to real global costs and the exchange rate.
            </p>
            <p className="body-copy">
              Prices were high but they reflected reality. By 2025, the economy was stabilising. For a brief period, the system worked.
            </p>
          </div>

          <div ref={el => stepsRef.current[3] = el} data-step="3" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '20vh' }}>
            <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', color: 'var(--cream-30)', marginBottom: '16px' }}>STEP 4 OF 4</span>
            <h3 className="h3-card" style={{ marginBottom: '16px' }}>A new shock (2026)</h3>
            <p className="body-copy">
              Then a new crisis arrived — one Sri Lanka did not cause. A conflict in the Middle East disrupted global oil supply. Prices jumped from USD 65 to over USD 100 per barrel.
            </p>
            <p className="body-copy">
              Sri Lanka's import bill multiplied five times in three months. The structural weaknesses — the weak rupee, the empty reserves — meant every rupee of global price increase hit us harder than the countries around us.
            </p>
          </div>

        </div>

        {/* CHART COLUMN (Sticky) */}
        <div style={{ flex: '1 1 500px', position: 'sticky', top: '15vh', height: '70vh', zIndex: 1 }} className="sticky-chart-container">
          <div style={{ backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', color: 'var(--cream-30)', textTransform: 'uppercase', marginBottom: '24px' }}>
              PUMP PRICE VS REAL COST (LKR)
            </h3>
            <div style={{ flexGrow: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getScrollyChartData()} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'var(--cream-30)', fontSize: 11, fontFamily: 'var(--ff-mono)' }} />
                  {/* Fixed Y-Axis domain ensures the chart doesn't jump vertically during steps */}
                  <YAxis domain={[0, 800]} axisLine={false} tickLine={false} tick={{ fill: 'var(--cream-30)', fontSize: 11, fontFamily: 'var(--ff-mono)' }} />
                  
                  {/* Step 2+ elements */}
                  {activeStep >= 1 && (
                    <>
                      <Line type="monotone" dataKey="formula" stroke="var(--blue)" strokeWidth={1.5} strokeDasharray="6 3" dot={false} isAnimationActive={false} />
                      <ReferenceLine x="2022-06" stroke="var(--cream-10)" strokeDasharray="3 3" label={{ position: 'top', value: 'Crisis peak', fill: 'var(--cream-30)', fontSize: 10, fontFamily: 'var(--ff-mono)' }} />
                    </>
                  )}
                  
                  <Line type="monotone" dataKey="pump" stroke="var(--orange)" strokeWidth={2.5} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>

      {/* POST-SCROLLYTELLING CONTENT */}
      <div className="col-read" style={{ marginTop: '80px' }}>
        <p className="body-copy">
          Six years. Two completely different kinds of crisis. The same result: Sri Lanka's people pay more than they should.
        </p>
        <p className="body-copy">
          In 2020, the government made prices look cheap by hiding the cost inside debt. In 2026, the cost is genuinely high because of global events.
        </p>
        <p className="body-copy" style={{ marginBottom: '64px' }}>
          But in both cases, Sri Lanka is worse off than its neighbours — because of structural problems that have never been fixed.
        </p>

        {/* CHART 2: REGIONAL COMPARISON */}
        <div style={{ width: '100%', height: '360px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', color: 'var(--cream-30)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Sri Lanka vs the Region — Petrol Prices (Indexed to January 2020 = 100)
            </h3>
          </div>
          
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={CHART_2_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="date" tickFormatter={(val) => val.split('-')[0]} axisLine={false} tickLine={false} tick={{ fill: 'var(--cream-30)', fontSize: 11, fontFamily: 'var(--ff-mono)' }} />
              <YAxis domain={[50, 400]} axisLine={false} tickLine={false} tick={{ fill: 'var(--cream-30)', fontSize: 11, fontFamily: 'var(--ff-mono)' }} label={{ value: 'Price index', angle: -90, position: 'insideLeft', fill: 'var(--cream-30)', fontSize: 11, fontFamily: 'var(--ff-mono)' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: '4px', fontFamily: 'var(--ff-mono)', fontSize: '12px' }}
                itemStyle={{ color: 'var(--cream-60)', fontSize: '11px' }}
              />
              
              <Line type="monotone" dataKey="india" name="India" stroke="var(--cream-10)" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="pakistan" name="Pakistan" stroke="var(--cream-10)" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="malaysia" name="Malaysia" stroke="var(--cream-10)" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="thailand" name="Thailand" stroke="var(--cream-10)" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="nepal" name="Nepal" stroke="var(--cream-10)" strokeWidth={1} dot={false} />
              <Line type="monotone" dataKey="philippines" name="Philippines*" stroke="var(--cream-10)" strokeWidth={1} dot={false} connectNulls />
              
              {/* Highlighted Sri Lanka Line */}
              <Line type="monotone" dataKey="sriLanka" name="Sri Lanka" stroke="var(--orange)" strokeWidth={2.5} dot={{ r: 3, fill: 'var(--orange)', stroke: 'none' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
            <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', color: 'var(--cream-30)' }}>
              * Philippines data unavailable for 2026
            </p>
            <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', color: 'var(--cream-30)' }}>
              GlobalPetrolPrices.com · CBSL exchange rates
            </p>
          </div>
        </div>

        {/* PULL QUOTE */}
        <div style={{
          borderLeft: '3px solid var(--orange)',
          padding: '32px 0 32px 40px',
          maxWidth: '600px',
          margin: '64px 0'
        }}>
          <p style={{
            fontFamily: 'var(--ff-disp)',
            fontStyle: 'italic',
            fontSize: '1.5rem',
            lineHeight: 1.4,
            color: 'var(--cream)'
          }}>
            "Every time the world price of oil spikes, Sri Lanka crashes harder than the countries next to it. That is not bad luck. That is a structural failure."
          </p>
        </div>

      </div>
    </section>
  );
};

// ==========================================
// SECTION 5: CHAPTER 03 - THE STRUCTURAL TRAP
// ==========================================

// PLACEHOLDER DATA: Chart 3 (LKR/USD)
const CHART_3_DATA = [
  { date: "2020-01", year: "2020", rate: 185 },
  { date: "2020-12", year: "",     rate: 186 },
  { date: "2021-12", year: "2021", rate: 200 },
  { date: "2022-03", year: "",     rate: 220 },
  { date: "2022-05", year: "2022", rate: 360 },
  { date: "2022-12", year: "",     rate: 362 },
  { date: "2023-06", year: "2023", rate: 330 },
  { date: "2024-01", year: "2024", rate: 320 },
  { date: "2025-01", year: "2025", rate: 300 },
  { date: "2026-01", year: "2026", rate: 310 },
  { date: "2026-05", year: "",     rate: 325 }
];

// REAL DATA: Chart 4 (Reserves)
const CHART_4_DATA = [
  { country: "Sri Lanka",   days: 30,  highlight: true  },
  { country: "Philippines", days: 60,  highlight: false },
  { country: "Malaysia",    days: 72,  highlight: false },
  { country: "India",       days: 90,  highlight: false },
];

// PLACEHOLDER DATA: Chart 5 (Subsidies)
const CHART_5_DATA = [
  { name: "Top 30% of households",    value: 70, highlight: true  },
  { name: "Bottom 70% of households", value: 30, highlight: false },
];

const Chapter03 = () => {
  return (
    <section id="trap" className="section-padding col-wide">
      <div style={{ maxWidth: '620px', margin: '0 auto 64px auto' }}>
        <span className="section-label">CHAPTER 03 · THE STRUCTURAL TRAP</span>
        <h2 className="h2-section">
          Three reasons we always take the biggest hit. <span style={{ color: 'var(--cream-30)' }}>And none of them are global wars.</span>
        </h2>
        <p style={{ fontFamily: 'var(--ff-body)', fontSize: '1.1rem', color: 'var(--cream-60)', lineHeight: 1.6 }}>
          The Middle East conflict hit every country in the region. Most absorbed it. Sri Lanka's import bill went up five times in three months. This is why.
        </p>
      </div>

      {/* THREE CARDS GRID */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px' 
      }}>
        
        {/* TRAP 01 */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', color: 'var(--orange)', textTransform: 'uppercase', marginBottom: '12px' }}>TRAP 01</span>
          <h3 style={{ fontFamily: 'var(--ff-disp)', fontSize: '1.4rem', color: 'var(--cream)', marginBottom: '16px', lineHeight: 1.2 }}>A Weaker Rupee</h3>
          <div style={{ flexGrow: 1 }}>
            <p style={{ fontFamily: 'var(--ff-body)', fontSize: '1rem', color: 'var(--cream-60)', marginBottom: '16px', lineHeight: 1.7 }}>
              In 2020, one US dollar cost about Rs.185. Today it costs around Rs.325.
            </p>
            <p style={{ fontFamily: 'var(--ff-body)', fontSize: '1rem', color: 'var(--cream-60)', marginBottom: '24px', lineHeight: 1.7 }}>
              Since Sri Lanka buys all its oil in US dollars, this single fact makes fuel more expensive for us even when the world oil price stays exactly the same. When the world price goes up too — as it has sharply in 2026 — the two effects multiply each other.
            </p>
          </div>
          
          <div style={{ backgroundColor: 'var(--bg-4)', border: '1px solid var(--border)', padding: '16px', marginBottom: '24px' }}>
            <p style={{ fontFamily: 'var(--ff-ui)', fontSize: '13px', color: 'var(--cream)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--orange)' }}>The impact:</strong> The weaker rupee alone adds more than Rs.100 to a litre compared to 2020 — before the oil price spike is even counted.
            </p>
          </div>

          <div style={{ height: '220px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', color: 'var(--cream-30)' }}>The Rupee vs the Dollar</span>
              <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', color: 'var(--red)', textTransform: 'uppercase' }}>[PLACEHOLDER]</span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CHART_3_DATA} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'var(--cream-30)', fontSize: 10, fontFamily: 'var(--ff-mono)' }} />
                <YAxis domain={[150, 400]} axisLine={false} tickLine={false} tick={{ fill: 'var(--cream-30)', fontSize: 10, fontFamily: 'var(--ff-mono)' }} />
                <ReferenceLine x="2022-03" stroke="var(--cream-10)" strokeDasharray="3 3" label={{ position: 'top', value: '2022: Rupee collapses', fill: 'var(--cream-30)', fontSize: 9, fontFamily: 'var(--ff-mono)' }} />
                <ReferenceLine x="2023-06" stroke="var(--cream-10)" strokeDasharray="3 3" label={{ position: 'bottom', value: 'IMF stabilisation', fill: 'var(--cream-30)', fontSize: 9, fontFamily: 'var(--ff-mono)' }} />
                <ReferenceLine x="2026-05" stroke="var(--cream-10)" strokeDasharray="3 3" label={{ position: 'top', value: 'Today ~Rs.325', fill: 'var(--cream-30)', fontSize: 9, fontFamily: 'var(--ff-mono)' }} />
                <Line type="monotone" dataKey="rate" stroke="var(--orange)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', color: 'var(--cream-30)', marginTop: '8px', textAlign: 'right' }}>CBSL exchange rate data</p>
          </div>
        </div>

        {/* TRAP 02 */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', color: 'var(--orange)', textTransform: 'uppercase', marginBottom: '12px' }}>TRAP 02</span>
          <h3 style={{ fontFamily: 'var(--ff-disp)', fontSize: '1.4rem', color: 'var(--cream)', marginBottom: '16px', lineHeight: 1.2 }}>An Empty Tank</h3>
          <div style={{ flexGrow: 1 }}>
            <p style={{ fontFamily: 'var(--ff-body)', fontSize: '1rem', color: 'var(--cream-60)', marginBottom: '16px', lineHeight: 1.7 }}>
              Sri Lanka holds around 30 days of fuel in storage. The global minimum standard is 90 days. India maintains over 90. Malaysia over 70. Philippines holds 60.
            </p>
            <p style={{ fontFamily: 'var(--ff-body)', fontSize: '1rem', color: 'var(--cream-60)', marginBottom: '24px', lineHeight: 1.7 }}>
              When a supply shock hits a country with 90 days of reserves, they can wait. They buy slowly, at planned prices. When it hits a country with 30 days, the government has to move immediately — buying whatever is available, at whatever price is being charged that week. There is no room to negotiate.
            </p>
          </div>
          
          <div style={{ backgroundColor: 'var(--bg-4)', border: '1px solid var(--border)', padding: '16px', marginBottom: '24px' }}>
            <p style={{ fontFamily: 'var(--ff-ui)', fontSize: '13px', color: 'var(--cream)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--orange)' }}>The impact:</strong> Every global disruption forces Sri Lanka to buy emergency fuel at peak prices. That cost reaches your pump price the very next month.
            </p>
          </div>

          <div style={{ height: '220px', position: 'relative' }}>
            <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', color: 'var(--cream-30)' }}>Strategic Fuel Reserves (Days)</span>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_4_DATA} layout="vertical" margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: 'var(--cream-30)', fontSize: 10, fontFamily: 'var(--ff-mono)' }} />
                <YAxis dataKey="country" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--cream-30)', fontSize: 10, fontFamily: 'var(--ff-mono)' }} width={80} />
                <ReferenceLine x={90} stroke="var(--gold)" strokeDasharray="4 2" label={{ position: 'top', value: 'IEA minimum', fill: 'var(--gold)', fontSize: 9, fontFamily: 'var(--ff-mono)' }} />
                <Bar dataKey="days" barSize={20} isAnimationActive={false}>
                  {CHART_4_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.highlight ? 'var(--orange)' : 'var(--cream-10)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', color: 'var(--cream-30)', marginTop: '8px', textAlign: 'right' }}>IEA Strategic Reserves Framework · CPC data</p>
          </div>
        </div>

        {/* TRAP 03 */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', color: 'var(--orange)', textTransform: 'uppercase', marginBottom: '12px' }}>TRAP 03</span>
          <h3 style={{ fontFamily: 'var(--ff-disp)', fontSize: '1.4rem', color: 'var(--cream)', marginBottom: '16px', lineHeight: 1.2 }}>Subsidies Help the Rich</h3>
          <div style={{ flexGrow: 1 }}>
            <p style={{ fontFamily: 'var(--ff-body)', fontSize: '1rem', color: 'var(--cream-60)', marginBottom: '16px', lineHeight: 1.7 }}>
              When the government lowers fuel prices to "protect the public," it sounds fair. But fuel consumption is not spread evenly.
            </p>
            <p style={{ fontFamily: 'var(--ff-body)', fontSize: '1rem', color: 'var(--cream-60)', marginBottom: '24px', lineHeight: 1.7 }}>
              The wealthiest 30% of households consume around 70% of all fuel. They own more vehicles. They drive further. They buy more. A blanket fuel price cut sends most of the money to households that need it least. The family using a small amount of kerosene sees almost no benefit.
            </p>
          </div>
          
          <div style={{ backgroundColor: 'var(--bg-4)', border: '1px solid var(--border)', padding: '16px', marginBottom: '24px' }}>
            <p style={{ fontFamily: 'var(--ff-ui)', fontSize: '13px', color: 'var(--cream)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--orange)' }}>The impact:</strong> The government loses billions a month giving cheap fuel to people who can afford the real price — money that could go to targeted support.
            </p>
          </div>

          <div style={{ height: '220px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', color: 'var(--cream-30)' }}>Who Gets the Fuel Subsidy?</span>
              <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', color: 'var(--red)', textTransform: 'uppercase' }}>[PLACEHOLDER]</span>
            </div>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={CHART_5_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value" stroke="none" isAnimationActive={false}>
                    {CHART_5_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.highlight ? 'var(--orange)' : 'var(--cream-10)'} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100px' }}>
                <span style={{ fontFamily: 'var(--ff-disp)', fontSize: '1.2rem', color: 'var(--cream)', lineHeight: 1 }}>70% to richest 30%</span>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', color: 'var(--cream-30)', marginTop: '8px', textAlign: 'right' }}>National household survey data</p>
          </div>
        </div>

      </div>
    </section>
  );
};

// ==========================================
// SECTION 6: CONTEXT - FROM PUMP TO PLATE
// ==========================================
const ContextBridge = () => {
  const cascadeStages = [
    { label: "Fuel price rises", time: "Day 1–3", active: true },
    { label: "Transport operators adjust", time: "Day 3–7", active: false },
    { label: "Food distribution costs up", time: "Week 2", active: false },
    { label: "Market prices rise", time: "Weeks 3–4", active: false },
    { label: "Manufactured goods follow", time: "Month 2–3", active: false },
    { label: "Utilities/gas adjust", time: "Month 3+", active: false }
  ];

  return (
    <section className="section-padding col-read">
      <span className="section-label">CONTEXT · THE DOMINO EFFECT</span>
      <h2 className="h2-section" style={{ marginBottom: '8px' }}>This is not a story about cars.</h2>
      <h2 className="h2-section" style={{ color: 'var(--cream-30)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '32px' }}>It is a story about everything you buy.</h2>
      
      <p className="body-copy">
        Most people in Sri Lanka do not own a car. But everyone eats. And the moment diesel goes up, the cost of getting food from the farm to your plate goes up too. Here is how it travels:
      </p>

      {/* CHART 6: PASS-THROUGH CASCADE (HTML/CSS Diagram) */}
      <div style={{ 
        margin: '48px 0', 
        padding: '32px 0',
        overflowX: 'auto', // For mobile horizontal scroll if needed, though brief asks for vertical stack on mobile. Let's use flexbox wrapping or a CSS trick for responsiveness.
      }}>
        <style>
          {`
            .cascade-container {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              position: relative;
            }
            .cascade-line {
              position: absolute;
              top: 30px;
              left: 0;
              right: 0;
              height: 1px;
              border-top: 1px dashed var(--border);
              z-index: 1;
            }
            .cascade-node {
              display: flex;
              flex-direction: column;
              align-items: center;
              z-index: 2;
              width: 90px;
              text-align: center;
            }
            .cascade-circle {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              margin: 8px 0;
            }
            @media (max-width: 600px) {
              .cascade-container {
                flex-direction: column;
                align-items: flex-start;
                gap: 24px;
              }
              .cascade-line {
                top: 0;
                bottom: 0;
                left: 6px;
                right: auto;
                width: 1px;
                height: 100%;
                border-top: none;
                border-left: 1px dashed var(--border);
              }
              .cascade-node {
                flex-direction: row;
                width: 100%;
                text-align: left;
              }
              .cascade-circle {
                margin: 0 16px 0 0;
              }
              .cascade-labels {
                display: flex;
                flex-direction: column;
              }
            }
          `}
        </style>
        <div className="cascade-container">
          <div className="cascade-line"></div>
          {cascadeStages.map((stage, idx) => (
            <div key={idx} className="cascade-node">
              <span className="cascade-labels" style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', color: 'var(--cream-30)' }}>{stage.time}</span>
              <div className="cascade-circle" style={{ backgroundColor: stage.active ? 'var(--orange)' : 'var(--cream-10)' }}></div>
              <span className="cascade-labels" style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', color: 'var(--cream)', lineHeight: 1.4 }}>{stage.label}</span>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', color: 'var(--cream-30)', marginTop: '24px', textAlign: 'right' }}>
          Source: IPS sectoral analysis, 2026
        </p>
      </div>

      {/* CALLOUT BOX */}
      <div style={{
        borderLeft: '3px solid var(--gold)',
        backgroundColor: 'var(--bg-3)',
        padding: '24px',
        margin: '48px 0'
      }}>
        <h4 style={{ fontFamily: 'var(--ff-ui)', fontSize: '12px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px', letterSpacing: '0.05em' }}>
          Why Panic Buying Makes It Worse
        </h4>
        <p style={{ fontFamily: 'var(--ff-body)', fontSize: '1rem', color: 'var(--cream)', lineHeight: 1.7, marginBottom: '0' }}>
          When a price hike rumour spreads, everyone rushes to fill up. The tanks — already at only 30 days — empty fast. The government orders emergency fuel on short notice, at peak prices. That cost appears in next month's revision. The panic you were trying to outrun helped cause the next one.
        </p>
      </div>

      <p className="body-copy">
        The problem underneath all of this is transparency. Because the pricing formula is not published in plain language, nobody knows whether a hike is driven by global oil prices, government debt, tax adjustments, or something else entirely.
      </p>
      <p className="body-copy">
        Without that information, every revision becomes a rumour before it becomes a fact.
      </p>
    </section>
  );
};
// ==========================================
// SECTION 7: CHAPTER 04 - PUBLIC CONVERSATION
// ==========================================

const VOICES = [
  {
    platform: "Reddit · r/srilanka",
    upvotes: 79,
    highlight: true,
    text: "Are you that disconnected from reality? Do you really think most people have enough money to just buy an EV? I can safely bet 99% of Sri Lankans cannot do that.",
  },
  {
    platform: "Reddit · r/srilanka",
    upvotes: 27,
    text: "If global fuel prices are increasing, and we buy our fuel from the same global market, why would prices at the pump not increase? Sometimes shit just sucks and it's out of anyone's control.",
  },
  {
    platform: "Instagram · [Anonymised]",
    upvotes: null,
    text: "The unfortunate situation is this affects different people differently. If you own assets you are a beneficiary. If you are a retiree with LKR savings, your quality of life will consistently collapse.",
  },
  {
    platform: "Reddit · r/srilanka",
    upvotes: 17,
    text: "Waiting to see the day we invite the old corrupt thugs back… the way these guys are running the show.",
  },
  {
    platform: "Reddit · r/srilanka",
    upvotes: 12,
    text: "Yeah, local fuel price should reflect global price. But to say 'to curb consumption' — that's a bad intent.",
  },
  {
    platform: "Reddit · r/srilanka",
    upvotes: 7,
    text: "Unfortunately paying back loans — mostly taken by previous governments — eats up like 50% of tax revenue. If we built renewable energy infrastructure instead of highways we wouldn't be in this mess.",
  },
];

const Chapter04 = () => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(`"${text}" — Read more at [URL]`);
    // Note: In a production build, add a temporary "Copied!" state to the button
  };

  return (
    <section id="voices" className="section-padding col-wide">
      <div style={{ maxWidth: '620px', margin: '0 auto 64px auto' }}>
        <span className="section-label">CHAPTER 04 · PUBLIC CONVERSATION</span>
        <h2 className="h2-section">What people are actually saying.</h2>
        <p style={{ fontFamily: 'var(--ff-body)', fontSize: '1.1rem', color: 'var(--cream-60)', lineHeight: 1.6 }}>
          Without clear, plain-language answers from the government, people are working out the math themselves. This is what that conversation sounds like.
        </p>
      </div>

      {/* MASONRY GRID (CSS Multi-column approach) */}
      <div style={{
        columnCount: 3,
        columnWidth: '300px',
        columnGap: '24px',
        marginBottom: '48px'
      }}>
        {VOICES.map((voice, idx) => (
          <div key={idx} style={{
            backgroundColor: 'var(--bg-3)',
            border: '1px solid var(--border)',
            borderTop: voice.highlight ? '3px solid var(--orange)' : '3px solid var(--border)',
            padding: '28px',
            borderRadius: '2px',
            marginBottom: '24px',
            breakInside: 'avoid',
            display: 'inline-block', // Crucial for break-inside to work across browsers
            width: '100%'
          }}>
            <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', color: 'var(--cream-30)', marginBottom: '16px' }}>
              {voice.platform}
            </p>
            <p style={{ fontFamily: 'var(--ff-body)', fontStyle: 'italic', fontSize: '1rem', color: 'var(--cream-60)', lineHeight: 1.6, marginBottom: '24px' }}>
              "{voice.text}"
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: 'auto' }}>
              <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', color: 'var(--cream-30)' }}>
                {voice.upvotes ? `▲ ${voice.upvotes}` : ' '}
              </span>
              <button 
                onClick={() => handleCopy(voice.text)}
                style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', color: 'var(--cream-30)', cursor: 'pointer', background: 'none', border: '1px solid var(--border)', padding: '4px 8px', borderRadius: '2px' }}
                aria-label="Copy quote to clipboard"
              >
                COPY QUOTE
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="col-read">
        <p style={{ fontFamily: 'var(--ff-body)', fontSize: '1rem', color: 'var(--cream-60)', maxWidth: '580px', lineHeight: 1.7, marginBottom: '16px' }}>
          The frustration in these conversations is real — and it is pointed in every direction at once, because the information gap leaves people filling in the blanks themselves.
        </p>
        <p style={{ fontFamily: 'var(--ff-body)', fontSize: '1rem', color: 'var(--cream-60)', maxWidth: '580px', lineHeight: 1.7, marginBottom: '24px' }}>
          That is what this story is trying to fix.
        </p>
        <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', color: 'var(--cream-30)' }}>
          Quotes from public online discussions. Usernames removed.
        </p>
      </div>
    </section>
  );
};

// ==========================================
// SECTION 8: CHAPTER 05 - WHAT NEEDS TO CHANGE
// ==========================================

const CHANGES = [
  {
    num: "01",
    title: "Publish the real math. Every month. In plain language.",
    text: "Before every price revision, release a simple breakdown: how much is the actual cost of the oil, how much is tax, how much is CPC operating cost, how much is debt repayment or subsidy recovery. The public has a right to see the math before they are asked to pay it.",
    ask: "Ask: Ministry of Petroleum and PUCSL should publish a plain-language cost breakdown with every fuel price revision.",
  },
  {
    num: "02",
    title: "Stop the monthly price shocks.",
    text: "Sri Lanka adjusts prices once a month, creating sudden large changes that trigger panic buying. India adjusts daily — the change is so small nobody panics. Moving to weekly or fortnightly revisions would reduce the shock cycle and break the panic loop.",
    ask: null,
  },
  {
    num: "03",
    title: "Fill the reserve tanks.",
    text: "Sri Lanka holds roughly 30 days of fuel in reserve. The IEA minimum is 90 days. A country with 90 days can wait out a global price spike. Sri Lanka cannot. Closing that gap is the single most direct way to reduce vulnerability to the next crisis.",
    ask: null,
  },
];

const Chapter05 = () => {
  return (
    <section id="change" className="col-read" style={{ paddingTop: '100px' }}>
      <span className="section-label">CHAPTER 05 · WHAT NEEDS TO CHANGE</span>
      <h2 className="h2-section">Three things that would actually fix this.</h2>
      <p style={{ fontFamily: 'var(--ff-body)', fontSize: '1.1rem', color: 'var(--cream-60)', lineHeight: 1.6, marginBottom: '64px' }}>
        The structural problems are known. The solutions are not complicated. They just require doing.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {CHANGES.map((item, idx) => (
          <div key={idx} style={{
            position: 'relative',
            paddingTop: '32px',
            paddingBottom: '48px',
            borderBottom: idx < CHANGES.length - 1 ? '1px solid var(--border)' : 'none'
          }}>
            {/* Background Number */}
            <span style={{
              position: 'absolute',
              top: '24px',
              left: '-16px',
              fontFamily: 'var(--ff-mono)',
              fontSize: '48px',
              color: 'var(--orange)',
              opacity: 0.15,
              lineHeight: 1,
              userSelect: 'none',
              zIndex: 0
            }}>
              {item.num}
            </span>
            
            <div style={{ position: 'relative', zIndex: 1, paddingLeft: '16px' }}>
              <h3 style={{ fontFamily: 'var(--ff-disp)', fontSize: '1.4rem', color: 'var(--cream)', marginBottom: '16px', lineHeight: 1.3 }}>
                {item.title}
              </h3>
              <p style={{ fontFamily: 'var(--ff-body)', fontSize: '1rem', color: 'var(--cream-60)', lineHeight: 1.7, marginBottom: item.ask ? '16px' : '0' }}>
                {item.text}
              </p>
              {item.ask && (
                <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', color: 'var(--cream-30)', lineHeight: 1.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.ask}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* PEAK-END CLOSING COPY */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '48px', marginTop: '80px', paddingBottom: '40px' }}>
        <p style={{ fontFamily: 'var(--ff-body)', fontSize: '1.15rem', color: 'var(--cream-60)', maxWidth: '640px', lineHeight: 1.8, marginBottom: '24px' }}>
          Global oil shocks are not going away. The Middle East crisis of 2026 will not be the last disruption Sri Lanka faces.
        </p>
        <p style={{ fontFamily: 'var(--ff-body)', fontSize: '1.15rem', color: 'var(--cream-60)', maxWidth: '640px', lineHeight: 1.8, marginBottom: '24px' }}>
          The question is whether, when the next one comes, this country will have the reserves, the pricing transparency, and the exchange rate stability to absorb it — or whether it will once again multiply the impact on the people least able to bear it.
        </p>
        <p style={{ fontFamily: 'var(--ff-body)', fontSize: '1.15rem', color: 'var(--cream-60)', maxWidth: '640px', lineHeight: 1.8, marginBottom: '24px' }}>
          Right now, a Sri Lankan paying Rs.410 for petrol is paying more than a Malaysian, a Pakistani, a Thai, and a Filipino are paying in their own currencies for the same litre.
        </p>
        <p style={{ fontFamily: 'var(--ff-body)', fontSize: '1.15rem', color: 'var(--cream-60)', maxWidth: '640px', lineHeight: 1.8 }}>
          That is not inevitable. It is a choice — made over many years, by many governments — to build a system without buffers.
        </p>
      </div>
    </section>
  );
};
// ==========================================
// SECTION 9: CALL TO ACTION
// ==========================================
const CTA = () => {
  const handleShare = async () => {
    const shareData = {
      title: 'Why Sri Lanka Pays More',
      text: 'Six years of data. A broken system. And a global crisis that is hitting us harder than it should.',
      url: window.location.href
    };

    if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!'); // Simple fallback for desktop skeleton
    }
  };

  return (
    <section className="col-read" style={{ padding: '120px 0', textAlign: 'center' }}>
      <h2 className="h2-section" style={{ marginBottom: '24px' }}>The story doesn't end here.</h2>
      <p style={{ fontFamily: 'var(--ff-body)', fontSize: '1.1rem', color: 'var(--cream-60)', lineHeight: 1.6, marginBottom: '24px' }}>
        If this helped you understand what is actually happening at the pump — not the press release version, the real math — share it.
      </p>
      <p style={{ fontFamily: 'var(--ff-body)', fontSize: '1.1rem', color: 'var(--cream-60)', lineHeight: 1.6, marginBottom: '48px' }}>
        A better public conversation starts with people having the facts.
      </p>

      <style>
        {`
          .cta-btn-group {
            display: flex;
            gap: 12px;
            justify-content: center;
          }
          .cta-btn {
            font-family: var(--ff-ui);
            font-size: 13px;
            font-weight: 500;
            min-height: 48px;
            padding: 12px 28px;
            border-radius: 2px;
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            letter-spacing: 0.05em;
            transition: opacity 0.2s;
          }
          .cta-btn:hover { opacity: 0.9; }
          .cta-primary {
            background-color: var(--orange);
            color: var(--cream);
          }
          .cta-secondary {
            border: 1px solid var(--border);
            color: var(--cream);
          }
          @media (max-width: 600px) {
            .cta-btn-group { flex-direction: column; }
            .cta-btn { width: 100%; }
          }
        `}
      </style>

      <div className="cta-btn-group">
        <button onClick={handleShare} className="cta-btn cta-primary" aria-label="Share Story">
          SHARE STORY
        </button>
        <a href="mailto:?subject=Why Sri Lanka Pays More&body=Read this data story on Sri Lanka's fuel crisis: [Link]" className="cta-btn cta-secondary">
          EMAIL TO A FRIEND
        </a>
        <a href="mailto:consultchatura@gmail.com?subject=Feedback: Fuel Crisis Story" className="cta-btn cta-secondary">
          SEND FEEDBACK
        </a>
      </div>
    </section>
  );
};

// ==========================================
// SECTION 10: METHODOLOGY
// ==========================================
const Methodology = () => {
  const sources = [
    { label: "Fuel prices", value: "CEYPETCO" },
    { label: "Formula", value: "Verité Research" },
    { label: "Policy", value: "Advocata Institute" },
    { label: "Fact-check", value: "FactCheck.lk" },
    { label: "Regional data", value: "GlobalPetrolPrices.com" },
    { label: "Exchange rates", value: "CBSL" },
    { label: "Oil prices", value: "EIA Brent Crude" },
    { label: "Parliament", value: "Ada Derana / Hansard" },
    { label: "Pass-through", value: "IPS, March 2026" },
    { label: "Voices", value: "r/srilanka · Instagram" }
  ];

  return (
    <section style={{ backgroundColor: 'var(--bg-2)', padding: '64px 24px', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '620px', margin: '0 auto' }}>
        <h5 style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', textTransform: 'uppercase', color: 'var(--cream-30)', marginBottom: '24px', letterSpacing: '0.05em' }}>
          METHODOLOGY & SOURCES
        </h5>
        
        <p style={{ fontFamily: 'var(--ff-ui)', fontSize: '14px', color: 'var(--cream-30)', lineHeight: 1.65, marginBottom: '16px' }}>
          All fuel price data comes from official published sources and has been cross-checked for accuracy. The Rs.720 figure is from a public statement by President Dissanayake in May 2026. Regional comparisons use publicly available data converted to LKR using official central bank rates.
        </p>
        <p style={{ fontFamily: 'var(--ff-ui)', fontSize: '14px', color: 'var(--cream-30)', lineHeight: 1.65, marginBottom: '16px' }}>
          This story does not take a political position. It aims to explain the math behind the pump price clearly enough that anyone can understand it.
        </p>
        <p style={{ fontFamily: 'var(--ff-ui)', fontSize: '14px', color: 'var(--cream-30)', lineHeight: 1.65, marginBottom: '48px' }}>
          If you find an error: consultchatura@gmail.com
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '48px' }}>
          {sources.map((src, idx) => (
            <div key={idx} style={{ border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '2px', display: 'flex', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', color: 'var(--cream-30)' }}>{src.label}:</span>
              <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '11px', color: 'var(--cream)' }}>{src.value}</span>
            </div>
          ))}
        </div>

        <a href="data.json" download style={{ fontFamily: 'var(--ff-mono)', fontSize: '12px', color: 'var(--cream-30)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid var(--border)', borderRadius: '2px' }}>
          ↓ DOWNLOAD DATASET (JSON)
        </a>
      </div>
    </section>
  );
};

// ==========================================
// SECTION 11: FOOTER
// ==========================================
const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
        
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', color: 'var(--cream-30)', letterSpacing: '0.05em' }}>
          WHY SRI LANKA PAYS MORE · DATA STORY · MAY 2026
        </span>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a href="#" style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', color: 'var(--cream-30)', textDecoration: 'none' }}>Back to top</a>
          {CHAPTERS.map(ch => (
            <a key={ch.id} href={`#${ch.id}`} style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', color: 'var(--cream-30)', textDecoration: 'none' }}>
              {ch.label}
            </a>
          ))}
        </div>
        
      </div>
    </footer>
  );
};

// ==========================================
// MAIN APP ROOT
// ==========================================
const App = () => {
  const [activeChapter, setActiveChapter] = useState(null);

  // Scroll spy for chapter navigation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    CHAPTERS.forEach(chapter => {
      const el = document.getElementById(chapter.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <ProgressBar />
      
      {/* Top Chrome */}
      <DataTicker />
      <ChapterNav activeId={activeChapter} />
      
      {/* Main Content */}
      <main id="main-content">
        <Hero />
        <Lede />
        <Chapter01 />
        <Chapter02 />
        <Chapter03 />
        <ContextBridge />
        <Chapter04 />
        <Chapter05 />
        <CTA />
      </main>

      {/* Footer / Meta */}
      <Methodology />
      <Footer />
    </div>
  );
};

// ==========================================
// RENDER TO DOM
// ==========================================
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);