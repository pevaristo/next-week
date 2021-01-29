// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from '../../util/mongodb';



export default async (req, res) => {

    /*
    const appointment = {
        key: 1,
        name: "Work",
        day: "Saturday",
        start: 13,
        end: 18,
        type: "work",
        active: true,
    }

    res.statusCode = 200
    res.json({ appointment })
    */

    const { db } = await connectToDatabase();

    const appointments = await db
        .collection("appointments")
        //.find({active: true})
        .find({})
        .limit(20)
        .toArray();

    res.json(appointments);

};
