interface ImportMetaEnv {
  VITE_API_BASE_URL: string | undefined;
  readonly VITE_GOOGLE_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
