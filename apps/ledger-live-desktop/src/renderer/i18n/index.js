import ar from "../../../static/i18n/ar/app.json";
import de from "../../../static/i18n/de/app.json";
import el from "../../../static/i18n/el/app.json";
import en from "../../../static/i18n/en/app.json";
import es from "../../../static/i18n/es/app.json";
import fi from "../../../static/i18n/fi/app.json";
import fr from "../../../static/i18n/fr/app.json";
import hu from "../../../static/i18n/hu/app.json";
import it from "../../../static/i18n/it/app.json";
import ja from "../../../static/i18n/ja/app.json";
import ko from "../../../static/i18n/ko/app.json";
import nl from "../../../static/i18n/nl/app.json";
import no from "../../../static/i18n/no/app.json";
import pl from "../../../static/i18n/pl/app.json";
import pt from "../../../static/i18n/pt/app.json";
import ru from "../../../static/i18n/ru/app.json";
import sr from "../../../static/i18n/sr/app.json";
import sv from "../../../static/i18n/sv/app.json";
import tr from "../../../static/i18n/tr/app.json";
import zh from "../../../static/i18n/zh/app.json";

export default Object.entries({
  ar,
  de,
  el,
  en,
  es,
  fi,
  fr,
  hu,
  it,
  ja,
  ko,
  nl,
  no,
  pl,
  pt,
  ru,
  sr,
  sv,
  tr,
  zh,
}).reduce((acc, [key, locale]) => {
  return {
    ...acc,
    [key]: {
      app: locale,
    },
  };
}, {});
