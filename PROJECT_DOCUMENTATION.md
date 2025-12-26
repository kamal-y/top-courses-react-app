# Insurance Entry Application - Complete Documentation

## Folder Structure

```
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── insurance/
│   │   │   ├── Header.tsx
│   │   │   ├── Header.scss
│   │   │   ├── InsuranceSidebar.tsx
│   │   │   ├── InsuranceSidebar.scss
│   │   │   ├── PatientInfoCard.tsx
│   │   │   ├── PatientInfoCard.scss
│   │   │   ├── PayerSummaryDialog.tsx
│   │   │   ├── PayerSummaryDialog.scss
│   │   │   ├── SavedPayersList.tsx
│   │   │   ├── SavedPayersList.scss
│   │   │   ├── SuccessDialog.tsx
│   │   │   ├── SuccessDialog.scss
│   │   │   ├── TabsSection.tsx
│   │   │   └── TabsSection.scss
│   │   ├── ui/
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── tooltip.tsx
│   │   │   └── use-toast.ts
│   │   └── NavLink.tsx
│   ├── context/
│   │   └── PayerContext.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Index.tsx
│   │   ├── Index.scss
│   │   └── NotFound.tsx
│   ├── styles/
│   │   ├── global.scss
│   │   └── variables.scss
│   ├── types/
│   │   └── payer.ts
│   ├── utils/
│   │   └── mockData.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── tailwind.config.ts
├── vite.config.ts
├── eslint.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── package.json
└── README.md
```

---

## Core Application Files

### src/main.tsx
```tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.scss";

createRoot(document.getElementById("root")!).render(<App />);
```

### src/App.tsx
```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PayerProvider } from "@/context/PayerContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PayerProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PayerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
```

---

## Pages

### src/pages/Index.tsx
```tsx
import Header from "@/components/insurance/Header";
import PatientInfoCard from "@/components/insurance/PatientInfoCard";
import TabsSection from "@/components/insurance/TabsSection";
import InsuranceSidebar from "@/components/insurance/InsuranceSidebar";
import SavedPayersList from "@/components/insurance/SavedPayersList";
import "./Index.scss";

const Index = () => {
  return (
    <div className="insurance-entry">
      <Header />
      <div className="insurance-entry__container">
        <main className="insurance-entry__main">
          <div className="insurance-entry__content">
            <PatientInfoCard />
            <TabsSection />
            <SavedPayersList />
          </div>
        </main>
        <InsuranceSidebar />
      </div>
    </div>
  );
};

export default Index;
```

### src/pages/Index.scss
```scss
@import '../styles/variables.scss';

.insurance-entry {
  min-height: 100vh;
  background-color: $background;
  display: flex;
  flex-direction: column;

  &__container {
    display: flex;
    flex: 1;

    @media (max-width: 1024px) {
      flex-direction: column;
    }
  }

  &__main {
    flex: 1;
    padding: 0.5rem;
    overflow-y: auto;

    @media (max-width: 768px) {
      padding: 0.25rem;
    }
  }

  &__content {
    max-width: 100%;

    & > * + * {
      margin-top: 0.5rem;
    }
  }
}
```

---

## Context

### src/context/PayerContext.tsx
```tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { SavedPayerEntry, PayerSearchResult, PolicyInfo, PolicyholderInfo } from "@/types/payer";

interface PayerContextType {
  savedPayers: SavedPayerEntry[];
  addPayer: (entry: Omit<SavedPayerEntry, "id" | "createdAt">) => void;
  updatePayer: (id: string, entry: Omit<SavedPayerEntry, "id" | "createdAt">) => void;
  deletePayer: (id: string) => void;
  editingPayer: SavedPayerEntry | null;
  setEditingPayer: (payer: SavedPayerEntry | null) => void;
}

const PayerContext = createContext<PayerContextType | undefined>(undefined);

export const PayerProvider = ({ children }: { children: ReactNode }) => {
  const [savedPayers, setSavedPayers] = useState<SavedPayerEntry[]>([]);
  const [editingPayer, setEditingPayer] = useState<SavedPayerEntry | null>(null);

  const addPayer = (entry: Omit<SavedPayerEntry, "id" | "createdAt">) => {
    const newEntry: SavedPayerEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setSavedPayers((prev) => [...prev, newEntry]);
  };

  const updatePayer = (id: string, entry: Omit<SavedPayerEntry, "id" | "createdAt">) => {
    setSavedPayers((prev) =>
      prev.map((p) =>
        p.id === id ? { ...entry, id, createdAt: p.createdAt } : p
      )
    );
    setEditingPayer(null);
  };

  const deletePayer = (id: string) => {
    setSavedPayers((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PayerContext.Provider
      value={{
        savedPayers,
        addPayer,
        updatePayer,
        deletePayer,
        editingPayer,
        setEditingPayer,
      }}
    >
      {children}
    </PayerContext.Provider>
  );
};

export const usePayer = () => {
  const context = useContext(PayerContext);
  if (!context) {
    throw new Error("usePayer must be used within PayerProvider");
  }
  return context;
};
```

---

## Types

### src/types/payer.ts
```ts
export interface PayerSearchResult {
  productId: string;
  productName: string;
  billingSequence: string;
  benefitType: string;
}

export interface PolicyInfo {
  cardholderId: string;
  personCode: string;
  effectiveDate: string;
  therapyType: string;
  service: string;
  expirationDate: string;
}

export interface PolicyholderInfo {
  relationship: string;
  dob: string;
  gender: string;
  firstName: string;
  lastName: string;
}

export interface SavedPayerEntry {
  id: string;
  payer: PayerSearchResult;
  policy: PolicyInfo;
  policyholder: PolicyholderInfo;
  placeOfServiceId: string;
  createdAt: Date;
}
```

---

## Utils

### src/utils/mockData.ts
```ts
import { PayerSearchResult } from "@/types/payer";

const productNames = [
  "Blue Cross Blue Shield",
  "Aetna Health",
  "UnitedHealthcare",
  "Cigna HealthSpring",
  "Humana Gold",
  "Kaiser Permanente",
  "Anthem Blue",
  "Molina Healthcare",
];

const billingSequences = ["Primary", "Secondary", "Tertiary"];
const benefitTypes = ["Medical", "Pharmacy", "Dental", "Vision", "Mental Health"];

export const generateMockPayers = (count: number = 5): PayerSearchResult[] => {
  return Array.from({ length: count }, (_, i) => ({
    productId: `PRD-${String(Math.floor(Math.random() * 90000) + 10000)}`,
    productName: productNames[Math.floor(Math.random() * productNames.length)],
    billingSequence: billingSequences[Math.floor(Math.random() * billingSequences.length)],
    benefitType: benefitTypes[Math.floor(Math.random() * benefitTypes.length)],
  }));
};

export const cardholderOptions = ["Self", "Spouse", "Dependent", "Other"];
export const personCodeOptions = ["01 - Cardholder", "02 - Spouse", "03 - Child"];
export const therapyOptions = ["Infusion", "Injection", "Oral", "Topical"];
export const serviceOptions = ["Home Health", "Outpatient", "Inpatient", "Specialty"];
export const relationshipOptions = ["Self", "Spouse", "Child", "Parent", "Other"];
export const genderOptions = ["Male", "Female", "Other"];
```

