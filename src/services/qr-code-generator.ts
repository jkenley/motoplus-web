import * as crypto from 'crypto';

/**
 * Implements the Mersenne Twister pseudorandom number generator.
 */
class MersenneTwister {
  private readonly N = 624;
  private readonly M = 397;
  private readonly MATRIX_A = 0x9908b0df;
  private readonly UPPER_MASK = 0x80000000;
  private readonly LOWER_MASK = 0x7fffffff;

  private mt: number[] = new Array(this.N);
  private mti: number = this.N + 1;

  /**
   * Initializes the generator with a seed.
   * @param seed The initial seed for the generator.
   */
  constructor(seed: number) {
    this.initGenRand(seed);
  }

  /**
   * Initializes the generator array with a seed.
   * @param seed The seed to initialize the generator array.
   */
  private initGenRand(seed: number): void {
    this.mt[0] = seed >>> 0;
    for (this.mti = 1; this.mti < this.N; this.mti++) {
      const s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
      this.mt[this.mti] = ((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253 + this.mti;
      this.mt[this.mti] >>>= 0;
    }
  }

  /**
   * Generates a random 32-bit integer.
   * @returns A 32-bit random integer.
   */
  private genRandInt32(): number {
    let y: number;
    const mag01 = [0x0, this.MATRIX_A];

    if (this.mti >= this.N) {
      let kk: number;

      if (this.mti === this.N + 1) {
        this.initGenRand(5489);
      }

      for (kk = 0; kk < this.N - this.M; kk++) {
        y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
        this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      for (; kk < this.N - 1; kk++) {
        y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
        this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      y = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK);
      this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

      this.mti = 0;
    }

    y = this.mt[this.mti++];

    y ^= y >>> 11;
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= y >>> 18;

    return y >>> 0;
  }

  /**
   * Generates a random floating-point number between 0 (inclusive) and 1 (exclusive).
   * @returns A random floating-point number.
   */

  public random(): number {
    return this.genRandInt32() * (1.0 / 4294967296.0);
  }

  /**
   * Generates an array of random floating-point numbers.
   * @param length The number of random numbers to generate.
   * @returns An array of random floating-point numbers.
   */
  public generateSequence(length: number): number[] {
    return Array.from({ length }, () => this.random());
  }
}

/**
 * Generates QR codes with a random alphanumeric sequence.
 */

export default class QRCodeGenerator {
  private rng: MersenneTwister;
  private readonly charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  /**
   * Constructs a QRCodeGenerator.
   * @param seed A UUID string used to seed the random number generator.
   */
  constructor(seed: string) {
    const numericSeed = this.convertUUIDToNumericSeed(seed);
    this.rng = new MersenneTwister(numericSeed);
  }

  /**
   * Converts a UUID string to a numeric seed.
   * @param uuid The UUID string to convert.
   * @returns A numeric seed derived from the UUID.
   */
  private convertUUIDToNumericSeed(uuid: string): number {
    const hash = crypto.createHash('sha256');
    hash.update(uuid);
    const hashed = hash.digest('hex');
    return parseInt(hashed.substr(0, 16), 16);
  }

  /**
   * Generates a random alphanumeric string.
   * @param length The length of the string to generate.
   * @returns A random alphanumeric string.
   */
  private generateRandomAlphanumeric(length: number): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(this.rng.random() * this.charset.length);
      result += this.charset[randomIndex];
    }
    return result;
  }

  /**
   * Generates an array of QR code strings with a specified format.
   * @param codeLength The length of the random alphanumeric part of the code.
   * @param numberOfCodes The number of QR codes to generate.
   * @param brand The brand part of the QR code.
   * @param code The code part of the QR code.
   * @param size The size part of the QR code.
   * @param type The type part of the QR code.
   * @returns An array of objects containing QR code strings.
   */
  public generateCodes(
    codeLength: number,
    numberOfCodes: number,
    brand: string,
    code: string,
    size: string,
    type: string,
  ): any[] {
    const codes = [];
    for (let i = 0; i < numberOfCodes; i++) {
      const randomPart = this.generateRandomAlphanumeric(codeLength);
      const qrCodeString = `${code}-${size}-${type}-${randomPart}`;

      codes.push({ qrCode: qrCodeString });
    }

    return codes;
  }
}
