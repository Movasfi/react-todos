# Todo App Components

- **App.tsx** (vader component hier staat alles)
- **Header.tsx** (Hier staat de naam van de website of bit-todos en binnen Header.tsx staat AppText.tsx)
- **TodoSection.tsx** (Hierbinnen staan TodoSectionHeader en TodoItem)
- **TodoSectionHeader.tsx** (Op linkerkant staat AppText.tsx en op recherkant Icon.tsx)
- **TodoItem.tsx** (Hierbinnen staan StatusDropdown.tsx en AppText.tsx)
- **StatusDropdown.tsx** (Hierbinnen staan in het begin Icon.tsx en in de midden AppText.tsx en in het eind Icon.tsx)
- **AppText.tsx** (Hierbinnen staat paraghrap)

---

## Component Hierarchy

```text
1. App.tsx
   ├── 1 Header.tsx
   │    └── 1 AppText.tsx
   │
   ├── 1.2 TodoSection.tsx
   │    ├── 1.2.1 TodoSectionHeader.tsx
   │    │    ├── 1.2.1.1 AppText.tsx
   │    │    └── 1.2.1.2 Icon.tsx
   │    └── 1.2.2 TodoItem.tsx
   │         ├── 1.2.2.1 StatusDropdown
   │         │    ├── 1.2.2.1.1 icon.tsx
   │         │    ├── 1.2.2.1.2 AppText.tsx
   │         │    └── 1.2.2.1.3 icon.tsx
   │         └── 1.2.2.2 AppText.tsx
   │
   ├── 1.3 TodoSection.tsx
   │    ├── 1.3.1 TodoSectionHeader.tsx
   │    │    ├── 1.3.1.1 AppText.tsx
   │    │    └── 1.3.1.2 Icon.tsx
   │    └── 1.3.2 TodoItem.tsx
   │         ├── 1.3.2.1 StatusDropdown
   │         │    ├── 1.3.2.1.1 icon.tsx
   │         │    ├── 1.3.2.1.2 AppText.tsx
   │         │    └── 1.3.2.1.3 icon.tsx
   │         └── 1.3.2.2 AppText.tsx
   │
   └── 1.4 TodoSection.tsx
        ├── 1.4.1 TodoSectionHeader.tsx
        │    ├── 1.4.1.1 AppText.tsx
        │    └── 1.4.1.2 Icon.tsx
        └── 1.4.2 TodoItem.tsx
             ├── 1.4.2.1 StatusDropdown
             │    ├── 1.4.2.1.1 icon.tsx
             │    ├── 1.4.2.1.2 AppText.tsx
             │    └── 1.4.2.1.3 icon.tsx
             └── 1.4.2.2 AppText.tsx
