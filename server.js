import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// ⚠️ Remplacez ces valeurs par les vôtres
const TOKEN = "VOTRE_TOKEN_WHATSAPP_CLOUD_API";  // Token temporaire ou permanent
const PHONE_NUMBER_ID ="+33 6 24 49 28 53";   // ID du numéro Whatsapp (Phone Number ID)
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
