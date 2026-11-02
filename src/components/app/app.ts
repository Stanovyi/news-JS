import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { INewsResponse, ISourcesResponse } from '../../types';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesElement: HTMLElement | null = document.querySelector('.sources');
        const searchInput: HTMLInputElement | null = document.querySelector('#sourceSearch');

        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e: MouseEvent): void => {
                const target: HTMLElement | null = (e.target as HTMLElement | null)?.closest('.source__item') ?? null;
                if (target) {
                    document.querySelectorAll('.source__item').forEach((item: Element): void => {
                        item.classList.remove('source__item_active');
                    });
                    target.classList.add('source__item_active');
                }

                this.controller.getNews(e, (data: INewsResponse): void => this.view.drawNews(data));
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e: Event): void => {
                const target: HTMLInputElement = e.target as HTMLInputElement;
                this.view.filterSources(target.value);
            });
        }

        this.controller.getSources((data: ISourcesResponse): void => this.view.drawSources(data));
    }
}

export default App;
