# Methodology & Data Processing

## 1. Raw Data Sources
*   **Retail Fuel Prices (Sri Lanka):** Historical pump prices for Lanka Auto Diesel (LAD) and Petrol 92 (LP 92) were sourced directly from the Ceylon Petroleum Corporation (CEYPETCO) and Lanka IOC historical pricing ledgers, covering price revisions from 1990 up to May 2026.
*   **Cost-Reflective Formula Prices:** The "Real Cost" benchmark relies on the fuel price tracker methodology developed by Verité Research (PublicFinance.lk). The raw formula comparison data was extracted directly from their published datasets (e.g., `Download Data.xlsx`, `Download Data (2).xlsx`).
*   **Regional Price Comparisons:** Cross-country pump prices (India, Pakistan, Malaysia, Thailand, Nepal, Philippines) were verified against the PublicFinance.lk regional datasets (e.g., `Download Data (1).xlsx`, `Download Data (3).xlsx`).
*   **Inflation & Living Costs:** Macro-economic impact and inflation data were derived from the Department of Census and Statistics (DCS) Colombo Consumer Price Index (CCPI) for May 2026 and the National Consumer Price Index (NCPI) for April 2026.

## 2. Calculating the "Real Math" (Formula Price vs. Pump Price)
The core investigation of this story relies on comparing the price consumers pay at the pump against the actual cost to deliver that fuel. To maintain mathematical integrity, this analysis anchors strictly to **92 Octane Petrol (LP 92)**.
*   To calculate the cost-reflective price, we adopted the PublicFinance.lk revised fuel price formula, implemented in January 2025, which strips away hidden inefficiencies and arbitrary profit margins added by the Ministry of Energy.
*   The transparent formula is defined as: $V_1 + V_2 + V_3 + V_4$.
*   **$V_1$ (Landed Cost):** Converts the Singapore Platts Price per barrel to LKR using the Telegraphic Transfers (TT) selling rate for USD/LKR, adding a specific premium (USD 3 for petrol) and isolating a 0.3% evaporation loss.
*   **$V_2$ (Processing Cost):** Aligned with actual CPC costs, set at USD 0.06 per litre for petrol.
*   **$V_3$ (Administrative Cost):** Strictly capped at 2% of the landed cost.
*   **$V_4$ (Taxation):** Includes Customs Import Duty (CID), Excise Duty, Ports and Airports Development Levy, a 1.25% Social Security Contribution Levy (SSCL), and 18% VAT calculated post-duty waiver.
*   **The Findings:** By excluding the Ministry of Energy's arbitrary variables—such as "up to 4% profit margins" ($V_6$) and inconsistently applied stockholding costs—this methodology reveals the true cost-reflective price of 92 Octane Petrol in May 2026 was **Rs. 409 per litre**, compared to the official pump price of **Rs. 410**. This prevents CPC's operational inefficiencies from being presented to the public as unavoidable global costs.

## 3. Validating the "Domino Effect"
To prove the cascading impact of the Rs. 410 pump price on the wider economy, we utilized the official DCS CCPI data for May 2026.
*   The data confirms that the overall year-on-year inflation rate stood at 5.5% in May 2026.
*   The non-food sector was the primary driver of this spike, specifically the "Transport" category, which alone contributed a massive 2.02% to the overall inflation rate.
*   "Housing, Water, Electricity, Gas and Other Fuels" contributed a further 1.49% to the national inflation burden.
*   **Data Note on Pump Prices:** The raw CCPI data records the average retail price of Petrol (CPC & IOC) at Rs. 407.43. Because the CCPI relies on a weighted market average across multiple collection centers and specific timing windows, it differs slightly from the official fixed CEYPETCO pump rate of Rs. 410.00. Our narrative relies on the official Rs. 410 rate for direct formula comparison, while utilizing the CCPI strictly for macroeconomic trend validation.
*   Furthermore, the CCPI data reveals the disproportionate energy impact on lower-income households, with Kerosene prices rising from Rs. 255.00 in April to Rs. 262.86 in May 2026, compounding the structural trap.