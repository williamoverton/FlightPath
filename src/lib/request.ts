export default class FPRequest {
  readonly clientInfo: {} = {};
  private _headers: Headers;
  readonly method: string;
  readonly url: URL;
  params: {} = {};
  query: {};

  constructor(private event: FetchEvent) {
    this.clientInfo = event.client;
    this._headers = event.request.headers;
    this.method = event.request.method;
    this.url = new URL(event.request.url);

    this.query = Object.fromEntries(this.url.searchParams.entries())
  }

  get headers() {
    return Object.fromEntries(this._headers.entries())
  }

  setHeader(key: string, value: string): void {
    this._headers.set(key, value);
  }

  async json() {
    return await this.event.request.json();
  }

  async text() {
    return await this.event.request.text();
  }

  async arrayBuffer() {
    return await this.event.request.arrayBuffer();
  }
}