### src/lib/utils.ts
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## Insurance Components

### src/components/insurance/Header.tsx
```tsx
import { Menu, ChevronDown, User } from "lucide-react";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <button className="header__menu-btn">
          <Menu />
        </button>
        <div className="header__logo">
          <span className="header__logo-name">Accredo</span>
          <span className="header__logo-tagline">By EVERNORTH</span>
        </div>
        <nav className="header__nav">
          <span className="header__nav-title">Clearance Case Manager</span>
          <button className="header__get-next-btn">
            <span>→</span> Get Next
          </button>
        </nav>
      </div>
      <div className="header__right">
        <span className="header__work-area">Work Area</span>
        <span className="header__badge">IE - 91035</span>
        <div className="header__user">
          <span className="header__user-name">Kamal Yadav</span>
          <div className="header__user-avatar">
            <User />
          </div>
          <ChevronDown className="header__user-chevron" />
        </div>
      </div>
    </header>
  );
};

export default Header;
```

### src/components/insurance/Header.scss
```scss
@import '../../styles/variables.scss';

.header {
  background-color: $header-bg;
  color: $header-foreground;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
    height: 2.5rem;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    @media (max-width: 768px) {
      gap: 0.5rem;
    }
  }

  &__menu-btn {
    padding: 0.25rem;
    border-radius: $radius;
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;

    &:hover {
      background-color: rgba($primary, 0.2);
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    @media (max-width: 480px) {
      &-tagline {
        display: none;
      }
    }

    &-name {
      font-size: 1.125rem;
      font-weight: 700;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }

    &-tagline {
      font-size: 0.75rem;
      opacity: 0.8;
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-left: 1rem;

    @media (max-width: 768px) {
      gap: 0.5rem;
      margin-left: 0.5rem;
    }

    @media (max-width: 480px) {
      &-title {
        display: none;
      }
    }

    &-title {
      font-size: 0.875rem;
      font-weight: 500;
    }
  }

  &__get-next-btn {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background-color: $success;
    color: $success-foreground;
    padding: 0.25rem 0.75rem;
    border-radius: $radius;
    font-size: 0.875rem;
    font-weight: 500;
    border: none;
    cursor: pointer;

    @media (max-width: 480px) {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
    }

    &:hover {
      background-color: darken($success, 5%);
    }
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 768px) {
      gap: 0.5rem;
    }
  }

  &__work-area {
    font-size: 0.875rem;

    @media (max-width: 480px) {
      display: none;
    }
  }

  &__badge {
    background-color: $warning;
    color: $warning-foreground;
    padding: 0.25rem 0.75rem;
    border-radius: $radius;
    font-size: 0.875rem;
    font-weight: 700;

    @media (max-width: 480px) {
      padding: 0.125rem 0.5rem;
      font-size: 0.75rem;
    }
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &-name {
      font-size: 0.875rem;

      @media (max-width: 480px) {
        display: none;
      }
    }

    &-avatar {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: $muted;
      @include flex-center;

      svg {
        width: 1rem;
        height: 1rem;
        color: $muted-foreground;
      }
    }

    &-chevron {
      width: 1rem;
      height: 1rem;
    }
  }
}
```

### src/components/insurance/PatientInfoCard.tsx
```tsx
import { Home, Edit, User } from "lucide-react";
import "./PatientInfoCard.scss";

const PatientInfoCard = () => {
  return (
    <div className="patient-info-card">
      <div className="patient-info-card__header">
        <div className="patient-info-card__profile">
          <div className="patient-info-card__avatar">
            <User />
          </div>
          <div>
            <h2 className="patient-info-card__name">Richer, Anthony</h2>
            <div className="patient-info-card__details">
              <span><strong>AGE</strong> 50 (07/19/1973) Male</span>
              <div className="patient-info-card__address">
                <Home />
                <span>7290 Test Dr</span>
              </div>
            </div>
            <div className="patient-info-card__city">Portland or 97233</div>
          </div>
        </div>
        <div className="patient-info-card__actions">
          <button className="patient-info-card__btn--primary">Patient 360</button>
          <button className="patient-info-card__btn--outline">
            <Edit /> Patient
          </button>
          <button className="patient-info-card__btn--outline">CSP</button>
        </div>
      </div>

      <div className="patient-info-card__grid">
        <div className="patient-info-card__field">
          <div className="patient-info-card__field-label">Patient ID:</div>
          <div className="patient-info-card__field-value">15136098</div>
        </div>
        <div className="patient-info-card__field">
          <div className="patient-info-card__field-label">Preferred Language:</div>
          <div className="patient-info-card__field-value">15136098</div>
        </div>
        <div className="patient-info-card__field">
          <div className="patient-info-card__field-label">Phone Number</div>
          <div className="patient-info-card__field-value">15136098</div>
        </div>
        <div className="patient-info-card__field">
          <div className="patient-info-card__field-label">Need By Date</div>
          <div className="patient-info-card__field-value">15136098</div>
        </div>
        <div className="patient-info-card__field">
          <div className="patient-info-card__field-label">Ship Date</div>
          <div className="patient-info-card__field-value">15136098</div>
        </div>
        <div className="patient-info-card__field">
          <div className="patient-info-card__field-label">Therapy Name:</div>
          <div className="patient-info-card__field-value">15136098</div>
        </div>
        <div className="patient-info-card__field">
          <div className="patient-info-card__field-label">Physician</div>
          <div className="patient-info-card__field-value">15136098</div>
        </div>
        <div className="patient-info-card__field">
          <div className="patient-info-card__field-label">Concierge Physician</div>
          <div className="patient-info-card__field-value">15136098</div>
        </div>
        <div className="patient-info-card__field">
          <div className="patient-info-card__field-label">Special Instructions</div>
          <div className="patient-info-card__field-value">15136098</div>
        </div>
        <div className="patient-info-card__field">
          <div className="patient-info-card__field-label">Single Patient Profile</div>
          <div className="patient-info-card__field-value">15136098</div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoCard;
```

