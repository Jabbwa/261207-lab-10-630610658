import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();

    const id = req.query.roomId;
    const roomsIdx = readDB().findIndex((x) => x.roomId === id);
    if (roomsIdx === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });

    const messanger = rooms[roomsIdx].messages;
    return res.json({ ok: true, messages: messanger });
    //post
  } else if (req.method === "POST") {
    const rooms = readDB();

    const id = req.query.roomId;
    const roomsIdx = readDB().findIndex((x) => x.roomId === id);
    if (roomsIdx === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });

    //read request body
    const text = req.body.text;

    //create new id
    const newId = uuidv4();
    const newMessage = {
      messageId: newId,
      text: text,
    };
    rooms[roomsIdx].messages.push(newMessage);

    writeDB(rooms);
    return res.json({ ok: true, messages: newMessage });
  }
}
