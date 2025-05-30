"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = i18nextLoader;
const i18next_1 = __importDefault(require("i18next"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function findAssetsPath() {
    // Try multiple possible locations for the assets directory
    const possiblePaths = [
        // Development path (when running from source)
        path_1.default.resolve(__dirname, `../assets`),
        // Compiled path (when running from node_modules)
        path_1.default.resolve(__dirname, `../../../../assets`),
        // Alternative compiled path
        path_1.default.resolve(__dirname, `../../../assets`),
        // Another possible path structure
        path_1.default.resolve(__dirname, `../../assets`),
    ];
    for (const assetPath of possiblePaths) {
        const translationPath = path_1.default.join(assetPath, 'i18n/locales/en/translation.json');
        if (fs_1.default.existsSync(translationPath)) {
            return assetPath;
        }
    }
    // If nothing found, return the default and let it fail gracefully
    return path_1.default.resolve(__dirname, `../assets`);
}
async function i18nextLoader({ container, options }) {
    console.info("Starting i18next loader...");
    try {
        const assetsPath = findAssetsPath();
        const defaultTranslationsPath = path_1.default.join(assetsPath, 'i18n/locales/en/translation.json');
        // Check if file exists before trying to import
        if (!fs_1.default.existsSync(defaultTranslationsPath)) {
            throw new Error(`Translation file not found at: ${defaultTranslationsPath}`);
        }
        const { default: data } = await import(defaultTranslationsPath, { with: { type: "json" } });
        await i18next_1.default
            .init({
            fallbackLng: 'en',
            defaultNS: 'translation',
            ns: 'translation',
            resources: {
                en: {
                    translation: data
                }
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    catch (error) {
        console.error('Error initializing i18next:', error);
        // Initialize with minimal fallback translations if file loading fails
        await i18next_1.default.init({
            fallbackLng: 'en',
            defaultNS: 'translation',
            ns: 'translation',
            resources: {
                en: {
                    translation: {
                        "invoice": "Invoice",
                        "invoice-number": "Invoice number",
                        "invoice-date": "Invoice date",
                        "kid-number": "KID",
                        "bank-account": "Bank Account",
                        "due-date": "Due Date",
                        "organization-number": "Organization Number"
                    }
                }
            }
        });
    }
    try {
        const configLanguage = options?.document_language;
        if (configLanguage === undefined) {
            console.info('Language is not configured, using "en" by default.');
        }
        else {
            console.info(`Language is configured as ${configLanguage}`);
            const assetsPath = findAssetsPath();
            const translationPath = path_1.default.join(assetsPath, `i18n/locales/${configLanguage}/translation.json`);
            if (fs_1.default.existsSync(translationPath)) {
                const translations = await import(translationPath);
                i18next_1.default.addResourceBundle(configLanguage, 'translation', translations);
                i18next_1.default.changeLanguage(configLanguage);
            }
            else {
                console.warn(`Translation file for language '${configLanguage}' not found at: ${translationPath}`);
            }
        }
    }
    catch {
        console.error('Error adding language configured in config. Fallback to "en"');
    }
    console.info("Ending i18next loader...");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bmV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RvY3VtZW50cy9sb2FkZXJzL2kxOG5leHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFvQ0EsZ0NBa0ZDO0FBbEhELHNEQUE4QjtBQUM5QixnREFBd0I7QUFDeEIsNENBQW9CO0FBTXBCLFNBQVMsY0FBYztJQUNyQiwyREFBMkQ7SUFDM0QsTUFBTSxhQUFhLEdBQUc7UUFDcEIsOENBQThDO1FBQzlDLGNBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQztRQUNwQyxpREFBaUQ7UUFDakQsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLENBQUM7UUFDN0MsNEJBQTRCO1FBQzVCLGNBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDO1FBQzFDLGtDQUFrQztRQUNsQyxjQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUM7S0FDeEMsQ0FBQztJQUVGLEtBQUssTUFBTSxTQUFTLElBQUksYUFBYSxFQUFFLENBQUM7UUFDdEMsTUFBTSxlQUFlLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsa0NBQWtDLENBQUMsQ0FBQztRQUNqRixJQUFJLFlBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQztZQUNuQyxPQUFPLFNBQVMsQ0FBQztRQUNuQixDQUFDO0lBQ0gsQ0FBQztJQUVELGtFQUFrRTtJQUNsRSxPQUFPLGNBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFFYyxLQUFLLFVBQVUsYUFBYSxDQUFDLEVBQzFDLFNBQVMsRUFDVCxPQUFPLEVBQ3NCO0lBQzdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtJQUUxQyxJQUFJLENBQUM7UUFDSCxN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