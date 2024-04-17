import { dbClient } from "@/server/db/client";
import { DisplayData } from "./DisplayData";

export default async function Home() {
    const results = (await dbClient.execute('SELECT id FROM user')).rows as unknown as { id: string }[];
    const data = results[0];

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <DisplayData data={data} />
        </main>
    );
}
