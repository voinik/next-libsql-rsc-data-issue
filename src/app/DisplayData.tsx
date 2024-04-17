'use client';

export function DisplayData({ data }: { data: { id: string }}) {
    return (
        <div>
            <span>ID: {data.id}</span>
        </div>
    );
}