### src/components/insurance/PatientInfoCard.scss
```scss
@import '../../styles/variables.scss';

.patient-info-card {
  @include section-card;
  padding: 0.75rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 0.75rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  &__profile {
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 480px) {
      gap: 0.5rem;
    }
  }

  &__avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: $muted;
    overflow: hidden;
    @include flex-center;
    flex-shrink: 0;

    @media (max-width: 480px) {
      width: 2.5rem;
      height: 2.5rem;
    }

    svg {
      width: 1.75rem;
      height: 1.75rem;
      color: $muted-foreground;

      @media (max-width: 480px) {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }

  &__name {
    font-size: 1rem;
    font-weight: 700;
    color: $foreground;

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  &__details {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 0.875rem;
    color: $muted-foreground;
    margin-top: 0.25rem;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      gap: 0.5rem;
      font-size: 0.75rem;
    }

    strong {
      font-weight: 600;
    }
  }

  &__address {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    svg {
      width: 1rem;
      height: 1rem;
    }
  }

  &__city {
    font-size: 0.875rem;
    color: $muted-foreground;

    @media (max-width: 768px) {
      font-size: 0.75rem;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  &__btn {
    &--primary {
      @include btn-primary;

      @media (max-width: 480px) {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
      }
    }

    &--outline {
      @include btn-outline;
      display: flex;
      align-items: center;
      gap: 0.25rem;

      @media (max-width: 480px) {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
      }

      svg {
        width: 1rem;
        height: 1rem;
      }
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem 2rem;
    padding-top: 0.75rem;
    border-top: 1px solid $border;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem 1.5rem;
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem 1rem;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
  }

  &__field {
    &-label {
      @include form-label;
      margin-bottom: 0.125rem;
    }

    &-value {
      @include form-value;
      font-weight: 600;
      color: $primary;

      @media (max-width: 480px) {
        font-size: 0.75rem;
      }
    }
  }
}
```

### src/components/insurance/TabsSection.tsx
```tsx
import { useState } from "react";
import "./TabsSection.scss";

const tabs = ["Documents", "Eligibility", "RxH Active Payers", "Copay Setup", "Billing Split"];

const TabsSection = () => {
  const [activeTab, setActiveTab] = useState("Documents");

  return (
    <div className="tabs-section">
      <div className="tabs-section__header">
        <div>
          <h3 className="tabs-section__title">Patient</h3>
        </div>
        <div className="tabs-section__tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tabs-section__tab ${activeTab === tab ? "tabs-section__tab--active" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="tabs-section__content">
        <div className="tabs-section__overview">
          <div className="tabs-section__overview-title">Overview - 1</div>
          <div className="tabs-section__overview-desc">This is the overview content for document</div>
        </div>

        <div className="tabs-section__payer">
          <div className="tabs-section__payer-header">
            <h4>Payer</h4>
            <div className="tabs-section__service-id">
              <span>Place of Service ID</span>
              <input type="text" placeholder="Enter place of service #" />
            </div>
          </div>

          <div className="tabs-section__form">
            <div className="tabs-section__field">
              <label>Billing Sequence *</label>
              <select>
                <option>select</option>
              </select>
            </div>
            <div className="tabs-section__field">
              <label>Benefit Type *</label>
              <select>
                <option>Select</option>
              </select>
            </div>
            <div className="tabs-section__field">
              <label>BIN</label>
              <input type="text" placeholder="Enter BIN" />
            </div>
            <div className="tabs-section__field">
              <label>PCN</label>
              <input type="text" placeholder="Min 2 char" />
            </div>
            <div className="tabs-section__field">
              <label>Group Number</label>
              <input type="text" placeholder="Mail order group" />
            </div>
            <div className="tabs-section__checkbox-field">
              <label>Mail NPI</label>
              <div className="tabs-section__checkbox-field-wrapper">
                <input type="checkbox" id="mailNpi" />
              </div>
            </div>
            <div className="tabs-section__form-actions">
              <button className="tabs-section__btn--outline">Clear</button>
              <button className="tabs-section__btn--primary">Search</button>
            </div>
          </div>

          <div className="tabs-section__table-wrapper">
            <table className="tabs-section__table">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Billing Sequence</th>
                  <th>Benefit Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>—</td>
                  <td>—</td>
                  <td>—</td>
                  <td>—</td>
                  <td>—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsSection;
```

### src/components/insurance/TabsSection.scss
```scss
@import '../../styles/variables.scss';

.tabs-section {
  @include section-card;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid $border;
    padding: 0.5rem 0.75rem 0;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }

  &__title {
    font-weight: 700;
    color: $foreground;
  }

  &__tabs {
    display: flex;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      width: 100%;
      overflow-x: auto;
    }
  }

  &__tab {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    border: none;
    background: transparent;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    color: $muted-foreground;
    transition: all 0.2s;
    white-space: nowrap;

    @media (max-width: 768px) {
      padding: 0.375rem 0.5rem;
      font-size: 0.75rem;
    }

    &:hover {
      color: $foreground;
    }

    &--active {
      border-bottom-color: $primary;
      color: $primary;
      background-color: $secondary;
    }
  }

  &__content {
    padding: 0.75rem;

    @media (max-width: 768px) {
      padding: 0.5rem;
    }
  }

  &__overview {
    margin-bottom: 0.5rem;

    &-title {
      font-size: 0.8rem;
      font-weight: 600;
      color: $foreground;
    }

    &-desc {
      font-size: 0.8rem;
      color: $muted-foreground;
    }
  }

  &__payer {
    border-top: 1px solid $border;
    padding-top: 0.5rem;
  }

  &__payer-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }

    h4 {
      font-weight: 700;
      font-size: 0.9rem;
      color: $foreground;
    }
  }

  &__service-id {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @media (max-width: 480px) {
      width: 100%;
    }

    span {
      font-size: 0.875rem;
      color: $label-color;
      white-space: nowrap;

      @media (max-width: 480px) {
        font-size: 0.75rem;
      }
    }

    input {
      @include input-field;
      width: 12rem;

      @media (max-width: 480px) {
        width: 100%;
      }
    }
  }

  &__form {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
    margin-bottom: 0.5rem;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  &__field {
    label {
      @include form-label;
    }

    select {
      @include select-field;

      @media (max-width: 480px) {
        font-size: 0.75rem;
      }
    }

    input {
      @include input-field;

      @media (max-width: 480px) {
        font-size: 0.75rem;
      }
    }
  }

  &__checkbox-field {
    label {
      @include form-label;
    }

    &-wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.25rem;
    }
  }

  &__form-actions {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      justify-content: flex-start;
    }
  }

  &__btn {
    &--outline {
      @include btn-outline;

      @media (max-width: 480px) {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
      }
    }

    &--primary {
      @include btn-primary;

      @media (max-width: 480px) {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
      }
    }
  }

  &__table-wrapper {
    border: 1px solid $border;
    border-radius: $radius;
    overflow-x: auto;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    min-width: 500px;

    thead {
      tr {
        background-color: $table-header;
        color: $table-header-foreground;
      }

      th {
        text-align: left;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        white-space: nowrap;

        @media (max-width: 768px) {
          padding: 0.375rem 0.5rem;
          font-size: 0.75rem;
        }
      }
    }

    tbody {
      tr {
        border-top: 1px solid $border;
        cursor: pointer;
        transition: background-color 0.15s;

        &:hover {
          background-color: rgba($primary, 0.05);
        }

        &.selected {
          background-color: rgba($primary, 0.1);
        }
      }

      td {
        padding: 0.75rem 1rem;
        font-size: 0.875rem;
        color: $muted-foreground;

        @media (max-width: 768px) {
          padding: 0.5rem;
          font-size: 0.75rem;
        }
      }
    }
  }
}
```

