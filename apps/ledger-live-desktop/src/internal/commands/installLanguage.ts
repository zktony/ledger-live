import type { Observable } from "rxjs";
import { from } from "rxjs";
import installLanguage from "@ledgerhq/live-common/lib/hw/installLanguage";
import type { InstallLanguageEvent, InstallLanguageRequest } from "@ledgerhq/live-common/lib/hw/installLanguage";

const cmd = (input: InstallLanguageRequest): Observable<InstallLanguageEvent> => from(installLanguage(input));

export default cmd;