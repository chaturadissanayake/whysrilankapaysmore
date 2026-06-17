'use strict';

const DATA = {
  receipt: [
    { name: "Big Onions 1kg",    old: "139",    new: "222",    pct: "+59%", down: false },
    { name: "Dried Sprats 1kg",  old: "1,031",  new: "1,549",  pct: "+50%", down: false },
    { name: "Kerosene 1L",       old: "179",    new: "263",    pct: "+47%", down: false },
    { name: "Eggs (each)",       old: "30",     new: "40",     pct: "+36%", down: false },
    { name: "LP Gas 12.5kg",     old: "3,793",  new: "5,086",  pct: "+34%", down: false },
    { name: "Fresh Paraw 1kg",   old: "2,288",  new: "2,869",  pct: "+25%", down: false },
    { name: "Chicken 1kg",       old: "1,138",  new: "1,343",  pct: "+18%", down: false },
    { name: "Rice Kekulu 1kg",   old: "223",    new: "204",    pct: "−8%",  down: true  }
  ],

  chainStages: [
    { stage: "1", time: "Day 1", title: "Pump price rises", text: "Fuel becomes more expensive. Auto Diesel went from Rs. 275 in May 2025 to Rs. 390 in May 2026 , a 42% increase in twelve months." },
    { stage: "2", time: "Days 3–7", title: "Transport costs rise", text: "Three-wheelers, lorries, and fishing boats raise their rates immediately. Getting anything from anywhere now costs more." },
    { stage: "3", time: "Weeks 1–2", title: "Fish and fresh food get more expensive", text: "Fishing boats run on diesel. Fuel is among their largest costs. When diesel goes up, fish prices at Peliyagoda market follow within days." },
    { stage: "4", time: "Weeks 2–4", title: "Dry goods and grocery prices rise", text: "Warehousing, distribution, and retail all carry energy costs. Suppliers adjust their prices." },
    { stage: "5", time: "Month 1–2", title: "Restaurants and food stalls adjust", text: "The small kadé, the rice and curry shop, the bakery , they absorb rising ingredient and fuel costs for as long as they can, then adjust." },
    { stage: "6", time: "Month 2–3+", title: "Electricity and utility bills rise", text: "The Ceylon Electricity Board carries its own fuel costs. These feed into utility bills and processed food prices." }
  ],

  flipCards: [
    { id: "bread", front: "A loaf of bread", verdict: "YES", desc: "Wheat is imported and transported by diesel lorry. The mill uses electricity. The bakery oven uses LP Gas or kerosene. The delivery van uses petrol." },
    { id: "fish", front: "Fresh fish from market", verdict: "YES", desc: "A fishing boat burns 60–150 litres of diesel per day at sea. Paraw fish rose 35%, Hurulla rose 68%, Balaya rose 49% in the year to May 2026." },
    { id: "eggs", front: "A dozen eggs", verdict: "YES", desc: "Poultry farms use fuel for heating brooders, powering feed systems, and ventilation. Egg prices rose 36%." },
    { id: "veg", front: "Vegetables from the pola", verdict: "YES", desc: "Up-country vegetables travel over 200 km by lorry. Cold storage uses electricity." },
    { id: "tuk", front: "A three-wheeler trip", verdict: "YES", desc: "Three-wheelers run on petrol or diesel. Fares rise instantly. Enormous aggregate impact for low-income households." },
    { id: "van", front: "Your child's school van", verdict: "YES", desc: "School vans run on petrol or diesel. Compounds quickly for families with multiple children." },
    { id: "bulb", front: "Your electricity bill", verdict: "YES", desc: "CEB generates power using fuel oil and diesel during peak demand." },
    { id: "oil", front: "A bottle of coconut oil", verdict: "YES", desc: "Harvested and transported by lorry, processed using electricity. Shows fuel pushes prices even when the raw commodity falls." }
  ],

  brentVsPump: [
    { date: "Jan 2020", brent: 64,  pump: 104 },
    { date: "Jan 2021", brent: 55,  pump: 104 },
    { date: "Jan 2022", brent: 87,  pump: 121 },
    { date: "Jun 2022", brent: 122, pump: 440 },
    { date: "Jan 2023", brent: 83,  pump: 405 },
    { date: "Jan 2024", brent: 80,  pump: 358 },
    { date: "Jan 2025", brent: 65,  pump: 286 },
    { date: "Jan 2026", brent: 65,  pump: 279 },
    { date: "Mar 2026", brent: 103, pump: 281 },
    { date: "Apr 2026", brent: 117, pump: 350 },
    { date: "May 2026", brent: 93,  pump: 392 }
  ],

  formulaVsActual: [
    { date: "Jan 2020", market: 104, formula: 103 },
    { date: "Jan 2022", market: 121, formula: 133 },
    { date: "May 2022", market: 400, formula: 329 },
    { date: "Jun 2023", market: 310, formula: 310 },
    { date: "Mar 2026", market: 281, formula: 298 },
    { date: "May 2026", market: 390, formula: 390 }
  ],

  exchangeRate: [
    { date: "Jan 2020", rate: 181.0 },
    { date: "Mar 2022", rate: 257.0 },
    { date: "Oct 2022", rate: 365.0 },
    { date: "Dec 2024", rate: 291.0 },
    { date: "May 2026", rate: 328.0 }
  ],

  regional: [
    { date: "Jan 2020", sriLanka: 100,  india: 100, pakistan: 100, malaysia: 100, thailand: 100 },
    { date: "Jun 2022", sriLanka: 343,  india: 138, pakistan: 193, malaysia: 100, thailand: 137 },
    { date: "Jan 2024", sriLanka: 241,  india: 128, pakistan: 236, malaysia: 100, thailand: 127 },
    { date: "Jan 2026", sriLanka: 215,  india: 124, pakistan: 246, malaysia: 102, thailand: 132 },
    { date: "Jun 2026", sriLanka: 317,  india: 129, pakistan: 263, malaysia: 108, thailand: 141 }
  ],

  wageFood: [
    { date: "Jan 2020", Public_Real: 95.2,  Food_Idx: 90  },
    { date: "Jan 2022", Public_Real: 91.3,  Food_Idx: 120 },
    { date: "Sep 2022", Public_Real: 59.1,  Food_Idx: 210 },
    { date: "Jan 2024", Public_Real: 60.9,  Food_Idx: 198 },
    { date: "Apr 2026", Public_Real: 79.3,  Food_Idx: 180 }
  ],

  breakdownNov: [
    { key: "Landed cost",       value: 157.96, color: "#111111" },
    { key: "Tax",               value: 93.10,  color: "#D92929" },
    { key: "Processing margin", value: 14.92,  color: "#B8860B" },
    { key: "Admin / other",     value: 3.16,   color: "#666666" }
  ],

  fixes: [
    { num: "01", title: "Publish the full formula calculation every month.", text: "The formula exists. It is updated monthly. Publication of the full breakdown in a format accessible to anyone would allow the public to hold the system accountable." },
    { num: "02", title: "Move to weekly or fortnightly price revisions.", text: "When prices are adjusted monthly, each revision is large, visible, and feels like a sudden shock. Countries that revise weekly distribute the adjustment." },
    { num: "03", title: "Build strategic reserves toward the 90-day minimum.", text: "Moving from 30 days to 90 days of import cover would remove Sri Lanka's forced exposure to panic buying at peak prices." },
    { num: "04", title: "Replace blanket fuel subsidies with targeted support.", text: "A blanket subsidy delivers most of its value to those who need it least. Targeted cash transfers linked to market rates would reach those who genuinely need protection." },
    { num: "05", title: "Invest in reducing the food supply chain's diesel dependence.", text: "Cold chain infrastructure, rail freight, and electrification of small-scale food processing would reduce the degree to which a fuel price rise automatically becomes a food price rise." }
  ]
};