### src/components/insurance/InsuranceSidebar.tsx
```tsx
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { usePayer } from "@/context/PayerContext";
import { PayerSearchResult, PolicyInfo, PolicyholderInfo } from "@/types/payer";
import { 
  generateMockPayers, 
  cardholderOptions, 
  personCodeOptions, 
  therapyOptions, 
  serviceOptions,
  relationshipOptions,
  genderOptions 
} from "@/utils/mockData";
import PayerSummaryDialog from "./PayerSummaryDialog";
import SuccessDialog from "./SuccessDialog";
import "./InsuranceSidebar.scss";
interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection = ({ title, children, defaultOpen = true }: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="collapsible-section">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="collapsible-section__trigger"
      >
        <span className="collapsible-section__title">{title}</span>
        <ChevronDown className={`collapsible-section__icon ${isOpen ? "collapsible-section__icon--open" : ""}`} />
      </button>
      {isOpen && <div className="collapsible-section__content">{children}</div>}
    </div>
  );
};

const initialPolicy: PolicyInfo = {
  cardholderId: "",
  personCode: "",
  effectiveDate: "",
  therapyType: "",
  service: "",
  expirationDate: "",
};

const initialPolicyholder: PolicyholderInfo = {
  relationship: "",
  dob: "",
  gender: "",
  firstName: "",
  lastName: "",
};

const InsuranceSidebar = () => {
  const { addPayer, updatePayer, editingPayer, setEditingPayer } = usePayer();
  
  const [searchResults, setSearchResults] = useState<PayerSearchResult[]>([]);
  const [selectedPayer, setSelectedPayer] = useState<PayerSearchResult | null>(null);
  const [placeOfServiceId, setPlaceOfServiceId] = useState("");
  const [policy, setPolicy] = useState<PolicyInfo>(initialPolicy);
  const [policyholder, setPolicyholder] = useState<PolicyholderInfo>(initialPolicyholder);
  const [showSummary, setShowSummary] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastAddedPayerName, setLastAddedPayerName] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Handle editing mode
  useEffect(() => {
    if (editingPayer) {
      setSelectedPayer(editingPayer.payer);
      setPlaceOfServiceId(editingPayer.placeOfServiceId);
      setPolicy(editingPayer.policy);
      setPolicyholder(editingPayer.policyholder);
      setSearchResults([editingPayer.payer]);
    }
  }, [editingPayer]);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API delay
    setTimeout(() => {
      const results = generateMockPayers(5);
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const handleSelectPayer = (payer: PayerSearchResult) => {
    setSelectedPayer(payer);
  };

  const handleClear = () => {
    setSearchResults([]);
    setSelectedPayer(null);
    setPlaceOfServiceId("");
    setPolicy(initialPolicy);
    setPolicyholder(initialPolicyholder);
    setEditingPayer(null);
  };

  const handleSave = () => {
    if (!selectedPayer) return;
    setShowSummary(true);
  };

  const handleSubmit = () => {
    if (!selectedPayer) return;
    
    const entry = {
      payer: selectedPayer,
      policy,
      policyholder,
      placeOfServiceId,
    };

    const payerName = selectedPayer.productName;

    if (editingPayer) {
      updatePayer(editingPayer.id, entry);
      setShowSummary(false);
      handleClear();
    } else {
      addPayer(entry);
      setShowSummary(false);
      setLastAddedPayerName(payerName);
      setShowSuccess(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    handleClear();
  };

  const handleAddNext = () => {
    setShowSuccess(false);
    handleClear();
    // Start fresh search
    handleSearch();
  };

  return (
    <aside className="insurance-sidebar">
      {/* Insurance Entry Header */}
      <div className="insurance-sidebar__header">
        <h2 className="insurance-sidebar__title">Insurance Entry</h2>
        <div className="insurance-sidebar__referral">New Referral – ( IE - 91035 )</div>
        <div className="insurance-sidebar__status-badge">
          New Eligibility Not Found
        </div>
        <div className="insurance-sidebar__date">
          Creation Date : 08/10/2025 , 08:20 PM
        </div>
        <div className="insurance-sidebar__urgency">
          <span>Urgency</span>
          <span className="insurance-sidebar__urgency-badge">High</span>
        </div>
      </div>

      {/* Payer Search */}
      <CollapsibleSection title="Payer Search">
        <div className="space-y-3">
          <div className="collapsible-section__field">
            <label>Place of Service ID</label>
            <input 
              type="text" 
              placeholder="Enter place of service #"
              value={placeOfServiceId}
              onChange={(e) => setPlaceOfServiceId(e.target.value)}
            />
          </div>
          
          <div className="collapsible-section__actions">
            <button 
              className="collapsible-section__btn collapsible-section__btn--outline"
              onClick={handleClear}
            >
              Clear
            </button>
            <button 
              className="collapsible-section__btn collapsible-section__btn--primary"
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </div>

          {searchResults.length > 0 && (
            <div className="collapsible-section__results">
              <div className="collapsible-section__results-header">
                <span>Select a payer</span>
                <span className="collapsible-section__results-count">{searchResults.length} found</span>
              </div>
              <div className="collapsible-section__results-list">
                {searchResults.map((payer, index) => (
                  <div
                    key={index}
                    className={`collapsible-section__result-item ${
                      selectedPayer?.productId === payer.productId ? "collapsible-section__result-item--selected" : ""
                    }`}
                    onClick={() => handleSelectPayer(payer)}
                  >
                    <div className="collapsible-section__result-name">{payer.productName}</div>
                    <div className="collapsible-section__result-meta">
                      <span>{payer.productId}</span>
                      <span className="collapsible-section__result-badge">{payer.benefitType}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CollapsibleSection>

      {/* Rx Summary */}
      <CollapsibleSection title="Rx Summary">
        <div className="space-y-3">
          <div>
            <div className="collapsible-section__info-label">Selected Payer</div>
            <div className="collapsible-section__info-value">
              {selectedPayer?.productName || "No Payer Selected"}
            </div>
          </div>
          <div className="collapsible-section__row">
            <span>Benefit Type</span>
            <span className="collapsible-section__row-value">{selectedPayer?.benefitType || "—"}</span>
          </div>
          <div className="collapsible-section__row">
            <span>Place of Service</span>
            <span className="collapsible-section__row-value">{placeOfServiceId || "—"}</span>
          </div>
        </div>
      </CollapsibleSection>

      {/* Policy Information */}
      <CollapsibleSection title="Policy Information">
        <div className="collapsible-section__grid">
          <div className="collapsible-section__field">
            <label>Cardholder ID *</label>
            <select 
              value={policy.cardholderId}
              onChange={(e) => setPolicy({ ...policy, cardholderId: e.target.value })}
            >
              <option value="">Select</option>
              {cardholderOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="collapsible-section__field">
            <label>Person Code *</label>
            <select
              value={policy.personCode}
              onChange={(e) => setPolicy({ ...policy, personCode: e.target.value })}
            >
              <option value="">Select</option>
              {personCodeOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="collapsible-section__field">
            <label>Effective Date *</label>
            <input 
              type="date"
              value={policy.effectiveDate}
              onChange={(e) => setPolicy({ ...policy, effectiveDate: e.target.value })}
            />
          </div>
          <div className="collapsible-section__field">
            <label>Therapy Type *</label>
            <select
              value={policy.therapyType}
              onChange={(e) => setPolicy({ ...policy, therapyType: e.target.value })}
            >
              <option value="">Select</option>
              {therapyOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="collapsible-section__field">
            <label>Service *</label>
            <select
              value={policy.service}
              onChange={(e) => setPolicy({ ...policy, service: e.target.value })}
            >
              <option value="">Select</option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="collapsible-section__field">
            <label>Expiration Date *</label>
            <input 
              type="date"
              value={policy.expirationDate}
              onChange={(e) => setPolicy({ ...policy, expirationDate: e.target.value })}
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Policyholder Information */}
      <CollapsibleSection title="Policyholder Information">
        <div className="space-y-3">
          <div className="collapsible-section__grid">
            <div className="collapsible-section__field">
              <label>Relationship *</label>
              <select
                value={policyholder.relationship}
                onChange={(e) => setPolicyholder({ ...policyholder, relationship: e.target.value })}
              >
                <option value="">Select</option>
                {relationshipOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="collapsible-section__field">
              <label>DOB *</label>
              <input 
                type="date"
                value={policyholder.dob}
                onChange={(e) => setPolicyholder({ ...policyholder, dob: e.target.value })}
              />
            </div>
          </div>
          <div className="collapsible-section__field">
            <label>Gender *</label>
            <select
              value={policyholder.gender}
              onChange={(e) => setPolicyholder({ ...policyholder, gender: e.target.value })}
            >
              <option value="">Select</option>
              {genderOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="collapsible-section__field">
            <label>First Name *</label>
            <input 
              type="text"
              placeholder="Enter first name"
              value={policyholder.firstName}
              onChange={(e) => setPolicyholder({ ...policyholder, firstName: e.target.value })}
            />
          </div>
          <div className="collapsible-section__field">
            <label>Last Name</label>
            <input 
              type="text"
              placeholder="Enter last name"
              value={policyholder.lastName}
              onChange={(e) => setPolicyholder({ ...policyholder, lastName: e.target.value })}
            />
          </div>
        </div>
        <div className="collapsible-section__actions">
          <button 
            className="collapsible-section__btn collapsible-section__btn--outline"
            onClick={handleClear}
          >
            Clear
          </button>
          <button 
            className="collapsible-section__btn collapsible-section__btn--primary"
            onClick={handleSave}
            disabled={!selectedPayer}
          >
            {editingPayer ? "Update" : "Save"}
          </button>
        </div>
      </CollapsibleSection>

      <PayerSummaryDialog
        open={showSummary}
        onClose={() => setShowSummary(false)}
        onSubmit={handleSubmit}
        payer={selectedPayer}
        policy={policy}
        policyholder={policyholder}
        placeOfServiceId={placeOfServiceId}
        isEditing={!!editingPayer}
      />

      <SuccessDialog
        open={showSuccess}
        onClose={handleSuccessClose}
        onAddNext={handleAddNext}
        payerName={lastAddedPayerName}
      />
    </aside>
  );
};

export default InsuranceSidebar;
```

