import { initReactI18next} from "react-i18next";
import i18 from "i18next";
import English from "../en/translation.json"
import Kiswahili from "../ksw/translation.json"
import Kinyarwanda from "../kny/translation.json"
import French from "../fr/translation.json"

i18
.use(initReactI18next)
.init(
    {
        resources:{
            en:{
                translation:English
            },
            fr:{
                translation:French
            },
            ksw:{
                translation:Kiswahili
            },
            kny:{
                translation:Kinyarwanda
            },
        },
        lng:"en",
        fallbackLng: "en",
        interpolation: {
            escapeValue:false
        }
    }
)
export default i18