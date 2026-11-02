import News from './news/news';
import Sources from './sources/sources';
import { PartialNewsResponse, PartialSourcesResponse } from '../../types';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data?: PartialNewsResponse | null): void {
        const values = data?.articles ? data.articles : [];
        this.news.draw(values);
    }

    public drawSources(data?: PartialSourcesResponse | null): void {
        const values = data?.sources ? data.sources : [];
        this.sources.draw(values);
    }

    public filterSources(query: string): void {
        this.sources.filter(query);
    }
}

export default AppView;
