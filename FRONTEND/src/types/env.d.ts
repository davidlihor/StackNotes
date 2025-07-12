/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

interface Window {
  ENV: {
    STACKNOTES_API_URL: string;
  };
}