const COLORS = {
  ink: '#111111',
  paper: '#F7F5F0',
  red: '#D92929',
  teal: '#2A6B60',
  gold: '#B8860B',
  gray: '#666666'
};

function setupNav() {
  const toggle = document.getElementById('nav-toggle');
  const drawer = document.getElementById('nav-drawer');
  const fill = document.getElementById('nav-fill');

  if (toggle && drawer) {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth >= 960) {
          toggle.setAttribute('aria-expanded', 'false');
          drawer.classList.remove('open');
        }
      }, 200);
    });

    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      drawer.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 960) {
          toggle.setAttribute('aria-expanded', 'false');
          drawer.classList.remove('open');
        }
      });
    });
  }

  const chapterEl = document.getElementById('nav-chapter');
  const chapterMap = [
    ['section-receipt', 'Your basket'],
    ['section-glance', 'The short version'],
    ['section-connection', 'Fuel-food'],
    ['section-chain', 'The chain'],
    ['section-flipcards', "What's inside"],
    ['section-spark', 'The trigger'],
    ['section-price', 'The price'],
    ['section-exchange', 'Why worse here'],
    ['section-comparison', 'Regional data'],
    ['section-squeeze', 'The squeeze'],
    ['section-fixes', 'What to fix']
  ];

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (fill) fill.style.width = scrolled + '%';

    if (chapterEl) {
      const navLinks = document.querySelectorAll('.nav-links a');
      for (let i = chapterMap.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapterMap[i][0]);
        if (el && el.getBoundingClientRect().top <= 80) {
          chapterEl.textContent = chapterMap[i][1];
          navLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + chapterMap[i][0]) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
          break;
        }
        if (i === 0) {
          chapterEl.textContent = '';
          navLinks.forEach(link => link.classList.remove('active'));
        }
      }
    }
  }, { passive: true });
}

