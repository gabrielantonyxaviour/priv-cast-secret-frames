import type { NextApiRequest, NextApiResponse } from "next";
import { Message, getSSLHubRpcClient } from "@farcaster/hub-nodejs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      try {
        const frameMessage: any = Message.decode(
          Buffer.from(req.body?.trustedData?.messageBytes || "", "hex")
        );

        console.log("FRAME MESSAGE");
        console.log({
          hash: frameMessage.hash.toString("hex"),
          signature: frameMessage.signature.toString("hex"),
        });
        res.status(200).send({
          hash: frameMessage.hash.toString("hex"),
          signature: frameMessage.signature.toString("hex"),
        });
      } catch (e) {
        console.log("ERROR");
        console.log(e);
        res.status(400).send("Invalid message");
      }
    } catch (e) {
      res.status(500).send("Error processing vote");
    }
  }
}
