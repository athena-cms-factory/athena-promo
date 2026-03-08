# Athena Factory Utilities (6-utilities)

Dit is de verzamelplaats voor batch-scripts en onderhoudstools die op het hele monorepo of specifieke sites werken.

## 🛠️ Beschikbare Tools

### 1. `batch-upgrade-editable-text.js`
Propagateert de nieuwste logica van de `EditableText.jsx` boilerplate naar alle bestaande sites en sitetypes.
- **Bron**: `factory/2-templates/boilerplate/docked/shared/components/EditableText.jsx`
- **Doel**: Alle `EditableText.jsx` bestanden in `sites/` en `factory/3-sitetypes/docked/`.
- **Veiligheid**: Slaat componenten over die een eigen editor hebben (Autonomous Track).
- **Gebruik**:
  ```bash
  node factory/6-utilities/batch-upgrade-editable-text.js
  ```

### 2. `update-all-heros.js`
(Bestaande tool voor het batch-updaten van hero secties)

### 3. `audit-media.js`
Controleert op ongebruikte assets en repareert paden.
- **Gebruik**:
  ```bash
  node factory/6-utilities/audit-media.js <project-name>
  ```

### 4. `bulk-site-audit.js`
Voert een technische scan uit op het volledige portfolio.
