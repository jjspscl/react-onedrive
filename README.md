# 📁 React OneDrive Picker
> Your one-stop solution for OneDrive and SharePoint file picking in React

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Version](https://img.shields.io/badge/version-0.0.1--alpha-orange)

## ⚠️ Alpha Status
This project is currently in alpha. While it's functional, expect breaking changes and evolving APIs. Production use is at your own discretion.

## ✨ Features

- 🔋 Batteries included with built-in MSAL authentication
- 🎯 Zero-config file picker integration
- 🎨 Modern React hooks-based API
- 🔄 TypeScript support out of the box
- 🛡️ Built-in error boundaries and retry mechanisms
- 🌐 SharePoint and OneDrive support

## 🤝 Contributing
We welcome contributions! Whether it's:

🐛 Bug reports
💡 Feature suggestions
📝 Documentation improvements
🔧 Pull requests


## 🔮 Upcoming Features

### Hook-based Implementation
Soon you'll be able to use our picker with hooks for more flexibility:

```tsx
import { usePicker } from '@jjspscl/react-onedrive';

const MyComponent = () => {
  const { open, isOpen, selectedFiles } = usePicker({
    authOptions: {
      clientId: "your-client-id",
      authority: "https://login.microsoftonline.com/common"
    },
    pickerOptions: {
      selection: { mode: "multiple" }
    }
  });

  return (
    <>
      <button onClick={open}>
        Pick Files
      </button>
      {isOpen && <div>Selecting files...</div>}
      {selectedFiles?.map(file => (
        <div key={file.id}>{file.name}</div>
      ))}
    </>
  );
};
```

## 📄 License
MIT © jjspscl

<!-- ## 📦 Installation

```bash
npm install @jjspscl/react-onedrive
# or
bun add @jjspscl/react-onedrive -->