### src/components/insurance/InsuranceSidebar.scss
```scss
@import '../../styles/variables.scss';

.insurance-sidebar {
  width: 18rem;
  background-color: $card;
  border-left: 1px solid $border;
  overflow-y: auto;

  @media (max-width: 1024px) {
    width: 100%;
    border-left: none;
    border-top: 1px solid $border;
  }

  &__header {
    padding: 0.75rem;
    border-bottom: 1px solid $border;

    @media (max-width: 768px) {
      padding: 0.5rem;
    }
  }

  &__title {
    font-weight: 700;
    font-size: 1rem;
    color: $foreground;
    margin-bottom: 0.5rem;
  }

  &__referral {
    font-size: 0.8rem;
    color: $foreground;
    margin-bottom: 0.25rem;
  }

  &__status-badge {
    display: inline-block;
    padding: 0.125rem 0.5rem;
    background-color: rgba($warning, 0.2);
    border: 1px solid $warning;
    color: $warning;
    border-radius: $radius;
    font-size: 0.75rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  &__date {
    font-size: 0.8rem;
    color: $muted-foreground;
    margin-bottom: 0.125rem;
  }

  &__urgency {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.25rem;

    span {
      font-size: 0.8rem;
      color: $muted-foreground;
    }
  }

  &__urgency-badge {
    padding: 0.125rem 0.5rem;
    background-color: $warning;
    color: $warning-foreground;
    border-radius: $radius;
    font-size: 0.75rem;
    font-weight: 700;
  }
}

.collapsible-section {
  border-bottom: 1px solid $border;

  &__trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.75rem;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba($muted, 0.5);
    }
  }

  &__title {
    font-weight: 600;
    color: $foreground;
    font-size: 0.875rem;
  }

  &__icon {
    width: 1.25rem;
    height: 1.25rem;
    color: $muted-foreground;
    transition: transform 0.2s;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__content {
    padding: 0 0.75rem 0.75rem;

    @media (max-width: 768px) {
      padding: 0 0.5rem 0.5rem;
    }
  }

  &__info {
    &-label {
      @include form-label;
    }

    &-value {
      font-size: 0.875rem;
      color: $muted-foreground;
    }
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      @include form-label;
    }

    &-value {
      font-size: 0.875rem;
      color: $muted-foreground;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  &__field {
    label {
      @include form-label;
    }

    select, input {
      @include select-field;
      font-size: 0.75rem;
    }

    input[type="text"], input[type="date"] {
      @include input-field;
      font-size: 0.75rem;
    }
  }

  &__actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  &__btn {
    flex: 1;

    &--outline {
      @include btn-outline;
      width: 100%;
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
    }

    &--primary {
      @include btn-primary;
      width: 100%;
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  // Search Results
  &__results {
    margin-top: 0.5rem;
    border: 1px solid $border;
    border-radius: $radius;
    overflow: hidden;
  }

  &__results-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    background-color: $muted;
    font-size: 0.7rem;
    font-weight: 500;
    color: $muted-foreground;
  }

  &__results-count {
    background-color: $secondary;
    color: $primary;
    padding: 0.125rem 0.375rem;
    border-radius: 9999px;
    font-size: 0.65rem;
  }

  &__results-list {
    max-height: 200px;
    overflow-y: auto;
  }

  &__result-item {
    padding: 0.5rem;
    border-top: 1px solid $border;
    cursor: pointer;
    transition: background-color 0.15s;

    &:first-child {
      border-top: none;
    }

    &:hover {
      background-color: rgba($primary, 0.05);
    }

    &--selected {
      background-color: rgba($primary, 0.1);
      border-left: 2px solid $primary;
    }
  }

  &__result-name {
    font-size: 0.8rem;
    font-weight: 600;
    color: $foreground;
    margin-bottom: 0.125rem;
  }

  &__result-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    color: $muted-foreground;
  }

  &__result-badge {
    background-color: $secondary;
    color: $primary;
    padding: 0.0625rem 0.375rem;
    border-radius: 9999px;
    font-size: 0.6rem;
    font-weight: 500;
  }
}

.space-y-3 > * + * {
  margin-top: 0.5rem;
}
```

