import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method === "GET") {
    console.log(req.headers.cookie);
    console.log("cookie exists", req.headers.cookie);
    // if (!req.headers.cookie) {
    //   res.status(403).json({ message: "Not Authorized" });
    //   return;
    // }

    const { token } = cookie.parse(req.headers.cookie);
    console.log("token");
    console.log({ token });
    console.log("API_URL");
    console.log({ API_URL });

    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("strapiRes /api/user.js", strapiRes);
    const user = await strapiRes.json();
    console.log("user on /api/user.js", user);

    if (strapiRes.ok) {
      res.status(200).json({ user });
    } else {
      res.status(403).json({ message: "User forbidden" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
