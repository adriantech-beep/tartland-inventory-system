interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string;
  // add other custom env vars here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
