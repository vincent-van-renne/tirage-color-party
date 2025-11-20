import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// ⚠️ Remplacez ces valeurs par les vôtres
const TOKEN = "EAAMmOl7KHqIBPZCwRarSzotIE3pZBMFHU7qh8vOUKPrmSsNyO0ZBd9mVZAPQXiWApvuQzb49VJZC2uRmqBM7FqDtoq1xVWSqmEopdWvungQjzYcC7bSOAwJSabP0HvGy73zlvZCfPxfPd7fIqGq1yJwomSJOQ5ioc28V2FJeBXWByrj31rfrG5POWjgphyb3gyA1YZAV4VUHJUB0AdL6WNrmK4Q7KoWbK8gc9NvU9KkBcBjzBCXPwYaoZBKqcKo4w5XoD4x8MOfCDMlR1iZAAlOfoMqcXJwoZD";  // Token temporaire ou permanent
const PHONE_NUMBER_ID ="848218498378804";   // ID du numéro Whatsapp (Phone Number ID)
const GROUP_ID = "1495025311793466";      // ID du groupe "Nouvel an Color Party"

app.post("/", async (req, res) => {
    const { participant, color } = req.body;

    const message = `🎉 ${participant} a tiré la couleur : ${color.toUpperCase()} !`;

    try {
        await fetch(`https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                to: GROUP_ID,
                type: "text",
                text: { body: message }
            })
        });

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});


app.listen(3000, () => console.log("Serveur WhatsApp OK sur le port 3000"));
