import { create } from "@open-wa/wa-automate";

const createClientWa = (app) => {
    create({
        sessionId: "test",
    }).then(async (client) => {
        app.set('wa', client)
    }).catch(err => console.log(err));
}

export default createClientWa