### src/components/insurance/SavedPayersList.tsx
```tsx
import { Edit2, Trash2 } from "lucide-react";
import { usePayer } from "@/context/PayerContext";
import "./SavedPayersList.scss";

const SavedPayersList = () => {
  const { savedPayers, setEditingPayer, deletePayer } = usePayer();

  if (savedPayers.length === 0) {
    return (
      <div className="saved-payers-list saved-payers-list--empty">
        <div className="saved-payers-list__empty-state">
          <p>No payers saved yet</p>
          <span>Search and add payers from the sidebar</span>
        </div>
      </div>
    );
  }

  return (
    <div className="saved-payers-list">
      <div className="saved-payers-list__header">
        <h3 className="saved-payers-list__title">Saved Payers</h3>
        <span className="saved-payers-list__count">{savedPayers.length} entries</span>
      </div>
      
      <div className="saved-payers-list__table-wrapper">
        <table className="saved-payers-list__table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Benefit Type</th>
              <th>Cardholder</th>
              <th>Policyholder</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedPayers.map((entry) => (
              <tr key={entry.id}>
                <td>
                  <div className="saved-payers-list__cell-primary">{entry.payer.productName}</div>
                  <div className="saved-payers-list__cell-secondary">{entry.payer.productId}</div>
                </td>
                <td>
                  <span className="saved-payers-list__badge">{entry.payer.benefitType}</span>
                </td>
                <td>
                  <div className="saved-payers-list__cell-primary">{entry.policy.cardholderId}</div>
                  <div className="saved-payers-list__cell-secondary">{entry.policy.personCode}</div>
                </td>
                <td>
                  <div className="saved-payers-list__cell-primary">
                    {entry.policyholder.firstName} {entry.policyholder.lastName}
                  </div>
                  <div className="saved-payers-list__cell-secondary">{entry.policyholder.relationship}</div>
                </td>
                <td>
                  <div className="saved-payers-list__actions">
                    <button
                      className="saved-payers-list__action-btn saved-payers-list__action-btn--edit"
                      onClick={() => setEditingPayer(entry)}
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      className="saved-payers-list__action-btn saved-payers-list__action-btn--delete"
                      onClick={() => deletePayer(entry.id)}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavedPayersList;
```

### src/components/insurance/SavedPayersList.scss
```scss
@import '../../styles/variables.scss';

.saved-payers-list {
  @include section-card;
  
  &--empty {
    padding: 2rem;
  }

  &__empty-state {
    text-align: center;
    
    p {
      font-size: 0.875rem;
      font-weight: 600;
      color: $muted-foreground;
      margin-bottom: 0.25rem;
    }

    span {
      font-size: 0.75rem;
      color: $muted-foreground;
      opacity: 0.7;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid $border;
  }

  &__title {
    font-size: 0.875rem;
    font-weight: 700;
    color: $foreground;
  }

  &__count {
    font-size: 0.75rem;
    color: $muted-foreground;
    background-color: $muted;
    padding: 0.125rem 0.5rem;
    border-radius: 9999px;
  }

  &__table-wrapper {
    overflow-x: auto;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;

    thead {
      tr {
        background-color: $muted;
      }

      th {
        text-align: left;
        padding: 0.625rem 1rem;
        font-size: 0.7rem;
        font-weight: 600;
        color: $muted-foreground;
        text-transform: uppercase;
        letter-spacing: 0.03em;
        white-space: nowrap;

        @media (max-width: 768px) {
          padding: 0.5rem;
          font-size: 0.65rem;
        }
      }
    }

    tbody {
      tr {
        border-top: 1px solid $border;
        transition: background-color 0.15s;

        &:hover {
          background-color: rgba($primary, 0.02);
        }
      }

      td {
        padding: 0.75rem 1rem;
        font-size: 0.875rem;
        vertical-align: middle;

        @media (max-width: 768px) {
          padding: 0.5rem;
          font-size: 0.75rem;
        }
      }
    }
  }

  &__cell-primary {
    font-weight: 600;
    color: $foreground;
    font-size: 0.8rem;
  }

  &__cell-secondary {
    font-size: 0.7rem;
    color: $muted-foreground;
    margin-top: 0.125rem;
  }

  &__badge {
    display: inline-block;
    padding: 0.125rem 0.5rem;
    background-color: $secondary;
    color: $primary;
    border-radius: 9999px;
    font-size: 0.7rem;
    font-weight: 500;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }

  &__action-btn {
    padding: 0.375rem;
    border-radius: $radius;
    border: none;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;

    &--edit {
      background-color: $secondary;
      color: $primary;

      &:hover {
        background-color: $accent;
      }
    }

    &--delete {
      background-color: rgba($destructive, 0.1);
      color: $destructive;

      &:hover {
        background-color: rgba($destructive, 0.2);
      }
    }
  }
}
```

### src/components/insurance/PayerSummaryDialog.tsx
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PayerSearchResult, PolicyInfo, PolicyholderInfo } from "@/types/payer";
import "./PayerSummaryDialog.scss";

interface PayerSummaryDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  payer: PayerSearchResult | null;
  policy: PolicyInfo;
  policyholder: PolicyholderInfo;
  placeOfServiceId: string;
  isEditing?: boolean;
}