function initSummaryScrollytelling() {
  const track = document.getElementById('summary-track');
  const lines = document.querySelectorAll('.summary-line');
  if (!track || lines.length === 0) return;

  let trackRect = track.getBoundingClientRect();
  let trackTopAbsolute = trackRect.top + window.scrollY;
  let trackHeight = trackRect.height - window.innerHeight;

  window.addEventListener('resize', () => {
    trackRect = track.getBoundingClientRect();
    trackTopAbsolute = trackRect.top + window.scrollY;
    trackHeight = trackRect.height - window.innerHeight;
  }, { passive: true });

  window.addEventListener('scroll', () => {
    let currentScroll = window.scrollY;
    let trackTop = trackTopAbsolute - currentScroll;
    
    let progress = -trackTop / trackHeight;
    progress = Math.max(0, Math.min(1, progress));

    const totalSteps = lines.length;
    const stepSize = 1 / totalSteps;

      lines.forEach((line, index) => {
          const stepStart = index * stepSize;
          const stepEnd = (index + 1) * stepSize;
          const shouldBeActive =
            (progress >= stepStart && progress < stepEnd) ||
            (index === totalSteps - 1 && progress >= 0.99) ||
            (index === 0 && progress <= 0);

      if (shouldBeActive) {
        line.classList.add('is-active');
      } else if (line.classList.contains('is-active')) {
        line.classList.remove('is-active');
      }
    });
  }, { passive: true });
}

