import axios from 'axios';
import LRUCache from 'lru-cache';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createCanvas, GlobalFonts, SKRSContext2D, Image } from '@napi-rs/canvas';
import { base64_decode } from '@/lib/app/utils/base64';
import { resolve } from 'path';
import cache from "@/lib/app/middleware/cache";

const IMG_WIDTH = 1200;
const IMG_HEIGHT = 600;

function wrapText(context: SKRSContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  var words = text.split(' ');
  var line = '';

  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var textWidth = metrics.width;
    if (textWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}

async function drawImage(ctx: SKRSContext2D, owner:string, x: number, y: number, width: number, height: number) {
  const url = `https://github.com/${owner}.png?size=64`
  const response = await axios.get(url, { responseType: 'arraybuffer' })
  const imageBuffer = Buffer.from(response.data, "utf-8")
  var image = new Image();
  const radius = width / 2;
  image.src = imageBuffer
  image.width = width;
  image.height = height;

  ctx.save();
  ctx.beginPath();
  ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(image, x, y, width, height);

  ctx.beginPath();
  ctx.arc(x - radius, y - radius, radius, 0, Math.PI * 2, true);
  ctx.clip();
  ctx.closePath();
  ctx.restore();
}

GlobalFonts.registerFromPath(resolve('./public', 'fonts', 'Inter-Regular.ttf'));
GlobalFonts.registerFromPath(resolve('./public', 'fonts', 'Inter-Bold.ttf'));

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  lruCache: LRUCache<string, Buffer>
) {
  let input = "";
  const inputs = req.query["t"] ?? "";
  if (typeof inputs !== "string") {
    input = inputs[0];
  } else {
    input = inputs;
  }
  let imageData = null;
  if (lruCache.has(input)) {
    imageData = lruCache.get(input);
  } else {
    let [owner, breadcrumb, title ] = base64_decode(input).split(" *=* ");

    owner = owner || '';
    breadcrumb = breadcrumb || '';
    title = title || '';
  
    const canvas = createCanvas(IMG_WIDTH, IMG_HEIGHT);
    const ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.fillStyle = '#F7F8FB';
    ctx.fillRect(0, 0, IMG_WIDTH, IMG_HEIGHT);

    await drawImage(ctx, owner, 70, 100, 64, 64);

    ctx.font = "bold 35px Inter";
    ctx.fillStyle = '#253A59';
    ctx.fillText(breadcrumb, 150, 144);

    ctx.font = "bold 72px Inter";
    ctx.fillStyle = '#253A59';
    wrapText(ctx, title, 70, 370, IMG_WIDTH - 80, 82);

    imageData = canvas.toBuffer('image/png');
    lruCache.set(input, imageData);
  }

  res.setHeader('Content-Type', 'image/png');
  res.send(imageData);
}

export default cache(handler);