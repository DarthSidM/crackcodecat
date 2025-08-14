import jwt from "jsonwebtoken";


export function decodeUserFromCookieClient() {
    const match = document.cookie.match(/(?:^|; )user=([^;]*)/);
    if (!match) throw new Error("No user cookie found");

    const token = decodeURIComponent(match[1]);

    try {
        const decoded = jwt.decode(token) as {
            phoneNumber: string;
            name: string;
            userId: string;
        };
        return decoded;
    } catch {
        throw new Error("Invalid token");
    }
}