function buildScrollytellingReceipt() {
  const textCol = document.getElementById('receipt-text-col');
  const listCol = document.getElementById('receipt-items-list');
  
  if (!textCol || !listCol) return;

  const steps = [
    "You do not need to own a vehicle for fuel prices to affect you.",
    "Most people in Sri Lanka use public transport or walk. So when fuel prices rise, it is easy to think it does not affect you.",
    "But everything you eat was transported. The fish came on a truck. The vegetables came on a lorry. Every step between the farm and your plate carries a fuel cost.",
    "When that cost goes up, it does not stop at the pump. It moves forward through the chain, and it arrives at your plate within weeks. Let's look at the actual receipt data."
  ];

  steps.forEach((text, i) => {
    const step = document.createElement('div');
    step.className = 'scrolly-step';
    step.setAttribute('data-receipt-step', i);
    step.innerHTML = `<div class="scrolly-step-inner"><p>${text}</p></div>`;
    textCol.appendChild(step);
  });

  DATA.receipt.forEach((item, i) => {
    const row = document.createElement('div');
    row.className = 'receipt-item';
    row.setAttribute('data-index', i);
    row.innerHTML = `
      <div class="receipt-item-name">${item.name}</div>
      <div class="receipt-item-old">Rs.${item.old}</div>
      <div class="receipt-item-new">Rs.${item.new}</div>
      <div class="receipt-item-pct ${item.down ? 'down' : 'up'}">${item.pct}</div>
    `;
    listCol.appendChild(row);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('#receipt-text-col .scrolly-step').forEach(s => s.classList.remove('is-active'));
        entry.target.classList.add('is-active');
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  document.querySelectorAll('#receipt-text-col .scrolly-step').forEach(step => observer.observe(step));
}

function buildScrollytellingChain() {
  const track = document.getElementById('chain-track');
  const numDisplay = document.getElementById('chain-num');
  const timeDisplay = document.getElementById('chain-time');
  const titleDisplay = document.getElementById('chain-title');
  const bodyDisplay = document.getElementById('chain-body');
  const fillBar = document.getElementById('chain-fill');
  const currentDisplay = document.getElementById('chain-current');

  if (!track || !numDisplay) return;

  let trackRect = track.getBoundingClientRect();
  let trackTopAbsolute = trackRect.top + window.scrollY;
  let trackHeight = trackRect.height - window.innerHeight;

  window.addEventListener('resize', () => {
    trackRect = track.getBoundingClientRect();
    trackTopAbsolute = trackRect.top + window.scrollY;
    trackHeight = trackRect.height - window.innerHeight;
  }, { passive: true });

  window.addEventListener('scroll', () => {
    let currentScroll = window.scrollY;
    let trackTop = trackTopAbsolute - currentScroll;
    
    // Prevent divide by zero error edge case
    if (trackHeight <= 0) return;
    
    let progress = -trackTop / trackHeight;
    progress = Math.max(0, Math.min(1, progress));
    
    const totalStages = DATA.chainStages.length;
    let currentStageIndex = Math.floor(progress * totalStages);
    if (currentStageIndex >= totalStages) currentStageIndex = totalStages - 1;
    
    const data = DATA.chainStages[currentStageIndex];
    
    if (numDisplay.textContent !== data.stage) {
      numDisplay.textContent = data.stage;
      timeDisplay.textContent = data.time;
      titleDisplay.textContent = data.title;
      bodyDisplay.textContent = data.text;
      currentDisplay.textContent = data.stage;
      fillBar.style.width = `${((currentStageIndex + 1) / totalStages) * 100}%`;
    }
  }, { passive: true });
}

function safeLocalStorage(op, key, val) {
  try {
    if (op === 'get') return localStorage.getItem(key);
    if (op === 'set') localStorage.setItem(key, val);
  } catch(e) { return null; }
}

function buildFlipCards() {
  const grid = document.getElementById('flipcards-grid');
  if (!grid) return;

  let score = 0;
  let cardsPlayed = 0;
  const scoreEl = document.getElementById('game-score-val');
  const progressEl = document.getElementById('game-progress-val');

  DATA.flipCards.forEach(card => {
    const wrap = document.createElement('div');
    wrap.className = 'flipcard-wrap reveal-up';
    
    let isAnswered = false;

    wrap.setAttribute('role', 'region');
    wrap.setAttribute('aria-label', card.front);
    wrap.innerHTML = `
      <div class="flipcard-inner">
        <div class="flipcard-front">
          <div class="flipcard-image" aria-hidden="true"></div>
          <div class="flipcard-front-body">
            <div class="flipcard-front-name">${card.front}</div>
          </div>
          <div class="flipcard-actions">
            <button class="btn-guess" data-guess="YES">YES</button>
            <div class="btn-divider"></div>
            <button class="btn-guess" data-guess="NO">NO</button>
          </div>
        </div>
        <div class="flipcard-back">
          <div class="flipcard-back-guess" aria-hidden="true"></div>
          <div class="flipcard-back-verdict">${card.verdict}!</div>
          <div class="flipcard-back-desc">${card.desc}</div>
        </div>
      </div>
    `;
    
    const buttons = wrap.querySelectorAll('.btn-guess');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (isAnswered) {
          wrap.classList.add('flipped');
          return;
        }
        
        isAnswered = true;
        wrap.classList.add('answered');
        e.target.classList.add('selected-guess');
        
        buttons.forEach(b => b.style.pointerEvents = 'none');
        
        const guess = e.target.getAttribute('data-guess');
        
        const guessEl = wrap.querySelector('.flipcard-back-guess');
        if (guessEl) {
          if (guess === card.verdict) {
            guessEl.innerHTML = `Correct - the answer is`;
          } else {
            guessEl.innerHTML = `Incorrect - the answer is`;
          }
        }
        
        cardsPlayed++;
        if (cardsPlayed > DATA.flipCards.length) cardsPlayed = DATA.flipCards.length;
        if (progressEl) progressEl.textContent = cardsPlayed;

        if (guess === card.verdict) {
          score += 10;
          if (score > (DATA.flipCards.length * 10)) score = DATA.flipCards.length * 10;
          if(scoreEl) {
            scoreEl.textContent = score;
            scoreEl.classList.add('score-bump');
            setTimeout(() => scoreEl.classList.remove('score-bump'), 300);
          }
        }
        
        wrap.classList.add('flipped');
      });
    });

    wrap.addEventListener('click', () => {
      if (isAnswered) {
        wrap.classList.toggle('flipped');
      }
    });

    grid.appendChild(wrap);
  });
}

