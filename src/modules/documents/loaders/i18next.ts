import {
  LoaderOptions,
} from "@medusajs/framework/types"

import i18next from 'i18next';
import path from "path";
import fs from "fs";

type ModuleOptions = {
  document_language?: string
}

function findAssetsPath(): string {
  // Try multiple possible locations for the assets directory
  const possiblePaths = [
    // Development path (when running from source)
    path.resolve(__dirname, `../assets`),
    // Compiled path (when running from node_modules)
    path.resolve(__dirname, `../../../../assets`),
    // Alternative compiled path
    path.resolve(__dirname, `../../../assets`),
    // Another possible path structure
    path.resolve(__dirname, `../../assets`),
  ];

  for (const assetPath of possiblePaths) {
    const translationPath = path.join(assetPath, 'i18n/locales/en/translation.json');
    if (fs.existsSync(translationPath)) {
      return assetPath;
    }
  }

  // If nothing found, return the default and let it fail gracefully
  return path.resolve(__dirname, `../assets`);
}

export default async function i18nextLoader({
  container,
  options
}: LoaderOptions<ModuleOptions>) {
  console.info("Starting i18next loader...")

  try {
    const assetsPath = findAssetsPath();
    const defaultTranslationsPath = path.join(assetsPath, 'i18n/locales/en/translation.json');

    // Check if file exists before trying to import
    if (!fs.existsSync(defaultTranslationsPath)) {
      throw new Error(`Translation file not found at: ${defaultTranslationsPath}`);
    }

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
        console.error(error);
      });

  } catch (error) {
    console.error('Error initializing i18next:', error);

    // Initialize with minimal fallback translations if file loading fails
    await i18next.init({
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
            "due-date": "Due Date"
          }
        }
      }
    });
  }


  try {
    const configLanguage = options?.document_language
    if (configLanguage === undefined) {
      console.info('Language is not configured, using "en" by default.')
    } else {
      console.info(`Language is configured as ${configLanguage}`)
      const assetsPath = findAssetsPath();
      const translationPath = path.join(assetsPath, `i18n/locales/${configLanguage}/translation.json`);

      if (fs.existsSync(translationPath)) {
        const translations = await import(translationPath);
        i18next.addResourceBundle(
          configLanguage,
          'translation',
          translations
        )
        i18next.changeLanguage(configLanguage);
      } else {
        console.warn(`Translation file for language '${configLanguage}' not found at: ${translationPath}`);
      }
    }
  } catch {
    console.error('Error adding language configured in config. Fallback to "en"');
  }

  console.info("Ending i18next loader...")
}