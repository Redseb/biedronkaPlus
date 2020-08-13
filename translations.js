const plStrings = {
    updateCardInfo: "Zmień Kartę",
    back: "Wstecz"
}

const enStrings = {
    updateCardInfo: "Change Card",
    back: "Back"
}

const ruStrings = {
    updateCardInfo: "Сменить карту",
    back: "назад"
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