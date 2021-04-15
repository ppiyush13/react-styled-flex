module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    reporters: [
        'default',
        [
            'jest-junit',
            {
                outputDirectory: 'reports/jest',
                outputName: 'js-test-results.xml',
            },
        ],
    ],
    setupFilesAfterEnv: [
        '<rootDir>/test-setup.ts',
    ],
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!<rootDir>/node_modules/',
    ],
    coverageThreshold: {
        global: {
            lines: 100,
            branches: 100,
            functions: 100,
            statements: 100,
        },
    },
};
