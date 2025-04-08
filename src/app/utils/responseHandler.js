import { NextResponse } from "next/server";
import ClientError from "@/app/exceptions/ClientError";

export const createResponse = (status, data, statusCode = 200) => {
  const response = NextResponse.json({ status, ...data }, { status: statusCode });
  response.headers.set('Content-Type', 'application/json; charset=utf-8');
  return response;
};

export const handleError = (error) => {
  if (error instanceof ClientError) {
    return createResponse("fail", { message: error.message }, error.statusCode);
  }

  const response = NextResponse.json({ status: 'fail', message: 'Internal server error' }, { status: 500 });
  response.headers.set('Content-Type', 'application/json; charset=utf-8');

  return response;
};
