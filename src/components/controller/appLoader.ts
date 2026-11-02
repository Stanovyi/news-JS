import Loader from './loader';

class AppLoader extends Loader {
    public constructor() {
        const envKey: string | undefined = process.env.API_KEY;
        const hasValidKey: boolean = Boolean(
            envKey && envKey !== 'get your own API key at https://newsapi.org/' && envKey.trim() !== ''
        );
        const apiKey: string = hasValidKey && envKey ? envKey : '';
        const fallbackUrl: string = hasValidKey
            ? 'https://newsapi.org/v2/'
            : 'https://rss-news-api.onrender.com/mocks/';
        const baseLink: string = process.env.API_URL || fallbackUrl;

        super(baseLink, {
            apiKey,
        });
    }
}

export default AppLoader;
