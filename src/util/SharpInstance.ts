import sharp, { AvailableFormatInfo, FormatEnum, Sharp } from 'sharp';

interface ProcessOpts {
  width: null | number;
  height: null | number;
  format: keyof FormatEnum | AvailableFormatInfo;
  quality: number;
}

class SharpInstance {
  private width: null | number;

  private height: null | number;

  private format: keyof FormatEnum | AvailableFormatInfo;

  private quality: number;

  private image: Sharp;

  constructor(filepath: string, { width, height, quality, format }: Partial<ProcessOpts>) {
    this.width = width || null;
    this.height = height || null;
    this.format = format || 'webp';
    this.quality = quality || 60;
    this.image = sharp(filepath);
  }

  public async process(): Promise<Buffer> {
    this.image
      .resize(this.width, this.height, {
        fit: 'cover',
      })
      .toFormat(this.format, { quality: this.quality });
    const buffer = await this.image.toBuffer();
    return buffer;
  }

  public get contentType(): string {
    return `image/${String(this.format)}`;
  }
}

export type { ProcessOpts };

export { SharpInstance };
