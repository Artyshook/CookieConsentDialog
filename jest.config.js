module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    moduleNameMapper: {
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/'],
    coveragePathIgnorePatterns: ['/node_modules/'],
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'], // Собираем информацию о покрытии кода тестами
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.tests.json'
        }
    }
};
