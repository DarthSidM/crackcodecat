import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import ProfilePageClient from "./ProfilePageClient";

export default function ProfilePage() {
  const cookieStore = cookies();
  const token = cookieStore.get("user")?.value;

  if (!token) {
    return <meta httpEquiv="refresh" content="0; url=/login" />;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      name: string;
      phoneNumber: string;
      userId: string;
    };

    const { name, phoneNumber, userId } = decoded;

    return (
      <ProfilePageClient
        initialUser={{ _id: userId, name, phone: phoneNumber }}
      />
    );
  } catch {
    return <meta httpEquiv="refresh" content="0; url=/login" />;
  }
}
