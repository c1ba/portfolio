import {StrapiEmailForm} from '@/utils/cms/types';
import EmailTemplateComponent from '@/components/EmailTemplate';
import {FieldType} from '@/components/forms/types';
import GridItem from '@/components/Grid/GridItem';
import GridContainer from '@/components/Grid/GridContainer';
import {COLUMN_SPAN_CONFIG} from '@/app/theme/common';

const EmailForm = ({Destination, EmailTemplate}: StrapiEmailForm) => {
  const formFields = EmailTemplate.Fields.map((field) => {
    return {
      label: field.Label,
      type: field.Type.toLowerCase() as FieldType,
      helpText: field.HelpText,
      required: field.Required,
      errorMessage: field.Required
        ? {
            required: field.Required ? field.RequiredErrorMessage : undefined,
          }
        : undefined,
      options:
        field.Type === 'Select' || field.Type === 'Radio'
          ? (field.Options || []).map((option) => ({
              label: option.Label,
              revealOnSelect: option.RevealOnSelect,
            }))
          : undefined,
      min: ['Text', 'TextArea', 'Email'].includes(field.Type)
        ? field.MinLength
        : ['Number'].includes(field.Type)
          ? field.MoreThan
          : ['Date'].includes(field.Type)
            ? field.LaterThan
            : undefined,
      max: ['Text', 'TextArea', 'Email'].includes(field.Type)
        ? field.MaxLength
        : ['Number'].includes(field.Type)
          ? field.LessThan
          : ['Date'].includes(field.Type)
            ? field.EarlierThan
            : undefined,
    };
  });
  return (
    <GridItem>
      <GridContainer>
        <GridItem
          columnSpan={{
            ...COLUMN_SPAN_CONFIG,
            desktop: {
              range: [3, 5],
            },
            tabletLandscape: {
              range: [2, 6],
            },
          }}
        >
          <EmailTemplateComponent fields={formFields} />
        </GridItem>
      </GridContainer>
    </GridItem>
  );
};

export default EmailForm;