const PayerSummaryDialog = ({
  open,
  onClose,
  onSubmit,
  payer,
  policy,
  policyholder,
  placeOfServiceId,
  isEditing = false,
}: PayerSummaryDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="payer-summary-dialog">
        <DialogHeader>
          <DialogTitle className="payer-summary-dialog__title">
            {isEditing ? "Update Payer Information" : "Review & Submit"}
          </DialogTitle>
        </DialogHeader>

        <div className="payer-summary-dialog__content">
          {/* Payer Section */}
          <div className="payer-summary-dialog__section">
            <h4 className="payer-summary-dialog__section-title">Payer Details</h4>
            <div className="payer-summary-dialog__grid">
              <div className="payer-summary-dialog__field">
                <span className="payer-summary-dialog__label">Product ID</span>
                <span className="payer-summary-dialog__value">{payer?.productId || "—"}</span>
              </div>
              <div className="payer-summary-dialog__field">
                <span className="payer-summary-dialog__label">Product Name</span>
                <span className="payer-summary-dialog__value">{payer?.productName || "—"}</span>
              </div>
              <div className="payer-summary-dialog__field">
                <span className="payer-summary-dialog__label">Billing Sequence</span>
                <span className="payer-summary-dialog__value">{payer?.billingSequence || "—"}</span>
              </div>
              <div className="payer-summary-dialog__field">
                <span className="payer-summary-dialog__label">Benefit Type</span>
                <span className="payer-summary-dialog__value">{payer?.benefitType || "—"}</span>
              </div>
              <div className="payer-summary-dialog__field">
                <span className="payer-summary-dialog__label">Place of Service</span>
                <span className="payer-summary-dialog__value">{placeOfServiceId || "—"}</span>
              </div>
            </div>
          </div>

          {/* Policy Section */}
          <div className="payer-summary-dialog__section">
            <h4 className="payer-summary-dialog__section-title">Policy Information</h4>
            <div className="payer-summary-dialog__grid">
              <div className="payer-summary-dialog__field">
                <span className="payer-summary-dialog__label">Cardholder ID</span>
                <span className="payer-summary-dialog__value">{policy.cardholderId || "—"}</span>
              </div>
              <div className="payer-summary-dialog__field">
                <span className="payer-summary-dialog__label">Person Code</span>
                <span className="payer-summary-dialog__value">{policy.personCode || "—"}</span>
              </div>
              <div className="payer-summary-dialog__field">
                <span className="payer-summary-dialog__label">Effective Date</span>
                <span className="payer-summary-dialog__value">{policy.effectiveDate || "—"}</span>
              </div>
              <div className="payer-summary-dialog__field">
                <span className="payer-summary-dialog__label">Therapy Type</span>
                <span className="payer-summary-dialog__value">{policy.therapyType || "—"}</span>
              </div>
              <div className="payer-summary-dialog__field">
                <span className="payer-summary-dialog__label">Service</span>
                <span className="payer-summary-dialog__value">{policy.service || "—"}</span>
              </div>
              <div className="payer-summary-dialog__field">
                <span className="payer-summary-dialog__label">Expiration Date</span>
                <span className="payer-summary-dialog__value">{policy.expirationDate || "—"}</span>
              </div>
            </div>
          </div>

          {/* Policyholder Section */}
          <div className="payer-summary-dialog__section">
            <h4 className="payer-summary-dialog__section-title">Policyholder Info</h4>
            <div className="payer-summary-dialog__grid">
              <div className="payer-summary-dialog__field">
                <span className="payer-summary-dialog__label">Relationship</span>
                <span className="payer-summary-dialog__value">{policyholder.relationship || "—"}</span>
              </div>
              <div className="payer-summary-dialog__field">
                <span className="payer-summary-dialog__label">Date of Birth</span>
                <span className="payer-summary-dialog__value">{policyholder.dob || "—"}</span>
              </div>
              <div className="payer-summary-dialog__field">
                <span className="payer-summary-dialog__label">Gender</span>
                <span className="payer-summary-dialog__value">{policyholder.gender || "—"}</span>
              </div>
              <div className="payer-summary-dialog__field">
                <span className="payer-summary-dialog__label">First Name</span>
                <span className="payer-summary-dialog__value">{policyholder.firstName || "—"}</span>
              </div>
              <div className="payer-summary-dialog__field">
                <span className="payer-summary-dialog__label">Last Name</span>
                <span className="payer-summary-dialog__value">{policyholder.lastName || "—"}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="payer-summary-dialog__footer">
          <button className="payer-summary-dialog__btn payer-summary-dialog__btn--outline" onClick={onClose}>
            Go Back
          </button>
          <button className="payer-summary-dialog__btn payer-summary-dialog__btn--primary" onClick={onSubmit}>
            {isEditing ? "Update" : "Submit"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PayerSummaryDialog;
```

### src/components/insurance/PayerSummaryDialog.scss
```scss
@import '../../styles/variables.scss';

.payer-summary-dialog {
  max-width: 800px;
  width: 95vw;
  background-color: $card !important;
  border: 1px solid $border;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
    color: $foreground;
    letter-spacing: -0.02em;
  }

  &__content {
    padding: 1rem 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__section {
    padding: 1rem;
    background-color: $muted;
    border-radius: $radius * 2;
    height: fit-content;
  }

  &__section-title {
    font-size: 0.7rem;
    font-weight: 700;
    color: $primary;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 1rem;
    padding-bottom: 0.625rem;
    border-bottom: 2px solid rgba($primary, 0.2);
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: '';
      width: 3px;
      height: 12px;
      background-color: $primary;
      border-radius: 2px;
    }
  }

  &__grid {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem;
    background-color: $card;
    border-radius: $radius;
    border: 1px solid $border;
  }

  &__label {
    font-size: 0.65rem;
    font-weight: 600;
    color: $muted-foreground;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  &__value {
    font-size: 0.875rem;
    font-weight: 600;
    color: $foreground;
  }

  &__footer {
    padding-top: 1rem;
    border-top: 1px solid $border;
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
  }

  &__btn {
    min-width: 100px;
    
    &--outline {
      @include btn-outline;
      padding: 0.5rem 1.25rem;
    }

    &--primary {
      @include btn-primary;
      padding: 0.5rem 1.25rem;
      font-weight: 600;
    }
  }
}
```

### src/components/insurance/SuccessDialog.tsx
```tsx
import { CheckCircle, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import "./SuccessDialog.scss";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  onAddNext: () => void;
  payerName: string;
}

const SuccessDialog = ({ open, onClose, onAddNext, payerName }: SuccessDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="success-dialog">
        <div className="success-dialog__icon">
          <CheckCircle size={48} />
        </div>
        <h3 className="success-dialog__title">Successfully Added!</h3>
        <p className="success-dialog__message">
          <strong>{payerName}</strong> has been added to your payer list.
        </p>
        <div className="success-dialog__actions">
          <button className="success-dialog__btn success-dialog__btn--outline" onClick={onClose}>
            Done
          </button>
          <button className="success-dialog__btn success-dialog__btn--primary" onClick={onAddNext}>
            Next
            <ChevronRight size={16} />
            <ChevronRight size={16} className="success-dialog__chevron-second" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
```

### src/components/insurance/SuccessDialog.scss
```scss
@import '../../styles/variables.scss';

.success-dialog {
  max-width: 360px;
  text-align: center;
  padding: 2rem;
  background-color: $card !important;

  &__icon {
    margin-bottom: 1rem;
    color: $success;
    display: flex;
    justify-content: center;
    
    svg {
      filter: drop-shadow(0 4px 12px rgba($success, 0.3));
    }
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
    color: $foreground;
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
  }

  &__message {
    font-size: 0.875rem;
    color: $muted-foreground;
    margin-bottom: 1.5rem;
    line-height: 1.5;

    strong {
      color: $foreground;
      font-weight: 600;
    }
  }

  &__actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
  }

  &__btn {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    min-width: 100px;
    justify-content: center;

    &--outline {
      @include btn-outline;
      padding: 0.625rem 1.5rem;
    }

    &--primary {
      @include btn-primary;
      padding: 0.625rem 1.5rem;
      font-weight: 600;

      svg {
        transition: transform 0.2s;
      }

      &:hover svg {
        transform: translateX(2px);
      }
    }
  }

  &__chevron-second {
    margin-left: -0.625rem;
    opacity: 0.6;
  }
}
```

---

## Styles

### src/styles/variables.scss
```scss
// Color variables
$background: hsl(0, 0%, 96%);
$foreground: hsl(220, 13%, 18%);

$card: hsl(0, 0%, 100%);
$card-foreground: hsl(220, 13%, 18%);

$primary: hsl(175, 85%, 20%);
$primary-foreground: hsl(0, 0%, 100%);

$secondary: hsl(175, 40%, 95%);
$secondary-foreground: hsl(175, 85%, 20%);

$muted: hsl(210, 20%, 96%);
$muted-foreground: hsl(215, 16%, 47%);

$accent: hsl(175, 60%, 90%);
$accent-foreground: hsl(175, 85%, 20%);

$destructive: hsl(0, 84%, 60%);
$destructive-foreground: hsl(0, 0%, 100%);

$border: hsl(214, 32%, 91%);
$input: hsl(214, 32%, 91%);
$ring: hsl(175, 85%, 20%);

// Custom colors for insurance UI
$header-bg: hsl(175, 85%, 18%);
$header-foreground: hsl(0, 0%, 100%);
$success: hsl(142, 76%, 36%);
$success-foreground: hsl(0, 0%, 100%);
$warning: hsl(38, 92%, 50%);
$warning-foreground: hsl(0, 0%, 100%);
$info: hsl(217, 91%, 60%);
$info-foreground: hsl(0, 0%, 100%);
$table-header: hsl(175, 70%, 25%);
$table-header-foreground: hsl(0, 0%, 100%);
$label-color: hsl(220, 9%, 46%);
$value-color: hsl(175, 85%, 25%);

// Spacing
$radius: 0.375rem;

// Mixins
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@mixin section-card {
  background-color: $card;
  border-radius: $radius * 2;
  border: 1px solid $border;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

@mixin btn-primary {
  background-color: $info;
  color: $info-foreground;
  padding: 0.375rem 1rem;
  border-radius: $radius;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: darken($info, 10%);
  }
}

@mixin btn-outline {
  background-color: transparent;
  border: 1px solid $border;
  color: $foreground;
  padding: 0.375rem 1rem;
  border-radius: $radius;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: $muted;
  }
}

@mixin input-field {
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid $border;
  border-radius: $radius;
  background-color: $card;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba($primary, 0.2);
    border-color: $primary;
  }
}

