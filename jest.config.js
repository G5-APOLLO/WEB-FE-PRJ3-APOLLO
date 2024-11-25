export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json", // Usa el archivo de configuración de pruebas
    },
  },
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],

  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },// Archivo opcional para configuraciones adicionales
};
globalThis.import = {
  meta: {
    env: {
      VITE_API_BASE_URL: "http://localhost:3000", // Cambia según tu configuración
    },
  },
};
