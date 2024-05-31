import { NextResponse, NextRequest } from "next/server";
export const GET = (
    request: NextRequest,
    { params } : { params: {testId: string}}
) => {
    return NextResponse.json({
        testId: params.testId
    })
};