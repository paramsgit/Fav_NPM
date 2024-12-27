/// <reference types="vite/client" />
declare global {
    namespace ImportMeta {
      interface Env {
        VITE_API_URL: string;
      }
    }
  }
  export {};
  