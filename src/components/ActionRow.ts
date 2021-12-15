import { APIActionRowComponent, ComponentType } from 'discord-api-types';
import type { LinkButtonComponent, InteractionButtonComponent, SelectMenuComponent } from '..';
import { Component } from './Component';
import { createComponent } from './Components';

export type ActionRowComponent = LinkButtonComponent | InteractionButtonComponent | SelectMenuComponent;

// TODO: Add valid form component types

/**
 * Represents an action row component
 */
export class ActionRow<T extends ActionRowComponent> extends Component<ComponentType.ActionRow> {
	public components: T[] = [];

	public constructor(data?: APIActionRowComponent) {
		super(ComponentType.ActionRow);

		if (!data) {
			return;
		}

		this.components = data.components.map(createComponent) as T[];
	}

	/**
	 * Adds components to this action row.
	 * @param components The components to add to this action row.
	 * @returns
	 */
	public addComponents(...components: T[]) {
		this.components.push(...components);
		return this;
	}

	/**
	 * Sets the components in this action row
	 * @param components The components to set this row to
	 */
	public setComponents(components: T[]) {
		this.components = components;
		return this;
	}

	public override toJSON(): APIActionRowComponent {
		return {
			...super.toJSON(),
			components: this.components.map((component) => component.toJSON()),
		};
	}
}
