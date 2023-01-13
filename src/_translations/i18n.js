import I18n from "i18n-js";

import en from "./locales/en";
import hr from "./locales/hr";


I18n.fallbacks = true;
I18n.translations = { en, hr, };
I18n.missingBehaviour = 'guess';
I18n.defaultLocale = 'hr';
I18n.separator = ':::';
I18n.keySeparator = ':::';

I18n.availableTranslations = [];
I18n.data = [
  { lngName: 'English', lngCode: 'en' },
  { lngName: 'Hrvatski', lngCode: 'hr' },
];
I18n.codeToName = {
  en: 'English',
  hr: 'Hrvatski',
};
I18n.locale = 'hr';


/*
const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.fallbacks = true;
I18n.translations = {
  //en,
  hr
};
*/

export default I18n;