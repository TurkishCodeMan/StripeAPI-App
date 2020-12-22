import BackendService from "./services/BackendService"


class CardWidget {
    stripe = null;
    card = null;

    constructor(stripe) {
        this.stripe = stripe;
    }

    mounte() {
        const elements = this.stripe.elements();
        this.card = elements.create("card", { hidePostalCode: true })
        this.card.mount("#card-element")
    }
    destroy() {
        this.card.destroy();
    }
    async purchaseNow() {
        try {
            const result = await this.stripe.createToken(this.card);

            const result2 = await BackendService.checkout(result);

            return result2.message;

        } catch (error) {
            console.log(error);
        }

    }


}

export default CardWidget;