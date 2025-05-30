import {
  LoaderOptions,
} from "@medusajs/framework/types"

import i18next from 'i18next';
import path from "path";

type ModuleOptions = {
  document_language?: string
}

export default async function i18nextLoader({
  container,
  options
}: LoaderOptions<ModuleOptions>) {
  console.info("Starting i18next loader...")

  try {
    const defaultTranslationsPath = path.resolve(__dirname, `../assets/i18n/locales/en/translation.json`);
    console.info(`Attempting to load default English translations from: ${defaultTranslationsPath}`);
    const { default: data } = await import(defaultTranslationsPath, { with: { type: "json" } });

    await i18next
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

  } catch (error) {
    console.error('Error initializing i18next with default translations:', error);
  }


  try {
    const configLanguage = options?.document_language
    if (configLanguage === undefined) {
      console.info('Language is not configured, using "en" by default.')
    } else {
      console.info(`Language is configured as ${configLanguage}`)
      try {
        const translationPath = path.resolve(__dirname, `../assets/i18n/locales/${configLanguage}/translation.json`);
        console.info(`Attempting to load configured language translations from: ${translationPath}`);
        const { default: langTranslations } = await import(translationPath, { with: { type: "json" } });
        i18next.addResourceBundle(
          configLanguage,
          'translation',
          langTranslations
        )
        i18next.changeLanguage(configLanguage);
        console.info(`Successfully added and changed language to: ${configLanguage}`);
      } catch (error) {
        console.error(`Error adding language configured in config (${configLanguage}). Fallback to "en". Path tried: ${path.resolve(__dirname, `../assets/i18n/locales/${configLanguage}/translation.json`)}`, error);
      }
    }
  } catch (error) {
    console.error('Error processing language configuration. Fallback to "en"', error);
  }

  console.info("Ending i18next loader...")
}