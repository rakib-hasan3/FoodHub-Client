import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body = await req.json()
    console.log(body) // test

    return NextResponse.json({ success: true })
}
