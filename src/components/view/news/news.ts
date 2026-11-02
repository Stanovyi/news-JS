import './news.css';
import { IArticle } from '../../../types';

class News {
    private readonly placeholderImage: string =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%2322252c'/%3E%3Cpath d='M160 90h80v8h-80zm0 18h80v8h-80zm0 18h50v8h-50z' fill='%2330c5ff'/%3E%3Ctext x='50%25' y='65%25' dominant-baseline='middle' text-anchor='middle' fill='%23888' font-family='sans-serif' font-size='14'%3ENo Preview Available%3C/text%3E%3C/svg%3E";

    public draw(data: ReadonlyArray<IArticle>): void {
        const newsContainer: HTMLElement | null = document.querySelector('.news');
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        if (!newsContainer || !newsItemTemp) {
            return;
        }

        const news: ReadonlyArray<IArticle> = data.slice(0, 10);
        const fragment: DocumentFragment = document.createDocumentFragment();

        if (news.length === 0) {
            newsContainer.innerHTML = '<p class="news__empty">No news articles found. Please select a source.</p>';
            return;
        }

        news.forEach((item: IArticle, idx: number): void => {
            const newsClone: DocumentFragment = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            const itemElement: HTMLElement | null = newsClone.querySelector('.news__item');

            if (idx % 2 && itemElement) {
                itemElement.classList.add('alt');
            }

            const photoEl: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
            if (photoEl) {
                photoEl.style.backgroundImage = `url(${item.urlToImage || this.placeholderImage})`;
            }

            const authorEl: HTMLElement | null = newsClone.querySelector('.news__meta-author');
            if (authorEl) {
                authorEl.textContent = item.author || item.source.name || 'Unknown Author';
            }

            const dateEl: HTMLElement | null = newsClone.querySelector('.news__meta-date');
            if (dateEl) {
                dateEl.textContent = item.publishedAt
                    ? item.publishedAt.slice(0, 10).split('-').reverse().join('-')
                    : '';
            }

            const titleEl: HTMLElement | null = newsClone.querySelector('.news__description-title');
            if (titleEl) {
                titleEl.textContent = item.title;
            }

            const sourceEl: HTMLElement | null = newsClone.querySelector('.news__description-source');
            if (sourceEl) {
                sourceEl.textContent = item.source.name;
            }

            const contentEl: HTMLElement | null = newsClone.querySelector('.news__description-content');
            if (contentEl) {
                contentEl.textContent = item.description || '';
            }

            const linkEl: HTMLAnchorElement | null = newsClone.querySelector('.news__read-more a');
            if (linkEl) {
                linkEl.setAttribute('href', item.url);
                linkEl.setAttribute('target', '_blank');
                linkEl.setAttribute('rel', 'noopener noreferrer');
            }

            fragment.append(newsClone);
        });

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
