export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum HttpStatus {
    OK = 200,
    Unauthorized = 401,
    NotFound = 404,
    InternalServerError = 500,
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export enum ResponseStatus {
    Ok = 'ok',
    Error = 'error',
}

export interface ISource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ISourceShort {
    id: string | null;
    name: string;
}

export interface IArticle {
    source: ISourceShort;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface ISourcesResponse {
    status: ResponseStatus | string;
    sources: ISource[];
}

export interface INewsResponse {
    status: ResponseStatus | string;
    totalResults: number;
    articles: IArticle[];
}

export interface IRequestOptions {
    [key: string]: string | undefined;
}

export interface ILoaderOptions {
    apiKey?: string;
    [key: string]: string | undefined;
}

export interface IGetRespParams {
    endpoint: Endpoint | string;
    options?: IRequestOptions;
}

export type Callback<T> = (data: T) => void;

export type NewsItemMeta = Pick<IArticle, 'title' | 'description' | 'url' | 'urlToImage' | 'publishedAt' | 'author'>;
export type ReadonlyRequestOptions = Readonly<IRequestOptions>;
export type PartialNewsResponse = Partial<INewsResponse>;
export type PartialSourcesResponse = Partial<ISourcesResponse>;
export type NullableString = string | null;
