why-sri-lanka-pays-more/
│
├── README.md                  # Project overview, credits, and a link to the live site.
├── METHODOLOGY.md             # The detailed mathematical breakdown we finalized.
├── .gitignore                 # Tells Git to ignore OS files (like .DS_Store).
│
├── index.html                 # The main entry point (GitHub Pages looks for this).
├── style.css                  # Your Reuters-inspired styling.
├── app.jsx                    # Your complete React application and logic.
├── data.json                  # The clean data file (linked in your "⬇ GET RAW DATA" buttons).
├── content.json               # Your narrative text backup (if used).
│
└── data/                      # The "Radical Transparency" archive for auditors.
    ├── raw/                   
    │   ├── Download Data.xlsx # Verité Research formula sheets.
    │   ├── Historical Prices.docx # Official CEYPETCO ledger.
    │   └── CCPI_20260529E.pdf # DCS Inflation report.
    │
    └── processing/            
        └── data_cleaning.py   # (Optional) Any Python scripts you used to merge the data.