import {
    Callback,
    Endpoint,
    HttpMethod,
    HttpStatus,
    IGetRespParams,
    ILoaderOptions,
    IRequestOptions,
} from '../../types';

class Loader {
    private readonly baseLink: string;
    private readonly options: Readonly<ILoaderOptions>;

    public constructor(baseLink: string, options: Readonly<ILoaderOptions>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp<T>(
        { endpoint, options = {} }: IGetRespParams,
        callback: Callback<T> = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>(HttpMethod.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === HttpStatus.Unauthorized || res.status === HttpStatus.NotFound) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw new Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: IRequestOptions, endpoint: Endpoint | string): string {
        const urlOptions: Record<string, string | undefined> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string): void => {
            const val = urlOptions[key];
            if (val !== undefined && val !== '') {
                url += `${key}=${encodeURIComponent(val)}&`;
            }
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: HttpMethod,
        endpoint: Endpoint | string,
        callback: Callback<T>,
        options: IRequestOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response): Response => this.errorHandler(res))
            .then((res: Response): Promise<T> => res.json() as Promise<T>)
            .then((data: T): void => callback(data))
            .catch((err: unknown): void => {
                if (err instanceof Error) {
                    console.error(err.message);
                } else {
                    console.error('Unknown error:', err);
                }
            });
    }
}

export default Loader;
