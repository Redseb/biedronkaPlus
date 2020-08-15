const plStrings = {
    updateCardInfo: "Zmień Kartę",
    back: "Wstecz",
    scanSuccess: "Karta Została Zeskanowana"
}

const enStrings = {
    updateCardInfo: "Change Card",
    back: "Back",
    scanSuccess: "Scan Successful!"
}

const ruStrings = {
    updateCardInfo: "Сменить карту",
    back: "назад",
    scanSuccess: "Карта отсканирована"

}

const getString = (lang, key) => {
    switch (lang) {
        case 'en': return enStrings[key]
        case 'pl': return plStrings[key]
        case 'ru': return ruStrings[key]
        default: return "Missing String"
    }
}

export { getString }