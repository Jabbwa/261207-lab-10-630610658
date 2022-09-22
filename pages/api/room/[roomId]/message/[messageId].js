import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  const rooms = readDB();
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;

  const roomsIdx = readDB().findIndex((x) => x.roomId === roomId);
  if (roomsIdx === -1)
    return res.status(404).json({ ok: false, message: "Invalid room id" });

  const messageIdx = rooms[roomsIdx].messages.findIndex(
    (x) => x.messageId === messageId
  );
  if (messageIdx === -1)
    return res.status(404).json({ ok: false, message: "Invalid message id" });

  rooms[roomsIdx].messages.splice(messageIdx, 1);
  return res.json({ ok: true });
}
