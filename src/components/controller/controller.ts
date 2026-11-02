import AppLoader from './appLoader';
import { Callback, Endpoint, INewsResponse, ISourcesResponse } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: Callback<ISourcesResponse>): void {
        super.getResp<ISourcesResponse>(
            {
                endpoint: Endpoint.Sources,
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: Callback<INewsResponse>): void {
        let target: HTMLElement | null = e.target as HTMLElement | null;
        const newsContainer: HTMLElement | null = e.currentTarget as HTMLElement | null;

        if (!newsContainer || !target) {
            return;
        }

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<INewsResponse>(
                        {
                            endpoint: Endpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