function buildBreakdown() {
  const container = document.getElementById('breakdown-bars');
  if (!container) return;

  const total = DATA.breakdownNov.reduce((sum, item) => sum + item.value, 0);

  DATA.breakdownNov.forEach(item => {
    const row = document.createElement('div');
    row.className = 'breakdown-row';
    const pct = (item.value / total * 100).toFixed(1);
    row.innerHTML = `
      <div class="breakdown-row-label">${item.key}</div>
      <div class="breakdown-bar-track">
        <div class="breakdown-bar-fill" style="width:0%; background-color:${item.color};" data-width="${pct}%"></div>
      </div>
      <div class="breakdown-row-value">Rs. ${item.value.toFixed(2)}</div>
    `;
    container.appendChild(row);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.breakdown-bar-fill').forEach(bar => {
          bar.style.width = bar.getAttribute('data-width');
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(container);
}

function buildFixes() {
  const list = document.getElementById('fixes-list');
  if (!list) return;

  DATA.fixes.forEach(fix => {
    const item = document.createElement('div');
    item.className = 'fix-item reveal-up';
    item.innerHTML = `
      <div class="fix-num">${fix.num}</div>
      <div class="fix-body">
        <div class="fix-title">${fix.title}</div>
        <div class="fix-text">${fix.text}</div>
      </div>
    `;
    list.appendChild(item);
  });
}

function initCharts() {
  if (typeof Chart === 'undefined') return;

  Chart.defaults.font.family = "'DM Mono', monospace";
  Chart.defaults.color = COLORS.ink;

  const isMobile = window.innerWidth < 600;
  const tickFontSize = isMobile ? 11 : 11;
  const legendFontSize = isMobile ? 10 : 11;
  
  // Register resize listener for all charts (Audit 9.2)
  window.addEventListener('resize', () => {
    for (let id in Chart.instances) {
      Chart.instances[id].resize();
    }
  });

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 30, right: 30, left: 10, bottom: 20 }
    },
    elements: {
      point: {
        radius: 5,
        pointStyle: 'circle',
        borderWidth: 0,
        hoverBorderWidth: 0,
        hoverRadius: 7
      },
      line: {
        borderWidth: 3,
        tension: 0.3
      }
    },
      plugins: {
        legend: {
          position: 'bottom',
          labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 10, padding: 12, font: { size: legendFontSize } }
        },
      tooltip: {
        backgroundColor: COLORS.paper,
        titleColor: COLORS.ink,
        bodyColor: COLORS.ink,
        titleFont: { family: "'DM Mono', monospace", size: 13, weight: 'bold' },
        bodyFont: { family: "'DM Mono', monospace", size: 13 },
        padding: 12,
        cornerRadius: 0,
        borderColor: COLORS.ink,
        borderWidth: 1,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: tickFontSize }, color: 'rgba(17,17,17,0.6)', maxRotation: isMobile ? 45 : 0, maxTicksLimit: isMobile ? 6 : 10, padding: 12 }
      },
      y: {
        grid: { color: 'rgba(17,17,17,0.1)', borderDash: [4, 4] },
        ticks: { font: { size: tickFontSize }, color: 'rgba(17,17,17,0.6)', padding: 12 }
      }
    }
  };

  const brentCtx = document.getElementById('chart-brent');
  if (brentCtx) {
    new Chart(brentCtx, {
      type: 'line',
      data: {
        labels: DATA.brentVsPump.map(d => d.date),
        datasets: [
          {
            label: 'Brent Crude (USD/bbl)',
            data: DATA.brentVsPump.map(d => d.brent),
            borderColor: COLORS.ink,
            backgroundColor: COLORS.ink,
            borderWidth: 2,
            borderDash: [5, 5],
            pointBackgroundColor: COLORS.ink,
            pointBorderColor: 'transparent',
            tension: 0.3,
            yAxisID: 'y'
          },
          {
            label: 'Diesel Pump Price (LKR/L)',
            data: DATA.brentVsPump.map(d => d.pump),
            borderColor: COLORS.red,
            backgroundColor: COLORS.red,
            borderWidth: 3,
            pointBackgroundColor: COLORS.red,
            pointBorderColor: 'transparent',
            tension: 0.3,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        ...defaultOptions,
        scales: {
          x: defaultOptions.scales.x,
          y: { ...defaultOptions.scales.y, position: 'left', title: { display: false } },
          y1: { ...defaultOptions.scales.y, position: 'right', grid: { drawOnChartArea: false }, title: { display: false } }
        }
      }
    });
  }

  const formulaCtx = document.getElementById('chart-formula');
  if (formulaCtx) {
    new Chart(formulaCtx, {
      type: 'line',
      data: {
        labels: DATA.formulaVsActual.map(d => d.date),
        datasets: [
          {
            label: 'Actual Pump Price',
            data: DATA.formulaVsActual.map(d => d.market),
            borderColor: COLORS.red,
            backgroundColor: COLORS.red,
            borderWidth: 3,
            pointBackgroundColor: COLORS.red,
            pointBorderColor: 'transparent',
            tension: 0.3
          },
          {
            label: 'Formula Price',
            data: DATA.formulaVsActual.map(d => d.formula),
            borderColor: COLORS.gray,
            backgroundColor: COLORS.gray,
            borderWidth: 2,
            borderDash: [4, 4],
            pointBackgroundColor: COLORS.gray,
            pointBorderColor: 'transparent',
            tension: 0.3
          }
        ]
      },
      options: defaultOptions
    });
  }

  const exchangeCtx = document.getElementById('chart-exchange');
  if (exchangeCtx) {
    new Chart(exchangeCtx, {
      type: 'line',
      data: {
        labels: DATA.exchangeRate.map(d => d.date),
        datasets: [{
          label: 'LKR per USD',
          data: DATA.exchangeRate.map(d => d.rate),
          borderColor: COLORS.gold,
          backgroundColor: 'rgba(184, 134, 11, 0.1)',
          pointBackgroundColor: COLORS.gold,
          pointBorderColor: 'transparent',
          borderWidth: 3,
          fill: true,
          tension: 0.3
        }]
      },
      options: defaultOptions
    });
  }

  const regionalCtx = document.getElementById('chart-regional');
  if (regionalCtx) {
    new Chart(regionalCtx, {
      type: 'line',
      data: {
        labels: DATA.regional.map(d => d.date),
        datasets: [
          { label: 'Sri Lanka', data: DATA.regional.map(d => d.sriLanka), borderColor: COLORS.red, backgroundColor: COLORS.red, pointBackgroundColor: COLORS.red, pointBorderColor: 'transparent', borderWidth: 3, tension: 0.3 },
          { label: 'India', data: DATA.regional.map(d => d.india), borderColor: COLORS.teal, backgroundColor: COLORS.teal, pointBackgroundColor: COLORS.teal, pointBorderColor: 'transparent', borderWidth: 2, borderDash: [4, 4], tension: 0.3 },
          { label: 'Pakistan', data: DATA.regional.map(d => d.pakistan), borderColor: '#8A2BE2', backgroundColor: '#8A2BE2', pointBackgroundColor: '#8A2BE2', pointBorderColor: 'transparent', borderWidth: 2, tension: 0.3 },
          { label: 'Thailand', data: DATA.regional.map(d => d.thailand), borderColor: '#DAA520', backgroundColor: '#DAA520', pointBackgroundColor: '#DAA520', pointBorderColor: 'transparent', borderWidth: 2, tension: 0.3 },
          { label: 'Malaysia', data: DATA.regional.map(d => d.malaysia), borderColor: '#008B8B', backgroundColor: '#008B8B', pointBackgroundColor: '#008B8B', pointBorderColor: 'transparent', borderWidth: 2, tension: 0.3 }
        ]
      },
      options: {
        ...defaultOptions,
        scales: {
          x: { 
            ...defaultOptions.scales.x, 
            ticks: { ...defaultOptions.scales.x.ticks, color: 'rgba(247, 245, 240, 0.7)' } 
          },
          y: { 
            ...defaultOptions.scales.y, 
            grid: { color: 'rgba(247, 245, 240, 0.15)', borderDash: [4, 4] },
            ticks: { ...defaultOptions.scales.y.ticks, color: 'rgba(247, 245, 240, 0.7)' } 
          }
        },
        plugins: {
          ...defaultOptions.plugins,
          legend: { 
            ...defaultOptions.plugins.legend, 
            labels: { ...defaultOptions.plugins.legend.labels, color: COLORS.paper } 
          },
          tooltip: {
            ...defaultOptions.plugins.tooltip,
            backgroundColor: '#1A1A1A',
            titleColor: COLORS.paper,
            bodyColor: COLORS.paper,
            borderColor: COLORS.gold
          }
        }
      }
    });
  }

  const wagesCtx = document.getElementById('chart-wages');
  if (wagesCtx) {
    new Chart(wagesCtx, {
      type: 'line',
      data: {
        labels: DATA.wageFood.map(d => d.date),
        datasets: [
          { label: 'Real Public Wage Index', data: DATA.wageFood.map(d => d.Public_Real), borderColor: COLORS.teal, backgroundColor: COLORS.teal, pointBackgroundColor: COLORS.teal, pointBorderColor: 'transparent', borderWidth: 2, borderDash: [5,5], tension: 0.3 },
          { label: 'Food Price Index', data: DATA.wageFood.map(d => d.Food_Idx), borderColor: COLORS.red, backgroundColor: COLORS.red, pointBackgroundColor: COLORS.red, pointBorderColor: 'transparent', borderWidth: 2, tension: 0.3 }
        ]
      },
      options: defaultOptions
    });
  }
}

function initMobileExpand() {
  document.querySelectorAll('.mobile-expand-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const content = e.target.previousElementSibling;
      const isExpanded = content.classList.contains('is-expanded');
      const collapsedText = e.target.dataset.collapsed || e.target.innerHTML.replace('Show fewer', 'Read all');
      const expandedText = e.target.dataset.expanded || e.target.innerHTML.replace('Read all', 'Show fewer');
      
      if (isExpanded) {
        content.classList.remove('is-expanded');
        e.target.innerHTML = collapsedText;
        e.target.setAttribute('aria-expanded', 'false');
      } else {
        content.classList.add('is-expanded');
        e.target.innerHTML = expandedText;
        e.target.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = Array.from(
          entry.target.parentElement.querySelectorAll('.reveal-up:not(.in-view)')
        );
        const index = siblings.indexOf(entry.target);
        const delay = Math.min(index * 80, 320);
        entry.target.style.transitionDelay = delay > 0 ? `${delay}ms` : '';
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

  const heroCue = document.querySelector('.cue-arrow');
  if (heroCue) {
    const heroObserver = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        heroCue.style.animation = 'none';
      }
    });
    heroObserver.observe(document.getElementById('hero'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupNav();
  initSummaryScrollytelling();
  buildScrollytellingReceipt();
  buildScrollytellingChain();
  buildFlipCards();
  buildBreakdown();
  buildFixes();
  initCharts();
  initRevealAnimations();
  initMobileExpand();
});

window.shareStory = () => {
  const url = window.location.href;
  const text = "Why is everything so expensive again? A data investigation.";
  if (navigator.share) {
    navigator.share({ title: document.title, text: text, url: url });
  } else {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
  }
};

window.shareRegional = window.shareStory;

const citations = {
  apa: "Dissanayake, C. (2026). Why is everything so expensive again? [Data Story]. Updated April 30, 2026. Retrieved from https://ceylondata.lk",
  journalistic: 'Chatura Dissanayake. "Why is everything so expensive again?" Ceylon Data. April 30, 2026.',
  bibtex: "@misc{dissanayake2026,\n  author = {Dissanayake, Chatura},\n  title = {Why is everything so expensive again?},\n  year = {2026},\n  url = {https://ceylondata.lk}\n}"
};

window.switchTab = (tabName) => {
  document.querySelectorAll('.cite-tab').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.cite-tab[data-tab="${tabName}"]`).classList.add('active');
  document.getElementById('cite-text').innerText = citations[tabName];
};

window.copyCitation = () => {
  const text = document.getElementById('cite-text').innerText;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('.btn-copy');
    const originalText = btn.innerText;
    btn.innerText = 'COPIED!';
    setTimeout(() => { btn.innerText = originalText; }, 2000);
  });
};