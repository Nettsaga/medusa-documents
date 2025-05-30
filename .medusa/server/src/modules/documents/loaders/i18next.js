"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = i18nextLoader;
const i18next_1 = __importDefault(require("i18next"));
const path_1 = __importDefault(require("path"));
async function i18nextLoader({ container, options }) {
    console.info("Starting i18next loader...");
    try {
        const defaultTranslationsPath = path_1.default.resolve(__dirname, `../assets/i18n/locales/en/translation.json`);
        console.info(`Attempting to load default English translations from: ${defaultTranslationsPath}`);
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
            console.error("Error during i18next.init:", error);
        });
        console.info("i18next initialized with default English translations.");
    }
    catch (error) {
        console.error('Error initializing i18next with default translations:', error);
    }
    try {
        const configLanguage = options?.document_language;
        if (configLanguage === undefined) {
            console.info('Language is not configured, using "en" by default.');
        }
        else {
            console.info(`Language is configured as ${configLanguage}`);
            try {
                const translationPath = path_1.default.resolve(__dirname, `../assets/i18n/locales/${configLanguage}/translation.json`);
                console.info(`Attempting to load configured language translations from: ${translationPath}`);
                const { default: langTranslations } = await import(translationPath, { with: { type: "json" } });
                i18next_1.default.addResourceBundle(configLanguage, 'translation', langTranslations);
                i18next_1.default.changeLanguage(configLanguage);
                console.info(`Successfully added and changed language to: ${configLanguage}`);
            }
            catch (error) {
                console.error(`Error adding language configured in config (${configLanguage}). Fallback to "en". Path tried: ${path_1.default.resolve(__dirname, `../assets/i18n/locales/${configLanguage}/translation.json`)}`, error);
            }
        }
    }
    catch (error) {
        console.error('Error processing language configuration. Fallback to "en"', error);
    }
    console.info("Ending i18next loader...");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bmV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RvY3VtZW50cy9sb2FkZXJzL2kxOG5leHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFXQSxnQ0F5REM7QUFoRUQsc0RBQThCO0FBQzlCLGdEQUF3QjtBQU1ULEtBQUssVUFBVSxhQUFhLENBQUMsRUFDMUMsU0FBUyxFQUNULE9BQU8sRUFDc0I7SUFDN0IsT0FBTyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO0lBRTFDLElBQUksQ0FBQztRQUNILE1BQU0sdUJBQXVCLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsNENBQTRDLENBQUMsQ0FBQztRQUN0RyxPQUFPLENBQUMsSUFBSSxDQUFDLHlEQUF5RCx1QkFBdUIsRUFBRSxDQUFDLENBQUM7UUFDakcsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFNUYsTUFBTSxpQkFBTzthQUNWLElBQUksQ0FBQztZQUNKLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFNBQVMsRUFBRSxhQUFhO1lBQ3hCLEVBQUUsRUFBRSxhQUFhO1lBQ2pCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLEVBQUU7b0JBQ0YsV0FBVyxFQUFFLElBQUk7aUJBQ2xCO2FBQ0Y7U0FDRixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztRQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0RBQXdELENBQUMsQ0FBQztJQUV6RSxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsdURBQXVELEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUdELElBQUksQ0FBQztRQUNILE1BQU0sY0FBYyxHQUFHLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQTtRQUNqRCxJQUFJLGNBQWMsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9EQUFvRCxDQUFDLENBQUE7UUFDcEUsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLENBQUMsSUFBSSxDQUFDLDZCQUE2QixjQUFjLEVBQUUsQ0FBQyxDQUFBO1lBQzNELElBQUksQ0FBQztnQkFDSCxNQUFNLGVBQWUsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSwwQkFBMEIsY0FBYyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUM3RyxPQUFPLENBQUMsSUFBSSxDQUFDLDZEQUE2RCxlQUFlLEVBQUUsQ0FBQyxDQUFDO2dCQUM3RixNQUFNLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLEdBQUcsTUFBTSxNQUFNLENBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDaEcsaUJBQU8sQ0FBQyxpQkFBaUIsQ0FDdkIsY0FBYyxFQUNkLGFBQWEsRUFDYixnQkFBZ0IsQ0FDakIsQ0FBQTtnQkFDRCxpQkFBTyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDdkMsT0FBTyxDQUFDLElBQUksQ0FBQywrQ0FBK0MsY0FBYyxFQUFFLENBQUMsQ0FBQztZQUNoRixDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDZixPQUFPLENBQUMsS0FBSyxDQUFDLCtDQUErQyxjQUFjLG9DQUFvQyxjQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSwwQkFBMEIsY0FBYyxtQkFBbUIsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDaE4sQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkRBQTJELEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQTtBQUMxQyxDQUFDIn0=