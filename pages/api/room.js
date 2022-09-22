import { readDB } from "../../backendLibs/dbLib";

export default function roomRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB().map((x) => ({
      roomId: x.roomId,
      roomName: x.roomName,
    }));
    return res.json({ ok: true, rooms });
  }
}
