import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { config } from "@config";

function minifyJson(json: object): string {
  return JSON.stringify(json);
}

function sha256(content: string): string {
  return crypto
    .createHash("sha256")
    .update(content)
    .digest("hex")
    .toLowerCase();
}

function hmac512(sts: string): string {
  return crypto
    .createHmac("sha512", SECRET_KEY)
    .update(sts)
    .digest("base64");
}

const SECRET_KEY = config.app.appSalt;

export function validateSignature(req: any, res: any, next: any) {
  try {
    const timestamp = req.headers["x-timestamp"] as string;
    const signature = req.headers["x-signature"] as string;

    if (!timestamp || !signature) {
      
      return res.status(401).json({
        "error" : {
          "type": "APP",
          "code": "UNAUTHORIZED",
          "statusCode": 401,
          "message": "Missing signature headers"
        },
        "success": false  
      });
    }

    const method = req.method.toUpperCase();

    const relativeEndpoint = req.baseUrl + req.path;

    let minifiedBody = "";
    if (req.body && Object.keys(req.body).length > 0) {
      minifiedBody = minifyJson(req.body);
    }

    const hash = sha256(minifiedBody);
    const stringToSign = `${method}:${relativeEndpoint}:${hash}:${timestamp}`;
    const expectedSignature = hmac512(stringToSign);

    if (signature !== expectedSignature) {
      return res.status(401).json({
        "error": {
          "type": "APP",
          "code": "UNAUTHORIZED",
          "statusCode": 401,
          "message": "Invalid signature"
        },
        "success": false
      });
    }

    next();
  } catch (err) {
    return res.status(400).json({
      "error": {
        "type": "APP",
        "code": "BAD_REQUEST",
        "statusCode": 400,
        "message": "Error validating signature"
      },
      "success": false
    });
  }
}