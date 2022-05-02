const Utils = {
    localizeAmount: amount => {
        return `${amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}`
    },

    localizeDate: dateString => {
        //const datePart = dateString.split('T')[0]
        //const datePieces = datePart.split('-')
        const date = new Date(dateString)
        return `${date.toLocaleDateString('en-US')}`
    }
}

export {Utils}