import type { APIApplicationCommandOption, ApplicationCommandOptionType } from 'discord-api-types/v9';
import { validateRequiredParameters, validateRequired } from '../Assertions';
import type { ToAPIApplicationCommandOptions } from '../SlashCommandBuilder';
import { SharedNameAndDescription } from './NameAndDescription';

export class SlashCommandOptionBase<OptionType extends ApplicationCommandOptionType = ApplicationCommandOptionType>
	extends SharedNameAndDescription
	implements ToAPIApplicationCommandOptions
{
	public required = false;
	public readonly type: OptionType;

	public constructor(type: OptionType) {
		super();
		this.type = type;
	}

	/**
	 * Marks the option as required
	 *
	 * @param required If this option should be required
	 */
	public setRequired(required: boolean) {
		// Assert that you actually passed a boolean
		validateRequired(required);

		this.required = required;

		return this;
	}

	public toJSON(): APIApplicationCommandOption {
		validateRequiredParameters(this.name, this.description, []);

		// Assert that you actually passed a boolean
		validateRequired(this.required);

		// TODO: Fix types
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		return {
			type: this.type,
			name: this.name,
			description: this.description,
			required: this.required,
		} as APIApplicationCommandOption;
	}
}
