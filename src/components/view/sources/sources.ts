import './sources.css';
import { ISource } from '../../../types';

class Sources {
    private sourcesData: ReadonlyArray<ISource> = [];

    public draw(data: ReadonlyArray<ISource>): void {
        this.sourcesData = data;
        this.render(this.sourcesData);
    }

    public filter(query: string): void {
        const trimmed: string = query.trim().toLowerCase();
        if (!trimmed) {
            this.render(this.sourcesData);
            return;
        }

        const filtered: ISource[] = this.sourcesData.filter(
            (item: ISource): boolean =>
                item.name.toLowerCase().includes(trimmed) || item.category.toLowerCase().includes(trimmed)
        );
        this.render(filtered);
    }

    private render(data: ReadonlyArray<ISource>): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        const sourcesContainer: HTMLElement | null = document.querySelector('.sources');

        if (!sourceItemTemp || !sourcesContainer) {
            return;
        }

        sourcesContainer.innerHTML = '';

        if (data.length === 0) {
            const emptyEl: HTMLParagraphElement = document.createElement('p');
            emptyEl.className = 'sources__empty';
            emptyEl.textContent = 'No sources matching your search.';
            sourcesContainer.appendChild(emptyEl);
            return;
        }

        data.forEach((item: ISource): void => {
            const sourceClone: DocumentFragment = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const nameEl: HTMLElement | null = sourceClone.querySelector('.source__item-name');
            if (nameEl) {
                nameEl.textContent = item.name;
            }

            const itemEl: HTMLElement | null = sourceClone.querySelector('.source__item');
            if (itemEl) {
                itemEl.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        sourcesContainer.append(fragment);
    }
}

export default Sources;