@mixin select-field {
  @include input-field;
  appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M2.5 4.5L6 8l3.5-3.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  padding-right: 2rem;
}

@mixin form-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: $label-color;
  display: block;
  margin-bottom: 0.25rem;
}

@mixin form-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: $value-color;
}
```

### src/styles/global.scss
```scss
@import './variables.scss';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: $background;
  color: $foreground;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.5;
}

a {
  color: $primary;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
```

### src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 96%;
    --foreground: 220 13% 18%;

    --card: 0 0% 100%;
    --card-foreground: 220 13% 18%;

    --popover: 0 0% 100%;
    --popover-foreground: 220 13% 18%;

    --primary: 175 85% 20%;
    --primary-foreground: 0 0% 100%;

    --secondary: 175 40% 95%;
    --secondary-foreground: 175 85% 20%;

    --muted: 210 20% 96%;
    --muted-foreground: 215 16% 47%;

    --accent: 175 60% 90%;
    --accent-foreground: 175 85% 20%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 214 32% 91%;
    --input: 214 32% 91%;
    --ring: 175 85% 20%;

    --radius: 0.375rem;

    /* Custom colors for insurance UI */
    --header-bg: 175 85% 18%;
    --header-foreground: 0 0% 100%;
    --success: 142 76% 36%;
    --success-foreground: 0 0% 100%;
    --warning: 38 92% 50%;
    --warning-foreground: 0 0% 100%;
    --info: 217 91% 60%;
    --info-foreground: 0 0% 100%;
    --table-header: 175 70% 25%;
    --table-header-foreground: 0 0% 100%;
    --label-color: 220 9% 46%;
    --value-color: 175 85% 25%;
  }

  .dark {
    --background: 220 13% 10%;
    --foreground: 210 40% 98%;

    --card: 220 13% 14%;
    --card-foreground: 210 40% 98%;

    --popover: 220 13% 14%;
    --popover-foreground: 210 40% 98%;

    --primary: 175 70% 45%;
    --primary-foreground: 220 13% 10%;

    --secondary: 217 33% 17%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217 33% 17%;
    --muted-foreground: 215 20% 65%;

    --accent: 217 33% 17%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;

    --border: 217 33% 17%;
    --input: 217 33% 17%;
    --ring: 175 70% 45%;

    --header-bg: 175 85% 12%;
    --header-foreground: 0 0% 100%;
    --success: 142 76% 36%;
    --success-foreground: 0 0% 100%;
    --warning: 38 92% 50%;
    --warning-foreground: 0 0% 100%;
    --info: 217 91% 60%;
    --info-foreground: 0 0% 100%;
    --table-header: 175 70% 20%;
    --table-header-foreground: 0 0% 100%;
    --label-color: 215 20% 65%;
    --value-color: 175 70% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
}

@layer components {
  .form-label {
    @apply text-xs font-medium text-label;
  }

  .form-value {
    @apply text-sm font-semibold text-value;
  }

  .section-card {
    @apply bg-card rounded-lg border border-border shadow-sm;
  }

  .btn-primary {
    @apply bg-info text-info-foreground hover:bg-info/90 px-4 py-1.5 rounded text-sm font-medium transition-colors;
  }

  .btn-outline {
    @apply bg-transparent border border-border text-foreground hover:bg-muted px-4 py-1.5 rounded text-sm font-medium transition-colors;
  }

  .input-field {
    @apply w-full px-3 py-1.5 text-sm border border-border rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary;
  }

  .select-field {
    @apply w-full px-3 py-1.5 text-sm border border-border rounded bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer;
  }
}
```

---

## Configuration Files

### tailwind.config.ts
```ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        header: {
          DEFAULT: "hsl(var(--header-bg))",
          foreground: "hsl(var(--header-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        "table-header": {
          DEFAULT: "hsl(var(--table-header))",
          foreground: "hsl(var(--table-header-foreground))",
        },
        label: "hsl(var(--label-color))",
        value: "hsl(var(--value-color))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

---

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS
- **SCSS/Sass** - CSS preprocessing
- **React Router DOM** - Client-side routing
- **TanStack React Query** - Data fetching
- **Radix UI** - Accessible UI primitives
- **Lucide React** - Icons
- **Shadcn/ui** - Component library

---

## Features

1. **Patient Information Display** - Shows patient details with avatar, demographics, and contact info
2. **Payer Search** - Search for insurance payers with mock data
3. **Payer Selection** - Select and manage multiple payers
4. **Policy Management** - Enter and edit policy information
5. **Policyholder Information** - Manage policyholder details
6. **CRUD Operations** - Add, edit, and delete saved payers
7. **Review Dialog** - Summary dialog before submission
8. **Success Feedback** - Confirmation dialog after saving
9. **Responsive Design** - Works on desktop, tablet, and mobile
10. **Collapsible Sections** - Organize sidebar content efficiently
